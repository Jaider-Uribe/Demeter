import React from "react";
import { useCategorySupplies } from "../context/category_supplies.context";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

function CategorySuppliesCard({ Category_supplies, onEdit, onDelete }) {
  const { toggleCategorySupplyStatus } = useCategorySupplies();

  const barraClass = Category_supplies.Estado ? "" : "desactivado";

  return (
    <tr>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">
        {Category_supplies.Nombre_Categoria}
      </td>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">
        <div
          className={`barra-container ${barraClass}`}
          onClick={() =>
            toggleCategorySupplyStatus(Category_supplies.ID_CATEGORIA_INSUMO)
          }
        >
          <div className={`circulo ${barraClass}`}>
            {Category_supplies.Estado ? (
              <MdToggleOn className={`estado-icon active ${barraClass}`} />
            ) : (
              <MdToggleOff className={`estado-icon inactive ${barraClass}`} />
            )}
          </div>
        </div>
      </td>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">
        <button onClick={onEdit} className="text-orange-500 hover:text-orange-700 mr-2 ">
          <AiFillEdit size={24} />
        </button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-800 mr-2">
          <AiFillDelete size={24} />
        </button>
      </td>
    </tr>
  );
}

export default CategorySuppliesCard;
