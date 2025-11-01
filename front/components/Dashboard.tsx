'use client';

import { useState, useEffect } from 'react';
import { 
  UserResponse, 
  CategoriaResponse, 
  TransaccionResponse, 
  ResumenGastos,
  categoriaService,
  transaccionService 
} from '@/lib/api';
import CategoryManager from './CategoryManager';
import TransactionManager from './TransactionManager';
import Summary from './Summary';

interface DashboardProps {
  user: UserResponse;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [categorias, setCategorias] = useState<CategoriaResponse[]>([]);
  const [transacciones, setTransacciones] = useState<TransaccionResponse[]>([]);
  const [resumen, setResumen] = useState<ResumenGastos | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'resumen' | 'transacciones' | 'categorias'>('resumen');

  useEffect(() => {
    loadData();
  }, [user.id]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [catRes, transRes, resumenRes] = await Promise.all([
        categoriaService.getByUser(user.id),
        transaccionService.getByUser(user.id),
        transaccionService.getResumen(user.id)
      ]);
      setCategorias(catRes.data);
      setTransacciones(transRes.data);
      setResumen(resumenRes.data);
    } catch (err) {
      console.error('Error al cargar datos:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="retro-container text-center">
        <div className="text-4xl mb-4 animate-pulse">⟳</div>
        <p className="text-neon-green uppercase tracking-wider">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div>
      {/* User Info Header */}
      <div className="retro-container mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-neon-green crt-effect mb-1">
              &gt; @{user.apodo}
            </h2>
            <p className="text-neon-green/60 text-sm">{user.correo}</p>
          </div>
          <button
            onClick={onLogout}
            className="retro-button-danger"
          >
            ← Salir
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <button
          onClick={() => setActiveTab('resumen')}
          className={`retro-button ${activeTab === 'resumen' ? 'retro-button-active' : ''}`}
        >
          📊 Resumen
        </button>
        <button
          onClick={() => setActiveTab('transacciones')}
          className={`retro-button ${activeTab === 'transacciones' ? 'retro-button-active' : ''}`}
        >
          💸 Transacciones
        </button>
        <button
          onClick={() => setActiveTab('categorias')}
          className={`retro-button ${activeTab === 'categorias' ? 'retro-button-active' : ''}`}
        >
          � Categorías
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'resumen' && resumen && (
          <Summary resumen={resumen} transacciones={transacciones} />
        )}
        
        {activeTab === 'transacciones' && (
          <TransactionManager
            userId={user.id}
            categorias={categorias}
            transacciones={transacciones}
            onTransactionChange={loadData}
          />
        )}
        
        {activeTab === 'categorias' && (
          <CategoryManager
            userId={user.id}
            categorias={categorias}
            onCategoryChange={loadData}
          />
        )}
      </div>
    </div>
  );
}
