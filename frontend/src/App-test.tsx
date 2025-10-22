import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando aplicación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              🎉 ¡Aplicación funcionando correctamente!
            </h1>
            <p className="text-gray-600 mb-4">
              Si puedes ver este mensaje, significa que React y Vite están funcionando correctamente.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <p className="text-green-800">
                ✅ Frontend: Funcionando en puerto 5173<br/>
                ✅ Backend: Debería estar en puerto 3000<br/>
                ✅ Tailwind CSS: Cargado correctamente
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

