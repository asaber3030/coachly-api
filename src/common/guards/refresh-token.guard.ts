import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Used only on the /auth/refresh route to validate the refresh token via JwtRefreshStrategy.
 */
@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {}
