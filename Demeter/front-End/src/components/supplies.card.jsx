import { useSupplies } from "../context/supplies.context";

function SuppliesCard({ supplies }) {
    
    const { toggleSupplyStatus } = useSupplies();

    const imageSource = supplies.habilitado ? "enabled.png" : "disabled.png";

    return (
        <tr>
            <td className="border border-gray-400 px-4 py-2">{supplies.Nombre_Insumo}</td>
            <td className="border border-gray-400 px-4 py-2">{supplies.Cantidad_Insumo}</td>
            <td className="border border-gray-400 px-4 py-2">{supplies.Stock_Minimo}</td>
            <td className="border border-gray-400 px-4 py-2">
                <img
                    src={imageSource}
                    alt={supplies.habilitado ? "Habilitado" : "Deshabilitado"}
                    onClick={() => toggleSupplyStatus(supplies.ID_INSUMO)}
                    style={{ cursor: "pointer" }}
                />
            </td>
        </tr>
    );
}

export default SuppliesCard;
