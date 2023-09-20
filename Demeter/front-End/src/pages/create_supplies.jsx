import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSupplies } from '../context/supplies.context.jsx';

function CreateSupplies() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const { createSupplies, supplies } = useSupplies();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    const isNameDuplicate = supplies.some(supply => supply.Nombre_Insumo === values.Nombre_Insumo);

    if (isNameDuplicate) {
      setError('Nombre_Insumo', {
        type: 'manual',
        message: 'El nombre del insumo ya existe.'
      });
      return;
    }
    
    createSupplies(values);
    navigate('/list_supplies');
  });

  const onCancel = () => {
    navigate('/list_supplies'); 
  };

  return (
    <div className='max-w-md mx-auto mt-20'>
      <form onSubmit={onSubmit}>
        <div className='contenedor'>
          <div className="mb-4">
            <label className="sr-only">Nombre del insumo</label>
            <input
              type="text"
              {...register("Nombre_Insumo", {
                required: 'Este campo es obligatorio',
                pattern: {
                  value: /^[A-Z][a-z]*$/,
                  message: 'El nombre del insumo debe tener la primera letra en mayúscula y solo letras.'
                }
              })}
              placeholder="Nombre del insumo"
              className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
            />
            {errors.Nombre_Insumo && <p className="text-red-500">{errors.Nombre_Insumo.message}</p>}
          </div>
          <div className="mb-4">
            <label className="sr-only">Cantidad del insumo</label>
            <input
              type="number"
              {...register("Cantidad_Insumo", {
                required: 'Este campo es obligatorio',
                validate: (value) => !isNaN(value) && parseInt(value) <= 9999 || 'La cantidad del insumo debe ser un número entero de máximo 4 dígitos.'
              })}
              placeholder="Cantidad del insumo"
              className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
            />
            {errors.Cantidad_Insumo && <p className="text-red-500">{errors.Cantidad_Insumo.message}</p>}
          </div>
          <div className="mb-4">
            <label className="sr-only">Stock mínimo</label>
            <input
              type="number"
              {...register("Stock_Minimo", {
                required: 'Este campo es obligatorio',
              })}
              placeholder="Stock mínimo"
              className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
            />
            {errors.Stock_Minimo && <p className="text-red-500">{errors.Stock_Minimo.message}</p>}
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button type="submit" className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded boton-izquierda'>
            Confirmar
          </button>
          <button type="button" className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded boton-derecha' onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateSupplies;
