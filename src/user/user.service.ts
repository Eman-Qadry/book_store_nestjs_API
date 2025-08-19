import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    
    async update(userId: number, dto: UpdateUserDto) {
        return this.prisma.user.update({
        where: { id: userId },
        data: {
            name: dto.name,
            profileImage: dto.profileImage,
            password: dto.password,
        },
        });
    }
    
    async getProfile(id: number) {
        return this.prisma.user.findUnique({
        where: { id },
        });
    }
    
    async getAllUsers() {
        return this.prisma.user.findMany();
    }
    
    async remove(id: number) {
        return this.prisma.user.delete({
        where: { id },
        });
    }
}
