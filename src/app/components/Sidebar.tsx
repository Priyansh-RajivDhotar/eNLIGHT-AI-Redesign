import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Home, MessageSquare, BarChart3, Bell, Clock, Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'motion/react';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/chat', icon: MessageSquare, label: 'Chat' },
  { path: '/discover', icon: BarChart3, label: 'Discover' },
  { path: '/alerts', icon: Bell, label: 'Alerts' },
  { path: '/history', icon: Clock, label: 'History' },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 260 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="hidden md:flex flex-col h-screen sticky top-0 p-4 glass-card border-r border-border"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8 px-2">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-white font-semibold">eN</span>
              </div>
              <span className="font-semibold text-[17px]">eNLIGht</span>
            </motion.div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-card-elevated rounded-lg transition-all duration-150"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative flex items-center gap-3 px-3 py-2.5 rounded-[14px] transition-all duration-150
                  ${active 
                    ? 'text-white' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-card-elevated'
                  }
                `}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-pill"
                    className="absolute inset-0 gradient-primary rounded-[14px]"
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    style={{
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                    }}
                  />
                )}
                <Icon size={20} className="relative z-10 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="relative z-10 font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="space-y-3 pt-3 border-t border-border">
          {/* Agent Status */}
          <div className={`flex items-center gap-3 px-3 py-2 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-success animate-ping" />
            </div>
            {!isCollapsed && (
              <span className="text-sm text-text-secondary">Agent Active</span>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`
              flex items-center gap-3 w-full px-3 py-2.5 rounded-[14px] 
              text-text-secondary hover:text-text-primary hover:bg-card-elevated 
              transition-all duration-150
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            </motion.div>
            {!isCollapsed && (
              <span className="font-medium">{theme === 'dark' ? 'Dark' : 'Light'}</span>
            )}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
