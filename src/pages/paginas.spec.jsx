// Pruebas unitarias de páginas: Login, Registro, Productos, DetalleProducto y Carrito
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Registro from './Registro'
import Productos from './Productos'
import DetalleProducto from './DetalleProducto'
import Carrito from './Carrito'
import { SesionProvider } from '../context/SesionProvider'
import {
    registrarUsuario, buscarUsuario, obtenerUsuarioActual, obtenerCarrito, agregarAlCarrito,
    guardarUsuarioActual, buscarProductoPorId
} from '../servicios/tienda'

// Envía el formulario que contiene el botón indicado
const enviarFormulario = (textoBoton) =>
    fireEvent.submit(screen.getByText(textoBoton).closest('form'))

describe('Login', () => {
    beforeEach(() => localStorage.clear())

    const renderLogin = () => render(
        <MemoryRouter initialEntries={['/login']}>
            <SesionProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<div>PAGINA INICIO</div>} />
                </Routes>
            </SesionProvider>
        </MemoryRouter>
    )

    it('muestra los errores de validación al enviar el formulario vacío', () => {
        renderLogin()
        enviarFormulario('Ingresar')
        expect(screen.getByText('El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com')).toBeTruthy()
        expect(screen.getByText('La contraseña debe tener entre 4 y 10 caracteres')).toBeTruthy()
    })

    it('actualiza su estado al escribir en el campo de correo', () => {
        renderLogin()
        const campo = screen.getByLabelText('Correo electrónico')
        fireEvent.change(campo, { target: { value: 'ana@gmail.com' } })
        expect(campo.value).toBe('ana@gmail.com')
    })

    it('informa credenciales incorrectas si el usuario no existe', () => {
        renderLogin()
        fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'ana@gmail.com' } })
        fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '1234' } })
        enviarFormulario('Ingresar')
        expect(screen.getByText('Correo o contraseña incorrectos')).toBeTruthy()
    })

    it('con credenciales correctas inicia sesión, avisa con alert (mock) y navega al inicio', () => {
        const alertSpy = spyOn(window, 'alert')
        registrarUsuario('Ana', 'ana@gmail.com', '1234')
        renderLogin()
        fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'ana@gmail.com' } })
        fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '1234' } })
        enviarFormulario('Ingresar')
        expect(alertSpy).toHaveBeenCalledWith('Bienvenido, Ana')
        expect(obtenerUsuarioActual().nombre).toBe('Ana')
        expect(screen.getByText('PAGINA INICIO')).toBeTruthy()
    })

    it('permite iniciar sesión como administrador y redirige a la pantalla principal', () => {
        const alertSpy = spyOn(window, 'alert')
        render(
            <MemoryRouter initialEntries={['/login']}>
                <SesionProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<div>PAGINA INICIO</div>} />
                    </Routes>
                </SesionProvider>
            </MemoryRouter>
        )
        fireEvent.click(screen.getByLabelText('Administrador'))
        fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'admin@gmail.com' } })
        fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'admin123' } })
        enviarFormulario('Ingresar')
        expect(alertSpy).toHaveBeenCalledWith('Bienvenido, Administrador')
        expect(screen.getByText('PAGINA INICIO')).toBeTruthy()
    })
})

describe('Registro', () => {
    beforeEach(() => localStorage.clear())

    const renderRegistro = () => render(
        <MemoryRouter initialEntries={['/registro']}>
            <Routes>
                <Route path="/registro" element={<Registro />} />
                <Route path="/login" element={<div>PAGINA LOGIN</div>} />
            </Routes>
        </MemoryRouter>
    )

    const llenar = (nombre, correo, clave, clave2) => {
        fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { value: nombre } })
        fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: correo } })
        fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: clave } })
        fireEvent.change(screen.getByLabelText('Repetir contraseña'), { target: { value: clave2 } })
    }

    it('exige el nombre cuando está vacío', () => {
        renderRegistro()
        enviarFormulario('Crear cuenta')
        expect(screen.getByText('Debes ingresar tu nombre')).toBeTruthy()
    })

    it('detecta contraseñas que no coinciden', () => {
        renderRegistro()
        llenar('Ana', 'ana@gmail.com', '1234', '9999')
        enviarFormulario('Crear cuenta')
        expect(screen.getByText('Las contraseñas no coinciden')).toBeTruthy()
        expect(buscarUsuario('ana@gmail.com', '1234')).toBeNull()
    })

    it('con datos válidos guarda el usuario, avisa con alert (mock) y va al login', () => {
        const alertSpy = spyOn(window, 'alert')
        renderRegistro()
        llenar('Ana', 'ana@gmail.com', '1234', '1234')
        enviarFormulario('Crear cuenta')
        expect(alertSpy).toHaveBeenCalledWith('Cuenta creada con éxito. Ahora inicia sesión.')
        expect(buscarUsuario('ana@gmail.com', '1234').nombre).toBe('Ana')
        expect(screen.getByText('PAGINA LOGIN')).toBeTruthy()
    })
})

describe('Productos (lista y filtro por categoría)', () => {
    beforeEach(() => localStorage.clear())

    const renderProductos = (ruta) => render(
        <MemoryRouter initialEntries={[ruta]}>
            <Routes><Route path="/productos" element={<Productos />} /></Routes>
        </MemoryRouter>
    )

    it('renderiza una tarjeta por cada producto del catálogo', () => {
        renderProductos('/productos')
        expect(screen.getAllByText('Agregar al carrito').length).toBe(6)
    })

    it('filtra por categoría según el parámetro de la URL', () => {
        renderProductos('/productos?categoria=pinturas')
        expect(screen.getByText('Pintura Látex 1 Galón')).toBeTruthy()
        expect(screen.queryByText('Martillo Carpintero')).toBeNull()
        expect(screen.getAllByText('Agregar al carrito').length).toBe(1)
    })

    it('avisa cuando la categoría no tiene productos', () => {
        renderProductos('/productos?categoria=inexistente')
        expect(screen.getByText(/No hay productos en esa categoría/)).toBeTruthy()
    })
})

describe('DetalleProducto', () => {
    beforeEach(() => localStorage.clear())

    const renderDetalle = (id) => render(
        <MemoryRouter initialEntries={['/productos/' + id]}>
            <Routes><Route path="/productos/:id" element={<DetalleProducto />} /></Routes>
        </MemoryRouter>
    )

    it('muestra los datos del producto indicado en la URL', () => {
        renderDetalle(2)
        expect(screen.getByText('Taladro Percutor 650W')).toBeTruthy()
        expect(screen.getByText('Código: TAL002')).toBeTruthy()
    })

    it('muestra un mensaje de error si el producto no existe', () => {
        renderDetalle(999)
        expect(screen.getByText('Producto no encontrado')).toBeTruthy()
    })

    it('"Agregar al carrito" guarda el producto en el carrito', () => {
        spyOn(window, 'alert')
        renderDetalle(2)
        fireEvent.click(screen.getByText('Agregar al carrito'))
        expect(obtenerCarrito()).toEqual([{ id: 2, cantidad: 1 }])
    })
})

describe('Carrito', () => {
    beforeEach(() => {
        localStorage.clear()
        // Carrito de ejemplo: 2 martillos (6.990 c/u) y 1 saco de cemento (5.490)
        agregarAlCarrito(1)
        agregarAlCarrito(1)
        agregarAlCarrito(3)
    })

    const renderCarrito = () => render(
        <MemoryRouter>
            <SesionProvider>
                <Carrito />
            </SesionProvider>
        </MemoryRouter>
    )
    const totalMostrado = () => document.getElementById('total-carrito').textContent

    it('muestra los productos guardados con su cantidad', () => {
        renderCarrito()
        expect(screen.getByText('Martillo Carpintero')).toBeTruthy()
        expect(screen.getByText('Saco de Cemento 25kg')).toBeTruthy()
        expect(screen.getByDisplayValue('2')).toBeTruthy()
    })

    it('calcula el total (2 x 6.990 + 5.490 = 19.470)', () => {
        renderCarrito()
        expect(totalMostrado()).toBe('19.470')
    })

    it('eliminar un producto lo quita de la lista y recalcula el total', () => {
        renderCarrito()
        fireEvent.click(screen.getAllByText('Eliminar')[0])
        expect(screen.queryByText('Martillo Carpintero')).toBeNull()
        expect(totalMostrado()).toBe('5.490')
    })

    it('vaciar el carrito muestra el mensaje de carrito vacío y borra lo guardado', () => {
        renderCarrito()
        fireEvent.click(screen.getByText('Vaciar Carrito'))
        expect(screen.getByText(/El carrito está vacío/)).toBeTruthy()
        expect(obtenerCarrito()).toEqual([])
        expect(totalMostrado()).toBe('0')
    })

    it('omite los productos del carrito que ya no existen en la tienda', () => {
        localStorage.clear()
        localStorage.setItem('carritoFerreteria', JSON.stringify([{ id: 999, cantidad: 1 }]))
        renderCarrito()
        expect(screen.getByText(/El carrito está vacío/)).toBeTruthy()
    })

    it('al intentar comprar sin sesión iniciada muestra un aviso con acceso al login', () => {
        renderCarrito()
        fireEvent.click(screen.getByText('Comprar'))
        expect(screen.getByText('Debes iniciar sesión para poder comprar.')).toBeTruthy()
        expect(screen.getByText('Iniciar sesión').closest('a').getAttribute('href')).toBe('/login')
    })

    it('comprar con sesión iniciada descuenta el stock y vacía el carrito', () => {
        const alertSpy = spyOn(window, 'alert')
        guardarUsuarioActual({ nombre: 'Ana', correo: 'ana@gmail.com', tipo: 'Cliente' })
        renderCarrito()
        fireEvent.click(screen.getByText('Comprar'))
        expect(alertSpy).toHaveBeenCalledWith('¡Compra realizada con éxito! Gracias por tu compra.')
        expect(obtenerCarrito()).toEqual([])
        expect(buscarProductoPorId(1).stock).toBe(23)
        expect(buscarProductoPorId(3).stock).toBe(39)
    })
})
