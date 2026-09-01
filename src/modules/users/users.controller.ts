import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { AuthenticatedUser } from '@app/common/interfaces/authenticated-user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@CurrentUser() user: AuthenticatedUser) {
    return this.usersService.getMe(user.id);
  }

  @Patch('me')
  updateMe(@CurrentUser() user: AuthenticatedUser, @Body() dto: UpdateUserDto) {
    return this.usersService.updateMe(user.id, dto);
  }

  @Get('me/profile')
  getProfile(@CurrentUser() user: AuthenticatedUser) {
    return this.usersService.getProfile(user.id);
  }

  @Patch('me/profile')
  updateProfile(@CurrentUser() user: AuthenticatedUser, @Body() dto: UpdateUserProfileDto) {
    return this.usersService.updateProfile(user.id, dto);
  }

  @Get('me/coach')
  getCoach(@CurrentUser() user: AuthenticatedUser) {
    return this.usersService.getCoach(user.id);
  }

  @Get('me/clients')
  getClients(@CurrentUser() user: AuthenticatedUser) {
    return this.usersService.getClients(user.id);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }
}
