// ==========================================================
// app.js - Ferretería Los Maestros
// Catálogo, carrito, usuarios, formularios y administración
// ==========================================================


// ================= PRODUCTOS =================

// Arreglo principal con los productos de la tienda
const productos = [
    { id: 1, codigo: "MAR001", nombre: "Martillo Carpintero", categoria: "Herramientas manuales", categoriaSlug: "manuales", precio: 6990, stock: 25, icono: "🔨" },
    { id: 2, codigo: "TAL002", nombre: "Taladro Percutor 650W", categoria: "Herramientas eléctricas", categoriaSlug: "electricas", precio: 39990, stock: 12, icono: "🔌" },
    { id: 3, codigo: "CEM003", nombre: "Saco de Cemento 25kg", categoria: "Materiales de construcción", categoriaSlug: "construccion", precio: 5490, stock: 40, icono: "🧱" },
    { id: 4, codigo: "PIN004", nombre: "Pintura Látex 1 Galón", categoria: "Pinturas", categoriaSlug: "pinturas", precio: 12990, stock: 18, icono: "🎨" },
    { id: 5, codigo: "GUA005", nombre: "Guantes de Seguridad", categoria: "Seguridad y EPP", categoriaSlug: "seguridad", precio: 3990, stock: 30, icono: "🦺" },
    { id: 6, codigo: "TOR006", nombre: "Caja de Tornillos (100 un.)", categoria: "Ferretería general", categoriaSlug: "general", precio: 2490, stock: 50, icono: "🔩" }
];


// Muestra los productos y permite filtrar usando ?categoria=
function mostrarProductos() {
    const contenedor = document.getElementById("contenedor-productos");

    // Permite usar el mismo app.js en páginas que no tienen catálogo
    if (contenedor === null) {
        return;
    }

    // Lee la categoría desde la URL
    const parametros = new URLSearchParams(window.location.search);
    const categoriaFiltro = parametros.get("categoria");

    let productosAMostrar = [];

    // Si no hay filtro muestra todos, si hay filtro muestra esa categoría
    for (let i = 0; i < productos.length; i++) {
        if (categoriaFiltro === null || productos[i].categoriaSlug === categoriaFiltro) {
            productosAMostrar.push(productos[i]);
        }
    }

    // Muestra el nombre de la categoría seleccionada
    const tituloCategoria = document.getElementById("categoria-actual");

    if (tituloCategoria !== null) {
        if (categoriaFiltro === null) {
            tituloCategoria.innerHTML = "";
        } else if (productosAMostrar.length > 0) {
            tituloCategoria.innerHTML =
                "Mostrando: " + productosAMostrar[0].categoria +
                " — <a href='productos.html'>Ver todos los productos</a>";
        } else {
            tituloCategoria.innerHTML =
                "No hay productos en esa categoría. <a href='productos.html'>Ver todos los productos</a>";
        }
    }

    let html = "";

    // Crea las tarjetas de productos dinámicamente
    for (let i = 0; i < productosAMostrar.length; i++) {
        const p = productosAMostrar[i];

        html += `
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body text-center d-flex flex-column justify-content-between">

                        <div>
                            <div class="fs-1 mb-2">${p.icono}</div>
                            <h5 class="card-title">${p.nombre}</h5>
                            <p class="card-text mb-1">Categoría: ${p.categoria}</p>
                            <p class="card-text mb-1 fw-bold">Precio: $${p.precio}</p>
                            <p class="card-text text-muted mb-3">
                                Stock: ${p.stock} unidades
                            </p>
                        </div>

                        <div class="d-grid gap-2">
                            <a href="detalle-producto.html?id=${p.id}"
                               class="btn btn-outline-secondary">
                                Ver detalle
                            </a>

                            <button
                                type="button"
                                class="btn btn-primary"
                                onclick="agregarAlCarrito(${p.id})">
                                Agregar al carrito
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        `;
    }

    // Inserta las tarjetas dentro de productos.html
    contenedor.innerHTML = html;
}


