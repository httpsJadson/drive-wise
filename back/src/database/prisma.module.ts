import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';


@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exportando o PrismaService para ser usado em outros módulos
})
export class PrismaModule {}