// ==========================================================
// app.js - Ferretería Los Maestros
// Acá guardamos la lista de productos y las funciones
// que arman el catálogo y manejan el carrito de compras.
// ==========================================================

// Arreglo con los productos de la ferretería (usamos emojis como ícono
// porque todavía no tenemos fotos reales de los productos)
const productos = [
    { id: 1, codigo: "MAR001", nombre: "Martillo Carpintero",        categoria: "Herramientas manuales",     categoriaSlug: "manuales",     precio: 6990,  stock: 25, icono: "🔨" },
    { id: 2, codigo: "TAL002", nombre: "Taladro Percutor 650W",      categoria: "Herramientas eléctricas",   categoriaSlug: "electricas",   precio: 39990, stock: 12, icono: "🔌" },
    { id: 3, codigo: "CEM003", nombre: "Saco de Cemento 25kg",       categoria: "Materiales de construcción", categoriaSlug: "construccion", precio: 5490,  stock: 40, icono: "🧱" },
    { id: 4, codigo: "PIN004", nombre: "Pintura Látex 1 Galón",      categoria: "Pinturas",                   categoriaSlug: "pinturas",     precio: 12990, stock: 18, icono: "🎨" },
    { id: 5, codigo: "GUA005", nombre: "Guantes de Seguridad",       categoria: "Seguridad y EPP",            categoriaSlug: "seguridad",    precio: 3990,  stock: 30, icono: "🦺" },
    { id: 6, codigo: "TOR006", nombre: "Caja de Tornillos (100 un.)", categoria: "Ferretería general",        categoriaSlug: "general",      precio: 2490,  stock: 50, icono: "🔩" }
];


// ----------------------------------------------------------
// Esta función arma las cards de Bootstrap con los productos
// y las mete dentro del div "contenedor-productos" de productos.html
// ----------------------------------------------------------
function mostrarProductos() {
    const contenedor = document.getElementById("contenedor-productos");

    // Si estamos en una página que no tiene ese div, no hacemos nada
    if (contenedor === null) {
        return;
    }

    // Leemos la categoría desde la URL, por ejemplo:
    // productos.html?categoria=electricas
    const parametros = new URLSearchParams(window.location.search);
    const categoriaFiltro = parametros.get("categoria");

    // Armamos la lista de productos a mostrar: todos, o solo los
    // de la categoría que venía en la URL
    let productosAMostrar = [];

    for (let i = 0; i < productos.length; i++) {
        if (categoriaFiltro === null || productos[i].categoriaSlug === categoriaFiltro) {
            productosAMostrar.push(productos[i]);
        }
    }

    // Si hay un texto para avisar qué categoría se está mostrando, lo actualizamos
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
        <div class="card">
          <div class="card-body">
            <div class="fs-1 text-center">${p.icono}</div>
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text">Categoría: ${p.categoria}</p>
            <p class="card-text">Precio: $${p.precio}</p>
            <p class="card-text">Stock: ${p.stock} unidades</p>
            <button type="button" class="btn btn-primary" onclick="agregarAlCarrito(${p.id})">
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
// Busca un producto dentro del arreglo "productos" usando su id.
// Si no lo encuentra, devuelve null.
// ----------------------------------------------------------
function buscarProductoPorId(id) {
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            return productos[i];
        }
    }
    return null;
}


// ----------------------------------------------------------
// Agrega un producto al carrito.
// El carrito se guarda en localStorage para que no se borre
// si la persona recarga la página o la cierra y vuelve después.
// ----------------------------------------------------------
function agregarAlCarrito(id) {
    let carritoGuardado = localStorage.getItem("carritoFerreteria");
    let carrito = [];

    if (carritoGuardado !== null) {
        carrito = JSON.parse(carritoGuardado);
    }

    // Revisamos si el producto ya estaba en el carrito
    let yaExiste = false;

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === id) {
            carrito[i].cantidad = carrito[i].cantidad + 1;
            yaExiste = true;
        }
    }

    // Si no estaba, lo agregamos con cantidad 1
    if (yaExiste === false) {
        carrito.push({ id: id, cantidad: 1 });
    }

    localStorage.setItem("carritoFerreteria", JSON.stringify(carrito));

    alert("Producto agregado al carrito");
}


// ----------------------------------------------------------
// Quita un producto del carrito por completo y vuelve a
// mostrar el carrito actualizado en pantalla.
// ----------------------------------------------------------
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


// ----------------------------------------------------------
// Actualiza el número de total que se muestra en carrito.html
// ----------------------------------------------------------
function actualizarTotal(total) {
    const totalTexto = document.getElementById("total-carrito");

    if (totalTexto !== null) {
        totalTexto.textContent = total;
    }
}


// ----------------------------------------------------------
// Esta función lee el carrito desde localStorage, busca los
// datos de cada producto y arma las cards dentro del div
// "contenedor-carrito" de carrito.html. También calcula el total.
// ----------------------------------------------------------
function mostrarCarrito() {
    const contenedor = document.getElementById("contenedor-carrito");

    // Si estamos en una página que no tiene ese div, no hacemos nada
    if (contenedor === null) {
        return;
    }

    let carritoGuardado = localStorage.getItem("carritoFerreteria");
    let carrito = [];

    if (carritoGuardado !== null) {
        carrito = JSON.parse(carritoGuardado);
    }

    // Si el carrito está vacío, mostramos un mensaje y salimos
    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío. <a href='productos.html'>Ver productos</a></p>";
        actualizarTotal(0);
        return;
    }

    let html = "";
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        const item = carrito[i];
        const producto = buscarProductoPorId(item.id);

        // Por si el producto ya no existe en el arreglo, lo saltamos
        if (producto === null) {
            continue;
        }

        const subtotal = producto.precio * item.cantidad;
        total = total + subtotal;

        html += `
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="fs-1 text-center">${producto.icono}</div>
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Precio: $${producto.precio}</p>
            <p class="card-text">Cantidad: ${item.cantidad}</p>
            <p class="card-text">Subtotal: $${subtotal}</p>
            <button type="button" class="btn btn-primary" onclick="eliminarDelCarrito(${producto.id})">
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
// Revisa que el correo termine en uno de los dominios permitidos
// ----------------------------------------------------------
function validarCorreo(correo) {
    if (correo.endsWith("@duoc.cl") || correo.endsWith("@profesor.duoc.cl") || correo.endsWith("@gmail.com")) {
        return true;
    }
    return false;
}


// ----------------------------------------------------------
// Busca, dentro de los usuarios registrados en localStorage,
// uno que tenga ese correo y esa clave. Si no lo encuentra,
// devuelve null.
// ----------------------------------------------------------
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


// ----------------------------------------------------------
// Valida el formulario de login.html.
// Si algo está mal, escribe el mensaje de error bajo el campo
// correspondiente y no deja enviar el formulario (return false).
// ----------------------------------------------------------
function validarLogin() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const errorEmail = document.getElementById("error-login-email");
    const errorPassword = document.getElementById("error-login-password");

    // Limpiamos los mensajes de error anteriores
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

    // Buscamos si existe una cuenta registrada con ese correo y esa contraseña
    const usuario = buscarUsuario(email, password);

    if (usuario === null) {
        errorPassword.textContent = "Correo o contraseña incorrectos";
        return false;
    }

    // Guardamos quién inició sesión, para poder mostrar su nombre en el menú
    localStorage.setItem("usuarioActualFerreteria", JSON.stringify(usuario));

    alert("Bienvenido, " + usuario.nombre);
    window.location.href = "index.html";
    return false;
}


// ----------------------------------------------------------
// Valida el formulario de registro.html.
// Revisa nombre, correo, contraseña y que las dos contraseñas
// sean iguales.
// ----------------------------------------------------------
function validarRegistro() {
    const nombre = document.getElementById("registro-nombre").value;
    const email = document.getElementById("registro-email").value;
    const password = document.getElementById("registro-password").value;
    const password2 = document.getElementById("registro-password2").value;

    const errorNombre = document.getElementById("error-registro-nombre");
    const errorEmail = document.getElementById("error-registro-email");
    const errorPassword = document.getElementById("error-registro-password");
    const errorPassword2 = document.getElementById("error-registro-password2");

    // Limpiamos los mensajes de error anteriores
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

    // Guardamos la nueva cuenta en la lista de usuarios registrados
    let usuariosGuardados = localStorage.getItem("usuariosFerreteria");
    let usuarios = [];

    if (usuariosGuardados !== null) {
        usuarios = JSON.parse(usuariosGuardados);
    }

    usuarios.push({ nombre: nombre, correo: email, clave: password });
    localStorage.setItem("usuariosFerreteria", JSON.stringify(usuarios));

    // Como no tenemos backend, solo mostramos un mensaje y
    // mandamos a la persona a login.html para que inicie sesión
    // con la cuenta que acaba de crear
    alert("Cuenta creada con éxito. Ahora inicia sesión.");
    window.location.href = "login.html";
    return false;
}


// ----------------------------------------------------------
// Revisa si hay una sesión guardada y cambia el menú:
// si hay alguien conectado, muestra su nombre y el botón de
// "Cerrar sesión" en vez de "Iniciar Sesión" / "Registrarse".
// ----------------------------------------------------------
function actualizarMenuUsuario() {
    const navLogin = document.getElementById("nav-login");
    const navRegistro = document.getElementById("nav-registro");
    const navUsuario = document.getElementById("nav-usuario");
    const navUsuarioNombre = document.getElementById("nav-usuario-nombre");
    const navLogout = document.getElementById("nav-logout");

    // Si el menú de esta página no tiene estos elementos, no hacemos nada
    if (navLogin === null || navRegistro === null || navUsuario === null || navLogout === null) {
        return;
    }

    const usuarioGuardado = localStorage.getItem("usuarioActualFerreteria");

    if (usuarioGuardado === null) {
        // Nadie ha iniciado sesión: mostramos los botones de siempre
        navLogin.classList.remove("d-none");
        navRegistro.classList.remove("d-none");
        navUsuario.classList.add("d-none");
        navLogout.classList.add("d-none");
    } else {
        // Alguien inició sesión: mostramos su nombre y "Cerrar sesión"
        const usuario = JSON.parse(usuarioGuardado);
        navUsuarioNombre.textContent = "Hola, " + usuario.nombre;

        navLogin.classList.add("d-none");
        navRegistro.classList.add("d-none");
        navUsuario.classList.remove("d-none");
        navLogout.classList.remove("d-none");
    }
}


// ----------------------------------------------------------
// Cierra la sesión: borra al usuario guardado y vuelve al inicio
// ----------------------------------------------------------
function cerrarSesion() {
    localStorage.removeItem("usuarioActualFerreteria");
    window.location.href = "index.html";
}


// ----------------------------------------------------------
// Estas líneas se ejecutan apenas se carga la página.
// Cada función se sale sola si el elemento que necesita no
// existe, así que no hay problema en llamarlas en todas las páginas.
// ----------------------------------------------------------
mostrarProductos();
mostrarCarrito();
actualizarMenuUsuario();