import { NavLink } from 'react-router-dom'

// Menú lateral del panel de administración (la página actual se ve en amarillo)
const AdminSidebar = () => {
    // Devuelve la clase del link: amarillo si es la página actual, blanco si no
    const claseLink = ({ isActive }) => 'nav-link ' + (isActive ? 'text-warning' : 'text-white')

    return (
        <aside className="col-md-3 col-lg-2 bg-dark text-white p-4">
            <h4 className="mb-4">
                Ferretería<br />Los Maestros
            </h4>
            <h6 className="text-secondary">Administración</h6>

            <nav className="nav flex-column">
                <NavLink className={claseLink} to="/admin" end>Inicio</NavLink>
                <NavLink className={claseLink} to="/admin/productos">Productos</NavLink>
                <NavLink className={claseLink} to="/admin/usuarios">Usuarios</NavLink>
                <hr />
                <NavLink className="nav-link text-white" to="/">Volver a la tienda</NavLink>
            </nav>
        </aside>
    )
}

export default AdminSidebar
