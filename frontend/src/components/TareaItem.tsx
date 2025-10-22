import React from 'react';
import { Tarea } from '../types/Tarea';

interface TareaItemProps {
  tarea: Tarea;
  onToggleCompletada: (id: number) => void;
  onEliminarTarea: (id: number) => void;
}

export const TareaItem: React.FC<TareaItemProps> = ({ 
  tarea, 
  onToggleCompletada, 
  onEliminarTarea 
}) => {
  const handleToggle = async () => {
    await onToggleCompletada(tarea.id);
  };

  const handleEliminar = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      await onEliminarTarea(tarea.id);
    }
  };

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-white rounded-lg border p-4 transition-all duration-200 hover:shadow-md ${
      tarea.completada ? 'opacity-75 border-green-200 bg-green-50' : 'border-gray-200'
    }`}>
      <div className="flex items-start space-x-3">
        <button
          onClick={handleToggle}
          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            tarea.completada 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-primary-500'
          }`}
        >
          {tarea.completada && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <h4 className={`text-lg font-medium ${
            tarea.completada ? 'text-gray-500 line-through' : 'text-gray-900'
          }`}>
            {tarea.titulo}
          </h4>
          
          {tarea.descripcion && (
            <p className={`mt-1 text-sm ${
              tarea.completada ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {tarea.descripcion}
            </p>
          )}
          
          <div className="mt-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              tarea.tipo === 'urgente' ? 'bg-red-100 text-red-800' :
              tarea.tipo === 'trabajo' ? 'bg-blue-100 text-blue-800' :
              tarea.tipo === 'personal' ? 'bg-green-100 text-green-800' :
              tarea.tipo === 'estudio' ? 'bg-purple-100 text-purple-800' :
              tarea.tipo === 'salud' ? 'bg-pink-100 text-pink-800' :
              tarea.tipo === 'hobby' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {tarea.tipo.charAt(0).toUpperCase() + tarea.tipo.slice(1)}
            </span>
          </div>
          
          <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
            <span>Creada: {formatFecha(tarea.fechaCreacion)}</span>
            {tarea.completada && (
              <span className="text-green-600 font-medium">
                ✓ Completada: {formatFecha(tarea.fechaActualizacion)}
              </span>
            )}
          </div>
        </div>
        
        <button
          onClick={handleEliminar}
          className="text-red-400 hover:text-red-600 transition-colors p-1"
          title="Eliminar tarea"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};
