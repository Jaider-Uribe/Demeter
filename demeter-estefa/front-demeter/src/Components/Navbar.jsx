import React, { useState, useEffect } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SecurityIcon from '@mui/icons-material/Security';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from '../img/logo.png'
import users from '../img/users.png'
import '../css/style.css'
import '../css/landing.css'
import '../fonts/cryptofont.css'
import '../fonts/feather.css'
import '../fonts/fontawesome.css'
import '../fonts/material.css'




function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <nav class="pc-sidebar ">
                <div class="navbar-wrapper">
                    <div class="m-header">
                        <a href="index.html" class="b-brand">
                            <img src={logo} alt="Demeter SOFT" class="logo logo-lg" width="130" height="45" />
                        </a>
                    </div>
                    <div class="navbar-content">
                        <ul class="pc-navbar">
                            <li class="pc-item pc-caption">
                                <label>Menú de Navegación</label>
                            </li>
                            <li class="pc-item">
                                <a href="index.html" class="pc-link "><span class="pc-micon"><i class="material-icons-two-tone"> <DashboardIcon /></i></span><span class="pc-mtext">Dashboard</span></a>
                            </li>
                            <li class="pc-item pc-caption">
                                <span>Gestión de configuración</span>
                            </li>
                            <li class="pc-item pc-hasmenu">
                                <a href="forms.html" class="pc-link "><span class="pc-micon"><i class="material-icons-two-tone"><SecurityIcon /></i></span><span class="pc-mtext">Roles y permisos</span></a>
                            </li>
                            <li class="pc-item pc-caption">
                                <span>Gestión de usuarios</span>
                            </li>
                            <li class="pc-item">
                                <a href="#" class="pc-link "><span class="pc-micon"><i class="material-icons-two-tone"><PeopleAltIcon /></i></span><span class="pc-mtext">Empleados</span></a>
                            </li>
                            <li class="pc-item pc-caption">
                                <span>Gestión de compras</span>
                            </li>
                            <li class="pc-item pc-hasmenu">
                                <a href="#" class="pc-link "><span class="pc-micon"><i class="material-icons-two-tone"><StoreIcon /></i></span><span class="pc-mtext">Gestión de compras</span><span class="pc-arrow"><i data-feather="chevron-right"></i></span></a>
                                <ul class="pc-submenu">
                                    <li class="pc-item"><a class="pc-link" href="#">Categoria insumo</a></li>
                                    <li class="pc-item"><a class="pc-link" href="#">Insumos</a></li>
                                    <li class="pc-item"><a class="pc-link" href="#">Proveedores</a></li>
                                    <li class="pc-item"><a class="pc-link" href="#">Compras</a></li>
                                </ul>
                            </li>
                            <li class="pc-item pc-caption">
                                <span>Gestión de ventas</span>
                            </li>
                            <li class="pc-item pc-hasmenu">
                                <a href="#" class="pc-link "><span class="pc-micon"><i class="material-icons-two-tone"><ShoppingCartIcon /></i></span><span class="pc-mtext">Gestión de ventas</span><span class="pc-arrow"><i data-feather="chevron-right"></i></span></a>
                                <ul class="pc-submenu">
                                    <li class="pc-item"><a class="pc-link" href="#">Categoria producto</a></li>
                                    <li class="pc-item"><a class="pc-link" href="#">Producto</a></li>
                                    <li class="pc-item"><a class="pc-link" href="#">Receta</a></li>
                                    <li class="pc-item"><a class="pc-link" href="#">Venta</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>



        </div>



    )
}

export default Navbar