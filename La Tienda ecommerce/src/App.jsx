import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Nav from './components/Navbar/Nav'
import Productos from './components/Productos/Productos'
import ProductoDetalle from './components/ProductoDetalle/ProductoDetalle'
import Inicio from './components/Inicio/Inicio'
import Footer from './components/Footer/Footer'
import Carrito from './components/Carrito/Carrito'
import Alerta from './components/Notificacion/Alerta'
import Registro from './components/RegistroUsuario/RegistroUsuario'
import ResultadoDeBusqueda from './components/BuscadorProducto/ResultadoDeBusqueda'

import Admin from './components/Admin/Admin'
import Login from './components/Login/Login'
import RutaProtegida from './components/RutaProtegida/RutaProtegida'
import RutaProtegidaCarrito from './components/RutaProtegidaCarrito/RutaProtegidaCarrito'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap';

function App() {

  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/busqueda" element={<ResultadoDeBusqueda />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} />
          <Route path="/registro" element={<Registro />} />
          
          <Route path="/admin" element={
            <RutaProtegida pagina="Administrador"> 
              <Admin />
            </RutaProtegida>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/carrito" element={
            <RutaProtegidaCarrito pagina="Carrito">
              <Carrito />
            </RutaProtegidaCarrito>
            } />
        </Routes>
      <Footer />
      <Alerta />
    </>
  )
}

export default App
