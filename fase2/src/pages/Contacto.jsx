import { useState } from 'react'
import { validarCorreo } from '../utils/validaciones'

// Página de contacto con formulario validado
const Contacto = () => {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [comentario, setComentario] = useState('')
    const [errores, setErrores] = useState({})
    const [enviado, setEnviado] = useState(false)

    // Valida el formulario; si todo está bien, muestra el mensaje de éxito y limpia los campos
    const manejarEnvio = (e) => {
        e.preventDefault()
        setEnviado(false)

        const nuevosErrores = {}

        if (nombre.trim() === "") {
            nuevosErrores.nombre = "Debes ingresar tu nombre"
        }
        if (nombre.length > 100) {
            nuevosErrores.nombre = "El nombre no puede superar los 100 caracteres"
        }

        if (email.trim() === "") {
            nuevosErrores.email = "Debes ingresar tu correo electrónico"
        } else if (!validarCorreo(email)) {
            nuevosErrores.email = "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com"
        }

        if (comentario.trim() === "") {
            nuevosErrores.comentario = "Debes ingresar un comentario"
        }
        if (comentario.length > 500) {
            nuevosErrores.comentario = "El comentario no puede superar los 500 caracteres"
        }

        setErrores(nuevosErrores)

        if (Object.keys(nuevosErrores).length > 0) {
            return
        }

        setEnviado(true)
        setNombre('')
        setEmail('')
        setComentario('')
    }

    return (
        <main className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <h1>Contáctanos</h1>
                    <p className="text-center text-muted mb-4">
                        Envíanos tu consulta y nos pondremos en contacto contigo.
                    </p>

                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={manejarEnvio} noValidate>
                                <div className="mb-3">
                                    <label htmlFor="contacto-nombre" className="form-label">Nombre:</label>
                                    <input type="text" className="form-control" id="contacto-nombre"
                                           maxLength={100} value={nombre}
                                           onChange={(e) => setNombre(e.target.value)} />
                                    <div className="text-danger">{errores.nombre}</div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="contacto-email" className="form-label">Correo electrónico:</label>
                                    <input type="text" className="form-control" id="contacto-email"
                                           maxLength={100} placeholder="ejemplo@gmail.com" value={email}
                                           onChange={(e) => setEmail(e.target.value)} />
                                    <div className="text-danger">{errores.email}</div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="contacto-comentario" className="form-label">Comentario</label>
                                    <textarea className="form-control" id="contacto-comentario" rows={5}
                                              maxLength={500} value={comentario}
                                              onChange={(e) => setComentario(e.target.value)}></textarea>
                                    <div className="text-danger">{errores.comentario}</div>
                                </div>

                                {/* Mensaje que aparece cuando el formulario es válido */}
                                {enviado && (
                                    <div className="alert alert-success">Mensaje enviado correctamente.</div>
                                )}

                                <button type="submit" className="btn btn-primary w-100">Enviar mensaje</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Contacto
