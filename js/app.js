//==========================================================
//app.js - Ferretería Los Maestros
//Acá guardamos la lista de productos y las funciones
//que arman el catálogo y manejan el carrito de compras.
//==========================================================

//Arreglo con los productos de la ferretería
const productos = [
    { id: 1, codigo: "MAR001", nombre: "Martillo Carpintero",        categoria: "Herramientas manuales",     precio: 6990,  stock: 25, icono: "🔨" },
    { id: 2, codigo: "TAL002", nombre: "Taladro Percutor 650W",      categoria: "Herramientas eléctricas",   precio: 39990, stock: 12, icono: "🔌" },
    { id: 3, codigo: "CEM003", nombre: "Saco de Cemento 25kg",       categoria: "Materiales de construcción", precio: 5490,  stock: 40, icono: "🧱" },
    { id: 4, codigo: "PIN004", nombre: "Pintura Látex 1 Galón",      categoria: "Pinturas",                   precio: 12990, stock: 18, icono: "🎨" },
    { id: 5, codigo: "GUA005", nombre: "Guantes de Seguridad",       categoria: "Seguridad y EPP",            precio: 3990,  stock: 30, icono: "🦺" },
    { id: 6, codigo: "TOR006", nombre: "Caja de Tornillos (100 un.)", categoria: "Ferretería general",        precio: 2490,  stock: 50, icono: "🔩" }
];



