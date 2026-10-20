import { useEffect, useState } from 'react'
import { agregarAlCarritoValidado, cantidadEnCarrito, suscribirCarrito } from '../servicios/tienda'

// Lógica compartida del selector de cantidad (catálogo y detalle de producto).
// - Se puede borrar el campo y escribir de nuevo (el texto se guarda como string).
// - Nunca deja superar el stock, considerando lo que ya hay en el carrito.
export function useSelectorCantidad(producto) {
    const [texto, setTexto] = useState("1")
    const [enCarrito, setEnCarrito] = useState(() => cantidadEnCarrito(producto.id))

    // Se mantiene al día si el carrito cambia desde otro lado
    useEffect(() => {
        const actualizar = () => setEnCarrito(cantidadEnCarrito(producto.id))
        actualizar()
        return suscribirCarrito(actualizar)
    }, [producto.id])

    // Unidades que todavía se pueden agregar sin pasar el stock
    const maximo = Math.max(producto.stock - enCarrito, 0)

    // Cantidad que realmente se va a agregar (nunca más que el máximo)
    const cantidad = texto === "" ? 1 : Math.min(Math.max(Number(texto), 1), Math.max(maximo, 1))

    const manejarCambio = (e) => {
        const crudo = e.target.value

        if (crudo === "") {
            setTexto("")
            return
        }

        const valor = Math.floor(Number(crudo))
        if (Number.isNaN(valor)) return

        if (valor < 1) {
            setTexto("")
        } else if (valor > maximo) {
            setTexto(String(Math.max(maximo, 1)))
        } else {
            setTexto(String(valor))
        }
    }

    // Si dejó el campo vacío, vuelve a 1 al salir
    const manejarBlur = () => {
        if (texto === "") setTexto("1")
    }

    const agregar = () => {
        const resultado = agregarAlCarritoValidado(producto.id, cantidad)
        alert(resultado.mensaje)

        if (resultado.ok) setTexto("1")
    }

    return { texto, maximo, enCarrito, manejarCambio, manejarBlur, agregar }
}
