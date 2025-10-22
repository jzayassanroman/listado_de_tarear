import React from 'react';

interface FiltrosTareasProps {
  tipos: string[];
  tipoSeleccionado: string;
  onTipoChange: (tipo: string) => void;
  totalTareas: number;
  tareasCompletadas: number;
}

export const FiltrosTareas: React.FC<FiltrosTareasProps> = ({
  tipos,
  tipoSeleccionado,
  onTipoChange,
  totalTareas,
  tareasCompletadas
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Estadísticas */}
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{totalTareas}</span> tareas total
          </div>
          <div className="text-sm text-green-600">
            <span className="font-medium">{tareasCompletadas}</span> completadas
          </div>
        </div>

        {/* Filtros */}
        <div className="flex items-center space-x-3">
          <label htmlFor="filtro-tipo" className="text-sm font-medium text-gray-700">
            Filtrar por tipo:
          </label>
          <select
            id="filtro-tipo"
            value={tipoSeleccionado}
            onChange={(e) => onTipoChange(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Todos los tipos</option>
            {tipos.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

