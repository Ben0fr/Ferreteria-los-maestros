// Lógica de la tienda: catálogo, carrito y usuarios (equivale al app.js de la fase 1)
import { productosBase } from "../data/productos"
import { leerJSON, guardarJSON, borrarClave } from "../utils/almacenamiento"

// Nombres con los que se guardan los datos en localStorage (iguales a la fase 1)
const CLAVE_CARRITO = "carritoFerreteria"
const CLAVE_USUARIOS = "usuariosFerreteria"
const CLAVE_USUARIO_ACTUAL = "usuarioActualFerreteria"
const CLAVE_PRODUCTOS_ADMIN = "productosAdminFerreteria"
const CLAVE_ELIMINADOS = "productosEliminadosAdmin"

// ---------------- CATÁLOGO ----------------

// Arma el catálogo: productos base + cambios hechos por el administrador - productos eliminados
export function obtenerProductos() {
    const lista = productosBase.map((p) => ({ ...p }))
    const productosAdmin = leerJSON(CLAVE_PRODUCTOS_ADMIN, null)

    if (productosAdmin !== null) {
        for (const productoAdmin of productosAdmin) {
            const existente = lista.find((p) => p.codigo === productoAdmin.codigo)

            if (existente) {
                // Si ya existe en la tienda, se actualizan sus datos
                existente.nombre = productoAdmin.nombre
                existente.categoria = productoAdmin.categoria
                existente.precio = productoAdmin.precio
                existente.stock = productoAdmin.stock
            } else {
                // Si es un producto nuevo creado por el administrador, se agrega
                lista.push({
                    id: lista.length + 1,
                    codigo: productoAdmin.codigo,
                    nombre: productoAdmin.nombre,
                    categoria: productoAdmin.categoria,
                    categoriaSlug: "general",
                    precio: productoAdmin.precio,
                    stock: productoAdmin.stock,
                    icono: "🧰"
                })
            }
        }
    }

    // Se quitan los productos que el administrador eliminó
    const eliminados = leerJSON(CLAVE_ELIMINADOS, [])
    return lista.filter((p) => !eliminados.includes(p.codigo))
}

// Busca un producto por su id (devuelve undefined si no existe)
export function buscarProductoPorId(id) {
    return obtenerProductos().find((p) => p.id === id)
}

// ---------------- CARRITO ----------------

// Devuelve el carrito guardado: lista de { id, cantidad }
export function obtenerCarrito() {
    return leerJSON(CLAVE_CARRITO, [])
}

// Agrega un producto al carrito (si ya estaba, suma 1 a la cantidad)
export function agregarAlCarrito(id) {
    const carrito = obtenerCarrito()
    const item = carrito.find((i) => i.id === id)

    if (item) {
        item.cantidad = item.cantidad + 1
    } else {
        carrito.push({ id: id, cantidad: 1 })
    }

    guardarJSON(CLAVE_CARRITO, carrito)
}

// Quita del carrito el producto con ese id y devuelve el carrito nuevo
export function eliminarDelCarrito(id) {
    const carritoNuevo = obtenerCarrito().filter((i) => i.id !== id)
    guardarJSON(CLAVE_CARRITO, carritoNuevo)
    return carritoNuevo
}

// Deja el carrito completamente vacío
export function vaciarCarrito() {
    borrarClave(CLAVE_CARRITO)
}

// ---------------- USUARIOS ----------------

// Busca un usuario registrado por correo y contraseña (null si no existe)
export function buscarUsuario(correo, clave) {
    const usuarios = leerJSON(CLAVE_USUARIOS, [])
    const encontrado = usuarios.find((u) => u.correo === correo && u.clave === clave)
    return encontrado || null
}

// Guarda un usuario nuevo creado desde la página de registro
export function registrarUsuario(nombre, correo, clave) {
    const usuarios = leerJSON(CLAVE_USUARIOS, [])
    usuarios.push({ nombre: nombre, correo: correo, clave: clave })
    guardarJSON(CLAVE_USUARIOS, usuarios)
}

// Devuelve el usuario que tiene la sesión iniciada (null si no hay)
export function obtenerUsuarioActual() {
    return leerJSON(CLAVE_USUARIO_ACTUAL, null)
}

// Guarda el usuario que acaba de iniciar sesión
export function guardarUsuarioActual(usuario) {
    guardarJSON(CLAVE_USUARIO_ACTUAL, usuario)
}

// Borra la sesión guardada
export function borrarUsuarioActual() {
    borrarClave(CLAVE_USUARIO_ACTUAL)
}
