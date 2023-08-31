import { useCategoryProducts } from "../context/category_products.context";
import { Link } from 'react-router-dom';

function CategoryProductsCard({ category_products }) {
    
    const {deleteCategory_products} = useCategoryProducts();

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-1xl front-bold">{category_products.Nombre_Categoria}</h1>
                <div className="flex gap-x-2 items-center">
                    <button onClick={() =>{
                        deleteCategory_products(category_products.ID_CATEGORIA_PRODUCTO)
                    }}>Borrar</button>
                    <Link to = {`/create_category_products/${category_products.ID_CATEGORIA_PRODUCTO}`} >Editar</Link>
                </div>
            </header>
            <img >{category_products.Image}</img>
        </div>
    )
}

export default CategoryProductsCard
