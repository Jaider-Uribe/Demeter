import { useSupplies } from "../context/supplies.context";
import { useCategorySupplies } from "../context/category_supplies.context";
import { AiFillEdit, AiFillDelete } from "react-icons/ai"; // Cambiamos AiOutlineDelete a AiFillDelete
import { MdToggleOn, MdToggleOff } from "react-icons/md";

function SuppliesCard({ supplies, onEdit, onDelete }) {
    const { toggleSupplyStatus } = useSupplies();
    const { Category_supplies } = useCategorySupplies();

    // Encontrar la categoría asociada al suministro por su ID
    const category = Category_supplies.find(
        (category) => category.ID_CATEGORIA_INSUMO === supplies.CATEGORIA_INSUMO_ID
    );

    // Determinar las clases para la barra y el círculo
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
            <td className="border border-gray-400 px-4 py-2 width-column">
                <div className={`barra-container ${barraClass} adjust`} onClick={() => toggleSupplyStatus(supplies.ID_INSUMO)}>
                    <div className={`circulo ${barraClass}`}>
                        {supplies.Estado ? (
                            <MdToggleOn className={`estado-icon active ${barraClass}`} />
                        ) : (
                            <MdToggleOff className={`estado-icon inactive ${barraClass}`} />
                        )}
                    </div>
                </div>
            </td>
            <td className="border border-gray-400 px-4 py-2 text-center">
                <button onClick={onEdit} className="text-orange-500 hover:text-orange-700 mr-2">
                    <AiFillEdit size={24} /> {/* Ajustamos el tamaño del ícono */}
                </button>
                <button onClick={onDelete} className="text-red-500 hover:text-red-800 mr-2">
                    <AiFillDelete size={24} /> {/* Cambiamos el ícono y color */}
                </button>
            </td>
        </tr>
    );
}

export default SuppliesCard;
