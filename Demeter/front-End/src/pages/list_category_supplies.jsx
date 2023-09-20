import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategorySupplies } from '../context/category_supplies.context';
import CategorySuppliesCard from '../components/category_supplies.card';

function ListCategorySupplies() {
    const { Category_supplies, getCategory_supplies } = useCategorySupplies();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSupplies, setFilteredSupplies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCategory_supplies();
    }, []);

    if (Category_supplies.length < 0) return (<h1>No hay insumos</h1>)

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredSupplies(Category_supplies);
        } else {
            const filtered = Category_supplies.filter(category_supply =>
                category_supply.Nombre_Categoria.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredSupplies(filtered);
        }
    }, [searchTerm, Category_supplies]);

    const navigateToCreateCategorySupplies = () => {
        navigate('/create_category_supplies');
    };

    return (
        <div className="mx-auto mt-4 contenedor">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={navigateToCreateCategorySupplies}
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2.5 px-5 rounded border border-orange-500 hover:border-orange-700 focus:outline-none focus:shadow-outline"
                >
                    Crear categoria 
                </button>
                <input
                    type="text"
                    placeholder="Buscar categoria"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="border-2 border-gray-800 rounded-lg p-2 focus:outline-none" //focus:border-orange-600
                />
            </div>
            <table className="table-auto mx-auto w-full">
                <thead>
                    <tr className="bg-[#201E1E] text-white">
                        <th className="border border-gray-400 px-4 py-2">Nombre</th>
                        <th className="border border-gray-400 px-4 py-2">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSupplies.map(category_supply => (
                        <CategorySuppliesCard Category_supplies={category_supply} key={category_supply.ID_CATEGORIA_INSUMO} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListCategorySupplies;

