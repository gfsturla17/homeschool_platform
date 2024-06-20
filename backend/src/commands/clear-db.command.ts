import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from "../database/database.service";

@Injectable()
export class DropDatabaseCommand {
  constructor(private readonly databaseService: DatabaseService) {}

  @Command({
    command: 'db:drop-and-sync',
    describe: 'Drop the database and synchronize the schema',
  })
  async dropAndSync() {
    await this.databaseService.dropAndSynchronizeDatabase();
    console.log('Database dropped and schema synchronized.');
  }
}
