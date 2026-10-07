import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const UserForm = ({ onAddUser }) => {
    // 1. Estado centralizado para todos los campos del usuario
    const [formData, setFormData] = useState({
        run: '',
        nombre: '',
        apellidos: '',
        correo: '',
        fechaNacimiento: '',
        tipo: '',
        region: '',
        comuna: '',
        direccion: ''
    });

    // 2. Manejador dinámico de cambios
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    // 3. Envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Le pasamos el nuevo usuario al componente padre (AdminUsuarios)
        onAddUser({
            id: Date.now(), // ID único simulado
            ...formData
        });

        // Vaciamos el formulario
        setFormData({
            run: '', nombre: '', apellidos: '', correo: '', fechaNacimiento: '',
            tipo: '', region: '', comuna: '', direccion: ''
        });
        alert('Usuario registrado con éxito (Simulado)');
    };

    return (
        <Card className="mb-5 shadow-sm border-0">
            <Card.Body>
                <h4 className="mb-4">Nuevo Usuario</h4>
                <Form onSubmit={handleSubmit}>

                    <Row>
                        <Col md={4} className="mb-3">
                            <Form.Group controlId="run">
                                <Form.Label>RUN</Form.Label>
                                <Form.Control type="text" minLength="7" maxLength="9" placeholder="19011022K" required value={formData.run} onChange={handleChange} />
                                <Form.Text className="text-muted">Sin puntos ni guion.</Form.Text>
                            </Form.Group>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group controlId="nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" maxLength="50" required value={formData.nombre} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group controlId="apellidos">
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control type="text" maxLength="100" required value={formData.apellidos} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="correo">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control type="email" maxLength="100" placeholder="usuario@gmail.com" required value={formData.correo} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="fechaNacimiento">
                                <Form.Label>Fecha de nacimiento</Form.Label>
                                <Form.Control type="date" value={formData.fechaNacimiento} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4} className="mb-3">
                            <Form.Group controlId="tipo">
                                <Form.Label>Tipo de usuario</Form.Label>
                                <Form.Select required value={formData.tipo} onChange={handleChange}>
                                    <option value="">Seleccionar</option>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Cliente">Cliente</option>
                                    <option value="Vendedor">Vendedor</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group controlId="region">
                                <Form.Label>Región</Form.Label>
                                <Form.Select value={formData.region} onChange={handleChange}>
                                    <option value="">Seleccionar región</option>
                                    <option value="Coquimbo">Región de Coquimbo</option>
                                    <option value="Valparaiso">Región de Valparaíso</option>
                                    <option value="Metropolitana">Región Metropolitana</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group controlId="comuna">
                                <Form.Label>Comuna</Form.Label>
                                <Form.Select value={formData.comuna} onChange={handleChange}>
                                    <option value="">Seleccionar comuna</option>
                                    <option value="La Serena">La Serena</option>
                                    <option value="Coquimbo">Coquimbo</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="direccion" className="mb-4">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control type="text" maxLength="300" required value={formData.direccion} onChange={handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Guardar usuario
                    </Button>

                </Form>
            </Card.Body>
        </Card>
    );
};

export default UserForm;