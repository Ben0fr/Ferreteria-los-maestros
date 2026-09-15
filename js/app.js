// ==========================================================
// app.js - Ferretería Los Maestros
// Catálogo de productos, carrito de compras y usuarios.
// ==========================================================

const productos = [
    { id: 1, codigo: "MAR001", nombre: "Martillo Carpintero",        categoria: "Herramientas manuales",     categoriaSlug: "manuales",     precio: 6990,  stock: 25, icono: "🔨" },
    { id: 2, codigo: "TAL002", nombre: "Taladro Percutor 650W",      categoria: "Herramientas eléctricas",   categoriaSlug: "electricas",   precio: 39990, stock: 12, icono: "🔌" },
    { id: 3, codigo: "CEM003", nombre: "Saco de Cemento 25kg",       categoria: "Materiales de construcción", categoriaSlug: "construccion", precio: 5490,  stock: 40, icono: "🧱" },
    { id: 4, codigo: "PIN004", nombre: "Pintura Látex 1 Galón",      categoria: "Pinturas",                   categoriaSlug: "pinturas",     precio: 12990, stock: 18, icono: "🎨" },
    { id: 5, codigo: "GUA005", nombre: "Guantes de Seguridad",       categoria: "Seguridad y EPP",            categoriaSlug: "seguridad",    precio: 3990,  stock: 30, icono: "🦺" },
    { id: 6, codigo: "TOR006", nombre: "Caja de Tornillos (100 un.)", categoria: "Ferretería general",        categoriaSlug: "general",      precio: 2490,  stock: 50, icono: "🔩" }
];

