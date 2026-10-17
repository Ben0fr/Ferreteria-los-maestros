import { Link, useParams } from 'react-router-dom'
import { buscarProductoPorId, agregarAlCarrito } from '../servicios/tienda'
import { formatearPrecio } from '../utils/validaciones'

// Detalle de un producto (el id viene en la dirección: /productos/3)
const DetalleProducto = () => {
    const { id } = useParams()
    const producto = buscarProductoPorId(Number(id))

    // Agrega el producto al carrito y avisa al usuario
    const manejarAgregar = () => {
        agregarAlCarrito(producto.id)
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
                        <div className="fs-1 text-center">{producto.icono}</div>
                        <h2 className="card-title">{producto.nombre}</h2>

                        <p>Código: {producto.codigo}</p>
                        <p>Categoría: {producto.categoria}</p>
                        <p>Precio: ${formatearPrecio(producto.precio)}</p>
                        <p>Stock: {producto.stock} unidades</p>

                        <button type="button" className="btn btn-primary me-2" onClick={manejarAgregar}>
                            Agregar al carrito
                        </button>
                        <Link to="/productos" className="btn btn-secondary">Volver al catálogo</Link>
                    </div>
                </div>
            )}
        </main>
    )
}

export default DetalleProducto
