import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Lista de Tareas</h1>
            <p className="text-xs text-gray-600">Organiza tus tareas de manera eficiente</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Conectado</span>
          </div>
        </div>
      </div>
    </header>
  );
};
