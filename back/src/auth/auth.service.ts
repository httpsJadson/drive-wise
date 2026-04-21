import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../database/prisma.service';
import { HashingServiceProtocol } from './hashing/hashing.service';
import jwtConfig from './config/jwt.config';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { RefreshDto } from './dto/refresh.dto';
import { JobRole, User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly hashingService: HashingServiceProtocol,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ReturnType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  private readonly userSelect = {
    id: true,
    jobRole: true,
    password: true,
  }

  async login(loginDto: LoginDto) {

    const user = await this.prisma.user.findFirst({
      where: {
        email: loginDto.email,
      },
      select: this.userSelect,
    });

    if (user) {

      const passwordIsValid = await this.hashingService.compare(
        loginDto.password,
        user.password,
      ) ? true : this.unauthorized();
      
      const payload: Partial<User> = {
        jobRole: user.jobRole,
      }
      
      return await this.createTokens(user as User, payload);

    } else {
      this.notFound();
    }

  }

  async refreshTokens(refreshDto: RefreshDto) {
    try {
      const {sub} = await this.jwtService.verifyAsync(
        refreshDto.refreshToken, 
        this.jwtConfiguration,
      );

      const user = await this.prisma.user.findFirst({
        where: {
          id: sub,
        },
        select: this.userSelect,
      });
      if(!user) this.notFound();

      return await this.createTokens(user as User, {jobRole: user?.jobRole});
      
    } catch (error) {
      this.invalidToken();
    }
  }

  private async signJwtAsync(
    sub: User['id'], 
    expiresIn: number, 
    payload?: Partial<User>
  ){
    return await this.jwtService.signAsync(
      {
        sub,
        ...payload
      },
      {
        audience: this.jwtConfiguration.audi,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: expiresIn,
      }
    );
  }

  private async createTokens(user: User, payload){
    const accessToken = await this.signJwtAsync(
      user.id, 
      this.jwtConfiguration.jwtTTL, 
      payload,
    );

    const refreshToken = await this.signJwtAsync(
      user.id, 
      this.jwtConfiguration.jwtRefreshTTL, 
    );

    return { 
      access_token: accessToken, 
      refresh_token: refreshToken
    }
  }

  private readonly unauthorized = () => {
    throw new UnauthorizedException("Invalid email or password");
  }

  private readonly notFound = () => {
    throw new NotFoundException("User not found");
  }

  private readonly invalidToken = () => {
    throw new UnauthorizedException("Invalid token");
  }
}
