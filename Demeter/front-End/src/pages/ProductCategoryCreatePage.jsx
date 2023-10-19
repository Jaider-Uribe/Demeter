import React from 'react';
import { useForm } from 'react-hook-form';
import { useCategoryProducts } from '../context/productcategory.context.jsx';

function CreateCategoryProductsModal({ onClose }) {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const { createCategory_products, Category_products } = useCategoryProducts();

  const onSubmit = handleSubmit(async (values) => {
    const isNameDuplicate = Category_products.some(category => category.Name_ProductCategory === values.Name_ProductCategory);

    if (isNameDuplicate) {
      setError('Name_ProductCategory', {
        type: 'manual',
        message: 'El nombre de la categoría ya existe.'
      });
      return;
    }

    createCategory_products(values);
    onClose();
  });

  const onCancel = () => {
    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='modal-overlay' onClick={onCancel}></div>
      <div className='modal-container'>
        <div className='max-w-md mx-auto mt-4 p-4'>
          <h1 className="text-3xl font-semibold text-center mb-4">Crear categoría</h1>
          <form onSubmit={onSubmit}>
            <div className='mb-4 inferior'>
              <label htmlFor="Name_ProductCategory" className="mb-2 block">Nombre de la categoría:</label>
              <input
                type='text'
                {...register('Name_ProductCategory', {
                  required: 'Este campo es obligatorio',
                  pattern: {
                    value: /^[A-ZÁÉÍÓÚ][a-záéíóú\s]*[a-záéíóú]$/,
                    message: 'El nombre de la categoría debe tener la primera letra en mayúscula, el resto en minúscula y solo se permiten letras.'
                  }
                })}
                placeholder='Nombre de la categoría'
                className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
              />
              {errors.Name_ProductCategory && <p className='text-red-500'>{errors.Name_ProductCategory.message}</p>}
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
