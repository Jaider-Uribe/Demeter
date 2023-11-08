import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSupplies } from '../Context/Supplies.context';
import { useCategorySupplies } from '../Context/CategorySupplies.context';
import { useForm } from 'react-hook-form';
import Select from 'react-select';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function CreateSupplies({
  onDefaultSubmit = null,
  buttonProps = {
    buttonClass: 'btn btn-primary',
    buttonText: 'Registrar',
  },
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
    reset,
  } = useForm();

  const { createSupplies, supplies } = useSupplies();
  const { Category_supplies } = useCategorySupplies();

  const [open, setOpen] = useState(false);
  const [selectedMeasure, setSelectedMeasure] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleMeasureChange = (selectedOption) => {
    setSelectedMeasure(selectedOption);
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  const onSubmit = handleSubmit(async (values) => {
    if (!selectedMeasure) {
      setError('Measure', {
        type: 'manual',
        message: 'Debes seleccionar una medida.',
      });
      return;
    }

    if (!selectedCategory) {
      setError('SuppliesCategory_ID', {
        type: 'manual',
        message: 'Debes seleccionar una categoría.',
      });
      return;
    }
    const dataToSend = {
      ...values,
      Measure: selectedMeasure.value,
      SuppliesCategory_ID: selectedCategory.value,
    };

    const isNameDuplicate = supplies.some(
      (supply) => supply.Name_Supplies === dataToSend.Name_Supplies
    );

    if (isNameDuplicate) {
      setError('Name_Supplies', {
        type: 'manual',
        message: 'El nombre del insumo ya existe.',
      });
      return;
    }

    if (!dataToSend.Unit || isNaN(parseInt(dataToSend.Unit))) {
      setError('Unit', {
        type: 'manual',
        message: 'La cantidad es requerida y debe ser un número válido.',
      });
      return;
    }

    if (
      parseInt(dataToSend.Unit) < 0 ||
      parseInt(dataToSend.Unit) > 999999
    ) {
      setError('Unit', {
        type: 'manual',
        message: 'La cantidad debe tener de 1 a 10 caracteres.',
      });
      return;
    }

    if (!dataToSend.Stock || isNaN(parseInt(dataToSend.Stock))) {
      setError('Stock', {
        type: 'manual',
        message: 'El stock mínimo es requerido y debe ser un número válido.',
      });
      return;
    }

    if (parseInt(dataToSend.Stock) < 0 || parseInt(dataToSend.Stock) > 999) {
      setError('Stock', {
        type: 'manual',
        message: 'El stock mínimo debe ser un número entero entre 0 y 999.',
      });
      return;
    }

    if (parseInt(dataToSend.Stock) > parseInt(dataToSend.Unit)) {
      setError('Stock', {
        type: 'manual',
        message: `El stock mínimo no puede ser mayor que la cantidad de insumo (${dataToSend.Unit}).`,
      });
      return;
    }

    createSupplies(dataToSend);
    setOpen(false);
    reset();
    setSelectedMeasure(null);
    setSelectedCategory(null);
  });

  const onCancel = () => {
    setOpen(false);
    setSelectedMeasure(null);
    setSelectedCategory(null);
  };

  return (
    <React.Fragment>
      <button
        type="button"
        className={buttonProps.buttonClass}
        onClick={() => {
          reset();
          setOpen(true);
        }}
      >
        {buttonProps.buttonText}
      </button>

      <Modal
        open={open}
        onClose={onCancel}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5>Registro de insumos</h5>
              </div>
              <div className="card-body">
                <form
                  className="was-validated"
                  onSubmit={(event) =>
                    typeof onDefaultSubmit === 'function'
                      ? onDefaultSubmit(event, setOpen)
                      : onSubmit(event)
                  }
                >
                  <div className="control">
                    <div className="form-group col-md-6">
                      <label htmlFor="Name_Supplies" className="form-label">
                        Nombre
                      </label>
                      <input
                        {...register('Name_Supplies', {
                          required: 'Este campo es obligatorio',
                          pattern: {
                            value: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]*[a-záéíóúñ]$/,
                            message:
                              'El nombre del insumo debe tener la primera letra en mayúscula, el resto en minúscula y solo se permiten letras.',
                          },
                        })}
                        type="text"
                        className="form-control"
                      />
                      {errors.Name_Supplies && (
                        <p className="text-red-500">
                          {errors.Name_Supplies.message}
                        </p>
                      )}
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="Unit" className="form-label">
                        Cantidad
                      </label>
                      <input
                        {...register('Unit', {
                          required: 'Este campo es obligatorio',
                          validate: (value) => {
                            const parsedValue = parseInt(value);
                            if (isNaN(parsedValue)) {
                              return 'La cantidad debe ser un número válido.';
                            }
                          },
                        })}
                        type="text"
                        className="form-control"
                      />
                      {errors.Unit && (
                        <p className="text-red-500">{errors.Unit.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="control">
                    <div className="form-group col-md-6">
                      <label htmlFor="Measure" className="form-label">
                        Medida
                      </label>
                      <Select
                        options={[
                          { value: 'Unidad(es)', label: 'Unidad(es)' },
                          { value: 'Kilogramos (kg)', label: 'Kilogramos (kg)' },
                          { value: 'Gramos (g)', label: 'Gramos (g)' },
                          { value: 'Litros (L)', label: 'Litros (L)' },
                          { value: 'Mililitros (ml)', label: 'Mililitros (ml)' },
                        ]}
                        value={selectedMeasure}
                        onChange={handleMeasureChange}
                      />
                      {errors.Measure && (
                        <p className="text-red-500">{errors.Measure.message}</p>
                      )}
                      <div className="invalid-feedback">Ingrese la medida</div>
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="Stock" className="form-label">
                        Stock mínimo
                      </label>
                      <input
                        {...register('Stock', {
                          required: 'Este campo es obligatorio',
                          validate: (value, { Unit }) => {
                            const parsedValue = parseInt(value);
                            const parsedUnit = parseInt(Unit);

                            if (isNaN(parsedValue)) {
                              return 'El stock mínimo debe ser un número válido.';
                            }

                            if (parsedValue < 0 || parsedValue > 999) {
                              return 'El stock mínimo debe ser un número entero entre 0 y 999.';
                            }

                            if (parsedValue > parsedUnit) {
                              return `El stock mínimo no puede ser mayor que la cantidad de insumo (${parsedUnit}).`;
                            }
                          },
                        })}
                        type="text"
                        className="form-control"
                      />
                      {errors.Stock && (
                        <p className="text-red-500">{errors.Stock.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="city">
                    <div className="form-group col-md-6">
                      <label htmlFor="SuppliesCategory_ID" className="form-label">
                        Categoría
                      </label>
                      <Select
                        options={Category_supplies.map((category) => ({
                          value: category.ID_SuppliesCategory,
                          label: category.Name_SuppliesCategory,
                        }))}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                      />
                      {errors.SuppliesCategory_ID && (
                        <p className="text-red-500">
                          {errors.SuppliesCategory_ID.message}
                        </p>
                      )}
                      <div className="invalid-feedback">Ingrese la categoría</div>
                    </div>
                  </div>

                  <div className="buttonconfirm">
                    <div className="mb-3">
                      <button
                        className="btn btn-primary mr-5"
                        type="submit"
                        disabled={!isValid || !selectedMeasure || !selectedCategory}
                      >
                        Confirmar
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={onCancel}
                        type="submit"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default CreateSupplies;
