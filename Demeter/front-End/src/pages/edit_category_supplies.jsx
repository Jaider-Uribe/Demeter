import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCategorySupplies } from '../context/category_supplies.context';

function EditCategorySuppliesModal({ onClose, categorySupplyToEdit }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: categorySupplyToEdit
  });
  const { updateCategory_supplies, Category_supplies } = useCategorySupplies();
  const [duplicateError, setDuplicateError] = useState('');

  const onSubmit = handleSubmit(async (values) => {
    if (values.Nombre_Categoria !== categorySupplyToEdit.Nombre_Categoria) {
      // El nombre ha cambiado, verificar si ya existe en otras categorías.
      const duplicateCategory_supply = Category_supplies.some(category => 
        category.ID_CATEGORIA_INSUMO !== categorySupplyToEdit.ID_CATEGORIA_INSUMO &&
        category.Nombre_Categoria === values.Nombre_Categoria
      );

      if (duplicateCategory_supply) {
        // Mostrar un mensaje de error.
        setDuplicateError('Esta categoría de insumos ya existe.');
        return;
      } else {
        // No hay error, así que limpiamos el mensaje de error.
        setDuplicateError('');
      }
    }

    // Si el nombre es el mismo o no existe en otras categorías, se permite la actualización.
    updateCategory_supplies(categorySupplyToEdit.ID_CATEGORIA_INSUMO, values);
    onClose();
  });

  const onCancel = () => {
    onClose();
  };

  return (
    <div className='max-w-md mx-auto p-4 down'>
      <h1 className="text-3xl font-semibold text-center mb-4">Editar Categoría</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-4 inferior">
          <label htmlFor="Nombre_Categoria" className="mb-2 block">Nombre de la categoría:</label>
          <input
            type="text"
            {...register("Nombre_Categoria", {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^[A-ZÁÉÍÓÚ][a-záéíóú\s]*[a-záéíóú]$/,
                message: 'El nombre de la categoría debe tener la primera letra en mayúscula y solo letras.'
              }
            })}
            placeholder="Nombre de la categoría"
            className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
          />
          {duplicateError && <p className="text-red-500">{duplicateError}</p>}
          {errors.Nombre_Categoria && <p className="text-red-500">{errors.Nombre_Categoria.message}</p>}
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

export default EditCategorySuppliesModal;
