import { useForm } from 'react-hook-form';
import { useCategorySupplies } from '../context/category_supplies.context.jsx';

function CreateCategorySuppliesModal({ onClose }) {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const { createCategory_supplies, Category_supplies } = useCategorySupplies();

  const onSubmit = handleSubmit(async (values) => {
    const isNameDuplicate = Category_supplies.some(category => category.Name === values.Name);

    if (isNameDuplicate) {
      setError('Name', {
        type: 'manual',
        message: 'El nombre de la categoría ya existe.'
      });
      return;
    }

    createCategory_supplies(values);
    onClose(); 
  });

  const onCancel = () => {
    onClose(); 
  };

  return (
    <div className='max-w-md mx-auto'>
      <h1 className="text-3xl font-semibold text-center mb-4">Crear categoría</h1>
      <form onSubmit={onSubmit}>
        <div className='contenedor'>
          <div className="mb-4 inferior">
            <label htmlFor="Name" className="mb-2 block">Nombre de la categoría:</label>
            <input
              type="text"
              {...register("Name", {
                required: 'Este campo es obligatorio',
                pattern: {
                  value: /^[A-ZÁÉÍÓÚ][a-záéíóú\s]*[a-záéíóú]$/,
                  message: 'El nombre de la categoría debe tener la primera letra en mayúscula, el resto en minúscula y solo se permiten letras.'
                }
              })}
              placeholder="Nombre de la categoría"
              className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
            />
            {errors.Name && <p className="text-red-500">{errors.Name.message}</p>}
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button type="submit" className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded boton-izquierda-2' onClick={onSubmit}>
            Confirmar
          </button>
          <button type="button" className='bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded boton-derecha-2' onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCategorySuppliesModal;
