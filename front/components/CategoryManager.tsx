'use client';

import { useState } from 'react';
import { categoriaService, CategoriaResponse, CategoriaRequest } from '@/lib/api';

interface CategoryManagerProps {
  userId: string;
  categorias: CategoriaResponse[];
  onCategoryChange: () => void;
}

export default function CategoryManager({ userId, categorias, onCategoryChange }: CategoryManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CategoriaRequest>({ nombre: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (editingId) {
        await categoriaService.update(editingId, formData);
      } else {
        await categoriaService.create(userId, formData);
      }
      setFormData({ nombre: '' });
      setShowForm(false);
      setEditingId(null);
      onCategoryChange();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al guardar categoría');
    }
  };

  const handleEdit = (categoria: CategoriaResponse) => {
    setFormData({ nombre: categoria.nombre });
    setEditingId(categoria.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta categoría?')) return;

    try {
      await categoriaService.delete(id);
      onCategoryChange();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al eliminar categoría');
    }
  };

  const handleCancel = () => {
    setFormData({ nombre: '' });
    setEditingId(null);
    setShowForm(false);
    setError('');
  };

  return (
    <div>
      <div className="retro-container mb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="retro-subtitle">&gt; Categorías</h3>
          {!showForm && (
            <button onClick={() => setShowForm(true)} className="retro-button">
              + Nueva
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-900/20 border-2 border-red-500 text-red-500 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 bg-retro-gray p-4 rounded border border-neon-green/30">
            <div className="flex gap-4">
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ nombre: e.target.value })}
                className="retro-input flex-1"
                placeholder="Nombre de la categoría"
                required
                minLength={2}
              />
              <button type="submit" className="retro-button">
                {editingId ? 'Actualizar' : 'Crear'}
              </button>
              <button type="button" onClick={handleCancel} className="retro-button-danger">
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categorias.length === 0 ? (
            <div className="col-span-full text-center py-8 text-neon-green/50">
              <p>[ No hay categorías creadas ]</p>
              <p className="text-sm mt-2">Crea una para empezar</p>
            </div>
          ) : (
            categorias.map((cat) => (
              <div key={cat.id} className="retro-card">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg font-bold text-neon-green crt-effect">
                    📁 {cat.nombre}
                  </h4>
                </div>
                <div className="text-xs text-neon-green/40 mb-3">
                  ID: {cat.id.slice(0, 8)}...
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="flex-1 px-3 py-1 bg-retro-black border border-neon-green text-neon-green text-sm uppercase hover:bg-neon-green hover:text-retro-black transition-all"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="flex-1 px-3 py-1 bg-retro-black border border-red-500 text-red-500 text-sm uppercase hover:bg-red-500 hover:text-retro-black transition-all"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
