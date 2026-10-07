import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';

// SIMULACIÓN DE BASE DE DATOS (Mock Data)
// Aquí están unificadas tus dos entradas de blog originales
const blogDB = [
  {
    id: 1,
    titulo: "5 elementos de seguridad para trabajar en casa",
    imagen: "/img/images.jpg",
    contenido: [
      "Antes de comenzar cualquier reparación, construcción o trabajo con herramientas es importante contar con elementos de protección personal adecuados.",
      "Uno de los elementos más importantes son los guantes de seguridad. Estos ayudan a proteger las manos frente a cortes, golpes y materiales ásperos.",
      "Los lentes de seguridad también son fundamentales, especialmente al utilizar taladros, sierras o herramientas que puedan generar pequeñas partículas.",
      "Otro elemento importante es el calzado de seguridad. Dependiendo del trabajo, puede ser recomendable utilizar zapatos resistentes que protejan los pies frente a golpes.",
      "Cuando se realizan trabajos que generan mucho ruido, también es recomendable utilizar protección auditiva.",
      "Finalmente, siempre es importante revisar el estado de las herramientas antes de utilizarlas y mantener el área de trabajo ordenada."
    ]
  },
  {
    id: 2,
    titulo: "Herramientas básicas que deberías tener en tu hogar",
    imagen: "/img/blog2.jpg",
    contenido: [
      "Tener algunas herramientas básicas en casa puede ayudarte a solucionar pequeños problemas sin necesidad de realizar una compra cada vez que ocurre una reparación.",
      "Una de las herramientas más conocidas es el martillo. Puede utilizarse para instalar clavos, realizar pequeñas reparaciones y trabajar con distintos materiales.",
      "También es recomendable tener un juego de destornilladores. Existen distintos tamaños y tipos de punta, por lo que contar con varias opciones permite realizar diferentes tareas.",
      "Una cinta métrica resulta útil para medir muebles, paredes, materiales y espacios antes de realizar una instalación.",
      "Los alicates permiten sujetar, doblar o cortar algunos materiales y son útiles en numerosas reparaciones.",
      "Finalmente, una caja de herramientas permite mantener todos estos elementos organizados y encontrarlos fácilmente cuando sean necesarios."
    ]
  }
];

const DetalleBlog = () => {
  // 1. Capturamos el ID dinámico de la URL
  const { id } = useParams();

  // 2. Buscamos el artículo correspondiente transformando el ID a número
  const articulo = blogDB.find((post) => post.id === parseInt(id));

  // 3. Renderizado condicional si el ID no existe en la URL
  if (!articulo) {
    return (
        <Container className="mt-5 mb-5 text-center">
          <h2>Artículo no encontrado</h2>
          <p className="text-muted">La entrada de blog que buscas no existe.</p>
          <Button as={Link} to="/blog" variant="primary" className="mt-3">
            Volver al Blog
          </Button>
        </Container>
    );
  }

  // 4. Renderizado dinámico de la vista con los datos del artículo encontrado
  return (
      <Container className="mt-5 mb-5">
        <Row className="justify-content-center">
          <Col lg={8}>

            <Button as={Link} to="/blog" variant="outline-secondary" className="mb-4">
              ← Volver al Blog
            </Button>

            <h1 className="mb-4">{articulo.titulo}</h1>

            {/* Componente Image de Bootstrap con cierre estricto de etiqueta */}
            <Image
                src={articulo.imagen}
                className="mb-4 rounded shadow-sm"
                fluid
                alt={articulo.titulo}
            />

            {/* Iteración de párrafos sin duplicar código HTML */}
            {articulo.contenido.map((parrafo, index) => (
                <p key={index} className="fs-6 lh-lg text-secondary">
                  {parrafo}
                </p>
            ))}

          </Col>
        </Row>
      </Container>
  );
};

export default DetalleBlog;