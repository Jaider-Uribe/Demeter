import { useSupplies } from "../context/supplies.context";
import { useCategorySupplies } from "../context/category_supplies.context";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

function SuppliesCard({ supplies, onEdit, onDelete }) {
  const { toggleSupplyStatus } = useSupplies();
  const { Category_supplies } = useCategorySupplies();

  const category = Category_supplies.find(
    (category) => category.ID_CATEGORIA_INSUMO === supplies.CATEGORIA_INSUMO_ID
  );

  const barraClass = supplies.Estado ? "" : "desactivado";

  return (
    <tr>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">{supplies.Nombre_Insumo}</td>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">{supplies.Cantidad_Insumo}</td>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">{supplies.Medida_Insumo}</td>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">{supplies.Stock_Minimo}</td>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">
        {category && category.Nombre_Categoria}
      </td>
      <td className={`border border-gray-400 px-4 py-2 text-center width-column ${barraClass}`}>
        {supplies.Estado ? "Habilitado" : "Deshabilitado"}
      </td>
      <td className="border border-gray-400 px-4 py-2 text-center">
        <div style={{ display: "flex" }}>
          <button
            onClick={onEdit}
            className={`text-orange-500 hover:text-orange-700 mr-2 ${!supplies.Estado ? "text-gray-400 cursor-not-allowed" : ""}`}
            disabled={!supplies.Estado} style={{ marginLeft: "17%"}}
          >
            <AiFillEdit size={24} />
          </button>
          <button
            onClick={onDelete}
            className={`text-red-500 hover:text-red-800 mr-2 ${!supplies.Estado ? "text-gray-400 cursor-not-allowed" : ""}`}
            style={{ marginRight: "-20px" }}
            disabled={!supplies.Estado}
          >
            <AiFillDelete size={24} />
          </button>
          <div
            className={`barra-container ${barraClass} adjust`}
            onClick={() => toggleSupplyStatus(supplies.ID_INSUMO)}
          >
            <div className={` ${barraClass}`} style={{ marginRight: "-30px" }}>
              {supplies.Estado ? (
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
