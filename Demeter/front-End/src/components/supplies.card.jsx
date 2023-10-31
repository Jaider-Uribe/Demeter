import { useSupplies } from "../context/supplies.context";
import { useCategorySupplies } from "../context/suppliescategory.context";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

function SuppliesCard({ supplies, onEdit, onDelete, count }) {
  const { toggleSupplyStatus } = useSupplies();
  const { Category_supplies } = useCategorySupplies();

  const category = Category_supplies.find(
    (category) => category.ID_SuppliesCategory === supplies.SuppliesCategory_ID
  );

  const barraClass = supplies.State ? "" : "desactivado";

  return (
    <tr className="text-white">
    <td className="px-4 py-1 w-1/8 text-black text-center">{count}</td>
      <td className="px-4 py-1 w-1/8 text-black text-center">
        {supplies.Name_Supplies}
      </td>
      <td className="px-4 py-1 w-1/8 text-black text-center">{supplies.Unit}</td>
      <td className="px-4 py-1 w-1/8 text-black text-center">{supplies.Measure}</td>
      <td className="px-4 py-1 w-1/8 text-black text-center">{supplies.Stock}</td>
      <td className="px-4 py-1 w-1/8 text-black text-center">
        {category && category.Name_SuppliesCategory}
      </td>
      <td className="px-4 py-1 w-1/8 text-black text-center">
        {supplies.State ? 'Habilitado' : 'Deshabilitado'}
      </td>
      <td className="px-6 py-1 text-right w-1/6">
        <div className="flex justify-end items-center space-x-2">
          <button
            onClick={onEdit}
            className={`text-orange-500 hover:text-orange-700 ${
              !supplies.State ? 'text-gray-400 cursor-not-allowed' : ''
            }`}
            disabled={!supplies.State}
          >
            <AiFillEdit size={24} />
          </button>
          <button
            onClick={onDelete}
            className={`text-red-500 hover:text-red-800 ${
              !supplies.State ? 'text-gray-400 cursor-not-allowed' : ''
            }`}
            disabled={!supplies.State}
          >
            <AiFillDelete size={24} />
          </button>
          <div
            className={`${!supplies.State ? 'desactivado' : ''}`}
            onClick={() => toggleSupplyStatus(supplies.ID_Supplies)}
          >
            {supplies.State ? (
              <MdToggleOn className="estado-icon active" />
            ) : (
              <MdToggleOff className="estado-icon inactive" />
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}

export default SuppliesCard;
