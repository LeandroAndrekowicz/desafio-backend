import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const HOST = process.env.HOST || '0.0.0.0';

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  if (process.env.PRODUCTION == 'false') {
    const config = new DocumentBuilder()
      .setTitle('Desafio backend - SWAGGER')
      .setDescription('SWAGGER de documentação das rotas do backend')
      .setVersion('1.0')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
  }

  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(PORT, HOST);
}
bootstrap();
