import { useContext } from 'react'
import { SesionContext } from './sesion'

// Hook para usar la sesión (usuario, iniciarSesion, cerrarSesion) en cualquier componente
export function useSesion() {
    return useContext(SesionContext)
}
