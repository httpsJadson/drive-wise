import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../database/prisma.service';
import { HashingServiceProtocol } from './hashing/hashing.service';
import jwtConfig from './config/jwt.config';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ReturnType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: loginDto.email,
      },
    });

    if (user) {
      const passwordIsValid = await this.hashingService.compare(
        loginDto.password,
        user.password,
      );
      passwordIsValid ? true : this.unauthorized();
      const accessToken = await this.jwtService.signAsync(
        {
          sub: user.id,
          role: user.jobRole,
        },
        {
          audience: this.jwtConfiguration.audi,
          issuer: this.jwtConfiguration.issuer,
          secret: this.jwtConfiguration.secret,
          expiresIn: this.jwtConfiguration.jwtTTL,
        }
      );
      return {  
        access_token: accessToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.username,
          role: user.jobRole,
        }
      }
    } else {
      this.unauthorized();
    }
  }

  private readonly unauthorized = () => {
    throw new UnauthorizedException("Invalid email or password");
  }
}
