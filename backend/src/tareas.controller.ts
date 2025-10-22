import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { CreateTareaDto, UpdateTareaDto } from './dto/tarea.dto';

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Post()
  create(@Body() createTareaDto: CreateTareaDto) {
    return this.tareasService.create(createTareaDto);
  }

  @Get()
  findAll(@Query('tipo') tipo?: string) {
    return this.tareasService.findAll(tipo);
  }

  @Get('tipos')
  getTipos() {
    return this.tareasService.getTipos();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tareasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTareaDto: UpdateTareaDto) {
    return this.tareasService.update(id, updateTareaDto);
  }

  @Patch(':id/toggle')
  toggleCompletada(@Param('id', ParseIntPipe) id: number) {
    return this.tareasService.toggleCompletada(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tareasService.remove(id);
  }
}
