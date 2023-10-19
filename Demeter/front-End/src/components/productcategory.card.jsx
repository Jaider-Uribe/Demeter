import React from "react";
import { useCategoryProducts } from "../context/productcategory.context";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

function CategoryProductsCard({ Category_products, onEdit, onDelete }) {
  const { toggleCategoryProductStatus } = useCategoryProducts();

  const barraClass = Category_products.State ? "" : "desactivado";

  return (
    <tr>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">{Category_products.Name_ProductCategory}</td>
      <td className={`border border-gray-400 px-4 py-2 text-center width-column ${barraClass}`}>
        {Category_products.State ? "Habilitado" : "Deshabilitado"}
      </td>
      <td className="border border-gray-400 px-4 py-2 text-center">
        <div style={{ display: "flex", marginLeft: "19%" }}>
          <button
            onClick={onEdit}
            className={`text-orange-500 hover:text-orange-700 mr-2 ${!Category_products.State ? "text-gray-400 cursor-not-allowed" : ""}`}
            disabled={!Category_products.State}
            style={{ marginLeft: "24%" }}
          >
            <AiFillEdit size={24} />
          </button>
          <button
            onClick={onDelete}
            className={`text-red-500 hover:text-red-800 mr-2 ${!Category_products.State ? "text-gray-400 cursor-not-allowed" : ""}`}
            style={{ marginRight: "-25px" }}
            disabled={!Category_products.State}
          >
            <AiFillDelete size={24} />
          </button>
          <div
            className={`barra-container ${barraClass} adjust`}
            style={{ marginRight: "-100px" }}
            onClick={() => toggleCategoryProductStatus(Category_products.ID_ProductCategory)}
          >
            <div className={`circulo ${barraClass}`} >
              {Category_products.State ? (
                <MdToggleOn className={`estado-icon active ${barraClass}`} />
              ) : (
                <MdToggleOff className={`estado-icon inactive ${barraClass}`} />
              )}
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default CategoryProductsCard;
