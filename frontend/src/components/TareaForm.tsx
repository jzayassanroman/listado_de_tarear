import React, { useState } from 'react';

interface TareaFormProps {
  onAgregarTarea: (titulo: string, descripcion: string) => void;
}

export const TareaForm: React.FC<TareaFormProps> = ({ onAgregarTarea }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    setIsSubmitting(true);
    try {
      await onAgregarTarea(titulo.trim(), descripcion.trim());
      setTitulo('');
      setDescripcion('');
    } catch (error) {
      console.error('Error al crear tarea:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-3 mb-3">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Título de la tarea *"
              required
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Descripción (opcional)"
            />
          </div>
          <button
            type="submit"
            disabled={!titulo.trim() || isSubmitting}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
          >
            {isSubmitting ? 'Agregando...' : 'Agregar'}
          </button>
        </div>
      </form>
    </div>
  );
};
