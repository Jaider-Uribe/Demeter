import { useEffect } from 'react';
import { useCategorySupplies } from '../context/category_supplies.context';
import CategorySuppliesCard from '../components/category_supplies.Card';

function ListCategorySupplies() {
    const { Category_supplies, getCategory_supplies } = useCategorySupplies();

    useEffect(() => {
        getCategory_supplies();
    }, []);

    if (Category_supplies.length < 0) return (<h1>no hay categorias</h1>)

    return (
        <div className='grid  grid-cols-3 gap-2'>
            {
                Category_supplies.map(category_supplies => (
                    <CategorySuppliesCard category_supplies={category_supplies} key={category_supplies.ID_CATEGORIA_INSUMO} />
                ))
            }
        </div>
    )
}

export default ListCategorySupplies

