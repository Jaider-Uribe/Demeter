import React from 'react';
import { useForm } from 'react-hook-form';
import { useCategoryProducts } from '../context/category_products.context.jsx';

function CreateCategoryProductsModal({ onClose }) {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const { createCategory_products, Category_products } = useCategoryProducts();

  const onSubmit = handleSubmit(async (values) => {
    const isNameDuplicate = Category_products.some(category => category.Nombre_Categoria === values.Nombre_Categoria);

    if (isNameDuplicate) {
      setError('Nombre_Categoria', {
        type: 'manual',
        message: 'El nombre de la categoría ya existe.'
      });
      return;
    }

    createCategory_products(values);
    onClose(); // Cerrar el modal después de enviar el formulario
  });

  const onCancel = () => {
    onClose(); // Cerrar el modal si se cancela
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='modal-overlay' onClick={onCancel}></div>
      <div className='modal-container'>
        <div className='max-w-md mx-auto mt-4 p-4'>
          <form onSubmit={onSubmit}>
            <div className='mb-4 inferior'>
            <label htmlFor="Nombre_Categoria" className="mb-2 block">Nombre de la categoría:</label>
              <input
                type='text'
                {...register('Nombre_Categoria', {
                  required: 'Este campo es obligatorio',
                  pattern: {
                    value: /^[A-ZÁÉÍÓÚ][a-záéíóú\s]*[a-záéíóú]$/,
                    message: 'El nombre de la categoría debe tener la primera letra en mayúscula y solo letras.'
                  }
                })}
                placeholder='Nombre de la categoría'
                className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
              />
              {errors.Nombre_Categoria && <p className='text-red-500'>{errors.Nombre_Categoria.message}</p>}
            </div>
            <div className='mt-4 flex justify-between items-center'>
              <button type='submit' className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded boton-izquierda'>
                Confirmar
              </button>
              <button type='button' className='bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded boton-derecha' onClick={onCancel}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCategoryProductsModal;
