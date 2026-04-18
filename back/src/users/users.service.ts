import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashingServiceProtocol } from '../auth/hashing/hashing.service';
import { PrismaService } from '../database/prisma.service';
import { JobRole } from '../common/enum/jobRole.enum';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingServiceProtocol,
  ) {};

  private readonly userSelect = {
    id: true,
    email: true,
    username: true,
    jobRole: true,
  };

  async create(createUserDto: CreateUserDto) {
    const passwordHash = await this.hashingService.hash(createUserDto.password);
    const email = createUserDto.email.toLowerCase();
    try {
      return await this.prismaService.user.create({
        data: {
          email,
          password: passwordHash,
          username: createUserDto.username,
          jobRole: JobRole[createUserDto.jobRole],
        },
        select: this.userSelect,
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Email already exists');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  };

  async findAll(query: PaginationDto) {
    const {page = 1, limit = 20, orderDir = 'asc'} = query
    const skip = (page - 1) * limit;
    return await this.prismaService.user.findMany({
      skip,
      take: limit,
      orderBy: {
        id: orderDir,
      },
      select: this.userSelect,
    });
  };

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: this.userSelect,
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  };

  async update(id: string, updateUserDto: UpdateUserDto) {
    if(updateUserDto.password) {
      updateUserDto.password = await this.hashingService.hash(updateUserDto.password);
    }
    try {
      return await this.prismaService.user.update({
        where: {
          id,
        },
        data: {
          ...updateUserDto,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Email already exists');
      }
      throw new InternalServerErrorException('Failed to update user');
    }
  };

  async remove(id: string) {
    try {
      return await this.prismaService.user.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new BadRequestException('User not found');
      }
      throw new InternalServerErrorException('Failed to delete user');
    }
  };
}
