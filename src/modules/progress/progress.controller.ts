import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { Roles } from '@app/common/decorators/roles.decorator';
import { UserRoleEnum } from '@app/common/enums/user.enum';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { AuthenticatedUser } from '@app/common/interfaces/authenticated-user.interface';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { ProgressService } from './progress.service';

@Controller('progress')
@UseGuards(RolesGuard)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get()
  getMyProgress(
    @CurrentUser() user: AuthenticatedUser,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.progressService.findByUser(user.id, Number(limit ?? 20), Number(offset ?? 0));
  }

  @Get(':id')
  getProgressById(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.progressService.findOneByUser(user.id, id);
  }

  @Post()
  createProgress(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateProgressDto) {
    return this.progressService.createForUser(user.id, dto);
  }

  @Patch(':id')
  updateProgress(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateProgressDto,
  ) {
    return this.progressService.updateForUser(user.id, id, dto);
  }

  @Delete(':id')
  removeProgress(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.progressService.removeForUser(user.id, id);
  }

  @Get('coach/:clientId')
  @Roles(UserRoleEnum.COACH)
  getClientProgress(@CurrentUser() user: AuthenticatedUser, @Param('clientId') clientId: string) {
    return this.progressService.findByClient(user.id, clientId);
  }
}
