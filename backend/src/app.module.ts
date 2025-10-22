import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TareasModule } from './tareas.module';
import { Tarea } from './tarea.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_URL ? 'postgres' : 'sqlite',
      url: process.env.DATABASE_URL,
      database: process.env.DATABASE_URL ? undefined : 'database.sqlite',
      entities: [Tarea],
      synchronize: true,
      logging: process.env.NODE_ENV === 'development',
      ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
    }),
    TareasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
