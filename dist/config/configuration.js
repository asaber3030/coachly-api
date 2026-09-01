"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    env: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT ?? "3000", 10),
    apiPrefix: process.env.API_PREFIX || "api",
    corsOrigin: process.env.CORS_ORIGIN || "*",
    database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? "5432", 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
        url: process.env.DB_URL,
        synchronize: process.env.DB_SYNCHRONIZE === "true",
        logging: process.env.DB_LOGGING === "true",
    },
    mongodb: {
        uri: process.env.MONGODB_URI,
        dbName: process.env.MONGODB_DB_NAME,
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT ?? "6379", 10),
        password: process.env.REDIS_PASSWORD,
        db: parseInt(process.env.REDIS_DB ?? "0", 10),
    },
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET,
        accessExpiration: process.env.JWT_ACCESS_EXPIRATION || "15m",
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || "7d",
    },
    throttle: {
        ttl: parseInt(process.env.THROTTLE_TTL ?? "60", 10),
        limit: parseInt(process.env.THROTTLE_LIMIT ?? "20", 10),
    },
});
//# sourceMappingURL=configuration.js.map