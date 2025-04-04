# Blog de Posts con Next.js

## Descripción
Este proyecto es una aplicación web moderna para gestionar posts de blog, desarrollada con Next.js. Permite a los usuarios crear, editar y eliminar posts, con una interfaz de usuario intuitiva y atractiva. La aplicación utiliza la API REST JSONPlaceholder para obtener los posts existentes y permite la gestión local de nuevos posts.

## Características
- Interfaz de usuario moderna y responsiva
- Gestión de posts (crear, editar, eliminar)
- Integración con API REST
- Almacenamiento local de posts
- Diseño atractivo con Tailwind CSS
- Animaciones y transiciones suaves

## Desarrollador
Andrea Benavides Zúñiga - https://github.com/abenavides01

## Requisitos Previos
- Node.js (versión 14 o superior)
- npm o yarn
- Docker (opcional, para ejecutar en contenedor)

## Instalación

### Instalación Local
1. Clona el repositorio:
```bash
git clone https://github.com/abenavides01/Implementaci-n-y-Consumo-de-API-REST-con-Next.js.git
cd test
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Instalación con Docker
1. Construye la imagen:
```bash
docker build -t blog-posts-nextjs .
```

2. Ejecuta el contenedor:
```bash
docker run -p 3000:3000 blog-posts-nextjs
```

## Estructura del Proyecto
```
├── test/
│   ├── components/     # Componentes React
│   ├── pages/         # Páginas de Next.js
│   ├── services/      # Servicios de API
│   └── styles/        # Estilos CSS
├── public/            # Archivos estáticos
├── .gitignore        # Archivos ignorados por Git
├── Dockerfile        # Configuración de Docker
├── package.json      # Dependencias y scripts
└── README.md         # Documentación
```

## Tecnologías Utilizadas
- Next.js
- React
- Tailwind CSS
- Docker
- API REST

## Notas Importantes
- Los posts creados localmente se almacenan en el localStorage del navegador
- Los posts de la API no pueden ser eliminados
- La aplicación requiere conexión a internet para cargar los posts de la API 