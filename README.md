# 📝 Lista de Tareas - Full Stack App

Una aplicación moderna de gestión de tareas construida con **NestJS** (backend) y **React + Vite** (frontend).

## 🚀 Características

- ✅ **Backend robusto** con NestJS y TypeORM
- ⚛️ **Frontend moderno** con React y TypeScript
- 🎨 **Diseño atractivo** con Tailwind CSS
- 💾 **Base de datos SQLite** para desarrollo
- 🔄 **API REST completa** con validación
- 📱 **Interfaz responsive** y fácil de usar

## 🛠️ Tecnologías Utilizadas

### Backend
- **NestJS** - Framework de Node.js
- **TypeORM** - ORM para base de datos
- **SQLite** - Base de datos ligera
- **Class Validator** - Validación de datos
- **CORS** - Configurado para frontend

### Frontend
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool moderno
- **Tailwind CSS** - Framework de estilos
- **Axios** - Cliente HTTP

## 📦 Instalación y Configuración

### 1. Instalar dependencias
```bash
# Instalar todas las dependencias (backend + frontend)
npm run install:all
```

### 2. Ejecutar en modo desarrollo
```bash
# Ejecutar backend y frontend simultáneamente
npm run dev
```

### 3. Ejecutar por separado
```bash
# Solo backend (puerto 3000)
npm run dev:backend

# Solo frontend (puerto 5173)
npm run dev:frontend
```

## 🌐 URLs de Acceso

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Docs**: http://localhost:3000/tareas

## 📋 Funcionalidades

### ✅ Gestión de Tareas
- ➕ **Crear** nuevas tareas con título y descripción
- 👁️ **Ver** todas las tareas organizadas por estado
- ✏️ **Editar** tareas existentes
- ✅ **Marcar como completadas** con un clic
- 🗑️ **Eliminar** tareas no deseadas

### 🎨 Interfaz de Usuario
- 📱 **Diseño responsive** para móviles y desktop
- 🎯 **Interfaz intuitiva** y fácil de usar
- ⚡ **Carga rápida** con Vite
- 🎨 **Estilos modernos** con Tailwind CSS

## 🏗️ Estructura del Proyecto

```
lista-de-tareas/
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── tarea.entity.ts # Entidad de base de datos
│   │   ├── tareas.service.ts
│   │   ├── tareas.controller.ts
│   │   └── tareas.module.ts
│   └── package.json
├── frontend/               # App React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── services/       # Servicios API
│   │   ├── types/          # Tipos TypeScript
│   │   └── App.tsx
│   └── package.json
└── package.json           # Scripts principales
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Ejecutar todo
npm run dev:backend      # Solo backend
npm run dev:frontend     # Solo frontend

# Construcción
npm run build            # Construir todo
npm run build:backend    # Solo backend
npm run build:frontend   # Solo frontend

# Instalación
npm run install:all      # Instalar todas las dependencias
```

## 🚀 Primeros Pasos

1. **Clona o descarga** el proyecto
2. **Ejecuta** `npm run install:all`
3. **Inicia** con `npm run dev`
4. **Abre** http://localhost:5173 en tu navegador
5. **¡Comienza** a agregar tus tareas!

## 🎯 Próximas Mejoras

- 🔐 Autenticación de usuarios
- 📊 Dashboard con estadísticas
- 🏷️ Categorías y etiquetas
- 📅 Fechas de vencimiento
- 🔄 Sincronización en tiempo real
- 📱 Aplicación móvil

---

¡Tu aplicación de lista de tareas está lista para usar! 🎉
