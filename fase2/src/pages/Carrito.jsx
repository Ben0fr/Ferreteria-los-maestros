import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    obtenerCarrito, eliminarDelCarrito, vaciarCarrito, buscarProductoPorId
} from '../servicios/tienda'
import { formatearPrecio } from '../utils/validaciones'

// Carrito de compras (se guarda en localStorage, así no se pierde al recargar)
const Carrito = () => {
    const [carrito, setCarrito] = useState(() => obtenerCarrito())

    // Quita un producto del carrito
    const manejarEliminar = (id) => {
        setCarrito(eliminarDelCarrito(id))
    }

    // Vacía todo el carrito
    const manejarVaciar = () => {
        vaciarCarrito()
        setCarrito([])
    }

    // Une cada item del carrito con los datos del producto y calcula su subtotal
    const items = []
    let total = 0

    for (const item of carrito) {
        const producto = buscarProductoPorId(item.id)

        // Si el producto ya no existe en la tienda, se omite
        if (producto === undefined) {
            continue
        }

        const subtotal = producto.precio * item.cantidad
        total = total + subtotal
        items.push({ producto, cantidad: item.cantidad, subtotal })
    }

    return (
        <main className="container mt-5 mb-5">
            <h1>Carrito de Compras</h1>

            {/* Lista de productos del carrito */}
            <div id="contenedor-carrito">
                {items.length === 0 ? (
                    <div className="alert alert-info">
                        El carrito está vacío. <Link to="/productos">Ver productos</Link>
                    </div>
                ) : (
                    items.map(({ producto, cantidad, subtotal }) => (
                        <div className="card mb-3" key={producto.id}>
                            <div className="card-body">
                                <div className="fs-1">{producto.icono}</div>
                                <h5>{producto.nombre}</h5>
                                <p>Precio: ${formatearPrecio(producto.precio)}</p>
                                <p>Cantidad: {cantidad}</p>
                                <p>Subtotal: ${formatearPrecio(subtotal)}</p>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => manejarEliminar(producto.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Resumen con el total y el botón para vaciar */}
            <div className="card mt-4 resumen-carrito">
                <div className="card-body">
                    <h3>total: $<span id="total-carrito">{formatearPrecio(total)}</span></h3>
                    <button className="btn btn-danger" onClick={manejarVaciar}>Vaciar Carrito</button>
                </div>
            </div>
        </main>
    )
}

export default Carrito
