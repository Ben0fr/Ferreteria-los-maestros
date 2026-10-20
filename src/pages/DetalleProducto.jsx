import { Link, useParams } from 'react-router-dom'
import { buscarProductoPorId } from '../servicios/tienda'
import { useSelectorCantidad } from '../utils/useSelectorCantidad'
import { formatearPrecio } from '../utils/validaciones'

// Contenido del detalle cuando el producto existe (separado para poder usar el selector de cantidad)
const DetalleContenido = ({ producto }) => {
    const { texto, maximo, enCarrito, manejarCambio, manejarBlur, agregar } = useSelectorCantidad(producto)
    const todoEnCarrito = producto.stock > 0 && maximo === 0

    return (
        <div className="card">
            <div className="card-body">
                <img src={`/img/icons/${producto.icono}`} alt={producto.nombre} className="icono-producto d-block mx-auto mb-3" />
                <h2 className="card-title">{producto.nombre}</h2>

                <p>Código: {producto.codigo}</p>
                <p>Categoría: {producto.categoria}</p>
                <p>Precio: ${formatearPrecio(producto.precio)}</p>
                <p>Stock: {producto.stock} unidades</p>
                {enCarrito > 0 && <p className="small text-muted">En tu carrito: {enCarrito}</p>}

                {producto.stock > 0 && (
                    <div className="input-group mb-3" style={{ maxWidth: "220px" }}>
                        <label htmlFor="detalle-cantidad" className="input-group-text">Cantidad</label>
                        <input
                            type="number"
                            id="detalle-cantidad"
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

                <button type="button" className="btn btn-primary me-2" onClick={agregar} disabled={producto.stock === 0 || todoEnCarrito}>
                    {producto.stock === 0 ? "Sin stock" : todoEnCarrito ? "Máximo en el carrito" : "Agregar al carrito"}
                </button>
                <Link to="/productos" className="btn btn-secondary">Volver al catálogo</Link>
            </div>
        </div>
    )
}

// Detalle de un producto (el id viene en la dirección: /productos/3)
const DetalleProducto = () => {
    const { id } = useParams()
    const producto = buscarProductoPorId(Number(id))

    return (
        <main className="container mt-5 mb-5">
            <h1 className="mb-4">Detalle del Producto</h1>

            {producto === undefined ? (
                // Si el id no existe, se muestra un mensaje de error
                <div className="alert alert-danger">Producto no encontrado</div>
            ) : (
                <DetalleContenido producto={producto} />
            )}
        </main>
    )
}

export default DetalleProducto
