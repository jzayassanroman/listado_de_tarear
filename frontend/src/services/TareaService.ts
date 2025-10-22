import axios from 'axios';
import { Tarea, CreateTareaDto } from '../types/Tarea';

// Detectar automáticamente la URL del backend
const getApiBaseUrl = () => {
  const hostname = window.location.hostname;
  
  // En desarrollo local
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:3000';
  }
  
  // En producción, usar la URL de Railway
  if (hostname.includes('vercel.app') || hostname.includes('netlify.app') || hostname.includes('github.io')) {
    return 'https://listadodetarear-production.up.railway.app';
  }
  
  // Fallback para otros casos
  return 'https://listadodetarear-production.up.railway.app';
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para logging de requests
api.interceptors.request.use(
  (config) => {
    console.log('🚀 Enviando request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('❌ Error en request:', error);
    return Promise.reject(error);
  }
);

// Interceptor para logging de responses
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response recibido:', response.status, response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Error en response:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export class TareaService {
  static async obtenerTodas(tipo?: string): Promise<Tarea[]> {
    const params = tipo ? { tipo } : {};
    const response = await api.get('/tareas', { params });
    return response.data;
  }

  static async obtenerTipos(): Promise<string[]> {
    const response = await api.get('/tareas/tipos');
    return response.data;
  }

  static async obtenerPorId(id: number): Promise<Tarea> {
    const response = await api.get(`/tareas/${id}`);
    return response.data;
  }

  static async crear(tarea: CreateTareaDto): Promise<Tarea> {
    const response = await api.post('/tareas', tarea);
    return response.data;
  }

  static async actualizar(id: number, tarea: Partial<Tarea>): Promise<Tarea> {
    const response = await api.patch(`/tareas/${id}`, tarea);
    return response.data;
  }

  static async toggleCompletada(id: number): Promise<Tarea> {
    const response = await api.patch(`/tareas/${id}/toggle`);
    return response.data;
  }

  static async eliminar(id: number): Promise<void> {
    await api.delete(`/tareas/${id}`);
  }
}
