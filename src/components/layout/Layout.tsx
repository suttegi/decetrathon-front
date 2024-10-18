import React, { PropsWithChildren } from 'react';
import { usePlayer } from '@/hooks/usePlayer';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { player } = usePlayer();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold text-gray-900">
            Welcome, {player?.first_name || 'Guest'}!
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};