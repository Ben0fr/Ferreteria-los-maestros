import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Table, Badge } from 'react-bootstrap';

const Carrito = () => {
    // 1. Estado del Carrito (Usamos Mock Data inicial para que no se vea vacío al probar)
    const [carrito, setCarrito] = useState([
        { id: 1, nombre: "Martillo de Uña Profesional", precio: 12500, cantidad: 1 },
        { id: 3, nombre: "Set de Destornilladores (6 piezas)", precio: 8990, cantidad: 2 }
    ]);

    // 2. Funciones controladoras del estado
    const vaciarCarrito = () => {
        // Al pasarle un arreglo vacío al estado, React automáticamente borra todo de la pantalla
        setCarrito([]);
    };

    const eliminarProducto = (id) => {
        // Filtramos el arreglo para dejar todos los productos EXCEPTO el que queremos eliminar
        const nuevoCarrito = carrito.filter(item => item.id !== id);
        setCarrito(nuevoCarrito);
    };

    // 3. Cálculo dinámico
    // Se ejecuta automáticamente cada vez que el estado "carrito" cambia
    const totalCarrito = carrito.reduce((acumulador, item) => {
        return acumulador + (item.precio * item.cantidad);
    }, 0);

    return (
        <Container className="mt-5 mb-5">
            <h1 className="mb-4">Carrito de Compras</h1>

            {/* Renderizado Condicional: ¿Qué pasa si el carrito está vacío? */}
            {carrito.length === 0 ? (
                <Card className="text-center p-5 shadow-sm border-0">
                    <Card.Body>
                        <div className="fs-1 mb-3">🛒</div>
                        <h3>Tu carrito está vacío</h3>
                        <p className="text-muted">Aún no has agregado ningún producto.</p>
                        <Button as={Link} to="/productos" variant="primary" size="lg" className="mt-3">
                            Ir al Catálogo
                        </Button>
                    </Card.Body>
                </Card>
            ) : (
                <Row>
                    {/* Columna de la lista de productos (Ocupa 8 de 12 espacios en pantallas grandes) */}
                    <Col lg={8}>
                        <Card className="shadow-sm border-0 mb-4">
                            <Card.Body className="p-0">
                                <Table responsive hover className="mb-0">
                                    <thead className="table-light">
                                    <tr>
                                        <th>Producto</th>
                                        <th className="text-center">Cantidad</th>
                                        <th className="text-end">Precio</th>
                                        <th className="text-center">Acción</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {/* Iteramos sobre el estado del carrito para pintar las filas */}
                                    {carrito.map((item) => (
                                        <tr key={item.id} className="align-middle">
                                            <td className="fw-bold">{item.nombre}</td>
                                            <td className="text-center">
                                                <Badge bg="secondary" pill className="fs-6">{item.cantidad}</Badge>
                                            </td>
                                            <td className="text-end text-primary fw-bold">
                                                ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                                            </td>
                                            <td className="text-center">
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    // IMPORTANTE: Los eventos con parámetros deben envolverse en una función flecha () =>
                                                    onClick={() => eliminarProducto(item.id)}
                                                >
                                                    Eliminar
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Columna del Resumen y Total (Ocupa 4 de 12 espacios) */}
                    <Col lg={4}>
                        <Card className="shadow-sm border-0 resumen-carrito">
                            <Card.Body>
                                <h3 className="mb-4 text-center">Resumen</h3>

                                <div className="d-flex justify-content-between mb-3 fs-5">
                                    <span>Subtotal:</span>
                                    <span className="fw-bold">${totalCarrito.toLocaleString('es-CL')}</span>
                                </div>

                                <hr />

                                <div className="d-flex justify-content-between mb-4 fs-4 text-primary fw-bold">
                                    <span>Total:</span>
                                    {/* Reemplazamos el <span id="total-carrito"> por la variable calculada dinámicamente */}
                                    <span>${totalCarrito.toLocaleString('es-CL')}</span>
                                </div>

                                <div className="d-grid gap-2">
                                    <Button variant="success" size="lg">
                                        Proceder al Pago
                                    </Button>

                                    {/* El onclick HTML nativo se cambia por onClick en camelCase */}
                                    <Button variant="danger" variant="outline-danger" onClick={vaciarCarrito}>
                                        Vaciar Carrito
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Carrito;