import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TeacherModule } from './teachers/teachers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherController } from './teachers/teachers.controller';
import { Teacher } from './entities/teacher.entity';
import { TeacherLoginCredentials } from './entities/teacherlogincredentials.entity';
import { AuthModule } from './auth/auth.module';
import { ResourcesModule } from './resources/resources.module';
import { diskStorage } from "multer";
import { MulterModule } from "@nestjs/platform-express";
import { FileTypeMiddleware } from './middleware/file-type.middleware';
import { AuthMiddleware } from "./middleware/auth.middleware";
import { JwtModule } from "@nestjs/jwt"; // Import middleware
import { UserModule } from './user/user.module';
import { AuthGuard } from "./auth/auth.guard";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./auth/roles.guard";
import { TeacherAvailabilityModule } from './teacher-availability/teacher-availability.module';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = file.originalname;
          cb(null, filename);
        },
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: '../shared/schema.gql',
      playground: true,
      introspection: true,
      formatError: (error) => {
        if (process.env.NODE_ENV === 'production') {
          return {
            message: error.message,
            code: error.extensions.code,
          };
        } else {
          return error;
        }
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
    TeacherModule,
    AuthModule,
    ResourcesModule,
    UserModule,
    TeacherAvailabilityModule,
  ],
  controllers: [AppController, TeacherController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FileTypeMiddleware) // Apply other necessary middlewares
      .forRoutes('*');
  }
}

