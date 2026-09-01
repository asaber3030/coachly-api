import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { Roles } from '@app/common/decorators/roles.decorator';
import { UserRoleEnum } from '@app/common/enums/user.enum';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { AuthenticatedUser } from '@app/common/interfaces/authenticated-user.interface';
import { CreateProgressPhotoDto } from './dto/create-progress-photo.dto';
import { UpdateProgressPhotoDto } from './dto/update-progress-photo.dto';
import { ProgressPhotosService } from './progress-photos.service';

@Controller('progress-photos')
@UseGuards(RolesGuard)
export class ProgressPhotosController {
  constructor(private readonly progressPhotosService: ProgressPhotosService) {}

  @Get()
  getMyPhotos(@CurrentUser() user: AuthenticatedUser) {
    return this.progressPhotosService.findByUser(user.id);
  }

  @Get(':id')
  getPhotoById(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.progressPhotosService.findOneByUser(user.id, id);
  }

  @Post()
  createPhoto(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateProgressPhotoDto) {
    return this.progressPhotosService.createForUser(user.id, dto);
  }

  @Patch(':id')
  updatePhoto(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateProgressPhotoDto,
  ) {
    return this.progressPhotosService.updateForUser(user.id, id, dto);
  }

  @Delete(':id')
  removePhoto(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.progressPhotosService.removeForUser(user.id, id);
  }

  @Get('coach/:clientId')
  @Roles(UserRoleEnum.COACH)
  getClientPhotos(@CurrentUser() user: AuthenticatedUser, @Param('clientId') clientId: string) {
    return this.progressPhotosService.findByClient(user.id, clientId);
  }
}
