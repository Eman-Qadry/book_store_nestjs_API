import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async register(
    name: string,
    email: string,
    password: string,
    role: string = 'customer',
  ) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email},
    });
    if (existingUser) throw new ConflictException('Email already in use');

    const hashedPassword = await bcrypt.hash(password, 10);
     const user= await this.prisma.user.create({
      data: {
        name,
        email,
        role,
        password: hashedPassword,
      },
    });
    
    return this.generateTokens(user.id, user.email, user.role);
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }


    return this.generateTokens(user.id, user.email, user.role);
  }

  private generateTokens(userId: number, email: string, role: string) {
    const payload = { sub: userId, email, role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRATION || '1d' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: process.env.JWT_REFRESH_EXPIRATION || '30d' });

    return { accessToken, refreshToken };
  }
}
