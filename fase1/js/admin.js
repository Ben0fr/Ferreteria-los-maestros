// ----------------------------------------------------------
// PRODUCTOS DEL ADMINISTRADOR
// ----------------------------------------------------------

function obtenerProductosAdmin() {

    const guardados = localStorage.getItem("productosAdminFerreteria");

    if (guardados !== null) {
        return JSON.parse(guardados);
    }

    // Productos iniciales
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


function guardarProductosAdmin(productos) {

    localStorage.setItem(
        "productosAdminFerreteria",
        JSON.stringify(productos)
    );
}


// ----------------------------------------------------------
// MOSTRAR PRODUCTOS
// ----------------------------------------------------------

function mostrarProductosAdmin() {

    const cuerpoTabla =
        document.getElementById("cuerpo-productos-admin");

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
                        onclick="editarProducto(${i})"
                    >
                        Editar
                    </button>

                    <button
                        class="btn btn-sm btn-danger"
                        onclick="eliminarProducto(${i})"
                    >
                        Eliminar
                    </button>

                </td>

            </tr>
        `;
    }

    cuerpoTabla.innerHTML = html;
}


// ----------------------------------------------------------
// CREAR PRODUCTO
// ----------------------------------------------------------

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


    productos.push(nuevoProducto);

    guardarProductosAdmin(productos);

    mostrarProductosAdmin();


    document.getElementById("formulario-producto-admin").reset();

    alert("Producto creado correctamente");

    return false;
}


// ----------------------------------------------------------
// MODIFICAR STOCK
// ----------------------------------------------------------

function modificarStock(indice) {

    const productos = obtenerProductosAdmin();

    const producto = productos[indice];

    const nuevoStock = prompt(
        "Nuevo stock para " + producto.nombre,
        producto.stock
    );


    if (nuevoStock === null) {
        return;
    }


    const stockNumero = Number(nuevoStock);


    if (
        Number.isInteger(stockNumero) === false ||
        stockNumero < 0
    ) {

        alert("El stock debe ser un número entero igual o superior a 0");

        return;
    }


    productos[indice].stock = stockNumero;

    guardarProductosAdmin(productos);

    mostrarProductosAdmin();
}



// ----------------------------------------------------------
// USUARIOS DEL ADMINISTRADOR
// ----------------------------------------------------------

function obtenerUsuariosAdmin() {

    // Usuarios creados desde el panel administrador
    const usuariosAdminGuardados =
        localStorage.getItem("usuariosAdminFerreteria");

    let usuariosAdmin = [];


    // Si ya existen usuarios del administrador, los recupera
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


    // ----------------------------------------------------------
    // Recuperar clientes registrados desde registro.html
    // ----------------------------------------------------------

    const usuariosTiendaGuardados =
        localStorage.getItem("usuariosFerreteria");


    if (usuariosTiendaGuardados !== null) {

        const usuariosTienda =
            JSON.parse(usuariosTiendaGuardados);


        for (let i = 0; i < usuariosTienda.length; i++) {

            const usuarioTienda = usuariosTienda[i];

            let yaExiste = false;


            // Revisa que no se agregue dos veces
            for (let j = 0; j < usuariosAdmin.length; j++) {

                if (
                    usuariosAdmin[j].correo ===
                    usuarioTienda.correo
                ) {

                    yaExiste = true;
                    break;
                }
            }


            // Si no existe en administración, lo agrega
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


    // Guarda la lista actualizada
    localStorage.setItem(
        "usuariosAdminFerreteria",
        JSON.stringify(usuariosAdmin)
    );


    return usuariosAdmin;
}

function guardarUsuariosAdmin(usuarios) {

    localStorage.setItem(
        "usuariosAdminFerreteria",
        JSON.stringify(usuarios)
    );
}


// ----------------------------------------------------------
// MOSTRAR USUARIOS
// ----------------------------------------------------------

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


// ----------------------------------------------------------
// CREAR USUARIO
// ----------------------------------------------------------

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

    mostrarUsuariosAdmin();


    document.getElementById("formulario-usuario-admin").reset();

    alert("Usuario creado correctamente");

    return false;
}
// ----------------------------------------------------------
// EDITAR PRODUCTO
// ----------------------------------------------------------

function editarProducto(indice) {

    const productos = obtenerProductosAdmin();

    const producto = productos[indice];


    const nuevoNombre = prompt(
        "Nombre del producto:",
        producto.nombre
    );

    // Si presiona cancelar
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


    // Validación
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


    // Modifica el producto
    productos[indice].nombre = nuevoNombre;
    productos[indice].categoria = nuevaCategoria;
    productos[indice].precio = precioNumero;
    productos[indice].stock = stockNumero;


    // Guarda cambios
    guardarProductosAdmin(productos);


    // Actualiza tabla
    mostrarProductosAdmin();


    alert("Producto modificado correctamente");
}
// ----------------------------------------------------------
// ELIMINAR PRODUCTO
// ----------------------------------------------------------

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


    // Guardamos el código del producto eliminado
    // para que también desaparezca de la tienda
    let eliminados =
        JSON.parse(
            localStorage.getItem("productosEliminadosAdmin")
        ) || [];


    if (eliminados.includes(producto.codigo) === false) {

        eliminados.push(producto.codigo);
    }


    localStorage.setItem(
        "productosEliminadosAdmin",
        JSON.stringify(eliminados)
    );


    // Elimina el producto del arreglo
    productos.splice(indice, 1);


    // Guarda el nuevo arreglo
    guardarProductosAdmin(productos);


    // Actualiza tabla
    mostrarProductosAdmin();


    alert("Producto eliminado correctamente");
}


// ----------------------------------------------------------
// CARGAR LAS TABLAS
// ----------------------------------------------------------

mostrarProductosAdmin();
mostrarUsuariosAdmin();