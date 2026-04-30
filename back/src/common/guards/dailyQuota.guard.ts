import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from '../../auth/config/jwt.config';
import { type ConfigType } from '@nestjs/config';

const memoryStore = new Map<string, { count: number; date: string }>();

@Injectable()
export class DailyQuotaGuard implements CanActivate {
  private readonly LIMIT = 5;

  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    // private readonly redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    const ip = request.ip;
    const today = this.getToday();

    let identifier = ip; 
    let isAuthenticated = false;

    if (token) {
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          this.jwtConfiguration,
        );

        isAuthenticated = true;
        identifier = payload.sub || ip;
      } catch {
        isAuthenticated = false;
      }
    }

    const key = `quota:${identifier}`;
    const userStats = memoryStore.get(key) || {
      count: 0,
      date: today,
    };

    if (userStats.date !== today) {
      userStats.count = 0;
      userStats.date = today;
    }

    if (!isAuthenticated && userStats.count >= this.LIMIT) {
      throw new HttpException(
        'Você atingiu o limite diário de 5 requisições gratuitas. Faça login para continuar.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    userStats.count++;

    memoryStore.set(key, userStats);

    return true;
  }

  private getToday(): string {
    return new Date().toLocaleDateString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    });
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const auth = request.headers?.authorization;

    if (!auth || typeof auth !== 'string') return undefined;

    if (!auth.startsWith('Bearer ')) return undefined;

    return auth.split(' ')[1];
  }
}