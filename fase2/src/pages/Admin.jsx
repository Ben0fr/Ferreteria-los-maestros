import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// Importamos el menú lateral que acabamos de crear
import AdminSidebar from '../components/organisms/AdminSidebar';

const Admin = () => {
    return (
        // container-fluid permite que el layout ocupe el 100% del ancho de la pantalla
        <Container fluid className="p-0">
            <Row className="g-0">

                {/* Inyectamos el componente del menú lateral */}
                <AdminSidebar />

                {/* Contenido principal */}
                <Col md={9} lg={10} className="p-4 bg-light min-vh-100">
                    <h1 className="mb-2">Panel de Administración</h1>
                    <p className="text-muted mb-5">
                        Gestión de productos y usuarios de Ferretería Los Maestros.
                    </p>

                    <Row>
                        {/* Tarjeta de Gestión de Productos */}
                        <Col md={6} className="mb-4">
                            <Card className="h-100 shadow-sm border-0 text-center">
                                <Card.Body>
                                    <div className="fs-1 mb-3">📦</div>
                                    <h3>Productos</h3>
                                    <p className="text-muted mb-4">
                                        Visualiza y administra los productos disponibles en la tienda.
                                    </p>
                                    <Button as={Link} to="/admin/productos" variant="primary">
                                        Gestionar productos
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Tarjeta de Gestión de Usuarios */}
                        <Col md={6} className="mb-4">
                            <Card className="h-100 shadow-sm border-0 text-center">
                                <Card.Body>
                                    <div className="fs-1 mb-3">👥</div>
                                    <h3>Usuarios</h3>
                                    <p className="text-muted mb-4">
                                        Visualiza y administra los usuarios del sistema.
                                    </p>
                                    <Button as={Link} to="/admin/usuarios" variant="primary">
                                        Gestionar usuarios
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </Container>
    );
};

export default Admin;