import { AlertTriangle, Droplets, TrendingDown } from 'lucide-react';

export function AlertsList({ anomalies }) {
  const getIcon = (type) => {
    switch (type) {
      case 'spike':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'leak':
        return <Droplets className="w-5 h-5 text-red-500" />;
      case 'drop':
        return <TrendingDown className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'medium':
        return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'low':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'spike':
        return 'Pic de Consum';
      case 'leak':
        return 'Possible Escapada';
      case 'drop':
        return 'Caiguda Abrupta';
      default:
        return 'Anomalia';
    }
  };

  // Función para formatear la desviación (puede venir como string "+18" o número 18)
  const formatDeviation = (deviation) => {
    if (typeof deviation === 'string') {
      return deviation; // Ya viene con signo
    }
    return deviation > 0 ? `+${deviation}` : `${deviation}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Alertes Recents</h2>

      {anomalies.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Droplets className="w-12 h-12 mx-auto mb-2 opacity-30" />
          <p>No s'han detectat anomalies</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {anomalies.map((anomaly) => (
            <div
              key={anomaly.id}
              className={`border-2 rounded-lg p-4 transition-all hover:shadow-md ${getSeverityColor(anomaly.severity)}`}
            >
              <div className="flex items-start gap-3">
                {getIcon(anomaly.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">{anomaly.neighborhood}</h3>
                    <span className="text-xs font-medium uppercase px-2 py-1 rounded-full bg-white bg-opacity-50">
                      {anomaly.severity}
                    </span>
                  </div>
                  <p className="text-sm mb-2 font-medium">{getTypeLabel(anomaly.type)}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">💧 {anomaly.liters}L</span>
                    <span className={`font-bold ${
                      (typeof anomaly.deviation === 'string' && anomaly.deviation.startsWith('+')) || 
                      (typeof anomaly.deviation === 'number' && anomaly.deviation > 0)
                        ? 'text-red-700' 
                        : 'text-green-700'
                    }`}>
                      📊 {formatDeviation(anomaly.deviation)}%
                    </span>
                  </div>
                  <p className="text-xs mt-2 opacity-75">
                    🕒 {new Date(anomaly.timestamp).toLocaleString('ca-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
