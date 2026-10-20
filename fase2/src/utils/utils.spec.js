// Pruebas unitarias de la lógica pura: validaciones y almacenamiento (Jasmine + Karma)
import { validarCorreo, validarClave, validarRun, formatearPrecio } from './validaciones'
import { leerJSON, guardarJSON, borrarClave } from './almacenamiento'

describe('utils/validaciones', () => {
    it('validarCorreo acepta los dominios permitidos', () => {
        expect(validarCorreo('ana@gmail.com')).toBe(true)
        expect(validarCorreo('ana@duoc.cl')).toBe(true)
        expect(validarCorreo('profe@profesor.duoc.cl')).toBe(true)
    })

    it('validarCorreo rechaza dominios no permitidos', () => {
        expect(validarCorreo('ana@hotmail.com')).toBe(false)
        expect(validarCorreo('sin-dominio')).toBe(false)
    })

    it('validarClave acepta entre 4 y 10 caracteres (límites incluidos)', () => {
        expect(validarClave('1234')).toBe(true)
        expect(validarClave('1234567890')).toBe(true)
    })

    it('validarClave rechaza claves demasiado cortas o largas', () => {
        expect(validarClave('123')).toBe(false)
        expect(validarClave('12345678901')).toBe(false)
    })

    it('validarRun acepta un RUN válido, con dígito verificador K', () => {
        expect(validarRun('19011022K')).toBe(true)
        expect(validarRun('201234567')).toBe(true)
    })

    it('validarRun rechaza RUN con puntos, guion o muy corto', () => {
        expect(validarRun('12.345.678-9')).toBe(false)
        expect(validarRun('123')).toBe(false)
    })

    it('formatearPrecio usa separador de miles chileno', () => {
        expect(formatearPrecio(12990)).toBe('12.990')
        expect(formatearPrecio(500)).toBe('500')
    })
})

describe('utils/almacenamiento (localStorage)', () => {
    beforeEach(() => localStorage.clear())

    it('leerJSON devuelve el valor por defecto si la clave no existe', () => {
        expect(leerJSON('no-existe', [])).toEqual([])
    })

    it('guardarJSON y leerJSON guardan y recuperan un objeto', () => {
        guardarJSON('clave', { a: 1, b: 'x' })
        expect(leerJSON('clave', null)).toEqual({ a: 1, b: 'x' })
    })

    it('leerJSON devuelve el valor por defecto si el contenido no es JSON válido', () => {
        localStorage.setItem('malo', '{esto no es json')
        expect(leerJSON('malo', 'defecto')).toBe('defecto')
    })

    it('borrarClave elimina el dato guardado', () => {
        guardarJSON('temporal', [1, 2, 3])
        borrarClave('temporal')
        expect(localStorage.getItem('temporal')).toBeNull()
    })

    it('guardarJSON escribe en localStorage con la clave y el texto JSON (mock con spy)', () => {
        const setItemSpy = spyOn(Storage.prototype, 'setItem')
        guardarJSON('mock', { ok: true })
        expect(setItemSpy).toHaveBeenCalledWith('mock', '{"ok":true}')
    })
})
