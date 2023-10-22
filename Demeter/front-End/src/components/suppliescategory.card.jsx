import React, { useState } from "react";
import { useCategorySupplies } from "../context/suppliescategory.context";
import { useSupplies } from "../context/supplies.context";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import ChangeCategoryStatusModal from "./suppliescategory.modal"; 

function CategorySuppliesCard({ categorySupply, onEdit, onDelete, count }) {
  const { toggleCategorySupplyStatus } = useCategorySupplies();
  const { supplies } = useSupplies();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const barraClass = categorySupply.State ? "" : "desactivado";

  const canChangeCategoryStatus = !supplies.some(
    (supply) => supply.SuppliesCategory_ID === categorySupply.ID_SuppliesCategory
  );

  const handleToggleCategoryStatus = () => {
    if (canChangeCategoryStatus) {
      toggleCategorySupplyStatus(categorySupply.ID_SuppliesCategory);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <tr className="text-black">
      <td className="px-4 py-1 w-1/4 text-left">{count}</td>
      <td className="px-4 py-1 w-1/4 text-center">
        {categorySupply.Name_SuppliesCategory}
      </td>
      <td className={`px-4 py-1 w-1/4 text-center ${barraClass}`}>
        {categorySupply.State ? "Habilitado" : "Deshabilitado"}
      </td>
      <td className="px-4 py-1 w-1/4">
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={onEdit}
            className={`text-orange-500 hover:text-orange-700 ${
              !categorySupply.State ? "text-gray-400 cursor-not-allowed" : ""
            }`}
            disabled={!categorySupply.State}
          >
            <AiFillEdit size={24} />
          </button>
          <button
            onClick={onDelete}
            className={`text-red-500 hover:text-red-800 ${
              !categorySupply.State ? "text-gray-400 cursor-not-allowed" : ""
            }`}
            disabled={!categorySupply.State}
          >
            <AiFillDelete size={24} />
          </button>
          <div
            className={`barra-container ${barraClass}`}
            onClick={handleToggleCategoryStatus}
          >
            {categorySupply.State ? (
              <MdToggleOn className="estado-icon active" />
            ) : (
              <MdToggleOff className="estado-icon inactive" />
            )}
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
