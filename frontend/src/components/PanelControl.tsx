import React from 'react';
import { Tarea } from '../types/Tarea';

interface PanelControlProps {
  tareas: Tarea[];
}

export const PanelControl: React.FC<PanelControlProps> = ({ tareas }) => {
  const totalTareas = tareas.length;
  const tareasCompletadas = tareas.filter(t => t.completada).length;
  const tareasPendientes = totalTareas - tareasCompletadas;
  const porcentajeCompletado = totalTareas > 0 ? Math.round((tareasCompletadas / totalTareas) * 100) : 0;

  // Calcular estadísticas adicionales
  const tareasRecientes = tareas
    .sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime())
    .slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Panel de Control</h3>
      
      {/* Estadísticas principales */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-3">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="text-xl lg:text-2xl font-bold text-blue-600">{totalTareas}</div>
            <div className="text-xs text-blue-700">Total</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg text-center">
            <div className="text-xl lg:text-2xl font-bold text-orange-600">{tareasPendientes}</div>
            <div className="text-xs text-orange-700">Pendientes</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className="text-xl lg:text-2xl font-bold text-green-600">{tareasCompletadas}</div>
            <div className="text-xs text-green-700">Completadas</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <div className="text-xl lg:text-2xl font-bold text-purple-600">{porcentajeCompletado}%</div>
            <div className="text-xs text-purple-700">Progreso</div>
          </div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progreso General</span>
          <span>{porcentajeCompletado}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${porcentajeCompletado}%` }}
          ></div>
        </div>
      </div>

      {/* Tareas recientes */}
      {tareasRecientes.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Tareas Recientes</h4>
          <div className="space-y-2">
            {tareasRecientes.map((tarea) => (
              <div key={tarea.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${tarea.completada ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">{tarea.titulo}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(tarea.fechaCreacion).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estado del sistema */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Estado del Sistema</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-600 font-medium">Activo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
