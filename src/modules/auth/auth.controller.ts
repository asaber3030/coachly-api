import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { Public } from '@app/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginBody: LoginDto) {
    return this.authService.login(loginBody);
  }

  @Public()
  @Post('register')
  register(@Body() registerBody: RegisterDto) {
    return this.authService.register(registerBody);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser('id') userId: string) {
    return this.authService.me(userId);
  }
}
