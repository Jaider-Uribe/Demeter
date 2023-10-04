import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSupplies } from '../context/supplies.context';
import { useCategorySupplies } from '../context/category_supplies.context';
import Select from 'react-select';

function EditSuppliesModal({ onClose, supplyToEdit }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: supplyToEdit
  });
  const { updateSupplies, supplies } = useSupplies();
  const [selectedMeasure, setSelectedMeasure] = useState(supplyToEdit.Medida_Insumo);
  const { Category_supplies } = useCategorySupplies();

  const measureOptions = [
    { label: 'Litros (L)', value: 'Litros (L)' },
    { label: 'Mililitros (ml)', value: 'Mililitros (ml)' },
    { label: 'Kilo (kl)', value: 'Kilo (kl)' },
  ];

  const categoryOptions = Category_supplies.map(option => ({
    label: option.Nombre_Categoria,
    value: option.ID_CATEGORIA_INSUMO
  }));

  const [selectedCategory, setSelectedCategory] = useState(supplyToEdit.CATEGORIA_INSUMO_ID);

  useEffect(() => {
    register('Nombre_Insumo', {
      required: 'Este campo es obligatorio',
      validate: (value) => {
        const duplicateSupply = supplies.find(
          (supply) =>
            supply.Nombre_Insumo === value &&
            supply.ID_INSUMO !== supplyToEdit.ID_INSUMO
        );

        if (duplicateSupply) {
          return 'Este nombre de insumo ya existe.';
        }
        return true;
      },
    });
  }, [register, supplies, supplyToEdit.ID_INSUMO]);

  const onSubmit = handleSubmit(async (values) => {
    values.Medida_Insumo = selectedMeasure;
    values.CATEGORIA_INSUMO_ID = selectedCategory;

    updateSupplies(supplyToEdit.ID_INSUMO, values);
    onClose();
  });

  const onCancel = () => {
    onClose();
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? '1px solid #201E1E' : '1px solid #201E1E',
      '&:hover': {
        border: '1px solid #201E1E',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#e36209' : state.isFocused ? '#e36209' : 'white',
      color: state.isSelected ? 'white' : '#201E1E',
      '&:hover': {
        backgroundColor: '#e36209',
        color: 'white',
      },
      cursor: state.isDisabled ? 'not-allowed' : 'default',
    }),
  };

  return (
    <div className='max-w-md mx-auto p-4 down'>
      <h1 className="text-3xl font-semibold text-center mb-4">Editar insumo</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="Nombre_Insumo" className="mb-2 block">Nombre del insumo:</label>
          <input
            type="text"
            {...register("Nombre_Insumo", {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^[A-ZÁÉÍÓÚ][a-záéíóú\s]*[a-záéíóú]$/,
                message: 'El nombre del insumo debe tener la primera letra en mayúscula, el resto en minúscula y solo se permiten letras.'
              }
            })}
            placeholder="Nombre del insumo"
            className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
          />
          {errors.Nombre_Insumo && <p className="text-red-500">{errors.Nombre_Insumo.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="Cantidad_Insumo" className="mb-2 block">Cantidad del insumo:</label>
          <input
            type="number"
            {...register("Cantidad_Insumo", {
              required: 'Este campo es obligatorio',
              validate: (value) => {
                const parsedValue = parseInt(value);
                if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 9999) {
                  return 'La cantidad debe ser un número entero entre 0 y 9.999.';
                }
                return true;
              }
            })}
            placeholder="Cantidad del insumo"
            className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
          />
          {errors.Cantidad_Insumo && <p className="text-red-500">{errors.Cantidad_Insumo.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="Medida_Insumo" className="mb-2 block">Medida del insumo:</label>
          <Select
            options={measureOptions}
            {...register("Medida_Insumo", {
              required: 'Este campo es obligatorio',
            })}
            value={measureOptions.find(option => option.value === selectedMeasure)}
            onChange={(selectedOption) => setSelectedMeasure(selectedOption.value)}
            menuPlacement="auto"
            menuShouldScrollIntoView={false}
            maxMenuHeight={132}
            styles={customStyles}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: '#201E1E',
              },
            })}
          />
          {errors.Medida_Insumo && <p className="text-red-500">{errors.Medida_Insumo.message}</p>}
        </div>


        <div className="mb-4">
          <label htmlFor="Stock_Minimo" className="mb-2 block">Stock mínimo:</label>
          <input
            type="number"
            {...register("Stock_Minimo", {
              required: 'Este campo es obligatorio',
              validate: (value) => {
                const parsedValue = parseInt(value);
                if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 9999) {
                  return 'El stock mínimo debe ser menor a la cantidad del insumo y deber ser un número entero entre 0 y 9999 .';
                }
                return true;
              }
            })}
            placeholder="Stock mínimo"
            className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
          />
          {errors.Stock_Minimo && <p className="text-red-500">{errors.Stock_Minimo.message}</p>}
        </div>

        <div className="mb-4 inferior">
          <label htmlFor="CATEGORIA_INSUMO_ID" className="mb-2 block">Categoría del insumo:</label>
          <Select
            options={categoryOptions}
            {...register("CATEGORIA_INSUMO_ID", {
              required: 'Este campo es obligatorio',
            })}
            value={categoryOptions.find(option => option.value === selectedCategory)}
            onChange={(selectedOption) => setSelectedCategory(selectedOption.value)}
            menuPlacement="auto"
            menuShouldScrollIntoView={false}
            maxMenuHeight={132}
            styles={customStyles} 
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: '#201E1E',
              },
            })}
          />
          {errors.CATEGORIA_INSUMO_ID && <p className="text-red-500">{errors.CATEGORIA_INSUMO_ID.message}</p>}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button type="submit" className='bg-orange-500 hover:bg-orange-700 text-white font.bold py-2 px-4 rounded boton-izquierda'>
            Confirmar
          </button>
          <button type="button" className='bg-red-600 hover:bg-red-800 text.white font.bold py-2 px-4 rounded boton-derecha' onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditSuppliesModal;