// Busca un producto usando su id
function buscarProductoPorId(id) {
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            return productos[i];
        }
    }

    return null;
}


// ================= CARRITO =================

// Agrega un producto al carrito y lo guarda en localStorage
function agregarAlCarrito(id) {
    let carritoGuardado = localStorage.getItem("carritoFerreteria");
    let carrito = [];

    if (carritoGuardado !== null) {
        carrito = JSON.parse(carritoGuardado);
    }

    let yaExiste = false;

    // Si el producto ya existe aumenta su cantidad
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === id) {
            carrito[i].cantidad = carrito[i].cantidad + 1;
            yaExiste = true;
        }
    }

    // Si no existe, lo agrega con cantidad 1
    if (yaExiste === false) {
        carrito.push({ id: id, cantidad: 1 });
    }

    localStorage.setItem(
        "carritoFerreteria",
        JSON.stringify(carrito)
    );

    alert("Producto agregado al carrito");
}


// ================= DETALLE PRODUCTO =================

// Obtiene el id desde la URL y muestra el producto seleccionado
function mostrarDetalleProducto() {
    const contenedor = document.getElementById("detalle-producto");

    if (contenedor === null) {
        return;
    }

    const parametros = new URLSearchParams(window.location.search);
    const id = Number(parametros.get("id"));

    const productoEncontrado = buscarProductoPorId(id);

    if (productoEncontrado === null) {
        contenedor.innerHTML =
            "<div class='alert alert-danger'>Producto no encontrado</div>";
        return;
    }

    contenedor.innerHTML = `
        <div class="card">
            <div class="card-body">

                <div class="fs-1 text-center">
                    ${productoEncontrado.icono}
                </div>

                <h2 class="card-title">
                    ${productoEncontrado.nombre}
                </h2>

                <p>Código: ${productoEncontrado.codigo}</p>
                <p>Categoría: ${productoEncontrado.categoria}</p>
                <p>Precio: $${productoEncontrado.precio}</p>
                <p>Stock: ${productoEncontrado.stock} unidades</p>

                <button
                    type="button"
                    class="btn btn-primary"
                    onclick="agregarAlCarrito(${productoEncontrado.id})">
                    Agregar al carrito
                </button>

                <a href="productos.html"
                   class="btn btn-secondary">
                    Volver al catálogo
                </a>

            </div>
        </div>
    `;
}


// ================= GESTIÓN DEL CARRITO =================

// Elimina un producto específico del carrito
function eliminarDelCarrito(id) {
    let carritoGuardado =
        localStorage.getItem("carritoFerreteria");

    let carrito = [];

    if (carritoGuardado !== null) {
        carrito = JSON.parse(carritoGuardado);
    }

    let carritoNuevo = [];

    // Conserva todos excepto el producto seleccionado
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id !== id) {
            carritoNuevo.push(carrito[i]);
        }
    }

    localStorage.setItem(
        "carritoFerreteria",
        JSON.stringify(carritoNuevo)
    );

    mostrarCarrito();
}


// Actualiza el total mostrado en carrito.html
function actualizarTotal(total) {
    const totalTexto =
        document.getElementById("total-carrito");

    if (totalTexto !== null) {
        totalTexto.textContent = total;
    }
}


