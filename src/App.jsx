import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { Layout } from './layouts/Layout';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { MapaPage } from './pages/MapaPage';
import { HistorialPage } from './pages/HistorialPage';
import { ConfiguracionPage } from './pages/ConfiguracionPage';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Routes>
          {/* Landing page sin layout */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Rutas con layout (Header + Sidebar) */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/mapa" element={<MapaPage />} />
            <Route path="/historial" element={<HistorialPage />} />
            <Route path="/configuracion" element={<ConfiguracionPage />} />
          </Route>

          {/* Redirect para rutas no encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
