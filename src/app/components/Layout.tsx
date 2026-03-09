import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { Toaster } from 'sonner';

export function Layout() {
  return (
    <div className="min-h-screen flex">
      {/* Desktop/Tablet Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Toast Notifications */}
      <Toaster position="top-right" richColors />
    </div>
  );
}