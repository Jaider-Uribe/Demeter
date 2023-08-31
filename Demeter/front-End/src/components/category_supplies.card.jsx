import { useCategorySupplies } from "../context/category_supplies.context";
import { Link } from 'react-router-dom';

function CategorySuppliesCard({ category_supplies }) {

    const { deleteCategory_supplies } = useCategorySupplies();

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-1xl front-bold">{category_supplies.Nombre_Categoria}</h1>
                <div className="flex gap-x-2 items-center">
                    <button onClick={() => {
                        deleteCategory_supplies(category_supplies.ID_CATEGORIA_INSUMO)
                    }}>Borrar</button>
                    <Link to={`/create_category_supplies/${category_supplies.ID_CATEGORIA_INSUMO}`} >Editar</Link>
                </div>
            </header>
            <img >{category_supplies.Image}</img>
        </div>
    )
}

export default CategorySuppliesCard
