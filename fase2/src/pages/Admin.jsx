import { Link } from 'react-router-dom'
import AdminSidebar from '../components/organisms/AdminSidebar'

// Inicio del panel de administración
const Admin = () => {
    return (
        <div className="container-fluid">
            <div className="row min-vh-100">
                <AdminSidebar />

                <main className="col-md-9 col-lg-10 p-4">
                    <h1 className="mb-2">Panel de Administración</h1>
                    <p className="text-muted mb-5">
                        Gestión de productos y usuarios de Ferretería Los Maestros.
                    </p>

                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="card h-100">
                                <div className="card-body text-center">
                                    <div className="fs-1 mb-3">📦</div>
                                    <h3>Productos</h3>
                                    <p className="text-muted">Visualiza y administra los productos disponibles en la tienda.</p>
                                    <Link to="/admin/productos" className="btn btn-primary">Gestionar productos</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 mb-4">
                            <div className="card h-100">
                                <div className="card-body text-center">
                                    <div className="fs-1 mb-3">👥</div>
                                    <h3>Usuarios</h3>
                                    <p className="text-muted">Visualiza y administra los usuarios del sistema.</p>
                                    <Link to="/admin/usuarios" className="btn btn-primary">Gestionar usuarios</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Admin
