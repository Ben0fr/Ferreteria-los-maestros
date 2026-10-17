import { Link } from 'react-router-dom'

// Pie de página con la información de la ferretería y enlaces rápidos
const Footer = () => {
    return (
        <footer className="footer-ferreteria mt-5">
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <h5>Ferretería Los Maestros</h5>
                        <p className="mb-1">Materiales, herramientas y productos para tus proyectos.</p>
                        <p className="mb-0">La Serena, Región de Coquimbo</p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <h5>Enlaces</h5>
                        <Link to="/productos" className="footer-link">Productos</Link>
                        <span> | </span>
                        <Link to="/nosotros" className="footer-link">Nosotros</Link>
                        <span> | </span>
                        <Link to="/contacto" className="footer-link">Contacto</Link>
                        <span> | </span>
                        <Link to="/blog" className="footer-link">Blog</Link>
                    </div>
                </div>

                <hr />

                <p className="text-center mb-0">© 2026 Ferretería Los Maestros</p>
            </div>
        </footer>
    )
}

export default Footer
