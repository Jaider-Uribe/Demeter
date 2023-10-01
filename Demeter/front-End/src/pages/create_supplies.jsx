import React, { useState } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { useSupplies } from '../context/supplies.context';
import { useCategorySupplies } from '../context/category_supplies.context';

function CreateSuppliesModal({ onClose, onCreated }) {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const { createSupplies, supplies } = useSupplies();
  const [selectedMeasure, setSelectedMeasure] = useState({ label: 'Seleccionar medida', value: '', isDisabled: true });
  const { Category_supplies } = useCategorySupplies();
  const [selectedCategory, setSelectedCategory] = useState({ label: 'Seleccionar categoría', value: '', isDisabled: true });

  const measureOptions = [
    { label: 'Seleccionar medida', value: '', isDisabled: true },
    { label: 'Litros (L)', value: 'Litros (L)' },
    { label: 'Mililitros (ml)', value: 'Mililitros (ml)' },
    { label: 'Kilo (kl)', value: 'Kilo (kl)' },
    { label: 'UNO', value: 'UNO' },
    { label: 'Dos', value: 'Dos' },
    { label: 'Tres', value: 'Tres' },
  ];

  const categoryOptions = Category_supplies.map(option => ({ label: option.Nombre_Categoria, value: option.ID_CATEGORIA_INSUMO }));

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
      color: state.isSelected ? 'white' : state.isFocused ? '#555' : '#201E1E', // Cambiamos el color a gris (#555) cuando está seleccionado o enfocado
      '&:hover': {
        backgroundColor: '#e36209',
        color: 'white',
      },
      cursor: state.isDisabled ? 'not-allowed' : 'default',
    }),
  };

  const onSubmit = handleSubmit(async (values) => {
    const isNameDuplicate = supplies.some(supply => supply.Nombre_Insumo === values.Nombre_Insumo);

    if (isNameDuplicate) {
      setError('Nombre_Insumo', {
        type: 'manual',
        message: 'El nombre del insumo ya existe.'
      });
      return;
    }

    if (!selectedMeasure || selectedMeasure.value === '') {
      setError('Medida_Insumo', {
        type: 'manual',
        message: 'Debes seleccionar una medida.'
      });
      return;
    }

    if (!selectedCategory || selectedCategory.value === '') {
      setError('CATEGORIA_INSUMO_ID', {
        type: 'manual',
        message: 'Debes seleccionar una categoría.'
      });
      return;
    }

    values.Medida_Insumo = selectedMeasure.value;
    values.CATEGORIA_INSUMO_ID = selectedCategory.value;

    createSupplies(values);
    onCreated();
    onClose();
  });

  const onCancel = () => {
    onClose();
  };

  return (
    <div className='max-w-md mx-auto p-4 down'>
      <h1 className="text-3xl font-semibold text-center mb-4">Crear insumo</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="Nombre_Insumo" className="mb-2 block">Nombre del insumo:</label>
          <input
            type="text"
            {...register("Nombre_Insumo", {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^[A-ZÁÉÍÓÚ][a-záéíóú\s]*[a-záéíóú]$/,
                message: 'El nombre del insumo debe tener la primera letra en mayúscula y solo letras.'
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
                  return 'La cantidad del insumo debe ser un número entero entre 0 y 9999.';
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
            {...register("Medida_Insumo")}
            value={selectedMeasure}
            onChange={(selectedOption) => setSelectedMeasure(selectedOption)}
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
              validate: (value, { Cantidad_Insumo }) => {
                const parsedValue = parseInt(value);
                const parsedCantidadInsumo = parseInt(Cantidad_Insumo);

                if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 9999) {
                  return 'El stock mínimo debe ser un número entero entre 0 y 9999.';
                }

                if (parsedValue > parsedCantidadInsumo) {
                  return `El stock mínimo no puede ser mayor que la cantidad de insumo (${parsedCantidadInsumo}).`;
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
            options={[
              { label: 'Seleccionar categoría', value: '', isDisabled: true }, // Cambiamos el valor inicial a una cadena vacía y lo deshabilitamos
              ...categoryOptions
            ]}
            {...register("CATEGORIA_INSUMO_ID")}
            value={selectedCategory}
            onChange={(selectedOption) => setSelectedCategory(selectedOption)}
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

export default CreateSuppliesModal;
