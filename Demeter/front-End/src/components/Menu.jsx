import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo.png';
import insumos from '../img/insumos.png';
import compras from '../img/compras.png';
import productos from '../img/productos.png';
import ventas from '../img/ventas.png';
import informes from '../img/informes.png';
import configuracion from '../img/configuracion.png';
import usuario from '../img/user.png';

const Menu = () => {
  const [submenuInsumosVisible, setSubmenuInsumosVisible] = useState(false);
  const [submenuProductosVisible, setSubmenuProductosVisible] = useState(false);
  const navigate = useNavigate();

  const toggleSubmenuInsumos = () => {
    setSubmenuInsumosVisible(!submenuInsumosVisible);
    setSubmenuProductosVisible(false);
  };

  const toggleSubmenuProductos = () => {
    setSubmenuProductosVisible(!submenuProductosVisible);
    setSubmenuInsumosVisible(false);
  };

  return (
    <div className="bg-white flex">
      <div className="w-64 bg-[#201E1E] min-h-screen flex flex-col justify-start items-start p-3">
        <img src={logo} alt="Logo" className="w-32 h-20 ml-8 mt-8" />
        <ul className="mt-8 space-y-6">
          <li>
            <div
              className={`flex items-center text-white p-2 rounded ml-7 cursor-pointer`}
              onClick={toggleSubmenuInsumos}
            >
              <img src={insumos} alt="Insumos" className="w-8 h-6" />
              <span className="ml-2">Insumos</span>
            </div>
            {submenuInsumosVisible && (
              <ul className="ml-7 space-y-2">
                <li>
                  <button
                    onClick={() => {
                      navigate('/SuppliesCategoryListPage');
                    }}
                    className="text-white bg-[#201E1E] rounded-md p-2 w-full"
                  >
                    Categoría Insumos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate('/SuppliesListPage');
                    }}
                    className="text-white bg-[#201E1E] rounded-md p-2 w-full"
                  >
                    Insumos
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div
              className="flex items-center text-white p-2 rounded ml-7"
            >
              <img src={compras} alt="Compras" className="w-8 h-6" />
              <span className="ml-2">Compras</span>
            </div>
          </li>
          <li>
            <div
              className={`flex items-center text-white p-2 rounded ml-7 cursor-pointer`}
              onClick={toggleSubmenuProductos}
            >
              <img src={productos} alt="productos" className="w-8 h-6" />
              <span className="ml-2">Productos</span>
            </div>
            {submenuProductosVisible && (
              <ul className="ml-7 space-y-2">
                <li>
                  <button
                    onClick={() => {
                      navigate('/ProductCategoryListPage');
                    }}
                    className="text-white bg-[#201E1E] rounded-md p-2 w-full"
                  >
                    Categoría Productos
                  </button>
                </li>
                {/* <li>
                  <button
                    onClick={() => {
                      navigate('/list_products');
                    }}
                    className="text-white bg-[#201E1E] rounded-md p-2 w-full"
                  >
                    Productos
                  </button>
                </li> */}
              </ul>
            )}
          </li>
          <li>
            <div
              className="flex items-center text-white p-2 rounded ml-7"
            >
              <img src={ventas} alt="Ventas" className="w-8 h-6" />
              <span className="ml-2">Ventas</span>
            </div>
          </li>
          <li>
            <div
              className="flex items-center text-white p-2 rounded ml-7"
            >
              <img src={informes} alt="Informes" className="w-8 h-6" />
              <span className="ml-2">Informes</span>
            </div>
          </li>
        </ul>
        {/* <div className="mt-auto flex justify-end space-x-4 mr-4 w-full">
          <img src={configuracion} alt="Configuración" className="w-9 h-6" />
          <img src={usuario} alt="Usuario" className="w-8 h-6" />
        </div> */}
      </div>
    </div>
  );
};

export default Menu;
