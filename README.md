# NestJS Template

A production-ready, scalable NestJS starter template featuring:

- ✅ **Modular architecture** — feature modules under `src/modules`, shared code under `src/common`
- ✅ **TypeORM + PostgreSQL** — with migrations, soft-delete, base entity
- ✅ **Authentication** — JWT access + refresh tokens (rotation + revocation), Passport strategies
- ✅ **Authorization** — role-based guard (`@Roles`), global auth by default (`@Public()` to opt out)
- ✅ **Validation** — global `ValidationPipe` + `class-validator` DTOs everywhere
- ✅ **Interceptors** — response transform, request logging, timeout
- ✅ **Global error handling** — consistent JSON error shape
- ✅ **Swagger / OpenAPI** docs out of the box
- ✅ **Config validation** — Joi schema, app fails fast on missing env vars
- ✅ **Rate limiting** — `@nestjs/throttler`
- ✅ **Security headers** — `helmet`, CORS
- ✅ **Docker** — `Dockerfile` + `docker-compose.yml` (API + Postgres)

---

## 1. Project structure

```
src/
├── main.ts                     # bootstrap: pipes, filters, interceptors, swagger, security
├── app.module.ts                # root module — wires config, db, guards, feature modules
│
├── config/
│   ├── configuration.ts         # typed config object read from process.env
│   └── validation.schema.ts     # Joi schema — validates env vars on boot
│
├── common/                      # shared, cross-cutting code (no business logic)
│   ├── decorators/
│   │   ├── public.decorator.ts        # @Public() — skip global auth guard
│   │   ├── roles.decorator.ts         # @Roles(Role.ADMIN) + Role enum
│   │   └── current-user.decorator.ts  # @CurrentUser() — injects req.user
│   ├── guards/
│   │   ├── jwt-auth.guard.ts          # global guard, honors @Public()
│   │   ├── refresh-token.guard.ts     # used only on /auth/refresh
│   │   └── roles.guard.ts             # used with @Roles()
│   ├── interceptors/
│   │   ├── transform.interceptor.ts   # wraps responses: { success, statusCode, data }
│   │   ├── logging.interceptor.ts     # logs method/path/duration
│   │   └── timeout.interceptor.ts     # aborts requests that hang too long
│   ├── filters/
│   │   └── http-exception.filter.ts   # consistent error JSON shape
│   ├── dto/
│   │   └── pagination.dto.ts          # ?page=&limit= query DTO + PaginatedResult<T>
│   └── entities/
│       └── base.entity.ts             # id (uuid), createdAt, updatedAt, deletedAt
│
├── database/
│   ├── database.module.ts       # TypeOrmModule.forRootAsync (used by the running app)
│   ├── data-source.ts           # standalone DataSource (used only by the TypeORM CLI)
│   └── migrations/              # generated migration files land here
│
└── modules/                     # feature modules — one folder per domain
    ├── auth/
    │   ├── auth.module.ts / auth.controller.ts / auth.service.ts
    │   ├── strategies/           # jwt.strategy.ts, jwt-refresh.strategy.ts
    │   └── dto/                  # register.dto.ts, login.dto.ts, refresh-token.dto.ts
    └── users/
        ├── users.module.ts / users.controller.ts / users.service.ts
        ├── entities/user.entity.ts
        └── dto/                  # create-user.dto.ts, update-user.dto.ts
```

### Why this shape scales well

- **`common/` vs `modules/`**: anything reusable across features (guards, interceptors, base entity) lives in `common`. Anything domain-specific (users, auth, and every future feature) gets its own folder in `modules`, each with its own `module/controller/service/dto/entities`. Adding a new feature (e.g. `orders`) never touches existing modules — just add `src/modules/orders/`.
- **Path aliases** (`@app/*`, `@common/*`, `@modules/*`, `@config/*`, `@database/*`) are pre-configured in `tsconfig.json` so imports don't turn into `../../../` chains as the tree grows.
- **Auth is secure-by-default**: `JwtAuthGuard` is registered globally in `app.module.ts`, so every new controller you add is protected automatically — you only opt individual routes out with `@Public()`, instead of remembering to guard every new route.
- **DTO validation is global**: `ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true })` is applied once in `main.ts`. Every new DTO you write is validated and stripped of unknown fields with zero extra wiring.

---

## 2. Getting started

### Prerequisites
- Node.js 20+
- Docker (optional, for Postgres) or a local PostgreSQL instance

### Install
```bash
npm install
cp .env.example .env
```
Edit `.env` and set at least `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` (min 16 chars each) and your DB credentials. The app **will not boot** if required env vars are missing or invalid — `validation.schema.ts` checks this at startup.

### Run PostgreSQL
```bash
docker compose up -d postgres
```
Or point `DB_HOST`/`DB_PORT`/etc. in `.env` at your own Postgres instance.

### Run the app
```bash
npm run start:dev
```
- API: `http://localhost:3000/api/v1/...`
- Swagger docs: `http://localhost:3000/docs`

### Run everything in Docker
```bash
docker compose up --build
```

---

## 3. Database & migrations

`DB_SYNCHRONIZE=true` is convenient for local prototyping (TypeORM auto-creates tables from entities) but **must stay `false`** anywhere real data lives. Use migrations instead:

