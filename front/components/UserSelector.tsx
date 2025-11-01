'use client';

import { useState, useEffect } from 'react';
import { userService, UserResponse, UserRequest } from '@/lib/api';

interface UserSelectorProps {
  onUserSelect: (user: UserResponse) => void;
}

export default function UserSelector({ onUserSelect }: UserSelectorProps) {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<UserRequest>({
    apodo: '',
    correo: '',
    contraseña: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      setUsers(response.data);
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await userService.create(formData);
      onUserSelect(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear usuario');
    }
  };

  if (loading) {
    return (
      <div className="retro-container max-w-2xl mx-auto text-center">
        <div className="text-4xl mb-4 animate-pulse">⟳</div>
        <p className="text-neon-green uppercase tracking-wider">Cargando sistema...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="retro-container mb-8">
        <h2 className="retro-subtitle mb-6 text-center">
          &gt; Seleccionar Usuario &lt;
        </h2>

        {error && (
          <div className="bg-red-900/20 border-2 border-red-500 text-red-500 px-4 py-3 rounded mb-4">
            <p className="font-bold">ERROR:</p>
            <p>{error}</p>
          </div>
        )}

        {!showCreateForm ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {users.length === 0 ? (
                <div className="col-span-2 text-center py-8 text-neon-green/50">
                  <p className="mb-4">[ No hay usuarios registrados ]</p>
                </div>
              ) : (
                users.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => onUserSelect(user)}
                    className="retro-card text-left hover:scale-105 transition-transform"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl font-bold text-neon-green crt-effect">
                        @{user.apodo}
                      </span>
                      <span className="text-neon-green/50 text-sm">ID: {user.id.slice(0, 8)}</span>
                    </div>
                    <p className="text-neon-green/70 text-sm mb-2">{user.correo}</p>
                    <div className="flex gap-4 text-xs">
                      <span className="text-neon-green/60">
                        ₿ {user.totalTransacciones} transacciones
                      </span>
                      <span className="text-neon-green/60">
                        📁 {user.totalCategorias} categorías
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowCreateForm(true)}
                className="retro-button"
              >
                + Crear Nuevo Usuario
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <label className="block text-neon-green mb-2 uppercase text-sm tracking-wider">
                &gt; Apodo:
              </label>
              <input
                type="text"
                value={formData.apodo}
                onChange={(e) => setFormData({ ...formData, apodo: e.target.value })}
                className="retro-input w-full"
                placeholder="tu_apodo"
                required
                minLength={3}
              />
            </div>

            <div>
              <label className="block text-neon-green mb-2 uppercase text-sm tracking-wider">
                &gt; Correo:
              </label>
              <input
                type="email"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                className="retro-input w-full"
                placeholder="email@ejemplo.com"
                required
              />
            </div>

            <div>
              <label className="block text-neon-green mb-2 uppercase text-sm tracking-wider">
                &gt; Contraseña:
              </label>
              <input
                type="password"
                value={formData.contraseña}
                onChange={(e) => setFormData({ ...formData, contraseña: e.target.value })}
                className="retro-input w-full"
                placeholder="••••••"
                required
                minLength={6}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button type="submit" className="retro-button flex-1">
                Crear Usuario
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setError('');
                  setFormData({ apodo: '', correo: '', contraseña: '' });
                }}
                className="retro-button-danger flex-1"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
