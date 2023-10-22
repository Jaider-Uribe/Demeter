import React from "react";
import { useCategoryProducts } from "../context/productcategory.context";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

function CategoryProductsCard({ categoryProduct, onEdit, onDelete, count }) {
  const { toggleCategoryProductStatus } = useCategoryProducts();

  const barraClass = categoryProduct.State ? "" : "desactivado";

  return (
    <tr>
      <td className="border border-gray-400 px-4 py-1 w-1/4 text-left">{count}</td>
      <td className="border border-gray-400 px-4 py-1 w-1/4 text-center">
        {categoryProduct.Name_ProductCategory}
      </td>
      <td className={`border border-gray-400 px-4 py-1 w-1/4 text-center ${barraClass}`}>
        {categoryProduct.State ? "Habilitado" : "Deshabilitado"}
      </td>
      <td className="border border-gray-400 px-4 py-1 w-1/4">
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={onEdit}
            className={`text-orange-500 hover:text-orange-700 ${
              !categoryProduct.State ? "text-gray-400 cursor-not-allowed" : ""
            }`}
            disabled={!categoryProduct.State}
          >
            <AiFillEdit size={24} />
          </button>
          <button
            onClick={onDelete}
            className={`text-red-500 hover:text-red-800 ${
              !categoryProduct.State ? "text-gray-400 cursor-not-allowed" : ""
            }`}
            disabled={!categoryProduct.State}
          >
            <AiFillDelete size={24} />
          </button>
          <div
            className={`barra-container ${barraClass}`}
            onClick={() => toggleCategoryProductStatus(categoryProduct.ID_ProductCategory)}
          >
            {categoryProduct.State ? (
              <MdToggleOn className={`estado-icon active ${barraClass}`} />
            ) : (
              <MdToggleOff className={`estado-icon inactive ${barraClass}`} />
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}

export default CategoryProductsCard;
