import React from "react";
import { useCategoryProducts } from "../context/category_products.context";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

function CategoryProductsCard({ Category_products, onEdit, onDelete }) {
  const { toggleCategoryProductStatus } = useCategoryProducts();

  const barraClass = Category_products.Estado ? "" : "desactivado";

  return (
    <tr>
      <td className="border border-gray-400 px-4 py-2 text-center width-column" >
        {Category_products.Nombre_Categoria}
      </td>
      <td className="border border-gray-400 px-4 py-2 text-center width-column" >
        <div
          className={`barra-container ${barraClass} adjust-two`}  onClick={() => toggleCategoryProductStatus(Category_products.ID_CATEGORIA_PRODUCTO)}>
          <div className={`circulo ${barraClass}`}>
            {Category_products.Estado ? (
              <MdToggleOn className={`estado-icon active ${barraClass}`} />
            ) : (
              <MdToggleOff className={`estado-icon inactive ${barraClass}`} />
            )}
          </div>
        </div>
      </td> 
      <td className="border border-gray-400 px-4 py-2 text-center width-column" >
        <button onClick={onEdit} className="text-orange-500 hover:text-orange-700 mr-2">
          <AiFillEdit size={24} />
        </button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-800 mr-2">
          <AiFillDelete size={24} />
        </button>
      </td>
    </tr>
  );
}

export default CategoryProductsCard;