// Recupera el carrito, calcula subtotales y muestra los productos
function mostrarCarrito() {
    const contenedor =
        document.getElementById("contenedor-carrito");

    if (contenedor === null) {
        return;
    }

    let carritoGuardado =
        localStorage.getItem("carritoFerreteria");

    let carrito = [];

    if (carritoGuardado !== null) {
        carrito = JSON.parse(carritoGuardado);
    }

    // Caso carrito vacío
    if (carrito.length === 0) {
        contenedor.innerHTML =
            "<div class='alert alert-info'>El carrito está vacío. <a href='productos.html'>Ver productos</a></div>";

        actualizarTotal(0);
        return;
    }

    let html = "";
    let total = 0;

    // Recorre el carrito y calcula precio x cantidad
    for (let i = 0; i < carrito.length; i++) {
        const item = carrito[i];

        const producto =
            buscarProductoPorId(item.id);

        if (producto === null) {
            continue;
        }

        const subtotal =
            producto.precio * item.cantidad;

        total = total + subtotal;

        html += `
            <div class="card mb-3">
                <div class="card-body">

                    <div class="fs-1">
                        ${producto.icono}
                    </div>

                    <h5>
                        ${producto.nombre}
                    </h5>

                    <p>Precio: $${producto.precio}</p>
                    <p>Cantidad: ${item.cantidad}</p>
                    <p>Subtotal: $${subtotal}</p>

                    <button
                        type="button"
                        class="btn btn-danger"
                        onclick="eliminarDelCarrito(${producto.id})">
                        Eliminar
                    </button>

                </div>
            </div>
        `;
    }

    contenedor.innerHTML = html;
    actualizarTotal(total);
}


// Elimina todo el carrito de localStorage
function vaciarCarrito() {
    localStorage.removeItem("carritoFerreteria");
    mostrarCarrito();
}


// ================= USUARIOS =================

// Solo permite correos de los dominios definidos
function validarCorreo(correo) {
    if (
        correo.endsWith("@duoc.cl") ||
        correo.endsWith("@profesor.duoc.cl") ||
        correo.endsWith("@gmail.com")
    ) {
        return true;
    }

    return false;
}


// Busca un usuario registrado usando correo y contraseña
function buscarUsuario(correo, clave) {
    let usuariosGuardados =
        localStorage.getItem("usuariosFerreteria");

    let usuarios = [];

    if (usuariosGuardados !== null) {
        usuarios = JSON.parse(usuariosGuardados);
    }

    for (let i = 0; i < usuarios.length; i++) {
        if (
            usuarios[i].correo === correo &&
            usuarios[i].clave === clave
        ) {
            return usuarios[i];
        }
    }

    return null;
}


// ================= LOGIN =================

// Valida los datos y guarda al usuario que inicia sesión
function validarLogin() {
    const email =
        document.getElementById("login-email").value;

    const password =
        document.getElementById("login-password").value;

    const errorEmail =
        document.getElementById("error-login-email");

    const errorPassword =
        document.getElementById("error-login-password");

    // Limpia errores anteriores
    errorEmail.textContent = "";
    errorPassword.textContent = "";

    let esValido = true;

    // Valida dominio del correo
    if (validarCorreo(email) === false) {
        errorEmail.textContent =
            "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com";

        esValido = false;
    }

    // Valida largo de contraseña
    if (
        password.length < 4 ||
        password.length > 10
    ) {
        errorPassword.textContent =
            "La contraseña debe tener entre 4 y 10 caracteres";

        esValido = false;
    }

    if (esValido === false) {
        return false;
    }

    // Comprueba que el usuario exista
    const usuario =
        buscarUsuario(email, password);

    if (usuario === null) {
        errorPassword.textContent =
            "Correo o contraseña incorrectos";

        return false;
    }

    // Guarda al usuario que tiene la sesión activa
    localStorage.setItem(
        "usuarioActualFerreteria",
        JSON.stringify(usuario)
    );

    alert("Bienvenido, " + usuario.nombre);

    window.location.href = "index.html";

    return false;
}


// ================= REGISTRO =================

