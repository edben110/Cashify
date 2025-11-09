'use client';

import { useState } from 'react';
import { 
  transaccionService, 
  CategoriaResponse, 
  TransaccionResponse, 
  TransaccionRequest 
} from '@/lib/api';

interface TransactionManagerProps {
  userId: string;
  categorias: CategoriaResponse[];
  transacciones: TransaccionResponse[];
  onTransactionChange: () => void;
}

export default function TransactionManager({ 
  userId, 
  categorias, 
  transacciones, 
  onTransactionChange 
}: TransactionManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<TransaccionRequest>({
    tipoTransaccion: 'GASTO',
    categoriaId: '',
    descripcion: '',
    fecha: new Date().toISOString().slice(0, 16),
    monto: 0
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'TODOS' | 'INGRESO' | 'GASTO'>('TODOS');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (editingId) {
        await transaccionService.update(editingId, formData);
      } else {
        await transaccionService.create(userId, formData);
      }
      setFormData({
        tipoTransaccion: 'GASTO',
        categoriaId: '',
        descripcion: '',
        fecha: new Date().toISOString().slice(0, 16),
        monto: 0
      });
      setShowForm(false);
      setEditingId(null);
      onTransactionChange();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al guardar transacción');
    }
  };

  const handleEdit = (transaccion: TransaccionResponse) => {
    setFormData({
      tipoTransaccion: transaccion.tipoTransaccion,
      categoriaId: transaccion.categoriaId,
      descripcion: transaccion.descripcion,
      fecha: new Date(transaccion.fecha).toISOString().slice(0, 16),
      monto: transaccion.monto
    });
    setEditingId(transaccion.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta transacción?')) return;

    try {
      await transaccionService.delete(id);
      onTransactionChange();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al eliminar transacción');
    }
  };

  const handleCancel = () => {
    setFormData({
      tipoTransaccion: 'GASTO',
      categoriaId: '',
      descripcion: '',
      fecha: new Date().toISOString().slice(0, 16),
      monto: 0
    });
    setEditingId(null);
    setShowForm(false);
    setError('');
  };

  const filteredTransacciones = filter === 'TODOS' 
    ? transacciones 
    : transacciones.filter(t => t.tipoTransaccion === filter);

  const sortedTransacciones = [...filteredTransacciones].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  return (
    <div>
      <div className="retro-container mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h3 className="retro-subtitle">&gt; Transacciones</h3>
          
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('TODOS')}
              className={`px-4 py-2 text-sm uppercase tracking-wider font-bold transition-all ${
                filter === 'TODOS'
                  ? 'bg-neon-green text-retro-black'
                  : 'bg-retro-black text-neon-green border border-neon-green hover:bg-neon-green/10'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('INGRESO')}
              className={`px-4 py-2 text-sm uppercase tracking-wider font-bold transition-all ${
                filter === 'INGRESO'
                  ? 'bg-neon-green text-retro-black'
                  : 'bg-retro-black text-neon-green border border-neon-green hover:bg-neon-green/10'
              }`}
            >
              ↑ Ingresos
            </button>
            <button
              onClick={() => setFilter('GASTO')}
              className={`px-4 py-2 text-sm uppercase tracking-wider font-bold transition-all ${
                filter === 'GASTO'
                  ? 'bg-neon-green text-retro-black'
                  : 'bg-retro-black text-neon-green border border-neon-green hover:bg-neon-green/10'
              }`}
            >
              ↓ Gastos
            </button>
            
            {!showForm && (
              <button onClick={() => setShowForm(true)} className="retro-button">
                + Nueva
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border-2 border-red-500 text-red-500 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 bg-retro-gray p-4 rounded border border-neon-green/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-neon-green mb-2 uppercase text-xs tracking-wider">
                  Tipo:
                </label>
                <select
                  value={formData.tipoTransaccion}
                  onChange={(e) => setFormData({ ...formData, tipoTransaccion: e.target.value as 'INGRESO' | 'GASTO' })}
                  className="retro-input w-full"
                  required
                >
                  <option value="GASTO">↓ Gasto</option>
                  <option value="INGRESO">↑ Ingreso</option>
                </select>
              </div>

              <div>
                <label className="block text-neon-green mb-2 uppercase text-xs tracking-wider">
                  Categoría:
                </label>
                <select
                  value={formData.categoriaId}
                  onChange={(e) => setFormData({ ...formData, categoriaId: e.target.value })}
                  className="retro-input w-full"
                  required
                >
                  <option value="">Seleccionar...</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neon-green mb-2 uppercase text-xs tracking-wider">
                  Monto:
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.monto}
                  onChange={(e) => setFormData({ ...formData, monto: parseFloat(e.target.value) })}
                  className="retro-input w-full"
                  placeholder="0.00"
                  required
                  min="0.01"
                />
              </div>

              <div>
                <label className="block text-neon-green mb-2 uppercase text-xs tracking-wider">
                  Fecha:
                </label>
                <input
                  type="datetime-local"
                  value={formData.fecha}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  className="retro-input w-full"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-neon-green mb-2 uppercase text-xs tracking-wider">
                  Descripción:
                </label>
                <input
                  type="text"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="retro-input w-full"
                  placeholder="Detalles de la transacción"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="retro-button flex-1">
                {editingId ? 'Actualizar' : 'Crear'}
              </button>
              <button type="button" onClick={handleCancel} className="retro-button-danger flex-1">
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {sortedTransacciones.length === 0 ? (
            <div className="text-center py-12 text-neon-green/50">
              <p className="mb-2">[ No hay transacciones registradas ]</p>
              <p className="text-sm">
                {filter !== 'TODOS' ? 'Cambia el filtro o ' : ''}
                Crea una para empezar
              </p>
            </div>
          ) : (
            sortedTransacciones.map((trans) => (
              <div 
                key={trans.id} 
                className={`retro-card ${
                  trans.tipoTransaccion === 'INGRESO' 
                    ? 'border-green-500 shadow-green-500/20' 
                    : 'border-red-500 shadow-red-500/20'
                }`}
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-2xl ${
                        trans.tipoTransaccion === 'INGRESO' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {trans.tipoTransaccion === 'INGRESO' ? '↑' : '↓'}
                      </span>
                      <div>
                        <h4 className="text-lg font-bold text-neon-green crt-effect">
                          {trans.descripcion}
                        </h4>
                        <p className="text-sm text-neon-green/60">
                          📁 {trans.categoriaNombre}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 text-xs text-neon-green/40">
                      <span>
                        🕐 {new Date(trans.fecha).toLocaleString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end gap-3">
                    <div className={`text-3xl font-bold ${
                      trans.tipoTransaccion === 'INGRESO' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      ${trans.monto.toFixed(2)}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(trans)}
                        className="px-3 py-1 bg-retro-black border border-neon-green text-neon-green text-xs uppercase hover:bg-neon-green hover:text-retro-black transition-all"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(trans.id)}
                        className="px-3 py-1 bg-retro-black border border-red-500 text-red-500 text-xs uppercase hover:bg-red-500 hover:text-retro-black transition-all"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
