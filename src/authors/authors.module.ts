import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { PrismaService } from 'prisma/prisma.service';
@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService, PrismaService],
})
export class AuthorsModule {}
