import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useSupplies } from '../context/supplies.context.jsx';
import { useEffect } from 'react';

function CreateSupplies() {
  const { register, handleSubmit, setValue } = useForm();
  const { createSupplies, getSupplie, updateSupplies } = useSupplies();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function getOneSupplie() {
      if (params.id) {
        const get_One_Supplie = await getOneSupplie(params.id);
        console.log(get_One_Supplie);
        setValue('Nombre_Insumo', get_One_Supplie.Nombre_Insumo)
        setValue('Cantidad_Insumo', get_One_Supplie.Cantidad_Insumo)
        setValue('Imagen', get_One_Supplie.Imagen)
        setValue('Stock_Minimo', get_One_Supplie.Stock_Minimo)
      }
    }
    getOneSupplie();
  }, [])

  const onSubmit = handleSubmit(async (values) => {
    if (params.id) {
      updateSupplies(params.id, values)
    } else {
      createSupplies(values);
    }
    navigate('/list_supplies');
  })

  return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
      <form onSubmit={onSubmit}>
        <label>Nombre del insumo<input type="text" {...register("Nombre_Insumo", { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md'></input></label>
        <label>cantidad del insumo<input type="number" {...register("Cantidad_Insumo", { required: false })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md'></input></label>
        <label>Imagen<input type="file" accept="image/*" {...register("Imagen", { required: false })} ></input></label>
        <label>Stock minimo<input type="number" {...register("Stock_Minimo", { required: false })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md'></input></label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default CreateSupplies