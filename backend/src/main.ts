import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Internal API Documentation')
    .setDescription('API documentation for internal use')
    .setVersion('1.0')
    .addBearerAuth() // If you use JWT or any other bearer token for authentication
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);

}


bootstrap();
