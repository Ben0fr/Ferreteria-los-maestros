import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// 1. Importación de Organismos
import NavigationBar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer';

// 2. Importación de Páginas Públicas
import Nosotros from './pages/Nosotros';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Contacto from './pages/Contacto';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import Blog from './pages/Blog';
import DetalleBlog from './pages/DetalleBlog';

// 3. Importación de Páginas de Administración
import Admin from './pages/Admin';
import AdminProductos from './pages/AdminProductos';
import AdminUsuarios from './pages/AdminUsuarios';

/**
 * COMPONENTE LAYOUT:
 * Este componente envuelve las páginas públicas.
 * El <Outlet /> es el "agujero" dinámico donde React Router inyectará
 * el contenido de la página solicitada (Login, Contacto, etc.)
 */
const PublicLayout = () => {
    return (
        <>
            <NavigationBar />
            <Outlet />
            <Footer />
        </>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* =========================================
            GRUPO 1: RUTAS PÚBLICAS (Con Navbar y Footer)
            ========================================= */}
                <Route element={<PublicLayout />}>
                    {/* Temporalmente apuntamos el inicio a Nosotros hasta que crees un Home.jsx */}
                    <Route path="/" element={<Nosotros />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/productos" element={<Productos />} />

                    {/* Rutas Dinámicas (Llevan el parámetro :id) */}
                    <Route path="/productos/:id" element={<DetalleProducto />} />

                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/blog" element={<Blog />} />

                    {/* Rutas Dinámicas */}
                    <Route path="/blog/:id" element={<DetalleBlog />} />
                </Route>

                {/* =========================================
            GRUPO 2: RUTAS DE ADMINISTRACIÓN
            (Pantalla completa, el AdminSidebar ya viene dentro de cada página)
            ========================================= */}
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/productos" element={<AdminProductos />} />
                <Route path="/admin/usuarios" element={<AdminUsuarios />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;