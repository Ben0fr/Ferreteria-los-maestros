# Ferretería Los Maestros (React + Vite)

Migración de la fase 1 (HTML, CSS y JS) a React.

## Cómo ejecutarlo
    npm install
    npm run dev

## Estructura
- `src/pages`: una página por cada .html de la fase 1
- `src/components`: menú, footer, menú lateral del admin, tarjeta de producto y formulario de usuario
- `src/servicios`: lógica de tienda/carrito/usuarios (`tienda.js`) y del administrador (`admin.js`)
- `src/data`: productos iniciales y artículos del blog
- `src/utils`: validaciones y acceso a localStorage
- `src/context`: sesión del usuario (para el menú)
