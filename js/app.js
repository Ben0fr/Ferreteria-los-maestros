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

//Apenas se carga la página mostramos los productos
//(esta línea va al final porque el script se carga después del HTML)
mostrarProductos();