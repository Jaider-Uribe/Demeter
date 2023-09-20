import { useCategorySupplies } from "../context/category_supplies.context";

function CategorySuppliesCard({ Category_supplies }) {

    const { toggleCategorySupplyStatus } = useCategorySupplies();

    const imageSource = Category_supplies.habilitado ? "enabled.png" : "disabled.png";

    return (
        <tr>
            <td className="border border-gray-400 px-4 py-2">{Category_supplies.Nombre_Categoria}</td>
            <td className="border border-gray-400 px-4 py-2">
                <img
                    src={imageSource}
                    alt={Category_supplies.habilitado ? "Habilitado" : "Deshabilitado"}
                    onClick={() => toggleCategorySupplyStatus(Category_supplies.ID_CATEGORIA_INSUMO)}
                    style={{ cursor: "pointer" }}
                />
            </td>
        </tr>
    )
}

export default CategorySuppliesCard
