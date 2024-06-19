import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./middleware/HttpExceptionFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const errorMessages = {};
        errors.forEach((error) => {
          errorMessages[error.property] = Object.values(error.constraints);
        });
        return new BadRequestException(errorMessages);
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

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
