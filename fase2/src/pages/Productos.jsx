import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// Importamos la tarjeta que creamos arriba
import ProductoCard from '../components/molecules/ProductoCard';

// Base de datos simulada del catálogo
const productosDB = [
    { id: 1, nombre: "Martillo de Uña Profesional", precio: 12500 },
    { id: 2, nombre: "Taladro Percutor 700W", precio: 45990 },
    { id: 3, nombre: "Set de Destornilladores (6 piezas)", precio: 8990 },
    { id: 4, nombre: "Huincha de medir 5 metros", precio: 3500 },
    { id: 5, nombre: "Alicate Universal 8 pulgadas", precio: 5500 },
    { id: 6, nombre: "Caja de Herramientas 20\"", precio: 15990 },
];

const Productos = () => {
    return (
        <Container className="mt-5 mb-5">
            <h1 className="mb-4 text-center">Catálogo de Productos</h1>
            <p className="text-center text-muted mb-5">
                Encuentra las mejores herramientas y materiales para tu proyecto.
            </p>

            <Row>
                {/* Usamos .map() para generar automáticamente una columna por cada producto */}
                {productosDB.map((producto) => (
                    <Col lg={4} md={6} sm={12} className="mb-4" key={producto.id}>
                        {/* Le inyectamos los datos del producto actual a nuestra tarjeta */}
                        <ProductoCard producto={producto} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

// CRÍTICO: Esta es la línea que evita el error "does not provide an export named 'default'"
export default Productos;