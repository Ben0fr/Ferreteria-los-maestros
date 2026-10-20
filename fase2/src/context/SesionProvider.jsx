import { useState } from 'react'
import { SesionContext } from './sesion'
import { obtenerUsuarioActual, guardarUsuarioActual, borrarUsuarioActual } from '../servicios/tienda'

// Guarda el usuario logueado y lo comparte con toda la página
export function SesionProvider({ children }) {
    // Al abrir la página, recupera la sesión guardada (si existe)
    const [usuario, setUsuario] = useState(() => obtenerUsuarioActual())

    // Inicia sesión: guarda el usuario y actualiza el menú
    const iniciarSesion = (usuarioNuevo) => {
        guardarUsuarioActual(usuarioNuevo)
        setUsuario(usuarioNuevo)
    }

    // Cierra sesión: borra el usuario guardado y actualiza el menú
    const cerrarSesion = () => {
        borrarUsuarioActual()
        setUsuario(null)
    }

    return (
        <SesionContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
            {children}
        </SesionContext.Provider>
    )
}
