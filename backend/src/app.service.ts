import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'API de Lista de Tareas funcionando correctamente!';
  }
}
