// Pruebas unitarias de la lógica de negocio: catálogo, carrito, usuarios y panel admin
import {
    obtenerProductos, buscarProductoPorId,
    obtenerCarrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, realizarCompra,
    buscarUsuario, buscarAdministrador, registrarUsuario,
    obtenerUsuarioActual, guardarUsuarioActual, borrarUsuarioActual
} from './tienda'
import {
    obtenerProductosAdmin, crearProductoAdmin, editarProductoAdmin, eliminarProductoAdmin,
    obtenerUsuariosAdmin, crearUsuarioAdmin
} from './admin'

describe('servicios/tienda - catálogo', () => {
    beforeEach(() => localStorage.clear())

    it('obtenerProductos devuelve los 6 productos base', () => {
        expect(obtenerProductos().length).toBe(6)
    })

    it('buscarProductoPorId encuentra un producto existente', () => {
        expect(buscarProductoPorId(2).nombre).toBe('Taladro Percutor 650W')
    })

    it('buscarProductoPorId devuelve undefined si el id no existe', () => {
        expect(buscarProductoPorId(999)).toBeUndefined()
    })
})

describe('servicios/tienda - carrito', () => {
    beforeEach(() => localStorage.clear())

    it('el carrito parte vacío', () => {
        expect(obtenerCarrito()).toEqual([])
    })

    it('agregarAlCarrito agrega un producto nuevo con cantidad 1', () => {
        agregarAlCarrito(1)
        expect(obtenerCarrito()).toEqual([{ id: 1, cantidad: 1 }])
    })

    it('agregarAlCarrito suma 1 a la cantidad si el producto ya estaba', () => {
        agregarAlCarrito(1)
        agregarAlCarrito(1)
        expect(obtenerCarrito()).toEqual([{ id: 1, cantidad: 2 }])
    })

    it('eliminarDelCarrito quita solo el producto indicado y devuelve el carrito nuevo', () => {
        agregarAlCarrito(1)
        agregarAlCarrito(2)
        const nuevo = eliminarDelCarrito(1)
        expect(nuevo).toEqual([{ id: 2, cantidad: 1 }])
        expect(obtenerCarrito()).toEqual([{ id: 2, cantidad: 1 }])
    })

    it('vaciarCarrito deja el carrito vacío', () => {
        agregarAlCarrito(3)
        vaciarCarrito()
        expect(obtenerCarrito()).toEqual([])
    })

    it('el carrito se guarda en localStorage con la clave carritoFerreteria (mock con spy)', () => {
        const setItemSpy = spyOn(Storage.prototype, 'setItem')
        agregarAlCarrito(4)
        expect(setItemSpy).toHaveBeenCalledWith('carritoFerreteria', '[{"id":4,"cantidad":1}]')
    })
})

describe('servicios/tienda - usuarios y sesión', () => {
    beforeEach(() => localStorage.clear())

    it('registrarUsuario permite luego encontrarlo con buscarUsuario', () => {
        registrarUsuario('Ana', 'ana@gmail.com', '1234')
        expect(buscarUsuario('ana@gmail.com', '1234').nombre).toBe('Ana')
    })

    it('buscarUsuario devuelve null con contraseña incorrecta o usuario inexistente', () => {
        registrarUsuario('Ana', 'ana@gmail.com', '1234')
        expect(buscarUsuario('ana@gmail.com', 'mala')).toBeNull()
        expect(buscarUsuario('otro@gmail.com', '1234')).toBeNull()
    })

    it('guarda, recupera y borra el usuario de la sesión actual', () => {
        expect(obtenerUsuarioActual()).toBeNull()
        guardarUsuarioActual({ nombre: 'Ana', correo: 'ana@gmail.com' })
        expect(obtenerUsuarioActual().nombre).toBe('Ana')
        borrarUsuarioActual()
        expect(obtenerUsuarioActual()).toBeNull()
    })

    it('buscarAdministrador reconoce las credenciales del administrador', () => {
        expect(buscarAdministrador('admin@gmail.com', 'admin123').tipo).toBe('Administrador')
    })

    it('buscarAdministrador rechaza credenciales incorrectas', () => {
        expect(buscarAdministrador('admin@gmail.com', 'mala')).toBeNull()
        expect(buscarAdministrador('otro@gmail.com', 'admin123')).toBeNull()
    })
})

describe('servicios/tienda - compra', () => {
    beforeEach(() => localStorage.clear())

    it('realizarCompra falla si el carrito está vacío', () => {
        expect(realizarCompra().ok).toBe(false)
    })

    it('realizarCompra descuenta el stock comprado y vacía el carrito', () => {
        agregarAlCarrito(1, 2)
        const resultado = realizarCompra()
        expect(resultado.ok).toBe(true)
        expect(buscarProductoPorId(1).stock).toBe(23)
        expect(obtenerCarrito()).toEqual([])
    })

    it('realizarCompra falla y no modifica nada si no hay stock suficiente', () => {
        agregarAlCarrito(1, 999)
        const resultado = realizarCompra()
        expect(resultado.ok).toBe(false)
        expect(buscarProductoPorId(1).stock).toBe(25)
        expect(obtenerCarrito().length).toBe(1)
    })
})

describe('servicios/admin - CRUD de productos', () => {
    beforeEach(() => localStorage.clear())

    const nuevoProducto = {
        codigo: 'SIE100', nombre: 'Sierra Circular', categoria: 'Herramientas eléctricas', precio: 45000, stock: 5
    }

    it('obtenerProductosAdmin parte con los productos iniciales', () => {
        expect(obtenerProductosAdmin().length).toBe(6)
    })

    it('crearProductoAdmin (Create) agrega el producto y aparece en la tienda', () => {
        crearProductoAdmin(nuevoProducto)
        expect(obtenerProductosAdmin().length).toBe(7)
        const enTienda = obtenerProductos().find((p) => p.codigo === 'SIE100')
        expect(enTienda.nombre).toBe('Sierra Circular')
    })

    it('editarProductoAdmin (Update) cambia el precio y se refleja en la tienda', () => {
        editarProductoAdmin(0, { precio: 9990 })
        expect(obtenerProductosAdmin()[0].precio).toBe(9990)
        expect(buscarProductoPorId(1).precio).toBe(9990)
    })

    it('eliminarProductoAdmin (Delete) quita el producto de la tienda', () => {
        eliminarProductoAdmin(0)
        expect(obtenerProductosAdmin().length).toBe(5)
        expect(obtenerProductos().length).toBe(5)
        expect(obtenerProductos().some((p) => p.codigo === 'MAR001')).toBe(false)
    })

    it('volver a crear un producto eliminado lo hace reaparecer en la tienda', () => {
        eliminarProductoAdmin(0)
        crearProductoAdmin({ codigo: 'MAR001', nombre: 'Martillo Nuevo', categoria: 'Herramientas manuales', precio: 7000, stock: 3 })
        expect(obtenerProductos().some((p) => p.codigo === 'MAR001')).toBe(true)
    })
})

describe('servicios/admin - usuarios', () => {
    beforeEach(() => localStorage.clear())

    it('obtenerUsuariosAdmin entrega los 3 usuarios iniciales', () => {
        expect(obtenerUsuariosAdmin().length).toBe(3)
    })

    it('incluye como Cliente a los usuarios registrados en la tienda', () => {
        registrarUsuario('Luis', 'luis@gmail.com', '1234')
        const luis = obtenerUsuariosAdmin().find((u) => u.correo === 'luis@gmail.com')
        expect(luis.tipo).toBe('Cliente')
    })

    it('crearUsuarioAdmin agrega un usuario nuevo y queda guardado', () => {
        crearUsuarioAdmin({ run: '123456789', nombre: 'Pedro', correo: 'pedro@duoc.cl', tipo: 'Vendedor' })
        expect(obtenerUsuariosAdmin().length).toBe(4)
    })
})
