import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const Login = () => {
    // 1. Declaración estricta del estado para cada campo del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Estado para manejar los mensajes de error en la validación
    const [errores, setErrores] = useState({});

    // 2. Función controladora del envío del formulario
    const handleSubmit = (e) => {
        // CRÍTICO: Previene que el navegador recargue la página, destruyendo la SPA
        e.preventDefault();

        const nuevosErrores = {};

        // 3. Validación lógica sin tocar el DOM
        if (!email) {
            nuevosErrores.email = 'El correo electrónico es obligatorio.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            nuevosErrores.email = 'El formato del correo es inválido.';
        }

        if (!password) {
            nuevosErrores.password = 'La contraseña es obligatoria.';
        }

        // Si hay errores, actualizamos el estado para que React vuelva a renderizar y los muestre
        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        // Si pasa la validación, limpiamos errores
        setErrores({});

        // Aquí, en el futuro, harás la petición a tu Backend en AWS
        console.log('Datos listos para enviar al backend:', { email, password });
        alert('Validación exitosa. Revisa la consola.');
    };

    return (
        <Container className="mt-5 mb-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <h1 className="mb-4 text-center">Iniciar Sesión</h1>

                            {/* El evento onSubmit reemplaza al onsubmit nativo */}
                            <Form onSubmit={handleSubmit}>

                                {/* Campo de Correo Electrónico */}
                                <Form.Group className="mb-3" controlId="login-email">
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="ejemplo@correo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        isInvalid={!!errores.email}
                                    />
                                    {/* Renderizado condicional del error */}
                                    <Form.Control.Feedback type="invalid">
                                        {errores.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Campo de Contraseña */}
                                <Form.Group className="mb-3" controlId="login-password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Ingresa tu contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        isInvalid={!!errores.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errores.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    Ingresar
                                </Button>
                            </Form>

                            <p className="text-center mt-3">
                                ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;