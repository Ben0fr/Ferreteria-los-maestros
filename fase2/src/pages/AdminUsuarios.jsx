import { useState } from 'react'
import AdminSidebar from '../components/organisms/AdminSidebar'
import UserForm from '../components/molecules/UserForm'
import { obtenerUsuariosAdmin, crearUsuarioAdmin } from '../servicios/admin'

// Administración de usuarios: tabla y formulario para crear usuarios
const AdminUsuarios = () => {
    const [usuarios, setUsuarios] = useState(() => obtenerUsuariosAdmin())
    const [mostrarForm, setMostrarForm] = useState(false)

    // Guarda el usuario que viene del formulario y actualiza la tabla
    const guardarUsuario = (usuario) => {
        setUsuarios([...crearUsuarioAdmin(usuario)])
        alert("Usuario creado correctamente")
    }

    return (
        <div className="container-fluid">
            <div className="row min-vh-100">
                <AdminSidebar />

                <main className="col-md-9 col-lg-10 p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h1>Administrar Usuarios</h1>
                            <p className="text-muted">Listado de usuarios registrados en el sistema.</p>
                        </div>

                        {/* Muestra u oculta el formulario */}
                        <button className="btn btn-primary" type="button"
                                onClick={() => setMostrarForm(!mostrarForm)}>
                            Nuevo usuario
                        </button>
                    </div>

                    {mostrarForm && (
                        <div className="mb-5">
                            <UserForm onGuardar={guardarUsuario} />
                        </div>
                    )}

                    {/* Tabla de usuarios */}
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered align-middle">
                            <thead className="tabla-header-ferreteria">
                                <tr>
                                    <th>RUN</th>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Tipo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((usuario, i) => (
                                    <tr key={i}>
                                        <td>{usuario.run}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.correo}</td>
                                        <td>{usuario.tipo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminUsuarios
