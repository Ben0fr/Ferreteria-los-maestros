// Lógica de la tienda: catálogo, carrito y usuarios (equivale al app.js de la fase 1)
import { productosBase } from "../data/productos"
import { leerJSON, guardarJSON, borrarClave } from "../utils/almacenamiento"
import { obtenerProductosAdmin, guardarProductosAdmin } from "./admin"

// Nombres con los que se guardan los datos en localStorage (iguales a la fase 1)
const CLAVE_CARRITO = "carritoFerreteria"
const CLAVE_USUARIOS = "usuariosFerreteria"
const CLAVE_USUARIO_ACTUAL = "usuarioActualFerreteria"
const CLAVE_PRODUCTOS_ADMIN = "productosAdminFerreteria"
const CLAVE_ELIMINADOS = "productosEliminadosAdmin"

// Credenciales fijas para ingresar como administrador desde el login
const CREDENCIALES_ADMIN = { correo: "admin@gmail.com", clave: "admin123" }

// Quienes escuchan cambios en el carrito (por ejemplo, el contador del menú)
const listenersCarrito = new Set()

function notificarCarrito() {
    for (const escuchar of listenersCarrito) {
        escuchar()
    }
}

// Permite que un componente se avise cuando el carrito cambia; devuelve una función para dejar de escuchar
export function suscribirCarrito(escuchar) {
    listenersCarrito.add(escuchar)
    return () => listenersCarrito.delete(escuchar)
}

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
                    icono: "caja-herramientas.svg"
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

// Suma la cantidad de todos los productos del carrito (para el contador del menú)
export function obtenerCantidadCarrito() {
    return obtenerCarrito().reduce((total, item) => total + item.cantidad, 0)
}

// Agrega un producto al carrito (si ya estaba, suma la cantidad indicada)
export function agregarAlCarrito(id, cantidad = 1) {
    const carrito = obtenerCarrito()
    const item = carrito.find((i) => i.id === id)

    if (item) {
        item.cantidad = item.cantidad + cantidad
    } else {
        carrito.push({ id: id, cantidad: cantidad })
    }

    guardarJSON(CLAVE_CARRITO, carrito)
    notificarCarrito()
}

// Cantidad de un producto que ya hay en el carrito (0 si no está)
export function cantidadEnCarrito(id) {
    const item = obtenerCarrito().find((i) => i.id === id)
    return item ? item.cantidad : 0
}

// Igual que agregarAlCarrito, pero valida el stock: no deja que lo del carrito + lo nuevo supere el stock.
// Devuelve { ok, mensaje }
export function agregarAlCarritoValidado(id, cantidad = 1) {
    const producto = buscarProductoPorId(id)

    if (producto === undefined) {
        return { ok: false, mensaje: "El producto ya no existe" }
    }

    if (!Number.isInteger(cantidad) || cantidad < 1) {
        return { ok: false, mensaje: "La cantidad debe ser al menos 1" }
    }

    const enCarrito = cantidadEnCarrito(id)

    if (enCarrito + cantidad > producto.stock) {
        const disponibles = Math.max(producto.stock - enCarrito, 0)
        return {
            ok: false,
            mensaje: `No puedes superar el stock de ${producto.nombre} (${producto.stock} unidades). ` +
                `Ya tienes ${enCarrito} en el carrito y puedes agregar ${disponibles} más.`
        }
    }

    agregarAlCarrito(id, cantidad)
    return { ok: true, mensaje: "Producto agregado al carrito" }
}

// Cambia la cantidad de un producto del carrito. Si es 0 (o menos) lo elimina; nunca supera el stock.
// Devuelve { carrito, mensaje } (mensaje vacío si no hubo ajuste)
export function actualizarCantidadCarrito(id, cantidad) {
    if (cantidad <= 0) {
        return { carrito: eliminarDelCarrito(id), mensaje: "" }
    }

    const producto = buscarProductoPorId(id)
    let mensaje = ""

    if (producto !== undefined && cantidad > producto.stock) {
        cantidad = producto.stock
        mensaje = `Solo hay ${producto.stock} unidades disponibles de ${producto.nombre}`
    }

    const carrito = obtenerCarrito().map((i) => (i.id === id ? { ...i, cantidad } : i))
    guardarJSON(CLAVE_CARRITO, carrito)
    notificarCarrito()
    return { carrito, mensaje }
}

// Quita del carrito el producto con ese id y devuelve el carrito nuevo
export function eliminarDelCarrito(id) {
    const carritoNuevo = obtenerCarrito().filter((i) => i.id !== id)
    guardarJSON(CLAVE_CARRITO, carritoNuevo)
    notificarCarrito()
    return carritoNuevo
}

// Deja el carrito completamente vacío
export function vaciarCarrito() {
    borrarClave(CLAVE_CARRITO)
    notificarCarrito()
}

// Confirma la compra de lo que hay en el carrito: revisa el stock, lo descuenta y vacía el carrito
export function realizarCompra() {
    const carrito = obtenerCarrito()

    if (carrito.length === 0) {
        return { ok: false, mensaje: "El carrito está vacío" }
    }

    // Primero se revisa que haya stock suficiente para todo, antes de descontar nada
    for (const item of carrito) {
        const producto = buscarProductoPorId(item.id)

        if (producto === undefined || producto.stock < item.cantidad) {
            const nombre = producto ? producto.nombre : "un producto"
            return { ok: false, mensaje: `No hay stock suficiente de ${nombre}` }
        }
    }

    // Descuenta el stock comprado junto a los productos del administrador: así el nuevo
    // stock se ve igual tanto para los clientes como en el panel de administración
    const productosAdmin = obtenerProductosAdmin()

    for (const item of carrito) {
        const producto = buscarProductoPorId(item.id)
        const productoAdmin = productosAdmin.find((p) => p.codigo === producto.codigo)

        if (productoAdmin) {
            productoAdmin.stock = productoAdmin.stock - item.cantidad
        }
    }

    guardarProductosAdmin(productosAdmin)
    vaciarCarrito()

    return { ok: true, mensaje: "¡Compra realizada con éxito! Gracias por tu compra." }
}

// ---------------- USUARIOS ----------------

// Busca un usuario registrado por correo y contraseña (null si no existe)
export function buscarUsuario(correo, clave) {
    const usuarios = leerJSON(CLAVE_USUARIOS, [])
    const encontrado = usuarios.find((u) => u.correo === correo && u.clave === clave)
    return encontrado ? { ...encontrado, tipo: "Cliente" } : null
}

// Revisa las credenciales fijas de administrador (no se guardan junto a los clientes)
export function buscarAdministrador(correo, clave) {
    if (correo === CREDENCIALES_ADMIN.correo && clave === CREDENCIALES_ADMIN.clave) {
        return { nombre: "Administrador", correo: correo, tipo: "Administrador" }
    }

    return null
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
