import React from 'react';
import type { ReactNode } from 'react';
import Header from '../Header/Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="min-h-screen bg-gray-100 flex flex-col">
    <Header searchTerm="" setSearchTerm={() => {}} /> {/* Controlled by Dashboard */}
    <main className="flex-1 px-6 py-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
      {children}
    </main>
  </div>
);

export default Layout;
