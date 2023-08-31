import { useEffect } from 'react';
import { useSupplies } from '../context/supplies.context';
import SuppliesCard from '../components/supplies.card'

function ListSupplies() {
    const { supplies, getSupplies } = useSupplies();

    useEffect(() => {
        getSupplies();
    }, []);

    if (supplies.length < 0) return (<h1>no hay insumos</h1>)

    return (
        <div className='grid  grid-cols-3 gap-2'>
            {
                supplies.map(supplies => (
                    <SuppliesCard supplies={supplies} key={supplies.ID_INSUMO} />
                ))
            }
        </div>
    )
}

export default ListSupplies