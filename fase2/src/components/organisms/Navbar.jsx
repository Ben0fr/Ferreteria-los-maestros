import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { useSesion } from '../../context/useSesion'

// Menú superior de la tienda. Cambia según haya o no un usuario con sesión iniciada
const NavigationBar = () => {
    const { usuario, cerrarSesion } = useSesion()
    const navigate = useNavigate()

    // Cierra la sesión y lleva al usuario al inicio
    const manejarCerrarSesion = () => {
        cerrarSesion()
        navigate('/')
    }

    return (
        <Navbar bg="light" expand="lg" className="navbar-light">
            <Container>
                <Navbar.Brand as={Link} to="/">Ferretería Los Maestros</Navbar.Brand>

                {/* Botón hamburguesa (solo se ve en pantallas chicas) */}
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="ms-auto align-items-lg-center">
                        {/* NavLink marca como activa la página en la que estás */}
                        <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
                        <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
                        <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
                        <Nav.Link as={NavLink} to="/blog">Blog</Nav.Link>
                        <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
                        <Nav.Link as={NavLink} to="/carrito">Carrito</Nav.Link>

                        {usuario === null ? (
                            <>
                                {/* Sin sesión: botones para iniciar sesión o registrarse */}
                                <Nav.Item className="ms-lg-2">
                                    <Button variant="outline-primary" size="sm" as={Link} to="/login">
                                        Iniciar Sesión
                                    </Button>
                                </Nav.Item>
                                <Nav.Item className="ms-lg-2 mt-2 mt-lg-0">
                                    <Button variant="primary" size="sm" as={Link} to="/registro">
                                        Registrarse
                                    </Button>
                                </Nav.Item>
                            </>
                        ) : (
                            <>
                                {/* Con sesión: saludo y botón para cerrar sesión */}
                                <Nav.Item className="ms-lg-3">
                                    <span className="fw-bold">Hola, {usuario.nombre}</span>
                                </Nav.Item>
                                <Nav.Item className="ms-lg-2 mt-2 mt-lg-0">
                                    <Button variant="outline-secondary" size="sm" onClick={manejarCerrarSesion}>
                                        Cerrar sesión
                                    </Button>
                                </Nav.Item>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar
