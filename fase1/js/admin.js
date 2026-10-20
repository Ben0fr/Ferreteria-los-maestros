// ==========================================================
// admin.js - Ferretería Los Maestros
// Administración de productos y usuarios con localStorage
// ==========================================================


// ================= PRODUCTOS =================

// Obtiene los productos guardados.
// Si todavía no existen, crea los productos iniciales.
function obtenerProductosAdmin() {
    const guardados =
        localStorage.getItem("productosAdminFerreteria");

    if (guardados !== null) {
        return JSON.parse(guardados);
    }

    const productosIniciales = [
        {
            codigo: "MAR001",
            nombre: "Martillo Carpintero",
            categoria: "Herramientas manuales",
            precio: 6990,
            stock: 25
        },
        {
            codigo: "TAL002",
            nombre: "Taladro Percutor 650W",
            categoria: "Herramientas eléctricas",
            precio: 39990,
            stock: 12
        },
        {
            codigo: "CEM003",
            nombre: "Saco de Cemento 25kg",
            categoria: "Materiales de construcción",
            precio: 5490,
            stock: 40
        },
        {
            codigo: "PIN004",
            nombre: "Pintura Látex 1 Galón",
            categoria: "Pinturas",
            precio: 12990,
            stock: 18
        },
        {
            codigo: "GUA005",
            nombre: "Guantes de Seguridad",
            categoria: "Seguridad y EPP",
            precio: 3990,
            stock: 30
        },
        {
            codigo: "TOR006",
            nombre: "Caja de Tornillos (100 un.)",
            categoria: "Ferretería general",
            precio: 2490,
            stock: 50
        }
    ];

    localStorage.setItem(
        "productosAdminFerreteria",
        JSON.stringify(productosIniciales)
    );

    return productosIniciales;
}


// Guarda el arreglo completo de productos
function guardarProductosAdmin(productos) {
    localStorage.setItem(
        "productosAdminFerreteria",
        JSON.stringify(productos)
    );
}


// ================= MOSTRAR PRODUCTOS =================

// Crea dinámicamente las filas de la tabla
function mostrarProductosAdmin() {
    const cuerpoTabla =
        document.getElementById("cuerpo-productos-admin");

    // Permite usar admin.js en páginas que no tienen esta tabla
    if (cuerpoTabla === null) {
        return;
    }

    const productos = obtenerProductosAdmin();

    let html = "";

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];

        html += `
            <tr>
                <td>${producto.codigo}</td>
                <td>${producto.nombre}</td>
                <td>${producto.categoria}</td>
                <td>$${producto.precio}</td>
                <td>${producto.stock}</td>

                <td>
                    <button
                        class="btn btn-sm btn-warning me-1"
                        onclick="editarProducto(${i})">
                        Editar
                    </button>

                    <button
                        class="btn btn-sm btn-danger"
                        onclick="eliminarProducto(${i})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    }

    cuerpoTabla.innerHTML = html;
}


// ================= CREAR PRODUCTO =================

// Obtiene los datos del formulario y crea un producto
function guardarProductoAdmin() {
    const codigo =
        document.getElementById("admin-producto-codigo").value;

    const nombre =
        document.getElementById("admin-producto-nombre").value;

    const precio =
        document.getElementById("admin-producto-precio").value;

    const stock =
        document.getElementById("admin-producto-stock").value;

    const categoria =
        document.getElementById("admin-producto-categoria").value;

    // Comprueba campos obligatorios
    if (
        codigo.trim() === "" ||
        nombre.trim() === "" ||
        precio === "" ||
        stock === "" ||
        categoria === ""
    ) {
        alert("Completa los campos obligatorios");
        return false;
    }

    const nuevoProducto = {
        codigo: codigo,
        nombre: nombre,
        categoria: categoria,
        precio: Number(precio),
        stock: Number(stock)
    };

    const productos = obtenerProductosAdmin();

    /*
        Si anteriormente se eliminó un producto con el mismo código,
        lo quitamos de la lista de eliminados para poder crearlo nuevamente.
    */
    let eliminados =
        JSON.parse(
            localStorage.getItem("productosEliminadosAdmin")
        ) || [];

    eliminados =
        eliminados.filter(
            codigo => codigo !== nuevoProducto.codigo
        );

    localStorage.setItem(
        "productosEliminadosAdmin",
        JSON.stringify(eliminados)
    );

    // Agrega y guarda el producto
    productos.push(nuevoProducto);

    guardarProductosAdmin(productos);

    // Actualiza inmediatamente la tabla
    mostrarProductosAdmin();

    // Limpia el formulario
    document
        .getElementById("formulario-producto-admin")
        .reset();

    alert("Producto creado correctamente");

    return false;
}


// ================= MODIFICAR STOCK =================

// Permite cambiar solamente el stock de un producto
function modificarStock(indice) {
    const productos = obtenerProductosAdmin();

    const producto = productos[indice];

    const nuevoStock = prompt(
        "Nuevo stock para " + producto.nombre,
        producto.stock
    );

    // Cancelar no realiza cambios
    if (nuevoStock === null) {
        return;
    }

    const stockNumero = Number(nuevoStock);

    // El stock debe ser entero y mayor o igual a 0
    if (
        Number.isInteger(stockNumero) === false ||
        stockNumero < 0
    ) {
        alert(
            "El stock debe ser un número entero igual o superior a 0"
        );

        return;
    }

    productos[indice].stock = stockNumero;

    guardarProductosAdmin(productos);

    mostrarProductosAdmin();
}


// ================= USUARIOS =================

// Obtiene usuarios del admin y también los registrados en la tienda
function obtenerUsuariosAdmin() {
    const usuariosAdminGuardados =
        localStorage.getItem("usuariosAdminFerreteria");

    let usuariosAdmin = [];

    // Recupera usuarios existentes del panel
    if (usuariosAdminGuardados !== null) {
        usuariosAdmin =
            JSON.parse(usuariosAdminGuardados);

    } else {

        // Usuarios iniciales de ejemplo
        usuariosAdmin = [
            {
                run: "19011022K",
                nombre: "Administrador",
                correo: "admin@gmail.com",
                tipo: "Administrador"
            },
            {
                run: "201234567",
                nombre: "Juan Pérez",
                correo: "juan@gmail.com",
                tipo: "Cliente"
            },
            {
                run: "189876543",
                nombre: "María González",
                correo: "maria@duoc.cl",
                tipo: "Vendedor"
            }
        ];
    }


    // Recupera clientes creados desde registro.html
    const usuariosTiendaGuardados =
        localStorage.getItem("usuariosFerreteria");

    if (usuariosTiendaGuardados !== null) {
        const usuariosTienda =
            JSON.parse(usuariosTiendaGuardados);

        for (let i = 0; i < usuariosTienda.length; i++) {
            const usuarioTienda = usuariosTienda[i];

            let yaExiste = false;

            // Evita agregar dos veces el mismo correo
            for (let j = 0; j < usuariosAdmin.length; j++) {
                if (
                    usuariosAdmin[j].correo ===
                    usuarioTienda.correo
                ) {
                    yaExiste = true;
                    break;
                }
            }

            // Los registrados públicamente entran como Cliente
            if (yaExiste === false) {
                usuariosAdmin.push({
                    run: "-",
                    nombre: usuarioTienda.nombre,
                    correo: usuarioTienda.correo,
                    tipo: "Cliente"
                });
            }
        }
    }

    localStorage.setItem(
        "usuariosAdminFerreteria",
        JSON.stringify(usuariosAdmin)
    );

    return usuariosAdmin;
}


// Guarda el arreglo de usuarios
function guardarUsuariosAdmin(usuarios) {
    localStorage.setItem(
        "usuariosAdminFerreteria",
        JSON.stringify(usuarios)
    );
}


// ================= MOSTRAR USUARIOS =================

// Genera dinámicamente las filas de usuarios
function mostrarUsuariosAdmin() {
    const cuerpoTabla =
        document.getElementById("cuerpo-usuarios-admin");

    if (cuerpoTabla === null) {
        return;
    }

    const usuarios = obtenerUsuariosAdmin();

    let html = "";

    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];

        html += `
            <tr>
                <td>${usuario.run}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.correo}</td>
                <td>${usuario.tipo}</td>
            </tr>
        `;
    }

    cuerpoTabla.innerHTML = html;
}


// ================= CREAR USUARIO =================

// Crea usuarios desde el panel administrativo
function guardarUsuarioAdmin() {
    const run =
        document.getElementById("admin-usuario-run").value;

    const nombre =
        document.getElementById("admin-usuario-nombre").value;

    const apellidos =
        document.getElementById("admin-usuario-apellidos").value;

    const correo =
        document.getElementById("admin-usuario-correo").value;

    const tipo =
        document.getElementById("admin-usuario-tipo").value;

    // Comprueba campos obligatorios
    if (
        run.trim() === "" ||
        nombre.trim() === "" ||
        apellidos.trim() === "" ||
        correo.trim() === "" ||
        tipo === ""
    ) {
        alert("Completa los campos obligatorios");
        return false;
    }

    const nuevoUsuario = {
        run: run,
        nombre: nombre + " " + apellidos,
        correo: correo,
        tipo: tipo
    };

    const usuarios = obtenerUsuariosAdmin();

    usuarios.push(nuevoUsuario);

    guardarUsuariosAdmin(usuarios);

    // Actualiza inmediatamente la tabla
    mostrarUsuariosAdmin();

    document
        .getElementById("formulario-usuario-admin")
        .reset();

    alert("Usuario creado correctamente");

    return false;
}


// ================= EDITAR PRODUCTO =================

// Permite modificar nombre, categoría, precio y stock
function editarProducto(indice) {
    const productos = obtenerProductosAdmin();

    const producto = productos[indice];

    const nuevoNombre = prompt(
        "Nombre del producto:",
        producto.nombre
    );

    if (nuevoNombre === null) {
        return;
    }

    const nuevaCategoria = prompt(
        "Categoría:",
        producto.categoria
    );

    if (nuevaCategoria === null) {
        return;
    }

    const nuevoPrecio = prompt(
        "Precio:",
        producto.precio
    );

    if (nuevoPrecio === null) {
        return;
    }

    const nuevoStock = prompt(
        "Stock:",
        producto.stock
    );

    if (nuevoStock === null) {
        return;
    }

    const precioNumero = Number(nuevoPrecio);
    const stockNumero = Number(nuevoStock);

    // Valida los nuevos valores
    if (
        nuevoNombre.trim() === "" ||
        precioNumero < 0 ||
        Number.isNaN(precioNumero) ||
        Number.isInteger(stockNumero) === false ||
        stockNumero < 0
    ) {
        alert("Los datos ingresados no son válidos");
        return;
    }

    // Modifica el objeto seleccionado
    productos[indice].nombre = nuevoNombre;
    productos[indice].categoria = nuevaCategoria;
    productos[indice].precio = precioNumero;
    productos[indice].stock = stockNumero;

    guardarProductosAdmin(productos);

    mostrarProductosAdmin();

    alert("Producto modificado correctamente");
}


// ================= ELIMINAR PRODUCTO =================

// Elimina el producto del admin y registra su código
// para que también desaparezca de la tienda pública
function eliminarProducto(indice) {
    const productos = obtenerProductosAdmin();

    const producto = productos[indice];

    const confirmar = confirm(
        "¿Seguro que quieres eliminar " +
        producto.nombre +
        "?"
    );

    if (confirmar === false) {
        return;
    }

    /*
        Guarda los códigos eliminados para que app.js
        también pueda quitarlos del catálogo público.
    */
    let eliminados =
        JSON.parse(
            localStorage.getItem("productosEliminadosAdmin")
        ) || [];

    if (
        eliminados.includes(producto.codigo) === false
    ) {
        eliminados.push(producto.codigo);
    }

    localStorage.setItem(
        "productosEliminadosAdmin",
        JSON.stringify(eliminados)
    );

    // splice elimina el producto según su posición
    productos.splice(indice, 1);

    guardarProductosAdmin(productos);

    mostrarProductosAdmin();

    alert("Producto eliminado correctamente");
}


// ================= INICIALIZACIÓN =================

// Al abrir una página administrativa,
// intenta cargar las tablas correspondientes.
mostrarProductosAdmin();
mostrarUsuariosAdmin();