import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <aside className="col-md-3 col-lg-2 bg-dark text-white p-4 min-vh-100">
            <h4 className="mb-4">
                Ferretería<br />Los Maestros
            </h4>
            <h6 className="text-secondary">
                Administración
            </h6>

            <nav className="nav flex-column mt-4">
                <Link className="nav-link text-white" to="/admin">
                    Inicio
                </Link>
                <Link className="nav-link text-white" to="/admin/productos">
                    Productos
                </Link>
                <Link className="nav-link text-white" to="/admin/usuarios">
                    Usuarios
                </Link>

                {/* Cierre estricto de la etiqueta hr en JSX */}
                <hr className="my-3 text-secondary" />

                <Link className="nav-link text-white" to="/">
                    Volver a la tienda
                </Link>
            </nav>
        </aside>
    );
};

export default AdminSidebar;