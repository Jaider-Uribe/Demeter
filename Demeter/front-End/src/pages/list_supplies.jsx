import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupplies } from '../context/supplies.context';
import SuppliesCard from '../components/supplies.card';

function ListSupplies() {
    const { supplies, getSupplies } = useSupplies();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSupplies, setFilteredSupplies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getSupplies();
    }, []);

    if (supplies.length < 0) return (<h1>No hay insumos</h1>)

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredSupplies(supplies);
        } else {
            const filtered = supplies.filter(supply =>
                supply.Nombre_Insumo.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredSupplies(filtered);
        }
    }, [searchTerm, supplies]);

    const navigateToCreateSupplies = () => {
        navigate('/create_supplies');
    };

    return (
        <div className="mx-auto mt-4 contenedor">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={navigateToCreateSupplies}
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2.5 px-5 rounded border border-orange-500 hover:border-orange-700 focus:outline-none focus:shadow-outline"
                >
                    Crear insumo
                </button>
                <input
                    type="text"
                    placeholder="Buscar insumo por nombre"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="border-2 border-gray-800 rounded-lg p-2 focus:outline-none" //focus:border-orange-600
                />
            </div>
            <table className="table-auto mx-auto w-full">
                <thead>
                    <tr className="bg-[#201E1E] text-white">
                        <th className="border border-gray-400 px-4 py-2">Nombre</th>
                        <th className="border border-gray-400 px-4 py-2">Cantidad</th>
                        <th className="border border-gray-400 px-4 py-2">Stock Mínimo</th>
                        <th className="border border-gray-400 px-4 py-2">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSupplies.map(supply => (
                        <SuppliesCard supplies={supply} key={supply.ID_INSUMO} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListSupplies;
