import { Link } from 'react-router-dom'
import { articulosBlog } from '../data/blog'

// Lista de artículos del blog
const Blog = () => {
    return (
        <>
            <div className="hero-ferreteria mb-5">
                <div className="container py-5 text-center">
                    <h1 className="display-5 fw-bold">Blog Ferretería Los Maestros</h1>
                    <p className="fs-5">Descubre consejos, datos útiles y recomendaciones para tus proyectos</p>
                </div>
            </div>

            <main className="container mb-5">
                <div className="row">
                    {articulosBlog.map((articulo) => (
                        <div className="col-md-6" key={articulo.id}>
                            <div className="card h-100">
                                <img src={articulo.imagen} className="card-img-top" alt={articulo.altCard} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{articulo.tituloCard}</h5>
                                    <p className="card-text">{articulo.resumen}</p>
                                    <Link to={`/blog/${articulo.id}`} className="btn btn-primary mt-auto">Leer más</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export default Blog
