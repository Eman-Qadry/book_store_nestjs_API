import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'prisma/prisma.service';

@Module({
    imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ||  'default_secret_key', 
    
    }),
  ],
  providers: [AuthService, JwtStrategy, PrismaService],
  exports: [AuthService],
  controllers: [AuthController],

 
})
export class AuthModule {}
