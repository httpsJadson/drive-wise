import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS para aceitar requisições do frontend
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      // process.env.PRODUCTION_URL,
      // Adicione URLs de produção aqui conforme necessário
      // 'https://seu-frontend.com',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('DriveWise: Dirija com sabedoria API')
    .setDescription('Documentação da API de DriveWise: Dirija com sabedoria')
    .setVersion('1.0')
    .addBearerAuth() // remove se não usar JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
