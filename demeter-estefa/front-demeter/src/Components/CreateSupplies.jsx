import React, { useState } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { useSupplies } from '../Context/supplies.context';
import { useCategorySupplies } from '../Context/suppliescategory.context';
import '../css/style.css';

function CreateSupplies({ onClose, onCreated }) {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const { createSupplies, supplies } = useSupplies();
    const [selectedMeasure, setSelectedMeasure] = useState({ label: 'Seleccionar medida', value: '', isDisabled: true });
    const { Category_supplies } = useCategorySupplies();
    const [selectedCategory, setSelectedCategory] = useState({ label: 'Seleccionar categoría', value: '', isDisabled: true });
    const [isMeasureSelectFocused, setMeasureSelectFocused] = useState(false); // Agregamos el estado para el enfoque.

    const measureOptions = [
        { label: 'Seleccionar medida', value: '', isDisabled: true },
        { label: 'Unidad(es)', value: 'Unidad(es)' },
        { label: 'Kilogramos (kg)', value: 'Kilogramos (kg)' },
        { label: 'Gramos (g)', value: 'Gramos (g)' },
        { label: 'Litros (L)', value: 'Litros (L)' },
        { label: 'Mililitros (ml)', value: 'Mililitros (ml)' },
    ];

    const categoryOptions = Category_supplies.map(option => ({ label: option.Name_SuppliesCategory, value: option.ID_SuppliesCategory }));

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: state.isFocused ? '1px solid #ff6600' : '1px solid #201E1E',
            '&:hover': {
                border: state.isFocused ? '1px solid #ff6600' : '1px solid #201E1E',
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

    const handleMeasureSelectFocus = () => {
        setMeasureSelectFocused(true);
    };

    const handleMeasureSelectBlur = () => {
        setMeasureSelectFocused(false);
    };


    const onSubmit = handleSubmit(async (values) => {
        const isNameDuplicate = supplies.some(supply => supply.Name_Supplies === values.Name_Supplies);

        if (isNameDuplicate) {
            setError('Name_Supplies', {
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
            setError('SuppliesCategory_ID', {
                type: 'manual',
                message: 'Debes seleccionar una categoría.'
            });
            return;
        }

        values.Measure = selectedMeasure.value;
        values.SuppliesCategory_ID = selectedCategory.value;

        createSupplies(values);
        onCreated();
        onClose();
    });

    const onCancel = () => {
        onClose();
    };

    return (
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h1 className="text-3xl font-semibold text-center mb-4 down">Crear insumo</h1>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="control">
                        <div class="form-group col-md-6">
                            <label htmlFor="Name_Supplies" className="form-label">Nombre del insumo:</label>
                            <input
                                type="text"
                                {...register("Name_Supplies", {
                                    name: 'Name_Supplies',
                                    required: 'Este campo es obligatorio',
                                    pattern: {
                                        value: /^[A-ZÁÉÍÓÚ][a-záéíóú\s]*[a-záéíóú]$/,
                                        message: 'El nombre del insumo debe tener la primera letra en mayúscula, el resto en minúscula y solo se permiten letras.'
                                    }
                                })}
                                id="Name_Supplies"
                                placeholder="Nombre del insumo"
                                className="form-control"
                            />
                            {errors.Name_Supplies && <p className="text-red-500">{errors.Name_Supplies.message}</p>}
                        </div>
                        <div class="form-group col-md-6">
                            <label htmlFor="Unit" className="form-label">Cantidad del insumo:</label>
                            <input
                                type="number"
                                {...register("Unit", {
                                    name: 'Unit',
                                    required: 'Este campo es obligatorio',
                                    validate: (value) => {
                                        const parsedValue = parseInt(value);
                                        if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 9999) {
                                            return 'La cantidad del insumo debe ser un número entero entre 0 y 9.999.';
                                        }
                                        return true;
                                    }
                                })}
                                id="Unit"
                                placeholder="Cantidad del insumo"
                                className="form-control"
                            />
                            {errors.Unit && <p className="text-red-500">{errors.Unit.message}</p>}
                        </div>
                    </div>
                    <div className="control">
                        <div class="form-group col-md-6">
                            <label htmlFor="Measure" className="form-label">Medida del insumo:</label>
                            <div className="select-container">
                                <Select
                                    options={measureOptions}
                                    {...register("Measure")}
                                    value={selectedMeasure}
                                    onChange={(selectedOption) => setSelectedMeasure(selectedOption)}
                                    menuPlacement="auto"
                                    menuShouldScrollIntoView={false}
                                    maxMenuHeight={132}
                                    styles={{
                                        ...customStyles,
                                        control: (provided, state) => ({
                                            ...provided,
                                            width: '100%',
                                            borderColor: isMeasureSelectFocused ? '#ff6600' : provided.borderColor,
                                        }),
                                        menu: (provided) => ({
                                            ...provided,
                                            width: '100%',
                                            top: '29px',
                                        }),
                                    }}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary: '#ff6600',
                                        },
                                    })}
                                    onFocus={handleMeasureSelectFocus}
                                    onBlur={handleMeasureSelectBlur}
                                />
                            </div>
                            {errors.Measure && <p className="text-red-500">{errors.Measure.message}</p>}
                        </div>
                        <div class="form-group col-md-6">
                            <label htmlFor="Stock" className="form-label">Stock mínimo:</label>
                            <input
                                type="number"
                                {...register("Stock", {
                                    name: 'Stock',
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
                                id="Stock"
                                placeholder="Stock mínimo"
                                className="form-control"
                            />
                            {errors.Stock && <p className="text-red-500">{errors.Stock.message}</p>}
                        </div>
                    </div>
                    <div className="city">
                        <div class="form-group col-md-6">
                            <div className="mb-3">
                                <label htmlFor="SuppliesCategory_ID" className="form-label">Categoría del insumo:</label>
                                <div className="select-container">
                                    <Select
                                        options={[
                                            { label: 'Seleccionar categoría', value: '', isDisabled: true },
                                            ...categoryOptions
                                        ]}
                                        {...register("SuppliesCategory_ID")}
                                        value={selectedCategory}
                                        onChange={(selectedOption) => setSelectedCategory(selectedOption)}
                                        menuPlacement="auto"
                                        menuShouldScrollIntoView={false}
                                        maxMenuHeight={132}
                                        styles={{
                                            ...customStyles,
                                            control: (provided, state) => ({
                                                ...provided,
                                                width: '100%',
                                            }),
                                            menu: (provided) => ({
                                                ...provided,
                                                width: '100%',
                                                top: '29px',
                                            }),
                                        }}
                                        theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                primary: '#ff6600',
                                            },
                                        })}
                                    />
                                </div>
                                {errors.SuppliesCategory_ID && <p className="text-red-500">{errors.SuppliesCategory_ID.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 reduce-space center-buttons">
                        <button type="submit" className='bg-orange-500 hover-bg-orange-700 text-white font-bold py-2 px-4 rounded'>
                            Confirmar
                        </button>
                        <button type="button" className='bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded' onClick={onCancel}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateSupplies;