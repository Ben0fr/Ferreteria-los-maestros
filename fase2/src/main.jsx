import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Primero va Bootstrap y después nuestro CSS, así podemos cambiar los colores (igual que en la fase 1)
import 'bootstrap/dist/css/bootstrap.min.css'
import './estilos.css'

import App from './App.jsx'
import { SesionProvider } from './context/SesionProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* SesionProvider deja disponible el usuario logueado en toda la página */}
    <SesionProvider>
      <App />
    </SesionProvider>
  </StrictMode>,
)
