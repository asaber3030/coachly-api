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
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { CoachService } from './coach.service';

@Controller('coach')
@UseGuards(RolesGuard)
export class CoachController {
  constructor(private readonly coachService: CoachService) {}

  @Post('invite')
  @Roles(UserRoleEnum.COACH)
  inviteClient(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateInvitationDto) {
    return this.coachService.inviteClient(user.id, dto);
  }

  @Get('clients')
  @Roles(UserRoleEnum.COACH)
  findClients(
    @CurrentUser() user: AuthenticatedUser,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.coachService.findClients(user.id, Number(limit ?? 20), Number(offset ?? 0));
  }

  @Get('invitations')
  @Roles(UserRoleEnum.COACH)
  findInvitations(@CurrentUser() user: AuthenticatedUser) {
    return this.coachService.findInvitations(user.id);
  }

  @Post('clients/:clientId/workouts/:workoutId')
  @Roles(UserRoleEnum.COACH)
  assignWorkout(
    @CurrentUser() user: AuthenticatedUser,
    @Param('clientId') clientId: string,
    @Param('workoutId') workoutId: string,
    @Body('notes') notes?: string,
  ) {
    return this.coachService.assignWorkoutToClient(user.id, clientId, workoutId, notes);
  }

  @Delete('clients/:clientId/workouts/:workoutId')
  @Roles(UserRoleEnum.COACH)
  removeWorkoutAssignment(
    @CurrentUser() user: AuthenticatedUser,
    @Param('clientId') clientId: string,
    @Param('workoutId') workoutId: string,
  ) {
    return this.coachService.removeWorkoutAssignment(user.id, clientId, workoutId);
  }

  @Get('clients/:clientId/workouts')
  @Roles(UserRoleEnum.COACH)
  listWorkoutAssignments(
    @CurrentUser() user: AuthenticatedUser,
    @Param('clientId') clientId: string,
  ) {
    return this.coachService.listWorkoutAssignments(user.id, clientId);
  }

  @Post('clients/:clientId/exercises/:exerciseId')
  @Roles(UserRoleEnum.COACH)
  assignExercise(
    @CurrentUser() user: AuthenticatedUser,
    @Param('clientId') clientId: string,
    @Param('exerciseId') exerciseId: string,
    @Body('notes') notes?: string,
  ) {
    return this.coachService.assignExerciseToClient(user.id, clientId, exerciseId, notes);
  }

  @Delete('clients/:clientId/exercises/:exerciseId')
  @Roles(UserRoleEnum.COACH)
  removeExerciseAssignment(
    @CurrentUser() user: AuthenticatedUser,
    @Param('clientId') clientId: string,
    @Param('exerciseId') exerciseId: string,
  ) {
    return this.coachService.removeExerciseAssignment(user.id, clientId, exerciseId);
  }

  @Get('clients/:clientId/exercises')
  @Roles(UserRoleEnum.COACH)
  listExerciseAssignments(
    @CurrentUser() user: AuthenticatedUser,
    @Param('clientId') clientId: string,
  ) {
    return this.coachService.listExerciseAssignments(user.id, clientId);
  }

  @Post('clients/:clientId/meals/:mealId')
  @Roles(UserRoleEnum.COACH)
  assignMeal(
    @CurrentUser() user: AuthenticatedUser,
    @Param('clientId') clientId: string,
    @Param('mealId') mealId: string,
    @Body('notes') notes?: string,
  ) {
    return this.coachService.assignMealToClient(user.id, clientId, mealId, notes);
  }

  @Delete('clients/:clientId/meals/:mealId')
  @Roles(UserRoleEnum.COACH)
  removeMealAssignment(
    @CurrentUser() user: AuthenticatedUser,
    @Param('clientId') clientId: string,
    @Param('mealId') mealId: string,
  ) {
    return this.coachService.removeMealAssignment(user.id, clientId, mealId);
  }

  @Get('clients/:clientId/meals')
  @Roles(UserRoleEnum.COACH)
  listMealAssignments(@CurrentUser() user: AuthenticatedUser, @Param('clientId') clientId: string) {
    return this.coachService.listMealAssignments(user.id, clientId);
  }

  @Post('clients/:clientId/diets/:dietId')
  @Roles(UserRoleEnum.COACH)
  assignDiet(
    @CurrentUser() user: AuthenticatedUser,
    @Param('clientId') clientId: string,
    @Param('dietId') dietId: string,
    @Body('notes') notes?: string,
  ) {
    return this.coachService.assignDietToClient(user.id, clientId, dietId, notes);
  }

  @Delete('clients/:clientId/diets/:dietId')
  @Roles(UserRoleEnum.COACH)
  removeDietAssignment(
    @CurrentUser() user: AuthenticatedUser,
    @Param('clientId') clientId: string,
    @Param('dietId') dietId: string,
  ) {
    return this.coachService.removeDietAssignment(user.id, clientId, dietId);
  }

  @Get('clients/:clientId/diets')
  @Roles(UserRoleEnum.COACH)
  listDietAssignments(@CurrentUser() user: AuthenticatedUser, @Param('clientId') clientId: string) {
    return this.coachService.listDietAssignments(user.id, clientId);
  }

  @Post('accept-invite/:token')
  @Roles(UserRoleEnum.USER)
  acceptInvite(@CurrentUser() user: AuthenticatedUser, @Param('token') token: string) {
    return this.coachService.acceptInvite(user.id, token);
  }
}
