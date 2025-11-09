'use client';

import { useState } from 'react';
import { userService, LoginRequest, UserResponse } from '@/lib/api';

interface LoginProps {
  onLoginSuccess: (user: UserResponse) => void;
  onSwitchToRegister: () => void;
}

export default function Login({ onLoginSuccess, onSwitchToRegister }: LoginProps) {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Validaciones HU002
  const validateForm = (): string | null => {
    if (!correo.trim()) {
      return 'El correo electrónico es obligatorio';
    }
    
    if (correo.length > 50) {
      return 'El correo electrónico no debe superar los 50 caracteres';
    }
    
    // Validación básica de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return 'Ingrese un correo electrónico válido';
    }
    
    if (!contrasenia) {
      return 'La contraseña es obligatoria';
    }
    
    if (contrasenia.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }
    
    if (contrasenia.length > 20) {
      return 'La contraseña no debe superar los 20 caracteres';
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      const loginData: LoginRequest = { correo, contrasenia };
      console.log('🔐 Intentando login con:', { correo, contrasenia: '***' });
      const response = await userService.login(loginData);
      console.log('✅ Login exitoso:', response.data);
      onLoginSuccess(response.data);
    } catch (err: any) {
      console.error('❌ Error en login:', err.response?.data || err.message);
      if (err.response?.status === 401) {
        setError('Correo electrónico o contraseña incorrectos');
      } else if (err.response?.data?.mensaje) {
        setError(err.response.data.mensaje);
      } else {
        setError('Error al iniciar sesión. Intente nuevamente');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="retro-container max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-neon-green text-center mb-2 crt-effect">
        &gt; INICIAR SESIÓN &lt;
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo de Correo Electrónico */}
        <div>
          <label className="block text-neon-green mb-2 uppercase tracking-wider text-sm">
            Correo Electrónico *
          </label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
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
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
              className="retro-input w-full pr-12"
              placeholder="••••••••"
              minLength={8}
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
            Entre 8 y 20 caracteres
          </p>
        </div>

        {/* Mensaje de Error */}
        {error && (
          <div className="bg-red-900/30 border-2 border-red-500 rounded p-3 text-red-500 text-sm">
            <span className="font-bold">⚠️ ERROR:</span> {error}
          </div>
        )}

        {/* Botón de Iniciar Sesión */}
        <button
          type="submit"
          disabled={loading}
          className={`retro-button w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? '⟳ Autenticando...' : '→ Iniciar Sesión'}
        </button>

        {/* Separador */}
        <div className="border-t border-neon-green/30 my-6"></div>

        {/* Link a Registro */}
        <div className="text-center">
          <p className="text-neon-green/70 text-sm mb-3">
            ¿No tienes una cuenta?
          </p>
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-neon-green hover:text-neon-green/80 underline uppercase tracking-wider text-sm font-bold"
            disabled={loading}
          >
            &gt; Crear Nueva Cuenta &lt;
          </button>
        </div>
      </form>
    </div>
  );
}