```bash
# after changing/adding an entity:
npm run migration:generate -- src/database/migrations/AddSomethingToUsers

# apply pending migrations:
npm run migration:run

# roll back the last migration:
npm run migration:revert
```

---

## 4. Authentication flow

| Endpoint | Auth required | Description |
|---|---|---|
| `POST /api/v1/auth/register` | Public | Creates a user, returns `{ user, accessToken, refreshToken }` |
| `POST /api/v1/auth/login` | Public | Validates credentials, returns the same token pair |
| `POST /api/v1/auth/refresh` | Refresh token (Bearer) | Validates the refresh token against its stored hash, rotates and returns a new pair |
| `POST /api/v1/auth/logout` | Access token (Bearer) | Clears the stored refresh-token hash, revoking it |
| `GET /api/v1/users/me` | Access token (Bearer) | Returns the current user's profile |

**How it works:**
1. On register/login, `AuthService` issues a short-lived **access token** and a longer-lived **refresh token**, and stores a bcrypt hash of the refresh token on the user row.
2. Protected routes are guarded globally by `JwtAuthGuard`, which validates the access token via `JwtStrategy` and attaches the user to `request.user`.
3. When the access token expires, the client calls `/auth/refresh` with the refresh token. `JwtRefreshStrategy` checks it against the stored hash — this is what lets you **revoke** a refresh token server-side (e.g. on logout) instead of trusting any unexpired JWT forever.
4. Passwords and refresh-token hashes are decorated with `@Exclude()` on the `User` entity and stripped automatically by `ClassSerializerInterceptor` on every response.

### Adding a protected route
Nothing to do — routes require a valid access token by default. To make a route public:
```ts
import { Public } from '../../common/decorators/public.decorator';

@Public()
@Get('health')
health() { return 'ok'; }
```

### Restricting a route to a role
```ts
import { UseGuards } from '@nestjs/common';
import { Roles, Role } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
@Delete(':id')
remove(@Param('id') id: string) { ... }
```

---

## 5. Adding a new feature module

Use the `users` module as a template. For a new `orders` feature:

```bash
mkdir -p src/modules/orders/dto src/modules/orders/entities
```
1. `entities/order.entity.ts` — extend `BaseEntity` for id/timestamps/soft-delete.
2. `dto/create-order.dto.ts`, `dto/update-order.dto.ts` — annotate with `class-validator` decorators.
3. `orders.service.ts` — inject the repository via `@InjectRepository(Order)`.
4. `orders.controller.ts` — inject the service; use `@CurrentUser()`, `@Roles()`, `@Public()` as needed.
5. `orders.module.ts` — `TypeOrmModule.forFeature([Order])`, wire controller + service.
6. Register `OrdersModule` in `app.module.ts` imports.

That's the whole pattern — every feature is self-contained and the global guards/pipes/interceptors/filters apply automatically.

---

## 6. Response & error shapes

**Success** (via `TransformInterceptor`):
```json
{ "success": true, "statusCode": 200, "data": { "...": "..." } }
```

**Error** (via `HttpExceptionFilter`):
```json
{
  "success": false,
  "statusCode": 400,
  "path": "/api/v1/auth/register",
  "timestamp": "2026-08-15T12:00:00.000Z",
  "message": ["email must be an email"],
  "errors": ["email must be an email"]
}
```

---

## 7. Suggestions / things to add as the project grows

- **Structured logging**: swap the built-in `Logger` for `nestjs-pino` or `winston` once you need log shipping/JSON logs.
- **Caching**: `@nestjs/cache-manager` with Redis for hot read endpoints.
- **Queues/background jobs**: `@nestjs/bull` (Redis-backed) for emails, exports, etc.
- **Testing**: add unit tests per service (`*.spec.ts`) alongside e2e tests in `test/`; a sample e2e test is already included.
- **CI**: add a GitHub Actions workflow running `npm run lint`, `npm run test`, `npm run test:e2e` against a Postgres service container.
- **Health checks**: `@nestjs/terminus` for `/health` (DB connectivity, disk, memory) — useful for k8s liveness/readiness probes.
- **Multi-environment config**: split `.env.development` / `.env.production` and load conditionally if you outgrow a single `.env`.
- **API versioning**: already enabled (`/api/v1/...`) — bump `defaultVersion` or version individual controllers when you need a v2.
- **Idempotency / request IDs**: add a correlation-id middleware if you plan to trace requests across services.
- **Soft-delete aware queries**: TypeORM's `deletedAt` (from `BaseEntity`) is excluded from queries automatically — remember to use `withDeleted: true` explicitly if you ever need deleted rows.

---

## 8. Useful scripts

| Script | Description |
|---|---|
| `npm run start:dev` | Start with watch mode |
| `npm run build` | Compile to `dist/` |
| `npm run start:prod` | Run compiled build |
| `npm run lint` | ESLint with autofix |
| `npm run format` | Prettier format |
| `npm run test` | Unit tests |
| `npm run test:e2e` | End-to-end tests |
| `npm run migration:generate` | Generate a migration from entity changes |
| `npm run migration:run` | Apply pending migrations |
| `npm run migration:revert` | Roll back the last migration |

---

## 9. Tech stack

NestJS 10 · TypeORM 0.3 · PostgreSQL · Passport JWT · class-validator/class-transformer · Swagger · Helmet · Throttler · Docker