// Valida y guarda nuevos usuarios en localStorage
function validarRegistro() {
    const nombre =
        document.getElementById("registro-nombre").value;

    const email =
        document.getElementById("registro-email").value;

    const password =
        document.getElementById("registro-password").value;

    const password2 =
        document.getElementById("registro-password2").value;

    const errorNombre =
        document.getElementById("error-registro-nombre");

    const errorEmail =
        document.getElementById("error-registro-email");

    const errorPassword =
        document.getElementById("error-registro-password");

    const errorPassword2 =
        document.getElementById("error-registro-password2");

    // Limpia mensajes anteriores
    errorNombre.textContent = "";
    errorEmail.textContent = "";
    errorPassword.textContent = "";
    errorPassword2.textContent = "";

    let esValido = true;

    if (nombre.trim() === "") {
        errorNombre.textContent =
            "Debes ingresar tu nombre";

        esValido = false;
    }

    if (validarCorreo(email) === false) {
        errorEmail.textContent =
            "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com";

        esValido = false;
    }

    if (
        password.length < 4 ||
        password.length > 10
    ) {
        errorPassword.textContent =
            "La contraseña debe tener entre 4 y 10 caracteres";

        esValido = false;
    }

    if (password !== password2) {
        errorPassword2.textContent =
            "Las contraseñas no coinciden";

        esValido = false;
    }

    if (esValido === false) {
        return false;
    }

    // Recupera los usuarios existentes
    let usuariosGuardados =
        localStorage.getItem("usuariosFerreteria");

    let usuarios = [];

    if (usuariosGuardados !== null) {
        usuarios = JSON.parse(usuariosGuardados);
    }

    // Agrega el nuevo usuario
    usuarios.push({
        nombre: nombre,
        correo: email,
        clave: password
    });

    localStorage.setItem(
        "usuariosFerreteria",
        JSON.stringify(usuarios)
    );

    alert("Cuenta creada con éxito. Ahora inicia sesión.");

    window.location.href = "login.html";

    return false;
}


// ================= SESIÓN Y MENÚ =================

// Cambia las opciones del navbar dependiendo de si hay sesión
function actualizarMenuUsuario() {
    const navLogin =
        document.getElementById("nav-login");

    const navRegistro =
        document.getElementById("nav-registro");

    const navUsuario =
        document.getElementById("nav-usuario");

    const navUsuarioNombre =
        document.getElementById("nav-usuario-nombre");

    const navLogout =
        document.getElementById("nav-logout");

    // Algunas páginas no tienen estos elementos
    if (
        navLogin === null ||
        navRegistro === null ||
        navUsuario === null ||
        navLogout === null
    ) {
        return;
    }

    const usuarioGuardado =
        localStorage.getItem("usuarioActualFerreteria");

    // Sin sesión: muestra login y registro
    if (usuarioGuardado === null) {
        navLogin.classList.remove("d-none");
        navRegistro.classList.remove("d-none");

        navUsuario.classList.add("d-none");
        navLogout.classList.add("d-none");

    // Con sesión: muestra nombre y cerrar sesión
    } else {
        const usuario =
            JSON.parse(usuarioGuardado);

        if (navUsuarioNombre !== null) {
            navUsuarioNombre.textContent =
                "Hola, " + usuario.nombre;
        }

        navLogin.classList.add("d-none");
        navRegistro.classList.add("d-none");

        navUsuario.classList.remove("d-none");
        navLogout.classList.remove("d-none");
    }
}


// Elimina solamente la sesión actual
function cerrarSesion() {
    localStorage.removeItem(
        "usuarioActualFerreteria"
    );

    window.location.href = "index.html";
}


// ================= CONTACTO =================

// Valida el formulario de contacto
function validarContacto() {
    const nombre =
        document.getElementById("contacto-nombre").value;

    const email =
        document.getElementById("contacto-email").value;

    const comentario =
        document.getElementById("contacto-comentario").value;

    const errorNombre =
        document.getElementById("error-contacto-nombre");

    const errorEmail =
        document.getElementById("error-contacto-email");

    const errorComentario =
        document.getElementById("error-contacto-comentario");

    const mensajeContacto =
        document.getElementById("mensaje-contacto");

    // Limpia errores anteriores
    errorNombre.textContent = "";
    errorEmail.textContent = "";
    errorComentario.textContent = "";

    mensajeContacto.classList.add("d-none");

    let esValido = true;

    // Nombre obligatorio y máximo 100 caracteres
    if (nombre.trim() === "") {
        errorNombre.textContent =
            "Debes ingresar tu nombre";

        esValido = false;
    }

    if (nombre.length > 100) {
        errorNombre.textContent =
            "El nombre no puede superar los 100 caracteres";

        esValido = false;
    }

    // Correo obligatorio y dominio permitido
    if (email.trim() === "") {
        errorEmail.textContent =
            "Debes ingresar tu correo electrónico";

        esValido = false;

    } else if (validarCorreo(email) === false) {
        errorEmail.textContent =
            "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com";

        esValido = false;
    }

    // Comentario obligatorio y máximo 500 caracteres
    if (comentario.trim() === "") {
        errorComentario.textContent =
            "Debes ingresar un comentario";

        esValido = false;
    }

    if (comentario.length > 500) {
        errorComentario.textContent =
            "El comentario no puede superar los 500 caracteres";

        esValido = false;
    }

    if (esValido === false) {
        return false;
    }

    // Muestra mensaje de éxito y limpia el formulario
    mensajeContacto.classList.remove("d-none");

    document.getElementById("contacto-nombre").value = "";
    document.getElementById("contacto-email").value = "";
    document.getElementById("contacto-comentario").value = "";

    return false;
}


