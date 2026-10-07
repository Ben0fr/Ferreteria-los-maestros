import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// 1. Base de datos simulada del Blog
// Contiene solo el resumen que se mostrará en las tarjetas
const postsDB = [
    {
        id: 1,
        titulo: "5 elementos de seguridad para trabajar en casa",
        resumen: "Conoce los elementos básicos que debes utilizar antes de comenzar cualquier trabajo de construcción, reparación o mantenimiento.",
        imagen: "/img/images.jpg"
    },
    {
        id: 2,
        titulo: "Herramientas Básicas para tu Hogar",
        resumen: "Un martillo, destornilladores y algunas herramientas simples pueden ayudarte a solucionar muchas reparaciones domésticas.",
        imagen: "/img/blog2.jpg"
    }
];

const Blog = () => {
    return (
        <>
            {/* Encabezado corregido con clases de Bootstrap exactas */}
            <div className="hero-ferreteria mb-5 bg-light">
                <Container className="py-5 text-center">
                    <h1 className="display-5 fw-bold">Blog Ferretería Los Maestros</h1>
                    <p className="fs-5 text-muted">
                        Descubre consejos, datos útiles y recomendaciones para tus proyectos
                    </p>
                </Container>
            </div>

            {/* Catálogo dinámico de artículos */}
            <Container className="mb-5">
                <Row>
                    {/* Iteramos sobre el arreglo de posts para generar las tarjetas */}
                    {postsDB.map((post) => (
                        <Col md={6} className="mb-4" key={post.id}>
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Img
                                    variant="top"
                                    src={post.imagen}
                                    alt={post.titulo}
                                />

                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="fw-bold">{post.titulo}</Card.Title>
                                    <Card.Text className="text-secondary">
                                        {post.resumen}
                                    </Card.Text>

                                    {/* Botón dinámico que dirige al detalle del artículo exacto */}
                                    <Button
                                        as={Link}
                                        to={`/blog/${post.id}`}
                                        variant="primary"
                                        className="mt-auto"
                                    >
                                        Leer más
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default Blog;