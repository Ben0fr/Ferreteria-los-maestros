import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const Registro = () => {
    // 1. Estados independientes para cada campo del formulario
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    // Estado para capturar y mostrar los errores
    const [errores, setErrores] = useState({});

    // 2. Función de validación y envío sin recargar la página
    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevosErrores = {};

        // Validaciones estrictas
        if (!nombre.trim()) {
            nuevosErrores.nombre = 'El nombre completo es obligatorio.';
        }

        if (!email) {
            nuevosErrores.email = 'El correo electrónico es obligatorio.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            nuevosErrores.email = 'El formato del correo es inválido.';
        }

        if (!password) {
            nuevosErrores.password = 'La contraseña es obligatoria.';
        } else if (password.length < 6) {
            nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres.';
        }

        if (!passwordConfirm) {
            nuevosErrores.passwordConfirm = 'Debes repetir la contraseña.';
        } else if (password !== passwordConfirm) {
            nuevosErrores.passwordConfirm = 'Las contraseñas no coinciden.';
        }

        // Si el objeto de errores tiene propiedades, detenemos el envío y los mostramos
        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        // Si todo es correcto, limpiamos errores
        setErrores({});

        // Simulación de envío exitoso
        console.log('Nuevo usuario registrado:', { nombre, email, password });
        alert('Cuenta creada exitosamente. Revisa la consola.');

        // Aquí podrías usar useNavigate() de react-router-dom para redirigir al /login automáticamente
    };

    return (
        <Container className="mt-5 mb-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <h1 className="mb-4 text-center">Crear Cuenta</h1>

                            <Form onSubmit={handleSubmit}>

                                {/* Campo de Nombre */}
                                <Form.Group className="mb-3" controlId="registro-nombre">
                                    <Form.Label>Nombre completo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ej: Juan Pérez"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        isInvalid={!!errores.nombre}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errores.nombre}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Campo de Correo */}
                                <Form.Group className="mb-3" controlId="registro-email">
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="ejemplo@correo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        isInvalid={!!errores.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errores.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Campo de Contraseña */}
                                <Form.Group className="mb-3" controlId="registro-password">
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

                                {/* Campo de Repetir Contraseña */}
                                <Form.Group className="mb-3" controlId="registro-passwordConfirm">
                                    <Form.Label>Repetir contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Repite tu contraseña"
                                        value={passwordConfirm}
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
                                        isInvalid={!!errores.passwordConfirm}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errores.passwordConfirm}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    Crear cuenta
                                </Button>
                            </Form>

                            <p className="text-center mt-3">
                                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Registro;