import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategorySupplies } from '../context/category_supplies.context.jsx';
import { useEffect } from 'react';

function CreateCategorySupplies() {
  const { register, handleSubmit, setValue } = useForm();
  const { createCategory_supplies, getOneCategory_supplies, updateCategory_supplies } = useCategorySupplies();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function getOneCategory() {
      if (params.id) {
        const get_One_Category = await getOneCategory_supplies(params.id);
        console.log(get_One_Category);
        setValue('Nombre_Categoria', get_One_Category.Nombre_Categoria)
        setValue('Imagen', get_One_Category.Imagen)
      }
    }
    getOneCategory();
  }, [])

  const onSubmit = handleSubmit(async (values) => {
    if (params.id) {
      updateCategory_supplies(params.id, values)
    } else {
      createCategory_supplies(values);
    }
    navigate('/list_category_supplies');
  })

  return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
      <form onSubmit={onSubmit}>
        <label>Nombre de la categoria<input type="text" {...register("Nombre_Categoria", { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md'></input></label>
        <label>Imagen<input type="file" accept="image/*" {...register("Imagen", { required: false })} ></input></label>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

export default CreateCategorySupplies
