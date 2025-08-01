import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [BookModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
