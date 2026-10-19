// Lee un dato guardado en localStorage (si no existe, devuelve el valor por defecto)
export function leerJSON(clave, valorPorDefecto) {
    try {
        const texto = localStorage.getItem(clave)
        if (texto === null) {
            return valorPorDefecto
        }
        return JSON.parse(texto)
    } catch {
        return valorPorDefecto
    }
}

// Guarda un dato en localStorage como texto JSON
export function guardarJSON(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor))
}

// Borra un dato de localStorage
export function borrarClave(clave) {
    localStorage.removeItem(clave)
}
