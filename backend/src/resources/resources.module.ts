import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';
import { Teacher } from "../entities/teacher.entity";
import { ResourceType } from "../entities/resourcetype.entity";
import { Resource } from "../entities/resource.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Resource, ResourceType, Teacher]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),],
  providers: [ResourcesService],
  controllers: [ResourcesController]
})
export class ResourcesModule {}
