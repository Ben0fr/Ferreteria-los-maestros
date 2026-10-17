import { Link, useParams } from 'react-router-dom'
import { articulosBlog } from '../data/blog'

// Artículo completo del blog (el id viene en la dirección: /blog/1)
const DetalleBlog = () => {
    const { id } = useParams()
    const articulo = articulosBlog.find((a) => a.id === Number(id))

    return (
        <main className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <Link to="/blog" className="btn btn-outline-secondary mb-4">← Volver al Blog</Link>

                    {articulo === undefined ? (
                        // Si el artículo no existe, se muestra un mensaje
                        <div className="alert alert-danger">Artículo no encontrado</div>
                    ) : (
                        <>
                            <h1 className="mb-4">{articulo.titulo}</h1>
                            <img src={articulo.imagen} className="img-fluid rounded mb-4" alt={articulo.altDetalle} />
                            {articulo.parrafos.map((parrafo, i) => (
                                <p key={i}>{parrafo}</p>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </main>
    )
}

export default DetalleBlog
