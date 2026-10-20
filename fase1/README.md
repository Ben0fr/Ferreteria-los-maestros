# Ferretería Los Maestros

Proyecto desarrollado para la asignatura **DSY1104 - Desarrollo FullStack II**.

La aplicación corresponde a una tienda web frontend para **Ferretería Los Maestros**, donde los usuarios pueden navegar por el catálogo, revisar productos, utilizar un carrito de compras, registrarse, iniciar sesión y acceder a distintas secciones informativas. También incluye un panel de administración para gestionar productos y usuarios.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- localStorage

## Funcionalidades principales

### Tienda

- Página de inicio con navegación y categorías.
- Catálogo de productos generado dinámicamente con JavaScript.
- Filtrado de productos por categoría mediante parámetros en la URL.
- Vista de detalle de producto.
- Carrito de compras.
- Cálculo de subtotales y total de la compra.
- Eliminación de productos y vaciado completo del carrito.
- Persistencia del carrito mediante `localStorage`.

### Usuarios

- Registro de usuarios.
- Inicio de sesión.
- Validación de correos permitidos:
  - `@duoc.cl`
  - `@profesor.duoc.cl`
  - `@gmail.com`
- Validación de contraseña.
- Sesión simulada mediante `localStorage`.
- Menú dinámico según el estado de sesión.
- Cierre de sesión.

### Contacto

- Formulario de contacto con validaciones.
- Validación de nombre, correo y comentario.
- Mensajes de error y confirmación de envío.

### Blog

- Listado de publicaciones.
- Dos páginas de detalle de artículos.

### Administración

- Panel principal de administración.
- Listado de productos.
- Creación de productos.
- Edición de productos.
- Eliminación de productos.
- Actualización de stock.
- Listado de usuarios.
- Creación de usuarios desde el panel.
- Visualización en administración de usuarios registrados desde la tienda.
- Sincronización de productos entre administración y catálogo público.

## Estructura del proyecto

```text
Ferreteria Los Maestros/
│
├── index.html
├── productos.html
├── detalle-producto.html
├── carrito.html
├── login.html
├── registro.html
├── contacto.html
├── nosotros.html
├── blog.html
├── detalle-blog-1.html
├── detalle-blog-2.html
├── admin.html
├── admin-productos.html
├── admin-usuarios.html
│
├── css/
│   └── estilos.css
│
├── js/
│   ├── app.js
│   └── admin.js
│
└── img/
```

## Archivos JavaScript principales

### `js/app.js`

Contiene la lógica principal de la tienda:

- catálogo de productos;
- filtros por categoría;
- detalle de productos;
- carrito de compras;
- registro e inicio de sesión;
- manejo de sesión;
- formulario de contacto;
- sincronización de productos con el panel administrativo.

### `js/admin.js`

Contiene la lógica del panel administrativo:

- obtención y almacenamiento de productos;
- creación, edición y eliminación de productos;
- actualización de stock;
- listado y creación de usuarios;
- sincronización de usuarios registrados en la tienda.

## Uso de localStorage

El proyecto utiliza `localStorage` para mantener información en el navegador.

Principales claves utilizadas:

```text
carritoFerreteria
usuariosFerreteria
usuarioActualFerreteria
productosAdminFerreteria
productosEliminadosAdmin
usuariosAdminFerreteria
```

> Esta versión no utiliza una base de datos ni un backend. La persistencia se realiza localmente en el navegador.

## Cómo ejecutar el proyecto

1. Clonar o descargar el repositorio.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Abrir `index.html` directamente en el navegador o utilizar una extensión como **Live Server**.
4. Navegar por las distintas secciones desde el menú principal.

No se requiere instalación de dependencias ni compilación.

## Consideraciones

Este proyecto corresponde a una versión académica frontend. El inicio de sesión y la persistencia de información se simulan mediante `localStorage`, por lo que los datos permanecen únicamente en el navegador donde se utiliza la aplicación.

## Repositorio

La versión final del proyecto debe encontrarse en la rama `main` del repositorio GitHub utilizado para la entrega.

## Autores

Proyecto desarrollado por el equipo de estudiantes para la asignatura **DSY1104**.