// ----------------------------------------------------------
// Muestra las cards de productos en productos.html
// ----------------------------------------------------------
function mostrarProductos() {
    const contenedor = document.getElementById("contenedor-productos");

    if (contenedor === null) {
        return;
    }

    const parametros = new URLSearchParams(window.location.search);
    const categoriaFiltro = parametros.get("categoria");

    let productosAMostrar = [];

    for (let i = 0; i < productos.length; i++) {
        if (categoriaFiltro === null || productos[i].categoriaSlug === categoriaFiltro) {
            productosAMostrar.push(productos[i]);
        }
    }

    const tituloCategoria = document.getElementById("categoria-actual");

    if (tituloCategoria !== null) {
        if (categoriaFiltro === null) {
            tituloCategoria.innerHTML = "";
        } else if (productosAMostrar.length > 0) {
            tituloCategoria.innerHTML = "Mostrando: " + productosAMostrar[0].categoria + " — <a href='productos.html'>Ver todos los productos</a>";
        } else {
            tituloCategoria.innerHTML = "No hay productos en esa categoría. <a href='productos.html'>Ver todos los productos</a>";
        }
    }

    let html = "";

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
              <p class="card-text text-muted mb-3">Stock: ${p.stock} unidades</p>
            </div>
            <button type="button" class="btn btn-primary w-100" onclick="agregarAlCarrito(${p.id})">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    `;
    }

    contenedor.innerHTML = html;
}

// ----------------------------------------------------------
// Búsqueda y gestión del Carrito de Compras
// ----------------------------------------------------------
function buscarProductoPorId(id) {
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            return productos[i];
        }
    }
    return null;
}

function agregarAlCarrito(id) {
    let carritoGuardado = localStorage.getItem("carritoFerreteria");
    let carrito = [];

    if (carritoGuardado !== null) {
        carrito = JSON.parse(carritoGuardado);
    }

    let yaExiste = false;

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === id) {
            carrito[i].cantidad = carrito[i].cantidad + 1;
            yaExiste = true;
        }
    }

    if (yaExiste === false) {
        carrito.push({ id: id, cantidad: 1 });
    }

    localStorage.setItem("carritoFerreteria", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
}

function eliminarDelCarrito(id) {
    let carritoGuardado = localStorage.getItem("carritoFerreteria");
    let carrito = [];

    if (carritoGuardado !== null) {
        carrito = JSON.parse(carritoGuardado);
    }

    let carritoNuevo = [];

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id !== id) {
            carritoNuevo.push(carrito[i]);
        }
    }

    localStorage.setItem("carritoFerreteria", JSON.stringify(carritoNuevo));
    mostrarCarrito();
}

function actualizarTotal(total) {
    const totalTexto = document.getElementById("total-carrito");

    if (totalTexto !== null) {
        totalTexto.textContent = total;
    }
}

function mostrarCarrito() {
    const contenedor = document.getElementById("contenedor-carrito");

    if (contenedor === null) {
        return;
    }

    let carritoGuardado = localStorage.getItem("carritoFerreteria");
    let carrito = [];

    if (carritoGuardado !== null) {
        carrito = JSON.parse(carritoGuardado);
    }

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p class='col-12 text-center'>Tu carrito está vacío. <a href='productos.html'>Ver productos</a></p>";
        actualizarTotal(0);
        return;
    }

    let html = "";
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        const item = carrito[i];
        const producto = buscarProductoPorId(item.id);

        if (producto === null) {
            continue;
        }

        const subtotal = producto.precio * item.cantidad;
        total = total + subtotal;

        html += `
      <div class="col-md-4 mb-3">
        <div class="card h-100">
          <div class="card-body text-center d-flex flex-column justify-content-between">
            <div>
              <div class="fs-1 mb-2">${producto.icono}</div>
              <h5 class="card-title">${producto.nombre}</h5>
              <p class="card-text mb-1">Precio: $${producto.precio}</p>
              <p class="card-text mb-1">Cantidad: ${item.cantidad}</p>
              <p class="card-text fw-bold">Subtotal: $${subtotal}</p>
            </div>
            <button type="button" class="btn btn-danger w-100 mt-2" onclick="eliminarDelCarrito(${producto.id})">
              Quitar del carrito
            </button>
          </div>
        </div>
      </div>
    `;
    }

    contenedor.innerHTML = html;
    actualizarTotal(total);
}

// ----------------------------------------------------------
// Validaciones y gestión de usuarios
// ----------------------------------------------------------
function validarCorreo(correo) {
    if (correo.endsWith("@duoc.cl") || correo.endsWith("@profesor.duoc.cl") || correo.endsWith("@gmail.com")) {
        return true;
    }
    return false;
}

function buscarUsuario(correo, clave) {
    let usuariosGuardados = localStorage.getItem("usuariosFerreteria");
    let usuarios = [];

    if (usuariosGuardados !== null) {
        usuarios = JSON.parse(usuariosGuardados);
    }

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].correo === correo && usuarios[i].clave === clave) {
            return usuarios[i];
        }
    }

    return null;
}

function validarLogin() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const errorEmail = document.getElementById("error-login-email");
    const errorPassword = document.getElementById("error-login-password");

    errorEmail.textContent = "";
    errorPassword.textContent = "";

    let esValido = true;

    if (validarCorreo(email) === false) {
        errorEmail.textContent = "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com";
        esValido = false;
    }

    if (password.length < 4 || password.length > 10) {
        errorPassword.textContent = "La contraseña debe tener entre 4 y 10 caracteres";
        esValido = false;
    }

    if (esValido === false) {
        return false;
    }

    const usuario = buscarUsuario(email, password);

    if (usuario === null) {
        errorPassword.textContent = "Correo o contraseña incorrectos";
        return false;
    }

    localStorage.setItem("usuarioActualFerreteria", JSON.stringify(usuario));

    alert("Bienvenido, " + usuario.nombre);
    window.location.href = "index.html";
    return false;
}

function validarRegistro() {
    const nombre = document.getElementById("registro-nombre").value;
    const email = document.getElementById("registro-email").value;
    const password = document.getElementById("registro-password").value;
    const password2 = document.getElementById("registro-password2").value;

    const errorNombre = document.getElementById("error-registro-nombre");
    const errorEmail = document.getElementById("error-registro-email");
    const errorPassword = document.getElementById("error-registro-password");
    const errorPassword2 = document.getElementById("error-registro-password2");

    errorNombre.textContent = "";
    errorEmail.textContent = "";
    errorPassword.textContent = "";
    errorPassword2.textContent = "";

    let esValido = true;

    if (nombre.trim() === "") {
        errorNombre.textContent = "Debes ingresar tu nombre";
        esValido = false;
    }

    if (validarCorreo(email) === false) {
        errorEmail.textContent = "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com";
        esValido = false;
    }

    if (password.length < 4 || password.length > 10) {
        errorPassword.textContent = "La contraseña debe tener entre 4 y 10 caracteres";
        esValido = false;
    }

    if (password !== password2) {
        errorPassword2.textContent = "Las contraseñas no coinciden";
        esValido = false;
    }

    if (esValido === false) {
        return false;
    }

    let usuariosGuardados = localStorage.getItem("usuariosFerreteria");
    let usuarios = [];

    if (usuariosGuardados !== null) {
        usuarios = JSON.parse(usuariosGuardados);
    }

    usuarios.push({ nombre: nombre, correo: email, clave: password });
    localStorage.setItem("usuariosFerreteria", JSON.stringify(usuarios));

    alert("Cuenta creada con éxito. Ahora inicia sesión.");
    window.location.href = "login.html";
    return false;
}

// ----------------------------------------------------------
// Gestión del Menú según Estado de Sesión
// ----------------------------------------------------------
function actualizarMenuUsuario() {
    const navLogin = document.getElementById("nav-login");
    const navRegistro = document.getElementById("nav-registro");
    const navUsuario = document.getElementById("nav-usuario");
    const navUsuarioNombre = document.getElementById("nav-usuario-nombre");
    const navLogout = document.getElementById("nav-logout");

    if (navLogin === null || navRegistro === null || navUsuario === null || navLogout === null) {
        return;
    }

    const usuarioGuardado = localStorage.getItem("usuarioActualFerreteria");

    if (usuarioGuardado === null) {
        navLogin.classList.remove("d-none");
        navRegistro.classList.remove("d-none");
        navUsuario.classList.add("d-none");
        navLogout.classList.add("d-none");
    } else {
        const usuario = JSON.parse(usuarioGuardado);
        if (navUsuarioNombre !== null) {
            navUsuarioNombre.textContent = "Hola, " + usuario.nombre;
        }

        navLogin.classList.add("d-none");
        navRegistro.classList.add("d-none");
        navUsuario.classList.remove("d-none");
        navLogout.classList.remove("d-none");
    }
}

function cerrarSesion() {
    localStorage.removeItem("usuarioActualFerreteria");
    window.location.href = "index.html";
}

// ----------------------------------------------------------
// Inicialización
// ----------------------------------------------------------
mostrarProductos();
mostrarCarrito();
actualizarMenuUsuario();