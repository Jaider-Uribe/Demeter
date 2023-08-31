import { useSupplies } from "../context/supplies.context";
import { Link } from 'react-router-dom';

function SuppliesCard({ supplies }) {

    const { deleteSupplies } = useSupplies();

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-1xl front-bold">{supplies.Nombre_Insumo}</h1>
                <p className="text-1xl front-bold">{supplies.Cantidad_Insumo}</p>
                <p className="text-1xl front-bold">{supplies.Stock_Minimo}</p>
                <div className="flex gap-x-2 items-center">
                    <button onClick={() => {
                        deleteSupplies(supplies.ID_INSUMO)
                    }}>Borrar</button>
                    <Link to={`/create_supplies/${supplies.ID_INSUMO}`} >Editar</Link>
                </div>
            </header>
            <img >{supplies.Image}</img>
        </div>
    )
}

export default SuppliesCard