//Esta función arma las tarjetas de Bootstrap con los productos
//y las mete dentro del div "contenedor-productos" de productos.html
function mostrarProductos() {
    const contenedor = document.getElementById("contenedor-productos");

    //Si estamos en una página que no tiene ese div (como index.html) no hacemos nada
    if (contenedor === null) {
        return;
    }

    let html = "";

    for (let i = 0; i < productos.length; i++) {
        const p = productos[i];

        html += `
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="fs-1 text-center">${p.icono}</div>
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text">Categoría: ${p.categoria}</p>
            <p class="card-text">Precio: $${p.precio}</p>
            <p class="card-text">Stock: ${p.stock} unidades</p>
            <a href="detalle-producto.html?id=${p.id}" class="btn btn-outline-secondary">
            Ver detalle
            </a>
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



//Esta función agrega un producto al carrito.
//El carrito se guarda en localStorage para que no se borre
//si la persona recarga la página o la cierra y vuelve después.
function agregarAlCarrito(id) {
    // Leemos el carrito guardado. Si todavía no existe, partimos con un arreglo vacío
    let carritoGuardado = localStorage.getItem("carritoFerreteria");
    let carrito = [];

    if (carritoGuardado !== null) {
        carrito = JSON.parse(carritoGuardado);
    }

    //Revisamos si el producto ya estaba en el carrito
    let yaExiste = false;

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === id) {
            carrito[i].cantidad = carrito[i].cantidad + 1;
            yaExiste = true;
        }
    }

    //Si no estaba lo agregamos con cantidad 1
    if (yaExiste === false) {
        carrito.push({ id: id, cantidad: 1 });
    }

    //Guardamos el carrito actualizado en localStorage
    localStorage.setItem("carritoFerreteria", JSON.stringify(carrito));

    alert("Producto agregado al carrito");
}

//muestra en detalle-producto.html la información del producto 
//seleccionado desde productos.html
function mostrarDetalleProducto() {
    //Busca el contenedor donde se mostrará el detalle del producto
    const contenedor = document.getElementById("detalle-producto");
    //Si la pagina no tiene el contenedor (como index.html o productos.html) no hace nada
    if (contenedor === null) {
        return;
    }
    //Obtiene los parametros de la URL
    const parametros = new URLSearchParams(window.location.search);
    //Obtiene el id del producto que viene en la URL
    const id = parametros.get("id");
    let productoEncontrado = null;
    //recorre el arreglo de productos buscando el producto que tenga el mismo id que vino en la URL
    for(let i = 0; i < productos.length; i++) {
        if(productos[i].id == id) {
            productoEncontrado = productos[i];
        }

}
//Si no encontró el producto, muestra un mensaje de error
if(productoEncontrado === null) {
    contenedor.innerHTML = "<div class='alert alert-danger'>Producto no encontrado</div>";
    return;

}
//Si encuentra el producto, muestra su información 
//dentro del div con id "detalle-producto"
contenedor.innerHTML = `
<div class="card">
    <div class="card-body">
        <div class="fs-1 text-center">${productoEncontrado.icono}</div>
        <h2 class="card-title">${productoEncontrado.nombre}</h2>
        <p> codigo: ${productoEncontrado.codigo}</p>
        <p> categoria: ${productoEncontrado.categoria}</p>
        <p> precio: $${productoEncontrado.precio}</p>
        <p> stock: ${productoEncontrado.stock} unidades</p>
        <button type="button" class="btn btn-primary" onclick="agregarAlCarrito(${productoEncontrado.id})">
            Agregar al carrito
        </button>

        <a href="productos.html" class="btn btn-secondary">Volver al catálogo</a>
    </div>
</div>
`;

}

//Muestra los productos guardados en el carrito 
//Los datos del carrito se recuperan desde localStorage
function mostrarCarrito() {
    //Busca el contenedor donde se mostrará el carrito
    const contenedor = document.getElementById("contenedor-carrito");
    //Si no estamos en la página carrito.html (que es la única que tiene el contenedor) no hace nada
    if(contenedor === null) {
        return;
    }
    //Busca en LocalStorage si hay un carrito guardado. Si no hay, parte con un arreglo vacío
    let carritoGuardado = localStorage.getItem("carritoFerreteria");
    //Se crea inicialmente un arreglo vacío para el carrito
    let carrito = [];
    //Si existe un carrito guardado, JSON.parse lo convierte de texto a un arreglo de objetos y lo guarda en la variable carrito
    if (carritoGuardado !== null) {
        carrito = JSON.parse(carritoGuardado);
    }
    //Si el carrito está vacío, muestra un mensaje y termina la función
    if(carrito.length === 0) {
        contenedor.innerHTML = "<div class='alert alert-info'>El carrito está vacío</div>";
        document.getElementById("total-carrito").textContent = "0";
        return;
    }
    //Aqui se ira construyendo el HTML que muestra los productos del carrito
    let html = "";
    //Variable que acumula el total del carrito
    let total = 0;
    //Recorre cada producto guardado en el carrito
    for(let i = 0; i < carrito.length; i++) {
        let producto = null;
        //Busca la informacion completa del producto
        //dentro del arreglo principal "productos"
        for(let j = 0; j < productos.length; j++) {
            if(productos[j].id === carrito[i].id) {
                producto = productos[j];
            }
        }
        //Si encuentra el producto, calcula el subtotal y lo agrega al total
        if (producto !== null) {
            const subtotal = producto.precio * carrito[i].cantidad;
            //Suma el subtotal al total del carrito
            total = total + subtotal;
            html += `
            <div class="card mb-3">
                <div class="card-body">
                    <h5>
                    ${producto.icono}
                    ${producto.nombre}
                    </h5>
                    <p>Precio: $${producto.precio}</p>
                    <p>Cantidad: ${carrito[i].cantidad}</p>
                    <p>Subtotal: $${subtotal}</p>
                    <button class ="btn btn-danger" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
                </div>
            </div>
            `;
        }
    }
    //Muestra todas las tarjetas de los productos del carrito dentro del contenedor
    contenedor.innerHTML = html;
    //Muestra el total del carrito en el elemento con id "total-carrito"
    document.getElementById("total-carrito").textContent = total;
}

//Elimina del carrito el producto que tenga el id que se pasa como parámetro
function eliminarDelCarrito(id) {
    //Recupera el carrito desde localStorage. Si no existe, parte con un arreglo vacío
    let carrito=JSON.parse(localStorage.getItem("carritoFerreteria")) || [];
    //Aqui se guardaran solamente los productos que queremos conservar 
    let nuevoCarrito = [];
    //Recorre todos los elementos del carrito
    for(let i = 0; i < carrito.length; i++) {
        //Si el id del producto no coincide con el que queremos eliminar, lo agregamos al nuevo carrito
        if(carrito[i].id !== id) {
            nuevoCarrito.push(carrito[i]);
        }
    }
    //Guarda el nuevo carrito en localStorage, reemplazando al anterior
    localStorage.setItem("carritoFerreteria", JSON.stringify(nuevoCarrito));
    //Actualiza inmediatamente la vista del carrito para reflejar los cambios
    mostrarCarrito();
}
//Elimina todos los productos del carrito
//y actualiza la vista del carrito para reflejar los cambios
function vaciarCarrito() {
    //Borra el carrito completo de localStorage
    localStorage.removeItem("carritoFerreteria");
    //Actualiza la vista del carrito para reflejar que ahora está vacío
    mostrarCarrito();
}

//Apenas se carga la página mostramos los productos
//(esta línea va al final porque el script se carga después del HTML)
mostrarProductos();
mostrarDetalleProducto();
mostrarCarrito();