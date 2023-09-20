import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCategoryProducts } from '../context/category_products.context.jsx';

function CreateCategoryProducts() {
  const { register, handleSubmit, formState: { errors }, setError  } = useForm(); 
  const { createCategory_products, Category_products } = useCategoryProducts();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    const isNameDuplicate = Category_products.some(category => category.Nombre_Categoria === values.Nombre_Categoria);

    if (isNameDuplicate) {
      setError('Nombre_Categoria', {
        type: 'manual',
        message: 'El nombre de la categoria ya existe.'
      });
      return;
    }

    createCategory_products(values);
    navigate('/list_category_products');
  });

  const onCancel = () => {
    navigate('/list_category_products');
  };

  return (
    <div className='max-w-md mx-auto mt-20'>
      <form onSubmit={onSubmit}>
        <div className='contenedor'>
          <div className="mb-4">
            <label className="sr-only">Nombre de la categoría</label>
            <input
              type="text"
              {...register("Nombre_Categoria", {
                required: 'Este campo es obligatorio',
                pattern: {
                  value: /^[A-Z][a-z]*$/,
                  message: 'El nombre de la categoria debe tener la primera letra en mayúscula y solo letras.'
                }
              })}
              placeholder="Nombre de la categoria"
              className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
            />
            {errors.Nombre_Categoria && <p className="text-red-500">{errors.Nombre_Categoria.message}</p>}
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button type="submit" className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded boton-izquierda-2' onClick={onSubmit}>
            Confirmar
          </button>
          <button type="button" className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded boton-derecha-2' onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCategoryProducts;
