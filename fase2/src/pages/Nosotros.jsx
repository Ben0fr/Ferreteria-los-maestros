import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Nosotros = () => {
    return (
        <>
            {/* Encabezado de la página */}
            <div className="hero-ferreteria mb-5">
                <Container className="py-5 text-center">
                    <h1 className="display-4 fw-bold">Sobre Nosotros</h1>
                    <p className="fs-5 text-muted">Más de 20 años acompañando a los maestros y familias en sus proyectos de construcción y hogar.</p>
                </Container>
            </div>

            {/* Historia y Misión */}
            <Container className="mb-5">
                <Row className="align-items-center mb-5">
                    <Col md={6}>
                        <h2>Nuestra Historia</h2>
                        <p>Ferretería Los Maestros nació con el compromiso de ofrecer herramientas de calidad, materiales resistentes y la mejor atención técnica de la zona.</p>
                        <p>Nos enorgullece trabajar de la mano con maestros constructores, hobbistas y empresas locales para llevar cada proyecto al éxito.</p>
                    </Col>
                    <Col md={6} className="text-center">
                        <div className="p-5 bg-light rounded border">
                            <span className="fs-1">🏗️ 🏠 🛠️</span>
                            <p className="mt-2 text-muted fw-bold">Compromiso y Calidad Garantizada</p>
                        </div>
                    </Col>
                </Row>

                {/* Valores de la empresa convertidos a componente Card de React Bootstrap */}
                <h2 className="text-center mb-4">Lo que nos define</h2>
                <Row className="text-center mb-5">
                    <Col md={4} className="mb-3">
                        <Card className="h-100 p-3">
                            <div className="fs-1 text-primary">🤝</div>
                            <Card.Body>
                                <Card.Title className="mt-2">Atención Personalizada</Card.Title>
                                <Card.Text className="text-muted">Asesoría técnica para seleccionar los materiales adecuados.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-3">
                        <Card className="h-100 p-3">
                            <div className="fs-1 text-primary">⚡</div>
                            <Card.Body>
                                <Card.Title className="mt-2">Entrega Rápida</Card.Title>
                                <Card.Text className="text-muted">Despachos a domicilio y retiros prioritarios en tienda.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-3">
                        <Card className="h-100 p-3">
                            <div className="fs-1 text-primary">🛡️</div>
                            <Card.Body>
                                <Card.Title className="mt-2">Garantía Directa</Card.Title>
                                <Card.Text className="text-muted">Todos nuestros productos cuentan con respaldo de fábrica.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Información de Contacto y Datos Clave */}
                <Card className="bg-light border-0 p-4">
                    <h3 className="mb-4 text-center">Datos de la Empresa</h3>
                    <Row>
                        <Col md={4} className="mb-3 mb-md-0">
                            <h5>📍 Dirección</h5>
                            {/* Nota: En JSX las etiquetas vacías deben cerrarse con '/' */}
                            <p className="text-muted mb-0">Av. Los Maestros 1234, Local 5<br />La serena, Chile</p>
                        </Col>
                        <Col md={4} className="mb-3 mb-md-0">
                            <h5>📞 Teléfonos</h5>
                            <p className="text-muted mb-0">Mesa Central: +56 2 2345 6789<br />Ventas WhatsApp: +56 9 8765 4321</p>
                        </Col>
                        <Col md={4}>
                            <h5>⏰ Horarios de Atención</h5>
                            <p className="text-muted mb-0">Lunes a Viernes: 08:00 - 18:30 hrs<br />Sábados: 09:00 - 14:00 hrs</p>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </>
    );
};

export default Nosotros;