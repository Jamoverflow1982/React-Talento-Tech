import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
/*import './index.css'*/
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CarritoProvider } from './context/CarritoContext.jsx'
import { Alert } from 'react-bootstrap'
import { AlertaProvider } from './context/AlertaContext.jsx'
import { AutorizacionProvider } from './context/AutorizacionContext.jsx'
import Alerta from './components/Notificacion/Alerta.jsx'
import { ProductoProvider } from './context/ProductoContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AutorizacionProvider>
        <ProductoProvider>
          <AlertaProvider>
            <Alerta />
            <CarritoProvider>
              <App />
            </CarritoProvider>
          </AlertaProvider>
        </ProductoProvider>
      </AutorizacionProvider>
    </BrowserRouter>
  </StrictMode>,
)
