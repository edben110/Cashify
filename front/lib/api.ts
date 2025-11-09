import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==================== USUARIOS ====================

export interface LoginRequest {
  correo: string;
  contrasenia: string; // Backend usa "contrasenia" sin ñ
}

export interface UserRequest {
  apodo: string;
  correo: string;
  contrasenia: string; // Backend usa "contrasenia" sin ñ
}

export interface UserResponse {
  id: string;
  apodo: string;
  correo: string;
  totalTransacciones: number;
  totalCategorias: number;
}

export const userService = {
  login: (data: LoginRequest) => api.post<UserResponse>('/usuarios/login', data),
  getAll: () => api.get<UserResponse[]>('/usuarios'),
  getById: (id: string) => api.get<UserResponse>(`/usuarios/${id}`),
  getByApodo: (apodo: string) => api.get<UserResponse>(`/usuarios/apodo/${apodo}`),
  create: (data: UserRequest) => api.post<UserResponse>('/usuarios', data),
  update: (id: string, data: UserRequest) => api.put<UserResponse>(`/usuarios/${id}`, data),
  delete: (id: string) => api.delete(`/usuarios/${id}`),
};

// ==================== CATEGORÍAS ====================

export interface CategoriaRequest {
  nombre: string;
}

export interface CategoriaResponse {
  id: string;
  nombre: string;
  userId: string;
}

export const categoriaService = {
  getByUser: (userId: string) => api.get<CategoriaResponse[]>(`/categorias/usuario/${userId}`),
  getById: (id: string) => api.get<CategoriaResponse>(`/categorias/${id}`),
  create: (userId: string, data: CategoriaRequest) => api.post<CategoriaResponse>(`/categorias/usuario/${userId}`, data),
  update: (id: string, data: CategoriaRequest) => api.put<CategoriaResponse>(`/categorias/${id}`, data),
  delete: (id: string) => api.delete(`/categorias/${id}`),
};

// ==================== TRANSACCIONES ====================

export interface TransaccionRequest {
  tipoTransaccion: 'INGRESO' | 'GASTO';
  categoriaId: string;
  descripcion: string;
  fecha: string;
  monto: number;
}

export interface TransaccionResponse {
  id: string;
  tipoTransaccion: 'INGRESO' | 'GASTO';
  categoriaId: string;
  categoriaNombre: string;
  descripcion: string;
  fecha: string;
  monto: number;
  userId: string;
}

export interface ResumenGastos {
  totalIngresos: number;
  totalGastos: number;
  balance: number;
  cantidadIngresos: number;
  cantidadGastos: number;
  periodo?: string;
}

export const transaccionService = {
  getByUser: (userId: string) => api.get<TransaccionResponse[]>(`/transacciones/usuario/${userId}`),
  getByTipo: (userId: string, tipo: 'INGRESO' | 'GASTO') => api.get<TransaccionResponse[]>(`/transacciones/usuario/${userId}/tipo/${tipo}`),
  getByCategoria: (userId: string, categoriaId: string) => api.get<TransaccionResponse[]>(`/transacciones/usuario/${userId}/categoria/${categoriaId}`),
  getByFecha: (userId: string, fechaInicio: string, fechaFin: string) => 
    api.get<TransaccionResponse[]>(`/transacciones/usuario/${userId}/fecha`, {
      params: { fechaInicio, fechaFin }
    }),
  getResumen: (userId: string) => api.get<ResumenGastos>(`/transacciones/usuario/${userId}/resumen`),
  getResumenPorPeriodo: (userId: string, fechaInicio: string, fechaFin: string) =>
    api.get<ResumenGastos>(`/transacciones/usuario/${userId}/resumen/periodo`, {
      params: { fechaInicio, fechaFin }
    }),
  create: (userId: string, data: TransaccionRequest) => api.post<TransaccionResponse>(`/transacciones/usuario/${userId}`, data),
  update: (id: string, data: TransaccionRequest) => api.put<TransaccionResponse>(`/transacciones/${id}`, data),
  delete: (id: string) => api.delete(`/transacciones/${id}`),
};

export default api;
