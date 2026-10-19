// Pruebas unitarias de componentes: ProductoCard, Navbar y contexto de sesión
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductoCard from './molecules/ProductoCard'
import NavigationBar from './organisms/Navbar'
import { SesionProvider } from '../context/SesionProvider'
import { useSesion } from '../context/useSesion'
import { obtenerCarrito, guardarUsuarioActual, obtenerUsuarioActual } from '../servicios/tienda'

const producto = {
    id: 1, codigo: 'MAR001', nombre: 'Martillo Carpintero', categoria: 'Herramientas manuales',
    categoriaSlug: 'manuales', precio: 6990, stock: 25, icono: 'martillo.svg'
}

describe('ProductoCard', () => {
    beforeEach(() => localStorage.clear())

    const renderCard = () => render(<MemoryRouter><ProductoCard producto={producto} /></MemoryRouter>)

    it('muestra el nombre, la categoría y el stock recibidos por props', () => {
        renderCard()
        expect(screen.getByText('Martillo Carpintero')).toBeTruthy()
        expect(screen.getByText('Categoría: Herramientas manuales')).toBeTruthy()
        expect(screen.getByText('Stock: 25 unidades')).toBeTruthy()
    })

    it('muestra el precio con formato de pesos chilenos', () => {
        renderCard()
        expect(screen.getByText('Precio: $6.990')).toBeTruthy()
    })

    it('el enlace "Ver detalle" apunta a /productos/:id', () => {
        renderCard()
        expect(screen.getByText('Ver detalle').closest('a').getAttribute('href')).toBe('/productos/1')
    })

    it('al hacer clic en "Agregar al carrito" guarda el producto y avisa con alert (mock)', () => {
        const alertSpy = spyOn(window, 'alert')
        renderCard()
        fireEvent.click(screen.getByText('Agregar al carrito'))
        expect(alertSpy).toHaveBeenCalledWith('Producto agregado al carrito')
        expect(obtenerCarrito()).toEqual([{ id: 1, cantidad: 1 }])
    })

    it('hacer clic dos veces aumenta la cantidad en el carrito', () => {
        spyOn(window, 'alert')
        renderCard()
        const boton = screen.getByText('Agregar al carrito')
        fireEvent.click(boton)
        fireEvent.click(boton)
        expect(obtenerCarrito()[0].cantidad).toBe(2)
    })
})

describe('Navbar (renderizado condicional según la sesión)', () => {
    beforeEach(() => localStorage.clear())

    const renderNavbar = () => render(
        <MemoryRouter>
            <SesionProvider>
                <NavigationBar />
            </SesionProvider>
        </MemoryRouter>
    )

    it('muestra los enlaces principales de la tienda', () => {
        renderNavbar()
        expect(screen.getByText('Productos').closest('a').getAttribute('href')).toBe('/productos')
        expect(screen.getByText('Carrito').closest('a').getAttribute('href')).toBe('/carrito')
        expect(screen.getByText('Contacto').closest('a').getAttribute('href')).toBe('/contacto')
    })

    it('sin sesión muestra "Iniciar Sesión" y "Registrarse"', () => {
        renderNavbar()
        expect(screen.getByText('Iniciar Sesión')).toBeTruthy()
        expect(screen.getByText('Registrarse')).toBeTruthy()
        expect(screen.queryByText('Cerrar sesión')).toBeNull()
    })

    it('con sesión muestra el saludo y el botón "Cerrar sesión"', () => {
        guardarUsuarioActual({ nombre: 'Ana', correo: 'ana@gmail.com' })
        renderNavbar()
        expect(screen.getByText('Hola, Ana')).toBeTruthy()
        expect(screen.queryByText('Iniciar Sesión')).toBeNull()
    })

    it('al cerrar sesión borra el usuario guardado y vuelve a mostrar "Iniciar Sesión"', () => {
        guardarUsuarioActual({ nombre: 'Ana', correo: 'ana@gmail.com' })
        renderNavbar()
        fireEvent.click(screen.getByText('Cerrar sesión'))
        expect(obtenerUsuarioActual()).toBeNull()
        expect(screen.getByText('Iniciar Sesión')).toBeTruthy()
    })
})

describe('SesionProvider (contexto)', () => {
    beforeEach(() => localStorage.clear())

    // Componente de prueba que usa el hook useSesion
    const Consumidor = () => {
        const { usuario, iniciarSesion, cerrarSesion } = useSesion()
        return (
            <div>
                <span>{usuario === null ? 'sin sesion' : 'usuario: ' + usuario.nombre}</span>
                <button onClick={() => iniciarSesion({ nombre: 'Marta' })}>entrar</button>
                <button onClick={cerrarSesion}>salir</button>
            </div>
        )
    }

    it('parte sin usuario y cambia su estado al iniciar y cerrar sesión', () => {
        render(<SesionProvider><Consumidor /></SesionProvider>)
        expect(screen.getByText('sin sesion')).toBeTruthy()

        fireEvent.click(screen.getByText('entrar'))
        expect(screen.getByText('usuario: Marta')).toBeTruthy()

        fireEvent.click(screen.getByText('salir'))
        expect(screen.getByText('sin sesion')).toBeTruthy()
    })

    it('recupera la sesión guardada al montarse', () => {
        guardarUsuarioActual({ nombre: 'Luis' })
        render(<SesionProvider><Consumidor /></SesionProvider>)
        expect(screen.getByText('usuario: Luis')).toBeTruthy()
    })
})
