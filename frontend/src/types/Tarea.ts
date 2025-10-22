export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
  estado: string;
  tipo: string;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface CreateTareaDto {
  titulo: string;
  descripcion?: string;
  tipo?: string;
}
