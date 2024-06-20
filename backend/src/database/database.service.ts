import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}

  async dropAndSynchronizeDatabase() {
    try {
      console.log('Dropping the database...');

      const dbHost = this.configService.get<string>('DATABASE_HOST');
      const dbPort = this.configService.get<number>('DATABASE_PORT');
      const dbUsername = this.configService.get<string>('DATABASE_USERNAME');
      const dbPassword = this.configService.get<string>('DATABASE_PASSWORD');
      const dbName = this.configService.get<string>('DATABASE_NAME');

      // Create a new DataSource connection to the system database
      const systemDataSource = new DataSource({
        type: 'postgres',
        host: dbHost,
        port: dbPort,
        username: dbUsername,
        password: dbPassword,
        database: 'postgres', // System database for PostgreSQL
      });

      await systemDataSource.initialize();

      // Drop the current database
      await systemDataSource.query(`DROP DATABASE IF EXISTS ${dbName}`);
      console.log(`Database ${dbName} dropped successfully.`);

      // Recreate the database
      await systemDataSource.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} recreated successfully.`);

      // Close the system connection
      await systemDataSource.destroy();

      // Reinitialize the DataSource to connect to the newly created database
      await this.dataSource.destroy(); // Close the current DataSource
      await this.dataSource.initialize(); // Reinitialize it to reconnect

      // Synchronize the schema
      console.log('Synchronizing the database schema...');
      await this.dataSource.synchronize();
      console.log('Database schema synchronized successfully.');

    } catch (error) {
      console.error('Error during database operations:', error);
      throw error;
    }
  }
}
