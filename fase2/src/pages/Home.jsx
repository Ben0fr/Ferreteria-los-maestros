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
                            <div>
                                <img src="/img/icons/martillo.svg" alt="Martillo" className="icono-hero" />
                                <img src="/img/icons/llave.svg" alt="Llave" className="icono-hero" />
                                <img src="/img/icons/destornillador.svg" alt="Destornillador" className="icono-hero" />
                            </div>
                            <div>
                                <img src="/img/icons/ladrillos.svg" alt="Materiales de construcción" className="icono-hero" />
                                <img src="/img/icons/pintura.svg" alt="Pintura" className="icono-hero" />
                                <img src="/img/icons/guante.svg" alt="Guantes de seguridad" className="icono-hero" />
                            </div>
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
                                        <img src={`/img/icons/${categoria.icono}`} alt={categoria.titulo} className="icono-img" />
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
                            <div className="card-body text-center">
                                <img src="/img/icons/caja.svg" alt="Stock real" className="icono-img mb-2" />
                                <h5 className="card-title">Stock real</h5>
                                <p className="card-text">Lo que ves en la página es lo que hay en la tienda, sin sorpresas.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body text-center">
                                <img src="/img/icons/llave.svg" alt="Asesoría técnica" className="icono-img mb-2" />
                                <h5 className="card-title">Asesoría técnica</h5>
                                <p className="card-text">Te ayudamos a elegir el material o la herramienta correcta.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body text-center">
                                <img src="/img/icons/camion.svg" alt="Despacho a todo Chile" className="icono-img mb-2" />
                                <h5 className="card-title">Despacho a todo Chile</h5>
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
