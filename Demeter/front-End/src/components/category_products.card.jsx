import { useCategoryProducts } from "../context/category_products.context";

function CategoryProductsCard({ Category_products }) {
    
    const { toggleCategoryProductStatus } = useCategoryProducts();

    const imageSource = Category_products.habilitado ? "enabled.png" : "disabled.png";

    return (
        <tr>
            <td className="border border-gray-400 px-4 py-2">{Category_products.Nombre_Categoria}</td>
            <td className="border border-gray-400 px-4 py-2">
            <img
                    src={imageSource}
                    alt={Category_products.habilitado ? "Habilitado" : "Deshabilitado"}
                    onClick={() => toggleCategoryProductStatus(Category_products.ID_CATEGORIA_PRODUCTO)}
                    style={{ cursor: "pointer" }}
                />
            </td>
        </tr>
    )
}

export default CategoryProductsCard
