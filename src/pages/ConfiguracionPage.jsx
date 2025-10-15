import { Settings, Save } from 'lucide-react';
import { useState } from 'react';

export function ConfiguracionPage() {
  const [config, setConfig] = useState({
    threshold: 15,
    criticalHoursStart: '00:00',
    criticalHoursEnd: '06:00',
    notifications: true,
    darkMode: false
  });

  const handleSave = () => {
    localStorage.setItem('aiguaapp-config', JSON.stringify(config));
    alert('Configuració guardada correctament');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Settings className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Configuració</h1>
            <p className="text-gray-600 mt-1">Personalitza els paràmetres de l'aplicació</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Umbral */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Llindar d'Anomalia (%)
          </label>
          <input
            type="range"
            min="5"
            max="30"
            value={config.threshold}
            onChange={(e) => setConfig({ ...config, threshold: parseInt(e.target.value) })}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>5%</span>
            <span className="font-semibold text-blue-600">{config.threshold}%</span>
            <span>30%</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Desviacions superiors a aquest percentatge es consideraran anomalies
          </p>
        </div>

        {/* Horarios críticos */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Horaris Crítics
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Inici</label>
              <input
                type="time"
                value={config.criticalHoursStart}
                onChange={(e) => setConfig({ ...config, criticalHoursStart: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Fi</label>
              <input
                type="time"
                value={config.criticalHoursEnd}
                onChange={(e) => setConfig({ ...config, criticalHoursEnd: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Període de temps amb monitorització prioritària
          </p>
        </div>

        {/* Notificaciones */}
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notificacions
            </label>
            <p className="text-sm text-gray-500">
              Rebre alertes quan es detectin anomalies
            </p>
          </div>
          <button
            onClick={() => setConfig({ ...config, notifications: !config.notifications })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              config.notifications ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                config.notifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Modo oscuro */}
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mode Fosc
            </label>
            <p className="text-sm text-gray-500">
              Canviar a tema fosc (proper)
            </p>
          </div>
          <button
            onClick={() => setConfig({ ...config, darkMode: !config.darkMode })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              config.darkMode ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                config.darkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Botón guardar */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            Guardar Configuració
          </button>
        </div>
      </div>
    </div>
  );
}
