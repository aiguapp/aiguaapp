import { Droplets, RefreshCw } from 'lucide-react';
import { useData } from '../context/DataContext';

export function Header() {
  const { loading, lastUpdate, refreshData } = useData();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Droplets className="w-8 h-8 text-sky-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AiguaApp</h1>
              <p className="text-sm text-gray-600">Monitorització Intel·ligent de l'Aigua</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right text-sm hidden sm:block">
              <p className="text-gray-600">Última actualització</p>
              <p className="font-medium text-gray-900">
                {lastUpdate.toLocaleTimeString('ca-ES')}
              </p>
            </div>
            <button
              onClick={refreshData}
              disabled={loading}
              className="p-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              title="Actualizar datos"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
