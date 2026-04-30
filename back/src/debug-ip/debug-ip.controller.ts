
import { Get, Req } from '@nestjs/common';
import { type Request } from 'express';
import { Controller } from '@nestjs/common';

@Controller('debug-ip')
export class DebugIpController {
  @Get('')
  getIp(@Req() req: Request) {
    return {
      ip: req.ip,
      forwarded: req.headers['x-forwarded-for'],
      realIp: req.headers['x-real-ip'],
    };
  }
}
