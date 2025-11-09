'use client';

import { useState } from 'react';
import { userService, UserResponse, UserRequest } from '@/lib/api';

interface UserSelectorProps {
  onUserSelect: (user: UserResponse) => void;
}

export default function UserSelector({ onUserSelect }: UserSelectorProps) {
  const [formData, setFormData] = useState<UserRequest>({
    apodo: '',
    correo: '',
    contrasenia: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Validaciones HU001
  const validateForm = (): string | null => {
    if (!formData.apodo.trim()) {
      return 'El apodo es obligatorio';
    }
    
    if (formData.apodo.length < 3) {
      return 'El apodo debe tener al menos 3 caracteres';
    }
    
    if (formData.apodo.length > 50) {
      return 'El apodo no debe superar los 50 caracteres';
    }
    
    if (!formData.correo.trim()) {
      return 'El correo electrónico es obligatorio';
    }
    
    if (formData.correo.length > 50) {
      return 'El correo electrónico no debe superar los 50 caracteres';
    }
    
    // Validación básica de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      return 'Ingrese un correo electrónico válido';
    }
    
    if (!formData.contrasenia) {
      return 'La contraseña es obligatoria';
    }
    
    if (formData.contrasenia.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (formData.contrasenia.length > 20) {
      return 'La contraseña no debe superar los 20 caracteres';
    }
    
    return null;
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validar formulario
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setLoading(true);
    
    try {
      console.log('👤 Intentando crear usuario:', { 
        apodo: formData.apodo, 
        correo: formData.correo,
        contrasenia: '***' 
      });
      const response = await userService.create(formData);
      console.log('✅ Usuario creado exitosamente:', response.data);
      onUserSelect(response.data);
    } catch (err: any) {
      console.error('❌ Error al crear usuario:', err.response?.data || err.message);
      if (err.response?.status === 409) {
        setError('El apodo o correo electrónico ya está registrado');
      } else if (err.response?.data?.mensaje) {
        setError(err.response.data.mensaje);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Error al crear la cuenta. Intente nuevamente');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="retro-container max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-neon-green text-center mb-2 crt-effect">
        &gt; CREAR CUENTA &lt;
      </h2>

      <form onSubmit={handleCreateUser} className="space-y-4">
        {/* Campo de Apodo */}
        <div>
          <label className="block text-neon-green mb-2 uppercase tracking-wider text-sm">
            Apodo *
          </label>
          <input
            type="text"
            value={formData.apodo}
            onChange={(e) => setFormData({ ...formData, apodo: e.target.value })}
            className="retro-input w-full"
            placeholder="tu_apodo"
            maxLength={50}
            disabled={loading}
          />
          <p className="text-neon-green/50 text-xs mt-1">
            Entre 3 y 50 caracteres
          </p>
        </div>

        {/* Campo de Correo Electrónico */}
        <div>
          <label className="block text-neon-green mb-2 uppercase tracking-wider text-sm">
            Correo Electrónico *
          </label>
          <input
            type="email"
            value={formData.correo}
            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
            className="retro-input w-full"
            placeholder="usuario@ejemplo.com"
            maxLength={50}
            disabled={loading}
          />
          <p className="text-neon-green/50 text-xs mt-1">
            Máximo 50 caracteres
          </p>
        </div>

        {/* Campo de Contraseña */}
        <div>
          <label className="block text-neon-green mb-2 uppercase tracking-wider text-sm">
            Contraseña *
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.contrasenia}
              onChange={(e) => setFormData({ ...formData, contrasenia: e.target.value })}
              className="retro-input w-full pr-12"
              placeholder="••••••••"
              minLength={6}
              maxLength={20}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neon-green hover:text-neon-green/70 transition-colors"
              disabled={loading}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          <p className="text-neon-green/50 text-xs mt-1">
            Entre 6 y 20 caracteres
          </p>
        </div>

        {/* Mensaje de Error */}
        {error && (
          <div className="bg-red-900/30 border-2 border-red-500 rounded p-3 text-red-500 text-sm">
            <span className="font-bold">⚠️ ERROR:</span> {error}
          </div>
        )}

        {/* Botón de Crear Cuenta */}
        <button
          type="submit"
          disabled={loading}
          className={`retro-button w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? '⟳ Creando cuenta...' : '→ Crear Cuenta'}
        </button>
      </form>
    </div>
  );
}
