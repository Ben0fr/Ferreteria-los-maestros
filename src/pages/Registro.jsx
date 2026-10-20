import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registrarUsuario } from '../servicios/tienda'
import { validarCorreo, validarClave } from '../utils/validaciones'

// Página para crear una cuenta nueva
const Registro = () => {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [errores, setErrores] = useState({})

    const navigate = useNavigate()

    // Valida todos los campos y, si están bien, guarda el usuario
    const manejarEnvio = (e) => {
        e.preventDefault()

        const nuevosErrores = {}

        if (nombre.trim() === "") {
            nuevosErrores.nombre = "Debes ingresar tu nombre"
        }

        if (!validarCorreo(email)) {
            nuevosErrores.email = "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com"
        }

        if (!validarClave(password)) {
            nuevosErrores.password = "La contraseña debe tener entre 4 y 10 caracteres"
        }

        if (password !== password2) {
            nuevosErrores.password2 = "Las contraseñas no coinciden"
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores)
            return
        }

        registrarUsuario(nombre, email, password)
        alert("Cuenta creada con éxito. Ahora inicia sesión.")
        navigate('/login')
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="mb-4 text-center">Crear Cuenta</h1>

                            <form onSubmit={manejarEnvio} noValidate>
                                <div className="mb-3">
                                    <label htmlFor="registro-nombre" className="form-label">Nombre completo</label>
                                    <input type="text" className="form-control" id="registro-nombre"
                                           value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                    <div className="text-danger">{errores.nombre}</div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="registro-email" className="form-label">Correo electrónico</label>
                                    <input type="email" className="form-control" id="registro-email"
                                           value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <div className="text-danger">{errores.email}</div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="registro-password" className="form-label">Contraseña</label>
                                    <input type="password" className="form-control" id="registro-password"
                                           value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <div className="text-danger">{errores.password}</div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="registro-password2" className="form-label">Repetir contraseña</label>
                                    <input type="password" className="form-control" id="registro-password2"
                                           value={password2} onChange={(e) => setPassword2(e.target.value)} />
                                    <div className="text-danger">{errores.password2}</div>
                                </div>

                                <button type="submit" className="btn btn-primary w-100">Crear cuenta</button>
                            </form>

                            <p className="text-center mt-3">
                                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registro
