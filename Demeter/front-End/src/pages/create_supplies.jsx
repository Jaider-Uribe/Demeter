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
    { label: 'Unidad(es)', value: 'Unidad(es)' },
    { label: 'Kilogramos (kg)', value: 'Kilogramos (kg)' },
    { label: 'Gramos (g)', value: 'Gramos (g)' },
    { label: 'Litros (L)', value: 'Litros (L)' },
    { label: 'Mililitros (ml)', value: 'Mililitros (ml)' },

  ];

  const categoryOptions = Category_supplies.map(option => ({ label: option.Name, value: option.Id_Category }));

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
      color: state.isSelected ? 'white' : state.isFocused ? '#555' : '#201E1E', 
      '&:hover': {
        backgroundColor: '#e36209',
        color: 'white',
      },
      cursor: state.isDisabled ? 'not-allowed' : 'default',
    }),
  };

  const onSubmit = handleSubmit(async (values) => {
    const isNameDuplicate = supplies.some(supply => supply.Name === values.Name);

    if (isNameDuplicate) {
      setError('Name', {
        type: 'manual',
        message: 'El nombre del insumo ya existe.'
      });
      return;
    }

    if (!selectedMeasure || selectedMeasure.value === '') {
      setError('Measure', {
        type: 'manual',
        message: 'Debes seleccionar una medida.'
      });
      return;
    }

    if (!selectedCategory || selectedCategory.value === '') {
      setError('Category_Id', {
        type: 'manual',
        message: 'Debes seleccionar una categoría.'
      });
      return;
    }

    values.Measure = selectedMeasure.value;
    values.Category_Id = selectedCategory.value;

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
          <label htmlFor="Name" className="mb-2 block">Nombre del insumo:</label>
          <input
            type="text"
            {...register("Name", {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^[A-ZÁÉÍÓÚ][a-záéíóú\s]*[a-záéíóú]$/,
                message: 'El nombre del insumo debe tener la primera letra en mayúscula, el resto en minúscula y solo se permiten letras.'
              }
            })}
            placeholder="Nombre del insumo"
            className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
          />
          {errors.Name && <p className="text-red-500">{errors.Name.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="Unit" className="mb-2 block">Cantidad del insumo:</label>
          <input
            type="number"
            {...register("Unit", {
              required: 'Este campo es obligatorio',
              validate: (value) => {
                const parsedValue = parseInt(value);
                if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 9999) {
                  return 'La cantidad del insumo debe ser un número entero entre 0 y 9.999.';
                }
                return true;
              }
            })}
            placeholder="Cantidad del insumo"
            className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
          />
          {errors.Unit && <p className="text-red-500">{errors.Unit.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="Measure" className="mb-2 block">Medida del insumo:</label>
          <Select
            options={measureOptions}
            {...register("Measure")}
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
          {errors.Measure && <p className="text-red-500">{errors.Measure.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="Stock" className="mb-2 block">Stock mínimo:</label>
          <input
            type="number"
            {...register("Stock", {
              required: 'Este campo es obligatorio',
              validate: (value, { Cantidad_Insumo }) => {
                const parsedValue = parseInt(value);
                const parsedCantidadInsumo = parseInt(Cantidad_Insumo);

                if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 999) {
                  return 'El stock mínimo debe ser un número entero entre 0 y 999.';
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
          {errors.Stock && <p className="text-red-500">{errors.Stock.message}</p>}
        </div>
        <div className="mb-4 inferior">
          <label htmlFor="Category_Id" className="mb-2 block">Categoría del insumo:</label>
          <Select
            options={[
              { label: 'Seleccionar categoría', value: '', isDisabled: true }, 
              ...categoryOptions
            ]}
            {...register("Category_Id")}
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
          {errors.Category_Id && <p className="text-red-500">{errors.Category_Id.message}</p>}
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
