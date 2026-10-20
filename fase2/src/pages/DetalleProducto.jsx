import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { buscarProductoPorId, agregarAlCarrito } from '../servicios/tienda'
import { formatearPrecio } from '../utils/validaciones'

// Detalle de un producto (el id viene en la dirección: /productos/3)
const DetalleProducto = () => {
    const { id } = useParams()
    const producto = buscarProductoPorId(Number(id))
    const [cantidad, setCantidad] = useState(1)

    // Mantiene la cantidad elegida entre 1 y el stock disponible
    const manejarCambioCantidad = (e) => {
        const valor = Number(e.target.value)
        if (Number.isNaN(valor)) return
        setCantidad(Math.min(Math.max(valor, 1), producto.stock))
    }

    // Agrega la cantidad elegida al carrito y avisa al usuario
    const manejarAgregar = () => {
        agregarAlCarrito(producto.id, cantidad)
        alert("Producto agregado al carrito")
    }

    return (
        <main className="container mt-5 mb-5">
            <h1 className="mb-4">Detalle del Producto</h1>

            {producto === undefined ? (
                // Si el id no existe, se muestra un mensaje de error
                <div className="alert alert-danger">Producto no encontrado</div>
            ) : (
                <div className="card">
                    <div className="card-body">
                        <img src={`/img/icons/${producto.icono}`} alt={producto.nombre} className="icono-producto d-block mx-auto mb-3" />
                        <h2 className="card-title">{producto.nombre}</h2>

                        <p>Código: {producto.codigo}</p>
                        <p>Categoría: {producto.categoria}</p>
                        <p>Precio: ${formatearPrecio(producto.precio)}</p>
                        <p>Stock: {producto.stock} unidades</p>

                        {producto.stock > 0 && (
                            <div className="input-group mb-3" style={{ maxWidth: "220px" }}>
                                <label htmlFor="detalle-cantidad" className="input-group-text">Cantidad</label>
                                <input
                                    type="number"
                                    id="detalle-cantidad"
                                    className="form-control"
                                    min={1}
                                    max={producto.stock}
                                    value={cantidad}
                                    onChange={manejarCambioCantidad}
                                />
                            </div>
                        )}

                        <button type="button" className="btn btn-primary me-2" onClick={manejarAgregar} disabled={producto.stock === 0}>
                            {producto.stock === 0 ? "Sin stock" : "Agregar al carrito"}
                        </button>
                        <Link to="/productos" className="btn btn-secondary">Volver al catálogo</Link>
                    </div>
                </div>
            )}
        </main>
    )
}

export default DetalleProducto
