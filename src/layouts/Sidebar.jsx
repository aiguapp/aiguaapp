import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, History, Settings, Home } from 'lucide-react';

export function Sidebar() {
  const navItems = [
    { to: '/', icon: Home, label: 'Inicio' },
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/mapa', icon: Map, label: 'Mapa' },
    { to: '/historial', icon: History, label: 'Historial' },
    { to: '/configuracion', icon: Settings, label: 'Configuración' }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-73px)] sticky top-[73px] hidden lg:block">
      <nav className="p-4 space-y-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
