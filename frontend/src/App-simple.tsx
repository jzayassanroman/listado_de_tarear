import { useState } from 'react';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
  tipo: string;
  fechaCreacion: string;
}

function App() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('general');
  const [tipoFiltro, setTipoFiltro] = useState('');

  const agregarTarea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    const nuevaTarea: Tarea = {
      id: Date.now(),
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      completada: false,
      tipo: tipo,
      fechaCreacion: new Date().toLocaleString()
    };

    setTareas([nuevaTarea, ...tareas]);
    setTitulo('');
    setDescripcion('');
    setTipo('general');
  };

  const toggleCompletada = (id: number) => {
    setTareas(tareas.map(t => 
      t.id === id ? { ...t, completada: !t.completada } : t
    ));
  };

  const eliminarTarea = (id: number) => {
    setTareas(tareas.filter(t => t.id !== id));
  };

  // Filtrar tareas por tipo
  const tareasFiltradas = tipoFiltro 
    ? tareas.filter(tarea => tarea.tipo === tipoFiltro)
    : tareas;

  // Obtener tipos únicos de las tareas
  const tiposDisponibles = Array.from(new Set(tareas.map(t => t.tipo)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
 
      <main className="container mx-auto px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto h-[calc(100vh-200px)]">
          
          {/* Columna Izquierda - Formulario */}
          <div className="flex flex-col h-full">
            {/* Formulario */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 flex-1">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Crear Tarea</h2>
                  <p className="text-gray-600">Gestión profesional de tareas</p>
                </div>
              </div>
            <form onSubmit={agregarTarea} className="space-y-6">
              <div>
                <label htmlFor="titulo" className="block text-sm font-semibold text-gray-700 mb-3">
                  Título de la Tarea *
                </label>
                <input
                  type="text"
                  id="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-gray-400 transition-all duration-200 text-lg"
                  placeholder="Ingrese el título de la tarea"
                  required
                />
              </div>
              <div>
                <label htmlFor="descripcion" className="block text-sm font-semibold text-gray-700 mb-3">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-gray-400 transition-all duration-200 resize-none text-lg"
                  placeholder="Descripción detallada de la tarea (opcional)"
                />
              </div>
              <div>
                <label htmlFor="tipo" className="block text-sm font-semibold text-gray-700 mb-3">
                  Categoría de la Tarea
                </label>
                <select
                  id="tipo"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-gray-400 transition-all duration-200 text-lg"
                >
                  <option value="general" className="bg-white text-gray-900">📋 General</option>
                  <option value="trabajo" className="bg-white text-gray-900">💼 Trabajo</option>
                  <option value="personal" className="bg-white text-gray-900">🏠 Personal</option>
                  <option value="estudio" className="bg-white text-gray-900">📚 Estudio</option>
                  <option value="salud" className="bg-white text-gray-900">🏥 Salud</option>
                  <option value="hobby" className="bg-white text-gray-900">🎨 Hobby</option>
                  <option value="urgente" className="bg-white text-gray-900">⚠️ Urgente</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-5 px-6 rounded-xl font-bold text-xl hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-200 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
              >
                ➕ Crear Nueva Tarea
              </button>
            </form>
            </div>

            {/* Filtros y estadísticas */}
            {tareas.length > 0 && (
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 mt-6">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Panel de Control</h3>
                </div>
                
                <div className="space-y-6">
                  {/* Estadísticas */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-xl p-6 text-center border-2 border-gray-200">
                      <div className="text-4xl font-bold text-gray-900 mb-2">{tareas.length}</div>
                      <div className="text-gray-600 font-semibold">Total Tareas</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6 text-center border-2 border-gray-200">
                      <div className="text-4xl font-bold text-green-600 mb-2">{tareas.filter(t => t.completada).length}</div>
                      <div className="text-gray-600 font-semibold">Completadas</div>
                    </div>
                  </div>

                  {/* Filtros */}
                  <div>
                    <label htmlFor="filtro-tipo" className="block text-sm font-semibold text-gray-700 mb-3">
                      Filtrar por Categoría:
                    </label>
                    <select
                      id="filtro-tipo"
                      value={tipoFiltro}
                      onChange={(e) => setTipoFiltro(e.target.value)}
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-gray-400 transition-all duration-200 text-lg"
                    >
                      <option value="" className="bg-white text-gray-900">🔍 Todas las categorías</option>
                      {tiposDisponibles.map((tipo) => (
                        <option key={tipo} value={tipo} className="bg-white text-gray-900">
                          {tipo === 'general' && '📋'} {tipo === 'trabajo' && '💼'} {tipo === 'personal' && '🏠'} 
                          {tipo === 'estudio' && '📚'} {tipo === 'salud' && '🏥'} {tipo === 'hobby' && '🎨'} 
                          {tipo === 'urgente' && '⚠️'} {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Columna Derecha - Lista de Tareas */}
          <div className="flex flex-col h-full">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 flex-1 flex flex-col">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Lista de Tareas</h2>
                  <p className="text-gray-600">Gestión profesional y eficiente</p>
                </div>
              </div>

              {tareasFiltradas.length === 0 ? (
                <div className="text-center py-16 flex-1 flex flex-col justify-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {tipoFiltro ? `No hay tareas de tipo "${tipoFiltro}"` : '¡Comienza a organizarte!'}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {tipoFiltro ? 'Intenta cambiar el filtro o agregar una nueva tarea.' : 'Crea tu primera tarea usando el formulario de la izquierda.'}
                  </p>
                </div>
            ) : (
              <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                {tareasFiltradas.map((tarea) => (
                  <div key={tarea.id} className={`bg-gray-50 rounded-xl border-2 border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:border-gray-300 ${
                    tarea.completada ? 'opacity-60 bg-gray-100' : 'hover:bg-white'
                  }`}>
                    <div className="flex items-start space-x-4">
                      <button
                        onClick={() => toggleCompletada(tarea.id)}
                        className={`mt-1 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          tarea.completada 
                            ? 'bg-green-500 border-green-500 text-white shadow-lg' 
                            : 'border-gray-300 hover:border-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        {tarea.completada && (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-xl font-bold ${
                          tarea.completada ? 'text-gray-500 line-through' : 'text-gray-900'
                        }`}>
                          {tarea.titulo}
                        </h4>
                        
                        {tarea.descripcion && (
                          <p className={`mt-2 text-gray-600 ${
                            tarea.completada ? 'text-gray-400' : ''
                          }`}>
                            {tarea.descripcion}
                          </p>
                        )}
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                              tarea.tipo === 'urgente' ? 'bg-red-100 text-red-800 border border-red-200' :
                              tarea.tipo === 'trabajo' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                              tarea.tipo === 'personal' ? 'bg-green-100 text-green-800 border border-green-200' :
                              tarea.tipo === 'estudio' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                              tarea.tipo === 'salud' ? 'bg-pink-100 text-pink-800 border border-pink-200' :
                              tarea.tipo === 'hobby' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                              'bg-gray-100 text-gray-800 border border-gray-200'
                            }`}>
                              {tarea.tipo === 'general' && '📋'} {tarea.tipo === 'trabajo' && '💼'} {tarea.tipo === 'personal' && '🏠'} 
                              {tarea.tipo === 'estudio' && '📚'} {tarea.tipo === 'salud' && '🏥'} {tarea.tipo === 'hobby' && '🎨'} 
                              {tarea.tipo === 'urgente' && '⚠️'} {tarea.tipo.charAt(0).toUpperCase() + tarea.tipo.slice(1)}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => eliminarTarea(tarea.id)}
                            className="text-red-500 hover:text-red-700 transition-colors p-3 hover:bg-red-50 rounded-lg"
                            title="Eliminar tarea"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="mt-3 text-sm text-gray-500">
                          {tarea.fechaCreacion}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
