import { Injectable ,UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class AuthService {
     constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async register(email: string, password: string, role: string= 'customer') {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.prisma.user.create({
            data: {
                email,
                role,
                password: hashedPassword,
            },
        });
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
