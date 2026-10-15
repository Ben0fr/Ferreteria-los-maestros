import { Link } from 'react-router-dom'
import { agregarAlCarrito } from '../../servicios/tienda'
import { formatearPrecio } from '../../utils/validaciones'

// Tarjeta de un producto en el catálogo
const ProductoCard = ({ producto }) => {
    // Agrega el producto al carrito y avisa al usuario
    const manejarAgregar = () => {
        agregarAlCarrito(producto.id)
        alert("Producto agregado al carrito")
    }

    return (
        <div className="col-md-4">
            <div className="card h-100">
                <div className="card-body text-center d-flex flex-column justify-content-between">
                    <div>
                        <div className="fs-1 mb-2">{producto.icono}</div>
                        <h5 className="card-title">{producto.nombre}</h5>
                        <p className="card-text mb-1">Categoría: {producto.categoria}</p>
                        <p className="card-text mb-1 fw-bold">Precio: ${formatearPrecio(producto.precio)}</p>
                        <p className="card-text text-muted mb-3">Stock: {producto.stock} unidades</p>
                    </div>

                    <div className="d-grid gap-2">
                        <Link to={`/productos/${producto.id}`} className="btn btn-outline-secondary">
                            Ver detalle
                        </Link>
                        <button type="button" className="btn btn-primary" onClick={manejarAgregar}>
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductoCard
