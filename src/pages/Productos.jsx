import { Link, useSearchParams } from 'react-router-dom'
import ProductoCard from '../components/molecules/ProductoCard'
import { obtenerProductos } from '../servicios/tienda'

// Catálogo de productos. Si la URL trae ?categoria=..., muestra solo esa categoría
const Productos = () => {
    const [parametros] = useSearchParams()
    const categoriaFiltro = parametros.get("categoria")

    // Lista de productos a mostrar (todos, o solo los de la categoría elegida)
    const productos = obtenerProductos()
    const productosAMostrar = productos.filter(
        (p) => categoriaFiltro === null || p.categoriaSlug === categoriaFiltro
    )

    // Texto que indica qué categoría se está viendo
    let tituloCategoria = null
    if (categoriaFiltro !== null) {
        tituloCategoria = productosAMostrar.length > 0
            ? <>Mostrando: {productosAMostrar[0].categoria} — <Link to="/productos">Ver todos los productos</Link></>
            : <>No hay productos en esa categoría. <Link to="/productos">Ver todos los productos</Link></>
    }

    return (
        <div className="container mt-5 mb-5">
            <h1 className="mb-1">Catálogo de Productos</h1>
            <p className="text-body-secondary mb-4">{tituloCategoria}</p>

            <div className="row">
                {productosAMostrar.map((producto) => (
                    <ProductoCard key={producto.id} producto={producto} />
                ))}
            </div>
        </div>
    )
}

export default Productos
