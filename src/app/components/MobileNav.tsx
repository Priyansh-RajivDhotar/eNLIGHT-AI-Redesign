import { Link, useLocation } from 'react-router';
import { Home, MessageSquare, BarChart3, Bell, Clock } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/chat', icon: MessageSquare, label: 'Chat' },
  { path: '/discover', icon: BarChart3, label: 'Discover' },
  { path: '/alerts', icon: Bell, label: 'Alerts' },
  { path: '/history', icon: Clock, label: 'History' },
];

export function MobileNav() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-card border-t border-border z-50"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-150
                ${active 
                  ? 'text-gradient-primary-mid' 
                  : 'text-text-secondary'
                }
              `}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
