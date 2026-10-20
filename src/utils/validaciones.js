// Revisa que el correo sea @duoc.cl, @profesor.duoc.cl o @gmail.com
export function validarCorreo(correo) {
    return (
        correo.endsWith("@duoc.cl") ||
        correo.endsWith("@profesor.duoc.cl") ||
        correo.endsWith("@gmail.com")
    )
}

// Revisa que la contraseña tenga entre 4 y 10 caracteres
export function validarClave(clave) {
    return clave.length >= 4 && clave.length <= 10
}

// Revisa el RUN chileno: sin puntos ni guion, entre 7 y 9 caracteres (el último puede ser K)
export function validarRun(run) {
    return /^[0-9]{6,8}[0-9kK]$/.test(run)
}

// Da formato de pesos chilenos: 12990 -> "12.990"
export function formatearPrecio(numero) {
    return Number(numero).toLocaleString("es-CL")
}
