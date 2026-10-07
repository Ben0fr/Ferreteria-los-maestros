import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductoCard = ({ producto }) => {
    return (
        <Card className="h-100 shadow-sm border-0">
            {/* Marcador de imagen simulado */}
            <div
                className="bg-light d-flex justify-content-center align-items-center rounded-top"
                style={{ height: '200px', fontSize: '3rem' }}
            >
                🛠️
            </div>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold">{producto.nombre}</Card.Title>
                <Card.Text className="text-primary fs-5 mb-4">
                    ${producto.precio.toLocaleString('es-CL')}
                </Card.Text>

                {/* El botón empuja hacia abajo para mantener todas las tarjetas alineadas */}
                <div className="mt-auto d-grid gap-2">
                    <Button variant="success" size="sm">
                        🛒 Agregar al Carrito
                    </Button>
                    {/* Navegación dinámica hacia DetalleProducto.jsx */}
                    <Button as={Link} to={`/productos/${producto.id}`} variant="outline-primary" size="sm">
                        Ver detalle
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductoCard;