import { useState } from 'react'
import AdminSidebar from '../components/organisms/AdminSidebar'
import { categoriasAdmin } from '../data/productos'
import {
    obtenerProductosAdmin, crearProductoAdmin, editarProductoAdmin, eliminarProductoAdmin
} from '../servicios/admin'
import { formatearPrecio } from '../utils/validaciones'

// Valores iniciales (vacíos) del formulario de producto
const formularioVacio = {
    codigo: "", nombre: "", descripcion: "", precio: "", stock: "", stockCritico: "", categoria: ""
}

// Administración de productos: tabla, formulario de creación, editar y eliminar
const AdminProductos = () => {
    const [productos, setProductos] = useState(() => obtenerProductosAdmin())
    const [mostrarForm, setMostrarForm] = useState(false)
    const [datos, setDatos] = useState(formularioVacio)

    // Actualiza el campo que el usuario está escribiendo
    const manejarCambio = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value })
    }

    // Valida el formulario y crea el producto nuevo
    const guardarProducto = (e) => {
        e.preventDefault()

        if (
            datos.codigo.trim() === "" || datos.nombre.trim() === "" ||
            datos.precio === "" || datos.stock === "" || datos.categoria === ""
        ) {
            alert("Completa los campos obligatorios")
            return
        }

        const precio = Number(datos.precio)
        const stock = Number(datos.stock)

        if (datos.codigo.trim().length < 3) {
            alert("El código debe tener al menos 3 caracteres")
            return
        }

        if (Number.isNaN(precio) || precio < 0 || !Number.isInteger(stock) || stock < 0) {
            alert("El precio y el stock deben ser números válidos (stock entero, desde 0)")
            return
        }

        if (productos.some((p) => p.codigo === datos.codigo.trim())) {
            alert("Ya existe un producto con ese código")
            return
        }

        const nuevoProducto = {
            codigo: datos.codigo.trim(),
            nombre: datos.nombre,
            categoria: datos.categoria,
            precio: precio,
            stock: stock
        }

        setProductos([...crearProductoAdmin(nuevoProducto)])
        setDatos(formularioVacio)
        alert("Producto creado correctamente")

        // Avisa si el stock ya está en el nivel crítico (o por debajo)
        if (datos.stockCritico !== "" && stock <= Number(datos.stockCritico)) {
            alert("Atención: el stock de este producto está en nivel crítico")
        }
    }

    // Edita un producto pidiendo los datos nuevos con ventanas (prompt)
    const editarProducto = (indice) => {
        const producto = productos[indice]

        const nuevoNombre = prompt("Nombre del producto:", producto.nombre)
        if (nuevoNombre === null) return

        const nuevaCategoria = prompt("Categoría:", producto.categoria)
        if (nuevaCategoria === null) return

        const nuevoPrecio = prompt("Precio:", producto.precio)
        if (nuevoPrecio === null) return

        const nuevoStock = prompt("Stock:", producto.stock)
        if (nuevoStock === null) return

        const precioNumero = Number(nuevoPrecio)
        const stockNumero = Number(nuevoStock)

        // Revisa que los datos sean válidos antes de guardar
        if (
            nuevoNombre.trim() === "" ||
            Number.isNaN(precioNumero) || precioNumero < 0 ||
            !Number.isInteger(stockNumero) || stockNumero < 0
        ) {
            alert("Los datos ingresados no son válidos")
            return
        }

        setProductos([...editarProductoAdmin(indice, {
            nombre: nuevoNombre,
            categoria: nuevaCategoria,
            precio: precioNumero,
            stock: stockNumero
        })])
        alert("Producto modificado correctamente")
    }

    // Elimina un producto (pide confirmación antes)
    const eliminarProducto = (indice) => {
        const producto = productos[indice]

        if (!confirm("¿Seguro que quieres eliminar " + producto.nombre + "?")) {
            return
        }

        setProductos([...eliminarProductoAdmin(indice)])
        alert("Producto eliminado correctamente")
    }

    return (
        <div className="container-fluid">
            <div className="row min-vh-100">
                <AdminSidebar />

                <main className="col-md-9 col-lg-10 p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h1>Administrar Productos</h1>
                            <p className="text-muted">Listado de productos disponibles en la tienda.</p>
                        </div>

                        {/* Muestra u oculta el formulario */}
                        <button className="btn btn-primary" type="button"
                                onClick={() => setMostrarForm(!mostrarForm)}>
                            Nuevo producto
                        </button>
                    </div>

                    {/* Formulario de nuevo producto */}
                    {mostrarForm && (
                        <div className="mb-5">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="mb-4">Nuevo Producto</h4>

                                    <form onSubmit={guardarProducto}>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="admin-producto-codigo" className="form-label">Código</label>
                                                <input type="text" className="form-control" id="admin-producto-codigo"
                                                       name="codigo" minLength={3} value={datos.codigo}
                                                       onChange={manejarCambio} required />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="admin-producto-nombre" className="form-label">Nombre</label>
                                                <input type="text" className="form-control" id="admin-producto-nombre"
                                                       name="nombre" maxLength={100} value={datos.nombre}
                                                       onChange={manejarCambio} required />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="admin-producto-descripcion" className="form-label">Descripción</label>
                                            <textarea className="form-control" id="admin-producto-descripcion"
                                                      name="descripcion" maxLength={500} rows={3}
                                                      value={datos.descripcion} onChange={manejarCambio}></textarea>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="admin-producto-precio" className="form-label">Precio</label>
                                                <input type="number" className="form-control" id="admin-producto-precio"
                                                       name="precio" min={0} step={0.01} value={datos.precio}
                                                       onChange={manejarCambio} required />
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="admin-producto-stock" className="form-label">Stock</label>
                                                <input type="number" className="form-control" id="admin-producto-stock"
                                                       name="stock" min={0} step={1} value={datos.stock}
                                                       onChange={manejarCambio} required />
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="admin-producto-stock-critico" className="form-label">Stock crítico</label>
                                                <input type="number" className="form-control" id="admin-producto-stock-critico"
                                                       name="stockCritico" min={0} step={1} value={datos.stockCritico}
                                                       onChange={manejarCambio} />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="admin-producto-categoria" className="form-label">Categoría</label>
                                                <select className="form-select" id="admin-producto-categoria"
                                                        name="categoria" value={datos.categoria}
                                                        onChange={manejarCambio} required>
                                                    <option value="">Seleccionar</option>
                                                    {categoriasAdmin.map((categoria) => (
                                                        <option key={categoria} value={categoria}>{categoria}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="admin-producto-imagen" className="form-label">Imagen</label>
                                                <input type="file" className="form-control" id="admin-producto-imagen" />
                                            </div>
                                        </div>

                                        <button type="submit" className="btn btn-primary">Guardar producto</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tabla de productos */}
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered align-middle">
                            <thead className="tabla-header-ferreteria">
                                <tr>
                                    <th>Código</th>
                                    <th>Producto</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((producto, i) => (
                                    <tr key={producto.codigo}>
                                        <td>{producto.codigo}</td>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.categoria}</td>
                                        <td>${formatearPrecio(producto.precio)}</td>
                                        <td>{producto.stock}</td>
                                        <td>
                                            <button className="btn btn-sm btn-warning me-1" onClick={() => editarProducto(i)}>
                                                Editar
                                            </button>
                                            <button className="btn btn-sm btn-danger" onClick={() => eliminarProducto(i)}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminProductos
