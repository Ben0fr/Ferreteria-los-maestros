import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    obtenerCarrito, eliminarDelCarrito, vaciarCarrito, buscarProductoPorId, realizarCompra
} from '../servicios/tienda'
import { formatearPrecio } from '../utils/validaciones'
import { useSesion } from '../context/useSesion'

// Carrito de compras (se guarda en localStorage, así no se pierde al recargar)
const Carrito = () => {
    const [carrito, setCarrito] = useState(() => obtenerCarrito())
    const [avisoSesion, setAvisoSesion] = useState(false)
    const { usuario } = useSesion()
    const navigate = useNavigate()

    // Quita un producto del carrito
    const manejarEliminar = (id) => {
        setCarrito(eliminarDelCarrito(id))
    }

    // Vacía todo el carrito
    const manejarVaciar = () => {
        vaciarCarrito()
        setCarrito([])
    }

    // Intenta confirmar la compra; si no hay sesión, muestra un aviso con acceso directo al login
    const manejarComprar = () => {
        if (usuario === null) {
            setAvisoSesion(true)
            return
        }

        setAvisoSesion(false)
        const resultado = realizarCompra()

        if (!resultado.ok) {
            alert(resultado.mensaje)
            return
        }

        alert(resultado.mensaje)
        setCarrito([])
        navigate('/productos')
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

            {/* Aviso cuando se intenta comprar sin haber iniciado sesión */}
            {avisoSesion && (
                <div className="alert alert-warning alert-aviso-sesion d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <span>Debes iniciar sesión para poder comprar.</span>
                    <Link to="/login" className="btn btn-sm btn-primary">Iniciar sesión</Link>
                </div>
            )}

            {/* Lista de productos del carrito */}
            <div id="contenedor-carrito">
                {items.length === 0 ? (
                    <div className="alert alert-info">
                        El carrito está vacío. <Link to="/productos">Ver productos</Link>
                    </div>
                ) : (
                    items.map(({ producto, cantidad, subtotal }) => (
                        <div className="card mb-3" key={producto.id}>
                            <div className="card-body d-flex align-items-center gap-3">
                                <img src={`/img/icons/${producto.icono}`} alt={producto.nombre} className="icono-img" />
                                <div>
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
                        </div>
                    ))
                )}
            </div>

            {/* Resumen con el total y los botones para vaciar o comprar */}
            <div className="card mt-4 resumen-carrito">
                <div className="card-body">
                    <h3>total: $<span id="total-carrito">{formatearPrecio(total)}</span></h3>
                    <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-danger" onClick={manejarVaciar}>Vaciar Carrito</button>
                        <button className="btn btn-success" onClick={manejarComprar} disabled={items.length === 0}>
                            Comprar
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Carrito
