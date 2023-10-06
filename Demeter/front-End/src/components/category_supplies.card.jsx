import React, { useState } from "react";
import { useCategorySupplies } from "../context/category_supplies.context";
import { useSupplies } from "../context/supplies.context";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import ChangeCategoryStatusModal from "./category_supplies.modal"; 

function CategorySuppliesCard({ Category_supplies, onEdit, onDelete }) {
  const { toggleCategorySupplyStatus } = useCategorySupplies();
  const { supplies } = useSupplies();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const barraClass = Category_supplies.Estado ? "" : "desactivado";

  const canChangeCategoryStatus = !supplies.some(
    (supply) => supply.CATEGORIA_INSUMO_ID === Category_supplies.ID_CATEGORIA_INSUMO
  );

  const handleToggleCategoryStatus = () => {
    if (canChangeCategoryStatus) {
      toggleCategorySupplyStatus(Category_supplies.ID_CATEGORIA_INSUMO);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <tr>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">
        {Category_supplies.Nombre_Categoria}
      </td>
      <td
        className={`border border-gray-400 px-4 py-2 text-center width-column ${barraClass}`}
      >
        {Category_supplies.Estado ? "Habilitado" : "Deshabilitado"}
      </td>
      <td className="border border-gray-400 px-4 py-2 text-center">
        <div style={{ display: "flex", marginLeft: "19%" }}>
          <button
            onClick={onEdit}
            className={`text-orange-500 hover:text-orange-700 mr-2 ${
              !Category_supplies.Estado
                ? "text-gray-400 cursor-not-allowed"
                : ""
            }`}
            disabled={!Category_supplies.Estado || !canChangeCategoryStatus}
            style={{ marginLeft: "40px" }}
          >
            <AiFillEdit size={24} />
          </button>
          <button
            onClick={onDelete}
            className={`text-red-500 hover:text-red-800 mr-2 ${
              !Category_supplies.Estado
                ? "text-gray-400 cursor-not-allowed"
                : ""
            }`}
            style={{ marginRight: "-25px" }}
            disabled={!Category_supplies.Estado || !canChangeCategoryStatus}
          >
            <AiFillDelete size={24} />
          </button>
          <div
            className={`barra-container ${barraClass} adjust`}
            style={{ marginRight: "-100px" }}
            onClick={handleToggleCategoryStatus}
          >
            <div className={`circulo ${barraClass}`}>
              {Category_supplies.Estado ? (
                <MdToggleOn className={`estado-icon active ${barraClass}`} />
              ) : (
                <MdToggleOff className={`estado-icon inactive ${barraClass}`} />
              )}
            </div>
          </div>
        </div>
      </td>
      {canChangeCategoryStatus ? null : (
        <ChangeCategoryStatusModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </tr>
  );
}

export default CategorySuppliesCard;
