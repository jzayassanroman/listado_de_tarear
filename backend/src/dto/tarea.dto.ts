import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateTareaDto {
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  tipo?: string;
}

export class UpdateTareaDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsBoolean()
  completada?: boolean;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  tipo?: string;
}
