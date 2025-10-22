import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './tarea.entity';
import { CreateTareaDto, UpdateTareaDto } from './dto/tarea.dto';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private tareasRepository: Repository<Tarea>,
  ) {}

  async create(createTareaDto: CreateTareaDto): Promise<Tarea> {
    const tarea = this.tareasRepository.create(createTareaDto);
    return await this.tareasRepository.save(tarea);
  }

  async findAll(tipo?: string): Promise<Tarea[]> {
    const where = tipo ? { tipo } : {};
    return await this.tareasRepository.find({
      where,
      order: { fechaCreacion: 'DESC' }
    });
  }

  async getTipos(): Promise<string[]> {
    const tipos = await this.tareasRepository
      .createQueryBuilder('tarea')
      .select('DISTINCT tarea.tipo', 'tipo')
      .getRawMany();
    
    return tipos.map(item => item.tipo);
  }

  async findOne(id: number): Promise<Tarea> {
    return await this.tareasRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTareaDto: UpdateTareaDto): Promise<Tarea> {
    await this.tareasRepository.update(id, updateTareaDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tareasRepository.delete(id);
  }

  async toggleCompletada(id: number): Promise<Tarea> {
    const tarea = await this.findOne(id);
    if (tarea) {
      tarea.completada = !tarea.completada;
      tarea.estado = tarea.completada ? 'completada' : 'pendiente';
      return await this.tareasRepository.save(tarea);
    }
    return tarea;
  }
}
