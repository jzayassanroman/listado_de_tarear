import { useState, useEffect } from 'react';
import { Tarea } from './types/Tarea';
import { TareaService } from './services/TareaService';
import { TareaForm } from './components/TareaForm';
import { TareaList } from './components/TareaList';
// import { FiltrosTareas } from './components/FiltrosTareas';
import { PanelControl } from './components/PanelControl';

function App() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  // const [tipos, setTipos] = useState<string[]>([]);
  // const [tipoFiltro, setTipoFiltro] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarTareas();
    // cargarTipos();
  }, []);

  const cargarTareas = async () => {
    try {
      const tareasData = await TareaService.obtenerTodas();
      setTareas(tareasData);
      console.log('✅ Tareas cargadas desde la base de datos:', tareasData.length);
    } catch (error) {
      console.error('❌ Error al cargar tareas:', error);
      // En caso de error, mostrar tareas vacías
      setTareas([]);
    } finally {
      setLoading(false);
    }
  };

  // const cargarTipos = async () => {
  //   try {
  //     const tiposData = await TareaService.obtenerTipos();
  //     setTipos(tiposData);
  //   } catch (error) {
  //     console.error('Error al cargar tipos:', error);
  //   }
  // };

  const agregarTarea = async (titulo: string, descripcion: string) => {
    try {
      console.log('🔄 Creando tarea:', { titulo, descripcion });
      const nuevaTarea = await TareaService.crear({ titulo, descripcion });
      console.log('✅ Tarea guardada en la base de datos:', nuevaTarea);
      setTareas([nuevaTarea, ...tareas]);
      console.log('📋 Lista de tareas actualizada');
    } catch (error: any) {
      console.error('❌ Error al crear tarea:', error);
      console.error('❌ Error response:', error.response?.data);
      console.error('❌ Error status:', error.response?.status);
      console.error('❌ Error message:', error.message);
      
      const errorMessage = error.response?.data?.message || error.message || 'Error desconocido';
      alert(`Error al crear la tarea: ${errorMessage}`);
    }
  };

  const toggleCompletada = async (id: number) => {
    try {
      const tareaActualizada = await TareaService.toggleCompletada(id);
      setTareas(tareas.map(t => t.id === id ? tareaActualizada : t));
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  const eliminarTarea = async (id: number) => {
    try {
      await TareaService.eliminar(id);
      setTareas(tareas.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  // const handleTipoFiltroChange = (tipo: string) => {
  //   setTipoFiltro(tipo);
  // };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando tareas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50">
      <main className="h-full container mx-auto px-4 py-3 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex flex-col lg:flex-row gap-4">
          {/* Columna izquierda - Lista de tareas */}
          <div className="flex-1 flex flex-col min-w-0">
            <TareaForm onAgregarTarea={agregarTarea} />
            <div className="flex-1 overflow-hidden">
              <TareaList 
                tareas={tareas}
                onToggleCompletada={toggleCompletada}
                onEliminarTarea={eliminarTarea}
              />
            </div>
          </div>
          
          {/* Columna derecha - Panel de control */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <PanelControl tareas={tareas} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
