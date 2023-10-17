import { useSupplies } from "../context/supplies.context";
import { useCategorySupplies } from "../context/category_supplies.context";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

function SuppliesCard({ supplies, onEdit, onDelete }) {
  const { toggleSupplyStatus } = useSupplies();
  const { Category_supplies } = useCategorySupplies();

  const category = Category_supplies.find(
    (category) => category.Id_Category === supplies.Category_Id
  );

  const barraClass = supplies.State ? "" : "desactivado";

  return (
    <tr>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">{supplies.Name}</td>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">{supplies.Unit}</td>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">{supplies.Measure}</td>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">{supplies.Stock}</td>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">
        {category && category.Name}
      </td>
      <td className={`border border-gray-400 px-4 py-2 text-center width-column ${barraClass}`}>
        {supplies.State ? "Habilitado" : "Deshabilitado"}
      </td>
      <td className="border border-gray-400 px-4 py-2 text-center">
        <div style={{ display: "flex" }}>
          <button
            onClick={onEdit}
            className={`text-orange-500 hover:text-orange-700 mr-2 ${!supplies.State ? "text-gray-400 cursor-not-allowed" : ""}`}
            disabled={!supplies.State} style={{ marginLeft: "17%"}}
          >
            <AiFillEdit size={24} />
          </button>
          <button
            onClick={onDelete}
            className={`text-red-500 hover:text-red-800 mr-2 ${!supplies.State ? "text-gray-400 cursor-not-allowed" : ""}`}
            style={{ marginRight: "-20px" }}
            disabled={!supplies.State}
          >
            <AiFillDelete size={24} />
          </button>
          <div
            className={`barra-container ${barraClass} adjust`}
            onClick={() => toggleSupplyStatus(supplies.Id_Supplies)}
          >
            <div className={` ${barraClass}`} style={{ marginRight: "-30px" }}>
              {supplies.State ? (
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

export default SuppliesCard;
