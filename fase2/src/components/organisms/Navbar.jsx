import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NavigationBar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                {/* El atributo 'as={Link}' le dice a React Bootstrap que use el enrutador SPA sin recargar la página */}
                <Navbar.Brand as={Link} to="/">Ferretería Los Maestros</Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
                        <Nav.Link as={Link} to="/nosotros" active>Nosotros</Nav.Link>
                        <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
                        <Nav.Link as={Link} to="/carrito">Carrito</Nav.Link>

                        {/* Botones de autenticación convertidos a componentes Button de React */}
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

                        {/* Nota técnica: La lógica de mostrar/ocultar el usuario y el botón de cerrar sesión
                se implementará más adelante utilizando el estado (useState) de React. */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;