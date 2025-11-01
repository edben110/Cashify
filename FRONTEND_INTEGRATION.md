# 🎨 Integración con Frontend - Ejemplos de Código

Esta guía proporciona ejemplos de código para integrar la API de Control de Gastos con diferentes frameworks de frontend.

---

## 📱 JavaScript/TypeScript - Fetch API

### Configuración Base
```javascript
const API_BASE_URL = 'http://localhost:8080/api';

const headers = {
  'Content-Type': 'application/json',
};
```

### Crear Usuario
```javascript
async function crearUsuario(usuario) {
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(usuario)
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
}

// Uso
const nuevoUsuario = {
  apodo: 'juan123',
  correo: 'juan@example.com',
  contraseña: 'password123'
};

crearUsuario(nuevoUsuario)
  .then(usuario => console.log('Usuario creado:', usuario))
  .catch(error => console.error('Error:', error));
```

### Obtener Transacciones
```javascript
async function obtenerTransacciones(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/transacciones/usuario/${userId}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const transacciones = await response.json();
    return transacciones;
  } catch (error) {
    console.error('Error al obtener transacciones:', error);
    throw error;
  }
}
```

### Crear Transacción
```javascript
async function crearTransaccion(userId, transaccion) {
  try {
    const response = await fetch(`${API_BASE_URL}/transacciones/usuario/${userId}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(transaccion)
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear transacción:', error);
    throw error;
  }
}

// Uso
const nuevaTransaccion = {
  tipoTransaccion: 'GASTO',
  categoriaId: 'cat123',
  descripcion: 'Compra de supermercado',
  fecha: new Date().toISOString().slice(0, 19),
  monto: 150.50
};

crearTransaccion('userId123', nuevaTransaccion)
  .then(transaccion => console.log('Transacción creada:', transaccion));
```

### Obtener Resumen
```javascript
async function obtenerResumen(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/transacciones/usuario/${userId}/resumen`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const resumen = await response.json();
    return resumen;
  } catch (error) {
    console.error('Error al obtener resumen:', error);
    throw error;
  }
}
```

---

## ⚛️ React - Axios

### Instalación
```bash
npm install axios
```

### Configuración de API Service
```javascript
// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

### Hook Personalizado para Usuarios
```javascript
// hooks/useUsuarios.js
import { useState, useEffect } from 'react';
import api from '../services/api';

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const obtenerUsuarios = async () => {
    setLoading(true);
    try {
      const response = await api.get('/usuarios');
      setUsuarios(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const crearUsuario = async (usuario) => {
    setLoading(true);
    try {
      const response = await api.post('/usuarios', usuario);
      setUsuarios([...usuarios, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return { usuarios, loading, error, crearUsuario, obtenerUsuarios };
};
```

### Componente de Ejemplo
```javascript
// components/ListaTransacciones.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ListaTransacciones = ({ userId }) => {
  const [transacciones, setTransacciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransacciones = async () => {
      try {
        const response = await api.get(`/transacciones/usuario/${userId}`);
        setTransacciones(response.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransacciones();
  }, [userId]);

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Transacciones</h2>
      <ul>
        {transacciones.map(trans => (
          <li key={trans.id}>
            <span>{trans.descripcion}</span>
            <span>{trans.tipoTransaccion}</span>
            <span>${trans.monto}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaTransacciones;
```

### Formulario de Transacción
```javascript
// components/FormularioTransaccion.jsx
import React, { useState } from 'react';
import api from '../services/api';

const FormularioTransaccion = ({ userId, categoriaId, onTransaccionCreada }) => {
  const [formData, setFormData] = useState({
    tipoTransaccion: 'GASTO',
    categoriaId: categoriaId,
    descripcion: '',
    fecha: new Date().toISOString().slice(0, 16),
    monto: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post(`/transacciones/usuario/${userId}`, {
        ...formData,
        monto: parseFloat(formData.monto),
        fecha: formData.fecha + ':00'
      });
      
      onTransaccionCreada(response.data);
      
      // Resetear formulario
      setFormData({
        tipoTransaccion: 'GASTO',
        categoriaId: categoriaId,
        descripcion: '',
        fecha: new Date().toISOString().slice(0, 16),
        monto: ''
      });
    } catch (error) {
      console.error('Error al crear transacción:', error);
      alert('Error al crear la transacción');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="tipoTransaccion" value={formData.tipoTransaccion} onChange={handleChange}>
        <option value="GASTO">Gasto</option>
        <option value="INGRESO">Ingreso</option>
      </select>

      <input
        type="text"
        name="descripcion"
        placeholder="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        step="0.01"
        name="monto"
        placeholder="Monto"
        value={formData.monto}
        onChange={handleChange}
        required
      />

      <input
        type="datetime-local"
        name="fecha"
        value={formData.fecha}
        onChange={handleChange}
        required
      />

      <button type="submit">Crear Transacción</button>
    </form>
  );
};

export default FormularioTransaccion;
```

---

## 🅰️ Angular - HttpClient

### Servicio de API
```typescript
// services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id?: string;
  apodo: string;
  correo: string;
  contraseña?: string;
}

export interface Transaccion {
  id?: string;
  tipoTransaccion: 'INGRESO' | 'GASTO';
  categoriaId: string;
  descripcion: string;
  fecha: string;
  monto: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  // Usuarios
  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/usuarios`, usuario, { headers: this.headers });
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios`);
  }

  // Transacciones
  obtenerTransacciones(userId: string): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(`${this.baseUrl}/transacciones/usuario/${userId}`);
  }

  crearTransaccion(userId: string, transaccion: Transaccion): Observable<Transaccion> {
    return this.http.post<Transaccion>(
      `${this.baseUrl}/transacciones/usuario/${userId}`,
      transaccion,
      { headers: this.headers }
    );
  }

  obtenerResumen(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/transacciones/usuario/${userId}/resumen`);
  }
}
```

### Componente de Ejemplo
```typescript
// components/transacciones/transacciones.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService, Transaccion } from '../../services/api.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})
export class TransaccionesComponent implements OnInit {
  transacciones: Transaccion[] = [];
  userId: string = 'tu-user-id';
  loading: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.cargarTransacciones();
  }

  cargarTransacciones(): void {
    this.loading = true;
    this.apiService.obtenerTransacciones(this.userId)
      .subscribe({
        next: (data) => {
          this.transacciones = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar transacciones:', error);
          this.loading = false;
        }
      });
  }
}
```

---

## 🟢 Vue.js 3 - Composition API

### Composable de API
```javascript
// composables/useApi.js
import { ref } from 'vue';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export function useTransacciones() {
  const transacciones = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const obtenerTransacciones = async (userId) => {
    loading.value = true;
    try {
      const response = await api.get(`/transacciones/usuario/${userId}`);
      transacciones.value = response.data;
      error.value = null;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const crearTransaccion = async (userId, transaccion) => {
    loading.value = true;
    try {
      const response = await api.post(`/transacciones/usuario/${userId}`, transaccion);
      transacciones.value.push(response.data);
      return response.data;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    transacciones,
    loading,
    error,
    obtenerTransacciones,
    crearTransaccion
  };
}
```

### Componente de Ejemplo
```vue
<!-- components/ListaTransacciones.vue -->
<template>
  <div class="transacciones">
    <h2>Transacciones</h2>
    
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    
    <ul v-else>
      <li v-for="trans in transacciones" :key="trans.id">
        <span>{{ trans.descripcion }}</span>
        <span :class="trans.tipoTransaccion">{{ trans.tipoTransaccion }}</span>
        <span>${{ trans.monto }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useTransacciones } from '../composables/useApi';

const props = defineProps({
  userId: {
    type: String,
    required: true
  }
});

const { transacciones, loading, error, obtenerTransacciones } = useTransacciones();

onMounted(() => {
  obtenerTransacciones(props.userId);
});
</script>
```

---

## 🔐 Manejo de Errores

### Ejemplo con Try-Catch
```javascript
async function manejarPeticion() {
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios`);
    
    if (!response.ok) {
      const errorData = await response.json();
      
      switch (response.status) {
        case 400:
          console.error('Error de validación:', errorData.validationErrors);
          break;
        case 404:
          console.error('Recurso no encontrado:', errorData.message);
          break;
        case 409:
          console.error('Conflicto:', errorData.message);
          break;
        default:
          console.error('Error del servidor:', errorData.message);
      }
      
      throw new Error(errorData.message);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en la petición:', error);
    throw error;
  }
}
```

---

## 📊 Ejemplo Completo - Dashboard

```javascript
// dashboard.js
class DashboardController {
  constructor() {
    this.API_URL = 'http://localhost:8080/api';
    this.userId = null;
  }

  async initialize(userId) {
    this.userId = userId;
    await this.cargarDatos();
  }

  async cargarDatos() {
    try {
      const [transacciones, categorias, resumen] = await Promise.all([
        this.obtenerTransacciones(),
        this.obtenerCategorias(),
        this.obtenerResumen()
      ]);

      this.renderizarDashboard({ transacciones, categorias, resumen });
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }

  async obtenerTransacciones() {
    const response = await fetch(`${this.API_URL}/transacciones/usuario/${this.userId}`);
    return response.json();
  }

  async obtenerCategorias() {
    const response = await fetch(`${this.API_URL}/categorias/usuario/${this.userId}`);
    return response.json();
  }

  async obtenerResumen() {
    const response = await fetch(`${this.API_URL}/transacciones/usuario/${this.userId}/resumen`);
    return response.json();
  }

  renderizarDashboard(data) {
    console.log('Datos del dashboard:', data);
    // Implementar la lógica de renderizado aquí
  }
}

// Uso
const dashboard = new DashboardController();
dashboard.initialize('userId123');
```

---

## ✅ Checklist de Integración

- [ ] Configurar la base URL de la API
- [ ] Configurar headers (Content-Type, etc.)
- [ ] Implementar manejo de errores
- [ ] Manejar estados de loading
- [ ] Validar datos antes de enviar
- [ ] Formatear fechas correctamente (ISO 8601)
- [ ] Parsear números (monto) correctamente
- [ ] Implementar feedback al usuario
- [ ] Cachear datos cuando sea apropiado
- [ ] Implementar retry logic para errores de red

---

**¡Listo para integrar con tu frontend! 🚀**
