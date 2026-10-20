import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'

import NavigationBar from './components/organisms/Navbar'
import Footer from './components/organisms/Footer'
import { useSesion } from './context/useSesion'

import Home from './pages/Home'
import Nosotros from './pages/Nosotros'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Contacto from './pages/Contacto'
import Productos from './pages/Productos'
import DetalleProducto from './pages/DetalleProducto'
import Carrito from './pages/Carrito'
import Blog from './pages/Blog'
import DetalleBlog from './pages/DetalleBlog'

import Admin from './pages/Admin'
import AdminProductos from './pages/AdminProductos'
import AdminUsuarios from './pages/AdminUsuarios'

// Layout de la tienda: menú arriba, contenido en medio (Outlet) y footer abajo
const PublicLayout = () => {
    return (
        <>
            <NavigationBar />
            <Outlet />
            <Footer />
        </>
    )
}

// Solo deja pasar al panel de administración si hay una sesión de administrador iniciada
const RutaAdmin = () => {
    const { usuario } = useSesion()

    if (usuario === null || usuario.tipo !== 'Administrador') {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

// Define todas las rutas (páginas) del sitio
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Páginas de la tienda (con menú y footer) */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/productos/:id" element={<DetalleProducto />} />
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<DetalleBlog />} />
                </Route>

                {/* Panel de administración (pantalla completa con su menú lateral), solo para administradores */}
                <Route element={<RutaAdmin />}>
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin/productos" element={<AdminProductos />} />
                    <Route path="/admin/usuarios" element={<AdminUsuarios />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
