import { Link } from 'react-router-dom'
import { useSelectorCantidad } from '../../utils/useSelectorCantidad'
import { formatearPrecio } from '../../utils/validaciones'

// Tarjeta de un producto en el catálogo
const ProductoCard = ({ producto }) => {
    const stockDisponible = producto.stock > 0
    const { texto, maximo, enCarrito, manejarCambio, manejarBlur, agregar } = useSelectorCantidad(producto)
    const todoEnCarrito = stockDisponible && maximo === 0

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
                        {enCarrito > 0 && <p className="card-text small text-muted mb-2">En tu carrito: {enCarrito}</p>}
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
                                    max={Math.max(maximo, 1)}
                                    value={texto}
                                    onChange={manejarCambio}
                                    onBlur={manejarBlur}
                                    disabled={todoEnCarrito}
                                />
                            </div>
                        )}

                        <Link to={`/productos/${producto.id}`} className="btn btn-outline-secondary">
                            Ver detalle
                        </Link>
                        <button type="button" className="btn btn-primary" onClick={agregar} disabled={!stockDisponible || todoEnCarrito}>
                            {!stockDisponible ? "Sin stock" : todoEnCarrito ? "Máximo en el carrito" : "Agregar al carrito"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductoCard
