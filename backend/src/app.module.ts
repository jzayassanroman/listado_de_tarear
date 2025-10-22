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
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Tarea],
      synchronize: true,
      logging: true,
    }),
    TareasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
