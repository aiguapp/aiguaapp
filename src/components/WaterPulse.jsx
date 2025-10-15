import { useState } from 'react';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';

export function WaterPulse({ data }) {
  const [viewMode, setViewMode] = useState('by-neighborhood'); // 'by-neighborhood' o 'timeline'

  // Agrupar datos por barrio
  const dataByNeighborhood = data.reduce((acc, item) => {
    if (!acc[item.neighborhood]) {
      acc[item.neighborhood] = {
        neighborhood: item.neighborhood,
        totalLiters: 0,
        count: 0,
        readings: []
      };
    }
    acc[item.neighborhood].totalLiters += item.liters;
    acc[item.neighborhood].count += 1;
    acc[item.neighborhood].readings.push(item);
    return acc;
  }, {});

  const neighborhoodStats = Object.values(dataByNeighborhood).map(stat => ({
    ...stat,
    avgLiters: stat.totalLiters / stat.count,
    maxLiters: Math.max(...stat.readings.map(r => r.liters)),
    minLiters: Math.min(...stat.readings.map(r => r.liters))
  })).sort((a, b) => b.avgLiters - a.avgLiters);

  const overallMax = Math.max(...neighborhoodStats.map(s => s.avgLiters), 1);
  const overallAvg = neighborhoodStats.reduce((sum, s) => sum + s.avgLiters, 0) / neighborhoodStats.length || 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Consum per Barri</h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('by-neighborhood')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'by-neighborhood'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Per Barri
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'timeline'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Línia Temporal
          </button>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Barris Totals</p>
          <p className="text-2xl font-bold text-blue-600">{neighborhoodStats.length}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Consum Mitjà</p>
          <p className="text-2xl font-bold text-blue-600">{overallAvg.toFixed(0)}L</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Lectures Totals</p>
          <p className="text-2xl font-bold text-blue-600">{data.length}</p>
        </div>
      </div>

      {viewMode === 'by-neighborhood' ? (
        <div className="space-y-3">
          {neighborhoodStats.map((stat, idx) => {
            const percentage = (stat.avgLiters / overallMax) * 100;
            const isHigh = stat.avgLiters > overallAvg * 1.2;
            const isLow = stat.avgLiters < overallAvg * 0.8;

            return (
              <div key={idx} className="group">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">{stat.neighborhood}</span>
                    {isHigh && <TrendingUp className="w-4 h-4 text-red-500" />}
                    {isLow && <TrendingDown className="w-4 h-4 text-green-500" />}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-600">{stat.count} lectures</span>
                    <span className="font-bold text-gray-900">{stat.avgLiters.toFixed(1)}L</span>
                  </div>
                </div>
                
                <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full rounded-full transition-all ${
                      isHigh ? 'bg-red-500' : isLow ? 'bg-green-500' : 'bg-blue-500'
                    } group-hover:opacity-80`}
                    style={{ width: `${percentage}%` }}
                  />
                  <div className="absolute inset-0 flex items-center px-3 text-xs text-gray-600">
                    <span className="relative z-10 mix-blend-difference text-white font-medium">
                      Rang: {stat.minLiters.toFixed(0)}L - {stat.maxLiters.toFixed(0)}L
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="h-64 flex items-end gap-1 overflow-x-auto">
          {data.slice(-50).map((point, idx) => {
            const height = (point.liters / Math.max(...data.map(d => d.liters), 1)) * 100;
            const isAnomaly = point.liters > overallAvg * 1.3 || point.liters < overallAvg * 0.5;

            return (
              <div
                key={idx}
                className="flex-1 min-w-[8px] relative group cursor-pointer"
                style={{ height: '100%' }}
              >
                <div
                  className={`absolute bottom-0 w-full rounded-t transition-all ${
                    isAnomaly ? 'bg-red-500' : 'bg-blue-500'
                  } hover:opacity-80`}
                  style={{ height: `${height}%` }}
                />

                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  <p className="font-semibold">{point.neighborhood}</p>
                  <p>{point.liters}L</p>
                  <p className="text-gray-300">{new Date(point.timestamp).toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4 flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-gray-600">Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-gray-600">Consum Alt</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-gray-600">Consum Baix</span>
        </div>
      </div>
    </div>
  );
}
