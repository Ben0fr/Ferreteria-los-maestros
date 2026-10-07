import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

// Recibe la función 'onAddProduct' como prop desde el componente padre
const ProductForm = ({ onAddProduct }) => {
    // 1. Un solo estado en formato de objeto para manejar todos los inputs a la vez
    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        stockCritico: '',
        categoria: ''
    });

    // 2. Función dinámica para capturar lo que el usuario escribe
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    // 3. Envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Crítico: Evita que la página se recargue

        // Le pasamos el nuevo producto al componente padre (AdminProductos)
        onAddProduct({
            id: Date.now(), // Generamos un ID único simulado
            ...formData,
            precio: parseFloat(formData.precio),
            stock: parseInt(formData.stock)
        });

        // Vaciamos el formulario después de guardar
        setFormData({
            codigo: '', nombre: '', descripcion: '', precio: '', stock: '', stockCritico: '', categoria: ''
        });
        alert('Producto añadido con éxito (Simulado para la vista)');
    };

    return (
        <Card className="mb-5 shadow-sm border-0">
            <Card.Body>
                <h4 className="mb-4">Nuevo Producto</h4>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6} className="mb-3">
                            {/* Nota: En React Bootstrap el 'id' se pasa al controlId del Form.Group */}
                            <Form.Group controlId="codigo">
                                <Form.Label>Código</Form.Label>
                                <Form.Control type="text" minLength="3" required value={formData.codigo} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" maxLength="100" required value={formData.nombre} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="descripcion" className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" rows={3} maxLength="500" value={formData.descripcion} onChange={handleChange} />
                    </Form.Group>

                    <Row>
                        <Col md={4} className="mb-3">
                            <Form.Group controlId="precio">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control type="number" min="0" step="0.01" required value={formData.precio} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group controlId="stock">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control type="number" min="0" step="1" required value={formData.stock} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group controlId="stockCritico">
                                <Form.Label>Stock Crítico</Form.Label>
                                <Form.Control type="number" min="0" step="1" value={formData.stockCritico} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="categoria">
                                <Form.Label>Categoría</Form.Label>
                                <Form.Select required value={formData.categoria} onChange={handleChange}>
                                    <option value="">Seleccionar</option>
                                    <option value="Herramientas manuales">Herramientas manuales</option>
                                    <option value="Herramientas eléctricas">Herramientas eléctricas</option>
                                    <option value="Materiales de construcción">Materiales de construcción</option>
                                    <option value="Pinturas">Pinturas</option>
                                    <option value="Seguridad y EPP">Seguridad y EPP</option>
                                    <option value="Ferretería general">Ferretería general</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="imagen">
                                <Form.Label>Imagen</Form.Label>
                                {/* Los inputs de tipo file no se controlan con 'value' en React básico */}
                                <Form.Control type="file" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button variant="primary" type="submit">
                        Guardar producto
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ProductForm;