import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { buscarUsuario } from '../servicios/tienda'
import { validarCorreo, validarClave } from '../utils/validaciones'
import { useSesion } from '../context/useSesion'

// Página de inicio de sesión
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errores, setErrores] = useState({})

    const { iniciarSesion } = useSesion()
    const navigate = useNavigate()

    // Valida los datos, busca al usuario y, si existe, inicia la sesión
    const manejarEnvio = (e) => {
        e.preventDefault()

        const nuevosErrores = {}

        if (!validarCorreo(email)) {
            nuevosErrores.email = "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com"
        }

        if (!validarClave(password)) {
            nuevosErrores.password = "La contraseña debe tener entre 4 y 10 caracteres"
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores)
            return
        }

        const usuario = buscarUsuario(email, password)

        if (usuario === null) {
            setErrores({ password: "Correo o contraseña incorrectos" })
            return
        }

        iniciarSesion(usuario)
        alert("Bienvenido, " + usuario.nombre)
        navigate('/')
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="mb-4 text-center">Iniciar Sesión</h1>

                            <form onSubmit={manejarEnvio} noValidate>
                                <div className="mb-3">
                                    <label htmlFor="login-email" className="form-label">Correo electrónico</label>
                                    <input type="email" className="form-control" id="login-email"
                                           value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <div className="text-danger">{errores.email}</div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="login-password" className="form-label">Contraseña</label>
                                    <input type="password" className="form-control" id="login-password"
                                           value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <div className="text-danger">{errores.password}</div>
                                </div>

                                <button type="submit" className="btn btn-primary w-100">Ingresar</button>
                            </form>

                            <p className="text-center mt-3">
                                ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
