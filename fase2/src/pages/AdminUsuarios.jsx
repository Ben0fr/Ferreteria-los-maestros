import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Collapse, Badge } from 'react-bootstrap';
import AdminSidebar from '../components/organisms/AdminSidebar';
import UserForm from '../components/molecules/UserForm';

// Base de datos simulada inicial
const inicialUsuarios = [
    { id: 1, run: "123456789", nombre: "Carlos", apellidos: "Soto", correo: "carlos.admin@ferreteria.cl", tipo: "Administrador" },
    { id: 2, run: "198765432", nombre: "María", apellidos: "Gómez", correo: "maria.g@gmail.com", tipo: "Cliente" },
];

const AdminUsuarios = () => {
    // 1. Estado para la lista de usuarios
    const [usuarios, setUsuarios] = useState(inicialUsuarios);

    // 2. Estado para mostrar u ocultar el formulario
    const [showForm, setShowForm] = useState(false);

    // 3. Función para recibir el usuario nuevo desde el formulario
    const handleAddUser = (nuevoUsuario) => {
        setUsuarios([...usuarios, nuevoUsuario]);
        setShowForm(false);
    };

    // 4. Función para eliminar un usuario
    const handleDeleteUser = (id) => {
        const filtrados = usuarios.filter((u) => u.id !== id);
        setUsuarios(filtrados);
    };

    return (
        <Container fluid className="p-0">
            <Row className="g-0">

                {/* Menú Lateral */}
                <AdminSidebar />

                {/* Contenido Principal */}
                <Col md={9} lg={10} className="p-4 bg-light min-vh-100">

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h1>Administrar Usuarios</h1>
                            <p className="text-muted">Listado de usuarios registrados en el sistema.</p>
                        </div>

                        <Button
                            variant={showForm ? "secondary" : "primary"}
                            onClick={() => setShowForm(!showForm)}
                        >
                            {showForm ? 'Cancelar' : 'Nuevo usuario'}
                        </Button>
                    </div>

                    <Collapse in={showForm}>
                        <div>
                            <UserForm onAddUser={handleAddUser} />
                        </div>
                    </Collapse>

                    {/* Tabla Dinámica */}
                    <div className="table-responsive bg-white rounded shadow-sm p-3">
                        <Table striped bordered hover className="align-middle mb-0">
                            <thead className="table-dark">
                            <tr>
                                <th>RUN</th>
                                <th>Nombre completo</th>
                                <th>Correo</th>
                                <th>Tipo</th>
                                <th className="text-center">Acción</th>
                            </tr>
                            </thead>
                            <tbody>
                            {usuarios.map((user) => (
                                <tr key={user.id}>
                                    <td className="fw-bold">{user.run}</td>
                                    <td>{user.nombre} {user.apellidos}</td>
                                    <td>{user.correo}</td>
                                    <td>
                                        {/* Usamos un Badge (Etiqueta) para que el tipo de usuario se vea más visual */}
                                        <Badge bg={user.tipo === 'Administrador' ? 'danger' : user.tipo === 'Vendedor' ? 'warning' : 'primary'}>
                                            {user.tipo}
                                        </Badge>
                                    </td>
                                    <td className="text-center">
                                        <Button variant="outline-primary" size="sm" className="me-2">
                                            Editar
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDeleteUser(user.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>

                </Col>
            </Row>
        </Container>
    );
};

export default AdminUsuarios;