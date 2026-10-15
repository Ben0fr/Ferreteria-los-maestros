import { Link } from 'react-router-dom'
import { categoriasInicio } from '../data/productos'

// Página de inicio: portada, categorías, beneficios y llamado a la acción
const Home = () => {
    return (
        <>
            {/* Portada con el mensaje de bienvenida */}
            <div className="hero-ferreteria mb-5">
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-md-7">
                            <h1 className="display-5 fw-bold">Todo lo que necesitas para tu proyecto</h1>
                            <p className="fs-4">Herramientas y materiales de calidad para tu hogar o tu obra.</p>
                            <Link className="btn btn-primary btn-lg" to="/productos">Ver productos</Link>
                        </div>
                        <div className="col-md-5 text-center mt-4 mt-md-0">
                            <div className="fs-1">🔨 🔧 🪛</div>
                            <div className="fs-1">🧱 🎨 🦺</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categorías: cada una lleva al catálogo filtrado */}
            <div className="container mb-5">
                <h2 className="text-center mb-4">Categorías principales</h2>
                <div className="row">
                    {categoriasInicio.map((categoria) => (
                        <div className="col-md-4 mb-3" key={categoria.slug}>
                            <Link to={`/productos?categoria=${categoria.slug}`} className="text-decoration-none text-reset">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <div className="fs-1">{categoria.icono}</div>
                                        <h5 className="card-title">{categoria.titulo}</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Beneficios de comprar en la ferretería */}
            <div className="container mb-5">
                <h2 className="text-center mb-4">¿Por qué comprar en Los Maestros?</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="fs-1 text-center">📦</div>
                                <h5 className="card-title text-center">Stock real</h5>
                                <p className="card-text">Lo que ves en la página es lo que hay en la tienda, sin sorpresas.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="fs-1 text-center">🔧</div>
                                <h5 className="card-title text-center">Asesoría técnica</h5>
                                <p className="card-text">Te ayudamos a elegir el material o la herramienta correcta.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="fs-1 text-center">🚚</div>
                                <h5 className="card-title text-center">Despacho a todo Chile</h5>
                                <p className="card-text">Retira en tienda o recibe tu pedido donde estés trabajando.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cartel final */}
            <div className="cta-ferreteria p-5 mb-5 rounded text-center">
                <div className="container">
                    <h2 className="mb-3">¿Ya sabes qué necesitas?</h2>
                    <Link to="/productos" className="btn btn-primary btn-lg">Ir al catálogo</Link>
                </div>
            </div>
        </>
    )
}

export default Home
