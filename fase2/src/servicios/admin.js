// Lógica del panel de administración (equivale al admin.js de la fase 1)
import { productosBase } from "../data/productos"
import { leerJSON, guardarJSON } from "../utils/almacenamiento"

const CLAVE_PRODUCTOS_ADMIN = "productosAdminFerreteria"
const CLAVE_ELIMINADOS = "productosEliminadosAdmin"
const CLAVE_USUARIOS_ADMIN = "usuariosAdminFerreteria"
const CLAVE_USUARIOS_TIENDA = "usuariosFerreteria"

// ---------------- PRODUCTOS ----------------

// Devuelve los productos del administrador (la primera vez parte con los productos iniciales)
export function obtenerProductosAdmin() {
    const guardados = leerJSON(CLAVE_PRODUCTOS_ADMIN, null)

    if (guardados !== null) {
        return guardados
    }

    const iniciales = productosBase.map((p) => ({
        codigo: p.codigo,
        nombre: p.nombre,
        categoria: p.categoria,
        precio: p.precio,
        stock: p.stock
    }))

    guardarJSON(CLAVE_PRODUCTOS_ADMIN, iniciales)
    return iniciales
}

// Guarda la lista de productos del administrador
export function guardarProductosAdmin(productos) {
    guardarJSON(CLAVE_PRODUCTOS_ADMIN, productos)
}

// Agrega un producto nuevo; si su código estaba en la lista de eliminados, lo saca de ahí
export function crearProductoAdmin(producto) {
    const productos = obtenerProductosAdmin()
    const eliminados = leerJSON(CLAVE_ELIMINADOS, []).filter((codigo) => codigo !== producto.codigo)

    guardarJSON(CLAVE_ELIMINADOS, eliminados)
    productos.push(producto)
    guardarProductosAdmin(productos)
    return productos
}

// Cambia los datos de un producto (indice = posición en la lista)
export function editarProductoAdmin(indice, datos) {
    const productos = obtenerProductosAdmin()
    productos[indice] = { ...productos[indice], ...datos }
    guardarProductosAdmin(productos)
    return productos
}

// Elimina un producto y anota su código para que también desaparezca de la tienda
export function eliminarProductoAdmin(indice) {
    const productos = obtenerProductosAdmin()
    const producto = productos[indice]
    const eliminados = leerJSON(CLAVE_ELIMINADOS, [])

    if (!eliminados.includes(producto.codigo)) {
        eliminados.push(producto.codigo)
    }

    guardarJSON(CLAVE_ELIMINADOS, eliminados)
    productos.splice(indice, 1)
    guardarProductosAdmin(productos)
    return productos
}

// ---------------- USUARIOS ----------------

// Devuelve los usuarios del administrador + los clientes que se registraron en la tienda
export function obtenerUsuariosAdmin() {
    let usuariosAdmin = leerJSON(CLAVE_USUARIOS_ADMIN, null)

    if (usuariosAdmin === null) {
        // Usuarios iniciales de ejemplo
        usuariosAdmin = [
            { run: "19011022K", nombre: "Administrador", correo: "admin@gmail.com", tipo: "Administrador" },
            { run: "201234567", nombre: "Juan Pérez", correo: "juan@gmail.com", tipo: "Cliente" },
            { run: "189876543", nombre: "María González", correo: "maria@duoc.cl", tipo: "Vendedor" }
        ]
    }

    // Agrega los clientes registrados en la tienda (sin repetir correos)
    const usuariosTienda = leerJSON(CLAVE_USUARIOS_TIENDA, [])

    for (const usuarioTienda of usuariosTienda) {
        const yaExiste = usuariosAdmin.some((u) => u.correo === usuarioTienda.correo)

        if (!yaExiste) {
            usuariosAdmin.push({
                run: "-",
                nombre: usuarioTienda.nombre,
                correo: usuarioTienda.correo,
                tipo: "Cliente"
            })
        }
    }

    guardarJSON(CLAVE_USUARIOS_ADMIN, usuariosAdmin)
    return usuariosAdmin
}

// Agrega un usuario nuevo creado desde el panel del administrador
export function crearUsuarioAdmin(usuario) {
    const usuarios = obtenerUsuariosAdmin()
    usuarios.push(usuario)
    guardarJSON(CLAVE_USUARIOS_ADMIN, usuarios)
    return usuarios
}
