// Productos iniciales de la tienda (los mismos de la fase 1)
export const productosBase = [
    { id: 1, codigo: "MAR001", nombre: "Martillo Carpintero",         categoria: "Herramientas manuales",      categoriaSlug: "manuales",     precio: 6990,  stock: 25, icono: "martillo.svg" },
    { id: 2, codigo: "TAL002", nombre: "Taladro Percutor 650W",       categoria: "Herramientas eléctricas",    categoriaSlug: "electricas",   precio: 39990, stock: 12, icono: "taladro.svg" },
    { id: 3, codigo: "CEM003", nombre: "Saco de Cemento 25kg",        categoria: "Materiales de construcción", categoriaSlug: "construccion", precio: 5490,  stock: 40, icono: "ladrillos.svg" },
    { id: 4, codigo: "PIN004", nombre: "Pintura Látex 1 Galón",       categoria: "Pinturas",                   categoriaSlug: "pinturas",     precio: 12990, stock: 18, icono: "pintura.svg" },
    { id: 5, codigo: "GUA005", nombre: "Guantes de Seguridad",        categoria: "Seguridad y EPP",            categoriaSlug: "seguridad",    precio: 3990,  stock: 30, icono: "guante.svg" },
    { id: 6, codigo: "TOR006", nombre: "Caja de Tornillos (100 un.)", categoria: "Ferretería general",         categoriaSlug: "general",      precio: 2490,  stock: 50, icono: "tornillo.svg" }
]

// Categorías que se muestran en el inicio (cada una lleva al catálogo filtrado)
export const categoriasInicio = [
    { slug: "manuales",     icono: "martillo.svg",  titulo: "Herramientas manuales" },
    { slug: "electricas",   icono: "taladro.svg",   titulo: "Herramientas eléctricas" },
    { slug: "construccion", icono: "ladrillos.svg", titulo: "Materiales de construcción" },
    { slug: "pinturas",     icono: "pintura.svg",   titulo: "Pinturas y afines" },
    { slug: "seguridad",    icono: "guante.svg",    titulo: "Seguridad y EPP" },
    { slug: "general",      icono: "tornillo.svg",  titulo: "Ferretería general" }
]

// Categorías disponibles en el formulario de productos del administrador
export const categoriasAdmin = [
    "Herramientas manuales",
    "Herramientas eléctricas",
    "Materiales de construcción",
    "Pinturas",
    "Seguridad y EPP",
    "Ferretería general"
]

// Regiones y sus comunas (el selector de comuna depende de la región elegida)
export const comunasPorRegion = {
    "Coquimbo": ["La Serena", "Coquimbo", "Ovalle"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"],
    "Metropolitana": ["Santiago", "Providencia", "Maipú"]
}
