import { useState } from 'react'
import { Link } from 'react-router-dom'
import { agregarAlCarrito } from '../../servicios/tienda'
import { formatearPrecio } from '../../utils/validaciones'

// Tarjeta de un producto en el catálogo
const ProductoCard = ({ producto }) => {
    const [cantidad, setCantidad] = useState(1)
    const stockDisponible = producto.stock > 0

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
        <div className="col-md-4">
            <div className="card h-100 card-producto">
                <div className="card-body text-center d-flex flex-column justify-content-between">
                    <div>
                        <img src={`/img/icons/${producto.icono}`} alt={producto.nombre} className="icono-producto mb-2" />
                        <h5 className="card-title">{producto.nombre}</h5>
                        <p className="card-text mb-1">Categoría: {producto.categoria}</p>
                        <p className="card-text mb-1 fw-bold">Precio: ${formatearPrecio(producto.precio)}</p>
                        <p className="card-text text-muted mb-3">Stock: {producto.stock} unidades</p>
                    </div>

                    <div className="d-grid gap-2">
                        {stockDisponible && (
                            <div className="input-group input-group-sm justify-content-center">
                                <label htmlFor={`cantidad-${producto.id}`} className="input-group-text">Cantidad</label>
                                <input
                                    type="number"
                                    id={`cantidad-${producto.id}`}
                                    className="form-control"
                                    min={1}
                                    max={producto.stock}
                                    value={cantidad}
                                    onChange={manejarCambioCantidad}
                                />
                            </div>
                        )}

                        <Link to={`/productos/${producto.id}`} className="btn btn-outline-secondary">
                            Ver detalle
                        </Link>
                        <button type="button" className="btn btn-primary" onClick={manejarAgregar} disabled={!stockDisponible}>
                            {stockDisponible ? "Agregar al carrito" : "Sin stock"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductoCard
