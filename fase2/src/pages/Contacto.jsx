import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const Contacto = () => {
    // 1. Estados independientes para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [comentario, setComentario] = useState('');

    // 2. Estados para manejar la lógica de la interfaz
    const [errores, setErrores] = useState({});
    const [enviado, setEnviado] = useState(false);

    // 3. Función controladora del envío
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la SPA se recargue
        const nuevosErrores = {};

        // Validaciones estrictas
        if (!nombre.trim()) {
            nuevosErrores.nombre = 'El nombre es obligatorio.';
        }

        if (!email) {
            nuevosErrores.email = 'El correo electrónico es obligatorio.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            nuevosErrores.email = 'El formato del correo es inválido.';
        }

        if (!comentario.trim()) {
            nuevosErrores.comentario = 'El comentario es obligatorio.';
        } else if (comentario.length < 10) {
            nuevosErrores.comentario = 'El comentario debe ser más descriptivo (mínimo 10 caracteres).';
        }

        // Si hay errores, se muestran y detenemos la ejecución
        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            setEnviado(false);
            return;
        }

        // Si todo es correcto:
        setErrores({});
        setEnviado(true);

        // Aquí enviarías los datos a tu backend en AWS EC2
        console.log('Mensaje de contacto listo para enviar:', { nombre, email, comentario });

        // Limpiamos los campos del formulario dejándolos en blanco
        setNombre('');
        setEmail('');
        setComentario('');
    };

    return (
        <Container className="mt-5 mb-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <h1 className="text-center">Contáctanos</h1>
                    <p className="text-center text-muted mb-4">
                        Envíanos tu consulta y nos pondremos en contacto contigo.
                    </p>

                    <Card className="shadow-sm border-0">
                        <Card.Body>

                            {/* Renderizado Condicional: Reemplaza el antiguo d-none */}
                            {enviado && (
                                <Alert variant="success" onClose={() => setEnviado(false)} dismissible>
                                    Mensaje enviado correctamente.
                                </Alert>
                            )}

                            {/* El atributo noValidate desactiva las alertas feas del navegador
                  para usar las alertas bonitas de React Bootstrap */}
                            <Form onSubmit={handleSubmit} noValidate>

                                <Form.Group className="mb-3" controlId="contacto-nombre">
                                    <Form.Label>Nombre:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        maxLength="100"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        isInvalid={!!errores.nombre}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errores.nombre}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="contacto-email">
                                    <Form.Label>Correo electrónico:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        maxLength="100"
                                        placeholder="ejemplo@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        isInvalid={!!errores.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errores.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* El textarea en React Bootstrap se hace usando el atributo as="textarea" */}
                                <Form.Group className="mb-3" controlId="contacto-comentario">
                                    <Form.Label>Comentario</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        maxLength="500"
                                        value={comentario}
                                        onChange={(e) => setComentario(e.target.value)}
                                        isInvalid={!!errores.comentario}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errores.comentario}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    Enviar mensaje
                                </Button>

                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Contacto;