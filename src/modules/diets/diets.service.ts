import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Diet } from '@app/common/entities/diet.entity';
import { DietItem } from '@app/common/entities/diet-item.entity';
import { Meal } from '@app/common/entities/meal.entity';
import { User } from '@app/common/entities/user.entity';
import { CreateDietDto } from './dto/create-diet.dto';
import { UpdateDietDto } from './dto/update-diet.dto';

@Injectable()
export class DietsService {
  constructor(
    @InjectRepository(Diet)
    private readonly dietsRepository: Repository<Diet>,
    @InjectRepository(DietItem)
    private readonly dietItemsRepository: Repository<DietItem>,
    @InjectRepository(Meal)
    private readonly mealsRepository: Repository<Meal>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAllForCoach(userId: string, limit: number, offset: number): Promise<Diet[]> {
    const coach = await this.usersRepository.findOne({ where: { id: userId } });

    if (!coach) {
      throw new NotFoundException('Coach not found');
    }

    return this.dietsRepository.find({
      where: [{ createdBy: { id: userId } }, { isGlobal: true }],
      relations: ['createdBy', 'items', 'items.meal'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });
  }

  async findOneForCoach(userId: string, dietId: string): Promise<Diet> {
    const diet = await this.dietsRepository.findOne({
      where: [
        { id: dietId, createdBy: { id: userId } },
        { id: dietId, isGlobal: true },
      ],
      relations: ['createdBy', 'items', 'items.meal'],
    });

    if (!diet) {
      throw new NotFoundException('Diet not found');
    }

    return diet;
  }

  async createForCoach(userId: string, dto: CreateDietDto): Promise<Diet> {
    const coach = await this.usersRepository.findOne({ where: { id: userId } });

    if (!coach) {
      throw new NotFoundException('Coach not found');
    }

    const diet = this.dietsRepository.create({
      name: dto.name,
      description: dto.description,
      isGlobal: dto.isGlobal,
      createdBy: coach,
    });

    const savedDiet = await this.dietsRepository.save(diet);

    if (dto.items && dto.items.length > 0) {
      const mealIds = dto.items.map((item) => item.mealId);
      const meals = await this.mealsRepository.find({ where: { id: In(mealIds) } });

      if (meals.length !== mealIds.length) {
        throw new NotFoundException('One or more meals were not found');
      }

      const items = dto.items.map((item) => {
        const meal = meals.find((entry) => entry.id === item.mealId);

        return this.dietItemsRepository.create({
          diet: savedDiet,
          meal: meal as Meal,
          dayOfWeek: item.dayOfWeek,
          mealTime: item.mealTime,
        });
      });

      await this.dietItemsRepository.save(items);
      savedDiet.items = items;
    }

    return savedDiet;
  }

  async updateForCoach(userId: string, dietId: string, dto: UpdateDietDto): Promise<Diet> {
    const diet = await this.findOneForCoach(userId, dietId);

    Object.assign(diet, {
      name: dto.name ?? diet.name,
      description: dto.description ?? diet.description,
      isGlobal: dto.isGlobal,
    });

    const savedDiet = await this.dietsRepository.save(diet);

    if (dto.items) {
      await this.dietItemsRepository.delete({ diet: { id: diet.id } as Diet });

      if (dto.items.length > 0) {
        const mealIds = dto.items.map((item) => item.mealId);
        const meals = await this.mealsRepository.find({ where: { id: In(mealIds) } });

        if (meals.length !== mealIds.length) {
          throw new NotFoundException('One or more meals were not found');
        }

        const nextItems = dto.items.map((item) => {
          const meal = meals.find((entry) => entry.id === item.mealId);

          return this.dietItemsRepository.create({
            diet: savedDiet,
            meal: meal as Meal,
            dayOfWeek: item.dayOfWeek,
            mealTime: item.mealTime,
          });
        });

        await this.dietItemsRepository.save(nextItems);
      }
    }

    return this.findOneForCoach(userId, dietId);
  }

  async removeForCoach(userId: string, dietId: string): Promise<{ deleted: boolean }> {
    const diet = await this.findOneForCoach(userId, dietId);
    await this.dietsRepository.remove(diet);

    return { deleted: true };
  }
}
