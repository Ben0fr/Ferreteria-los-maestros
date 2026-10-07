import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="footer-ferreteria mt-5">
            <Container className="py-4">
                <Row>
                    <Col md={6} className="mb-3 mb-md-0">
                        <h5>Ferretería Los Maestros</h5>
                        <p className="mb-1">Materiales, herramientas y productos para tus proyectos.</p>
                        <p className="mb-0">La Serena, Región de Coquimbo</p>
                    </Col>
                    <Col md={6} className="text-md-end">
                        <h5>Enlaces</h5>
                        <Link to="/productos" className="footer-link">Productos</Link>
                        <span> | </span>
                        <Link to="/nosotros" className="footer-link">Nosotros</Link>
                        <span> | </span>
                        <Link to="/contacto" className="footer-link">Contacto</Link>
                        <span> | </span>
                        <Link to="/blog" className="footer-link">Blog</Link>
                    </Col>
                </Row>

                {/* Etiqueta cerrada correctamente para JSX */}
                <hr />

                <p className="text-center mb-0">© 2026 Ferretería Los Maestros</p>
            </Container>
        </footer>
    );
};

export default Footer;