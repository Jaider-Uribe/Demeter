import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCategoryProducts } from '../context/category_products.context';

function EditCategoryProductsModal({ onClose, categoryProductToEdit }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: categoryProductToEdit
  });
  const { updateCategory_products, Category_products } = useCategoryProducts();
  const [duplicateError, setDuplicateError] = useState('');

  const onSubmit = handleSubmit(async (values) => {
    if (values.Name !== categoryProductToEdit.Name) {
      const duplicateCategory_product = Category_products.some(category =>
        category.Id_Category !== categoryProductToEdit.Id_Category &&
        category.Name === values.Name
      );

      if (duplicateCategory_product) {
        setDuplicateError('Esta categoría de productos ya existe.');
        return;
      } else {
        setDuplicateError('');
      }
    }

    updateCategory_products(categoryProductToEdit.Id_Category, values);
    onClose();
  });

  const onCancel = () => {
    onClose();
  };

  return (
    <div className='max-w-md mx-auto p-4 down'>
      <h1 className="text-3xl font-semibold text-center mb-4">Editar categoría</h1>
      <form onSubmit={onSubmit}>
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
          {duplicateError && <p className="text-red-500">{duplicateError}</p>}
          {errors.Name && <p className="text-red-500">{errors.Name.message}</p>}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button type="submit" className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded boton-izquierda'>
            Confirmar
          </button>
          <button type="button" className='bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded boton-derecha' onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCategoryProductsModal;
