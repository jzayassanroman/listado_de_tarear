import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tareas')
export class Tarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ default: false })
  completada: boolean;

  @Column({ default: 'pendiente' })
  estado: string;

  @Column({ default: 'general' })
  tipo: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;
}
