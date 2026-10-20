import { useState } from 'react'
import { Modal } from 'react-bootstrap'
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

    // Edición: indice del producto que se está editando (null = modal cerrado) y sus datos
    const [indiceEdicion, setIndiceEdicion] = useState(null)
    const [datosEdicion, setDatosEdicion] = useState(formularioVacio)

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
            descripcion: datos.descripcion,
            stockCritico: datos.stockCritico === "" ? null : Number(datos.stockCritico),
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

    // Abre el cuadro de edición con todos los datos actuales del producto
    const abrirEdicion = (indice) => {
        const p = productos[indice]
        setDatosEdicion({
            codigo: p.codigo,
            nombre: p.nombre,
            descripcion: p.descripcion ?? "",
            precio: String(p.precio),
            stock: String(p.stock),
            stockCritico: p.stockCritico === null || p.stockCritico === undefined ? "" : String(p.stockCritico),
            categoria: p.categoria
        })
        setIndiceEdicion(indice)
    }

    const cerrarEdicion = () => setIndiceEdicion(null)

    const manejarCambioEdicion = (e) => {
        setDatosEdicion({ ...datosEdicion, [e.target.name]: e.target.value })
    }

    // Valida y guarda todos los datos modificados de una vez
    const guardarEdicion = (e) => {
        e.preventDefault()

        const precio = Number(datosEdicion.precio)
        const stock = Number(datosEdicion.stock)
        const stockCritico = datosEdicion.stockCritico === "" ? null : Number(datosEdicion.stockCritico)

        if (datosEdicion.nombre.trim() === "" || datosEdicion.categoria === "" ||
            datosEdicion.precio === "" || datosEdicion.stock === "") {
            alert("Completa los campos obligatorios")
            return
        }

        if (Number.isNaN(precio) || precio < 0 || !Number.isInteger(stock) || stock < 0) {
            alert("El precio y el stock deben ser números válidos (stock entero, desde 0)")
            return
        }

        if (stockCritico !== null && (!Number.isInteger(stockCritico) || stockCritico < 0)) {
            alert("El stock crítico debe ser un número entero desde 0")
            return
        }

        setProductos([...editarProductoAdmin(indiceEdicion, {
            nombre: datosEdicion.nombre,
            categoria: datosEdicion.categoria,
            descripcion: datosEdicion.descripcion,
            stockCritico: stockCritico,
            precio: precio,
            stock: stock
        })])
        cerrarEdicion()
        alert("Producto modificado correctamente")

        if (stockCritico !== null && stock <= stockCritico) {
            alert("Atención: el stock de este producto está en nivel crítico")
        }
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
                                            <button className="btn btn-sm btn-warning me-1" onClick={() => abrirEdicion(i)}>
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
            {/* Cuadro para modificar todos los datos del producto de una vez */}
            <Modal show={indiceEdicion !== null} onHide={cerrarEdicion} centered size="lg">
                <form onSubmit={guardarEdicion}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modificar producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="editar-producto-codigo" className="form-label">Código</label>
                                <input type="text" className="form-control" id="editar-producto-codigo"
                                       value={datosEdicion.codigo} disabled readOnly />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="editar-producto-nombre" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="editar-producto-nombre"
                                       name="nombre" maxLength={100} value={datosEdicion.nombre}
                                       onChange={manejarCambioEdicion} required />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="editar-producto-descripcion" className="form-label">Descripción</label>
                            <textarea className="form-control" id="editar-producto-descripcion"
                                      name="descripcion" maxLength={500} rows={3}
                                      value={datosEdicion.descripcion} onChange={manejarCambioEdicion}></textarea>
                        </div>

                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="editar-producto-precio" className="form-label">Precio</label>
                                <input type="number" className="form-control" id="editar-producto-precio"
                                       name="precio" min={0} step={0.01} value={datosEdicion.precio}
                                       onChange={manejarCambioEdicion} required />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="editar-producto-stock" className="form-label">Stock</label>
                                <input type="number" className="form-control" id="editar-producto-stock"
                                       name="stock" min={0} step={1} value={datosEdicion.stock}
                                       onChange={manejarCambioEdicion} required />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="editar-producto-stock-critico" className="form-label">Stock crítico</label>
                                <input type="number" className="form-control" id="editar-producto-stock-critico"
                                       name="stockCritico" min={0} step={1} value={datosEdicion.stockCritico}
                                       onChange={manejarCambioEdicion} />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="editar-producto-categoria" className="form-label">Categoría</label>
                            <select className="form-select" id="editar-producto-categoria"
                                    name="categoria" value={datosEdicion.categoria}
                                    onChange={manejarCambioEdicion} required>
                                <option value="">Seleccionar</option>
                                {[...new Set([...categoriasAdmin, datosEdicion.categoria].filter(Boolean))].map((categoria) => (
                                    <option key={categoria} value={categoria}>{categoria}</option>
                                ))}
                            </select>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={cerrarEdicion}>Cancelar</button>
                        <button type="submit" className="btn btn-primary">Guardar cambios</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}

export default AdminProductos
