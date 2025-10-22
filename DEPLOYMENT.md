# 🚀 Guía de Despliegue - Lista de Tareas

Esta guía te ayudará a desplegar tu aplicación de lista de tareas para que cualquier persona pueda acceder a ella desde internet.

## 📋 Requisitos Previos

- Cuenta en [GitHub](https://github.com)
- Cuenta en [Vercel](https://vercel.com) (gratuita)
- Cuenta en [Railway](https://railway.app) (gratuita)

## 🎯 Pasos para el Despliegue

### 1. Preparar el Código

Primero, asegúrate de que tu código esté en GitHub:

```bash
# Si no tienes un repositorio en GitHub, créalo
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repositorio.git
git push -u origin main
```

### 2. Desplegar el Backend en Railway

1. Ve a [Railway.app](https://railway.app) y conéctate con GitHub
2. Haz clic en "New Project" → "Deploy from GitHub repo"
3. Selecciona tu repositorio
4. Railway detectará automáticamente que es un proyecto Node.js
5. Railway creará automáticamente una base de datos PostgreSQL
6. La aplicación se desplegará automáticamente
7. Copia la URL de tu backend (algo como `https://tu-app.up.railway.app`)

### 3. Desplegar el Frontend en Vercel

1. Ve a [Vercel.com](https://vercel.com) y conéctate con GitHub
2. Haz clic en "New Project"
3. Selecciona tu repositorio
4. En "Root Directory", selecciona `frontend`
5. Haz clic en "Deploy"
6. Vercel desplegará automáticamente tu aplicación React

### 4. Configurar las URLs

Después del despliegue, necesitas actualizar las URLs:

#### En el Backend (main.ts):
```typescript
origin: [
  // ... URLs existentes ...
  'https://tu-frontend.vercel.app'  // Reemplaza con tu URL de Vercel
]
```

#### En el Frontend (TareaService.ts):
```typescript
if (hostname.includes('vercel.app')) {
  return 'https://tu-backend.up.railway.app';  // Reemplaza con tu URL de Railway
}
```

### 5. Actualizar y Redesplegar

Después de hacer los cambios:

1. **Backend**: Railway se actualizará automáticamente cuando hagas push a GitHub
2. **Frontend**: Vercel se actualizará automáticamente cuando hagas push a GitHub

## 🔧 Configuración Adicional

### Variables de Entorno en Railway

En el dashboard de Railway, ve a tu proyecto → Variables y agrega:

```
NODE_ENV=production
PORT=3000
```

### Variables de Entorno en Vercel

En el dashboard de Vercel, ve a tu proyecto → Settings → Environment Variables:

```
VITE_API_URL=https://tu-backend.up.railway.app
```

## 🌐 URLs Finales

Una vez desplegado, tendrás:

- **Frontend**: `https://tu-app.vercel.app`
- **Backend**: `https://tu-app.up.railway.app`

## 🐛 Solución de Problemas

### Error de CORS
- Asegúrate de que las URLs en `main.ts` coincidan exactamente con tu dominio de Vercel

### Error de Conexión
- Verifica que la URL del backend en `TareaService.ts` sea correcta
- Revisa los logs en Railway para errores del backend

### Base de Datos
- Railway crea automáticamente una base de datos PostgreSQL
- No necesitas configurar nada adicional

## 📱 Acceso desde Cualquier Dispositivo

Una vez desplegado, tu aplicación estará disponible en:
- **URL**: `https://tu-app.vercel.app`
- **Acceso**: Cualquier persona con internet puede acceder
- **Dispositivos**: Funciona en móviles, tablets y computadoras

## 🔄 Actualizaciones Futuras

Para actualizar tu aplicación:

1. Haz cambios en tu código local
2. Haz commit y push a GitHub
3. Railway y Vercel se actualizarán automáticamente

¡Tu aplicación estará disponible para todo el mundo! 🌍
