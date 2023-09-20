import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategoryProducts } from '../context/category_products.context';
import CategoryProductsCard from '../components/category_products.card';

function ListCategoryProducts() {
    const { Category_products, getCategory_products } = useCategoryProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSupplies, setFilteredSupplies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCategory_products();
    }, []);

    if (Category_products.length < 0) return (<h1>No hay insumos</h1>)

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredSupplies(Category_products);
        } else {
            const filtered = Category_products.filter(category_product =>
                category_product.Nombre_Categoria.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredSupplies(filtered);
        }
    }, [searchTerm, Category_products]);

    const navigateToCreateCategoryProducts = () => {
        navigate('/create_category_products');
    };

    return (
        <div className="mx-auto mt-4 contenedor">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={navigateToCreateCategoryProducts}
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
                    {filteredSupplies.map(category_product => (
                        <CategoryProductsCard Category_products={category_product} key={category_product.ID_CATEGORIA_PRODUCTO} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListCategoryProducts

