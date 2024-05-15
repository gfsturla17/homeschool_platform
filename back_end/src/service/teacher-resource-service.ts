import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Teacheruploads } from '../entities/Teacheruploads';

@Injectable()
export class TeacherResourceService {
    constructor(@InjectEntityManager() private entityManager: EntityManager) {}

    async getTeacherResources(teacherId: number, contentType: string): Promise<Teacheruploads[]> {
        return this.entityManager
            .createQueryBuilder(Teacheruploads, "teacheruploads")
            .innerJoinAndSelect("teacheruploads.contenttype", "contenttype")
            .innerJoinAndSelect("teacheruploads.teacher", "teacher")
            .where("teacher.teacherId = :teacherId", { teacherId })
            .andWhere("contenttype.contenttypename = :contentType", { contentType })
            .getMany();
    }
}
