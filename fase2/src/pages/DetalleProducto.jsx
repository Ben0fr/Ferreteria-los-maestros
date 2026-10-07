import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

// SIMULACIÓN DE BASE DE DATOS:
// Como aún no tienes tu backend en AWS, creamos un arreglo temporal (Mock Data).
// En el futuro, esto se reemplazará por una petición fetch() a tu API.
const productosDB = [
    {
        id: 1,
        nombre: "Martillo de Uña Profesional",
        precio: 12500,
        descripcion: "Martillo forjado en acero con mango ergonómico antideslizante, ideal para carpintería y construcción.",
        categoria: "Herramientas Manuales",
        stock: 15
    },
    {
        id: 2,
        nombre: "Taladro Percutor 700W",
        precio: 45990,
        descripcion: "Taladro de alta potencia con velocidad variable y función de percusión para perforar concreto y madera.",
        categoria: "Herramientas Eléctricas",
        stock: 8
    }
];

const DetalleProducto = () => {
    // 1. Capturamos el parámetro dinámico ':id' desde la URL
    const { id } = useParams();

    // 2. Buscamos el producto en nuestra "base de datos"
    // Convertimos el id de la URL (string) a número entero (parseInt)
    const producto = productosDB.find((prod) => prod.id === parseInt(id));

    // 3. Renderizado Condicional: Qué pasa si el usuario ingresa una URL con un ID que no existe
    if (!producto) {
        return (
            <Container className="mt-5 text-center">
                <h2>Producto no encontrado</h2>
                <p className="text-muted">El producto que buscas no existe o ha sido retirado.</p>
                <Button as={Link} to="/productos" variant="primary">Volver al catálogo</Button>
            </Container>
        );
    }

    // 4. Renderizado del producto encontrado usando React Bootstrap
    return (
        <Container className="mt-5 mb-5">
            <Row>
                {/* Columna de la Imagen (Simulada por ahora con un placeholder) */}
                <Col md={6} className="mb-4">
                    <Card className="border-0 shadow-sm">
                        <div className="bg-light d-flex justify-content-center align-items-center" style={{ height: '400px', fontSize: '4rem' }}>
                            🛠️
                        </div>
                    </Card>
                </Col>

                {/* Columna de la Información */}
                <Col md={6}>
                    <Badge bg="secondary" className="mb-2">{producto.categoria}</Badge>
                    <h1 className="fw-bold">{producto.nombre}</h1>
                    <h2 className="text-primary mb-4">${producto.precio.toLocaleString('es-CL')}</h2>

                    <p className="fs-5 text-muted">{producto.descripcion}</p>

                    <div className="mt-4 p-3 bg-light rounded border">
                        <p className="mb-2"><strong>Disponibilidad:</strong> {producto.stock > 0 ? `${producto.stock} unidades en stock` : 'Agotado'}</p>
                        <p className="mb-0 text-success fw-bold">✓ Envío disponible a Viña del Mar y alrededores</p>
                    </div>

                    <div className="mt-4 d-grid gap-2 d-md-flex">
                        <Button variant="success" size="lg" className="px-4">
                            🛒 Agregar al Carrito
                        </Button>
                        <Button as={Link} to="/productos" variant="outline-secondary" size="lg">
                            Volver atrás
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default DetalleProducto;