import { useEffect } from 'react';
import { useCategoryProducts } from '../context/category_products.context';
import CategoryProductsCard from '../components/category_products.card';

function ListCategoryProducts() {
    const { Category_products, getCategory_products } = useCategoryProducts();

    useEffect(() => {
        getCategory_products();
    }, []);

    if (Category_products.length < 0) return (<h1>no hay categorias</h1>)

    return (    
        <div className='grid  grid-cols-3 gap-2'>
            {
                Category_products.map(category_products => (
                    <CategoryProductsCard category_products={category_products} key={category_products.ID_CATEGORIA_PRODUCTO} />
                ))
            }
        </div>
    )
}

export default ListCategoryProducts

