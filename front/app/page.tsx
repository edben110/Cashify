'use client';

import { useState } from 'react';
import { UserResponse } from '@/lib/api';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/Login';
import UserSelector from '@/components/UserSelector';

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main className="min-h-screen bg-retro-black overflow-y-auto">
      {/* Header */}
      <header className="border-b-2 border-neon-green py-6 px-4">
        <div className="container mx-auto">
          <h1 className="retro-title text-center crt-effect animate-flicker" data-text="CA$HIFY">
            CA$HIFY
          </h1>
          <p className="text-center text-neon-green/70 mt-2 uppercase tracking-widest text-sm">
            &gt; Sistema de Control de Gastos v1.0 &lt;
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 pb-24">
        {!selectedUser ? (
          showLogin ? (
            <Login 
              onLoginSuccess={setSelectedUser} 
              onSwitchToRegister={() => setShowLogin(false)}
            />
          ) : (
            <div>
              <UserSelector onUserSelect={setSelectedUser} />
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowLogin(true)}
                  className="text-neon-green hover:text-neon-green/80 underline uppercase tracking-wider text-sm font-bold"
                >
                  &lt; Volver a Iniciar Sesión
                </button>
              </div>
            </div>
          )
        ) : (
          <Dashboard user={selectedUser} onLogout={() => setSelectedUser(null)} />
        )}
      </div>

      <footer className="border-t-2 border-neon-green mt-16 py-4 px-4">
        <div className="container mx-auto text-center text-neon-green/50 text-sm uppercase tracking-wider">
          <p>&gt; Powered by Next.js & Spring Boot &lt;</p>
          <p className="mt-1">[ 2025 - Retro Terminal Edition ]</p>
        </div>
      </footer>
    </main>
  );
}