// ================= CONEXIÓN CON ADMIN =================

// Actualiza el stock de los productos existentes según administración
function actualizarStockDesdeAdmin() {
    const productosAdminGuardados =
        localStorage.getItem("productosAdminFerreteria");

    if (productosAdminGuardados === null) {
        return;
    }

    const productosAdmin =
        JSON.parse(productosAdminGuardados);

    for (let i = 0; i < productos.length; i++) {

        for (let j = 0; j < productosAdmin.length; j++) {

            if (
                productos[i].codigo ===
                productosAdmin[j].codigo
            ) {
                productos[i].stock =
                    productosAdmin[j].stock;

                break;
            }
        }
    }
}


// Carga cambios realizados por administración
// También agrega productos nuevos a la tienda
function cargarProductosDesdeAdmin() {
    const productosAdminGuardados =
        localStorage.getItem("productosAdminFerreteria");

    if (productosAdminGuardados === null) {
        return;
    }

    const productosAdmin =
        JSON.parse(productosAdminGuardados);

    for (let i = 0; i < productosAdmin.length; i++) {

        const productoAdmin =
            productosAdmin[i];

        let encontrado = false;

        // Busca si el producto ya existe por su código
        for (let j = 0; j < productos.length; j++) {

            if (
                productos[j].codigo ===
                productoAdmin.codigo
            ) {
                productos[j].nombre =
                    productoAdmin.nombre;

                productos[j].categoria =
                    productoAdmin.categoria;

                productos[j].precio =
                    productoAdmin.precio;

                productos[j].stock =
                    productoAdmin.stock;

                encontrado = true;
                break;
            }
        }

        // Si es un producto nuevo, se agrega a la tienda
        if (encontrado === false) {
            productos.push({
                id: productos.length + 1,
                codigo: productoAdmin.codigo,
                nombre: productoAdmin.nombre,
                categoria: productoAdmin.categoria,
                categoriaSlug: "general",
                precio: productoAdmin.precio,
                stock: productoAdmin.stock,
                icono: "🧰"
            });
        }
    }
}


// Elimina de la tienda los productos borrados por el administrador
function aplicarProductosEliminadosAdmin() {
    const eliminadosGuardados =
        localStorage.getItem("productosEliminadosAdmin");

    if (eliminadosGuardados === null) {
        return;
    }

    const eliminados =
        JSON.parse(eliminadosGuardados);

    // Recorre desde el final para poder usar splice()
    for (let i = productos.length - 1; i >= 0; i--) {

        if (
            eliminados.includes(productos[i].codigo)
        ) {
            productos.splice(i, 1);
        }
    }
}


// ================= INICIALIZACIÓN =================

// Primero aplica los cambios del administrador
cargarProductosDesdeAdmin();
aplicarProductosEliminadosAdmin();
actualizarStockDesdeAdmin();

// Después carga las funciones necesarias de cada página
mostrarProductos();
mostrarDetalleProducto();
mostrarCarrito();
actualizarMenuUsuario();
