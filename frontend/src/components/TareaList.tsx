import React from 'react';
import { Tarea } from '../types/Tarea';
import { TareaItem } from './TareaItem';

interface TareaListProps {
  tareas: Tarea[];
  onToggleCompletada: (id: number) => void;
  onEliminarTarea: (id: number) => void;
}

export const TareaList: React.FC<TareaListProps> = ({ 
  tareas, 
  onToggleCompletada, 
  onEliminarTarea 
}) => {
  const tareasPendientes = tareas.filter(t => !t.completada);
  const tareasCompletadas = tareas.filter(t => t.completada);

  if (tareas.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay tareas</h3>
        <p className="text-gray-500">Comienza agregando tu primera tarea arriba.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4">
        {tareasPendientes.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2 sticky top-0 bg-gray-50 py-2 border-b">
              Tareas Pendientes ({tareasPendientes.length})
            </h3>
            <div className="space-y-2">
              {tareasPendientes.map((tarea) => (
                <TareaItem
                  key={tarea.id}
                  tarea={tarea}
                  onToggleCompletada={onToggleCompletada}
                  onEliminarTarea={onEliminarTarea}
                />
              ))}
            </div>
          </div>
        )}

        {tareasCompletadas.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2 sticky top-0 bg-gray-50 py-2 border-b">
              Tareas Completadas ({tareasCompletadas.length})
            </h3>
            <div className="space-y-2">
              {tareasCompletadas.map((tarea) => (
                <TareaItem
                  key={tarea.id}
                  tarea={tarea}
                  onToggleCompletada={onToggleCompletada}
                  onEliminarTarea={onEliminarTarea}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
