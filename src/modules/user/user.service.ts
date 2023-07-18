import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...arg } = createUserDto;
    const saltOrRounds = 7;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    return this.prismaService.user.create({
      data: {
        ...arg,
        password: hashPassword,
      },
    });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const users = await this.prismaService.user.findMany({
      skip,
      take: limit,
    });

    const total = users.length;
    const pages = Math.ceil(total / limit) || 1;

    return { users, total, page, pages, limit };
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found');

    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found');

    return this.prismaService.user.delete({ where: { id } });
  }
}
