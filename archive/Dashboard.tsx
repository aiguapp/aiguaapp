import { useEffect, useState } from 'react';
import { Droplets, RefreshCw, AlertCircle } from 'lucide-react';
import { WaterPulse } from '../src/components/WaterPulse';
import { AlertsList } from '../src/components/AlertsList';
import { MapView } from './MapView';
import { api } from './api';
import { ConsumptionData, Anomaly, Incident } from './types';

export function Dashboard() {
  const [consumption, setConsumption] = useState<ConsumptionData[]>([]);
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [consumptionData, anomaliesData, incidentsData] = await Promise.all([
        api.getConsumption(),
        api.getAnomalies(),
        api.getLatestIncidents()
      ]);

      setConsumption(consumptionData);
      setAnomalies(anomaliesData);
      setIncidents(incidentsData);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && consumption.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">A carregar dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Droplets className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AquaBeat</h1>
                <p className="text-sm text-gray-600">Monitorização Inteligente de Água</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right text-sm">
                // DEPRECATED: Dashboard.tsx replaced by Dashboard.jsx
                // Original file retained for reference only.
                export default null;
                </p>
