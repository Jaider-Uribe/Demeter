import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSupplies } from "../Context/Supplies.context";
import { useCategorySupplies } from '../Context/CategorySupplies'; 
import { useForm } from "react-hook-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};

function CreateSupplies({
  onDefaultSubmit = null,
  buttonProps = {
    buttonClass: "btn btn-primary",
    buttonText: "Registrar"
  }
}) {
  const {
    register,
    handleSubmit,
    setError, 
    formState: { errors, isValid }
  } = useForm();

  const { createSupplies, supplies } = useSupplies();
  const { Category_supplies } = useCategorySupplies(); 

  const [open, setOpen] = useState(false);
  const [supplyToEdit, setSupplyToEdit] = useState(null);

  const handleEdit = (supply) => {
    setSupplyToEdit(supply);
  };

  const onSubmit = handleSubmit(async (values) => {
    const isNameDuplicate = supplies.some(
      (supply) => supply.Name_Supplies === values.Name_Supplies
    );

    if (isNameDuplicate) {
      setError("Name_Supplies", {
        type: "manual",
        message: "El nombre del insumo ya existe."
      });
      return;
    }

    if (!values.Measure || values.Measure === "") {
      setError("Measure", {
        type: "manual",
        message: "Debes seleccionar una medida."
      });
      return;
    }

    if (!values.SuppliesCategory_ID || values.SuppliesCategory_ID === "") {
      setError("SuppliesCategory_ID", {
        type: "manual",
        message: "Debes seleccionar una categoría."
      });
      return;
    }

    createSupplies(values);
    setOpen(false);
  });

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button
        type="button"
        className={buttonProps.buttonClass}
        onClick={() => setOpen(true)}
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
                    typeof onDefaultSubmit === "function"
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
                        {...register("Name_Supplies", {
                          required: false,
                          pattern: {
                            value: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]*[a-záéíóúñ]$/,
                            message:
                              "El nombre del insumo debe tener la primera letra en mayúscula y solo letras."
                          }
                        })}
                        type="text"
                        className="form-control"
                      />
                      {errors.Name_Supplies && (
                        <p className="text-red-500">{errors.Name_Supplies.message}</p>
                      )}
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="Unit" className="form-label">
                        Cantidad
                      </label>
                      <input
                        {...register("Unit", {
                          required: "La cantidad es requerida",
                          validate: (value) => {
                            const parsedValue = parseInt(value);
                            if (
                              isNaN(parsedValue) ||
                              parsedValue < 10000000 ||
                              parsedValue > 9999999999
                            ) {
                              return "El número no es valido, debe tener de 1 a 10 caracteres.";
                            }
                          }
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
                      <select
                        {...register("Measure", {
                          required: "La medida es requerida"
                        })}
                        className="form-select"
                        required
                      >
                        <option value="" disabled>
                          Selecciona una medida
                        </option>
                        <option value="Unidad(es)">Unidad(es)</option>
                        <option value="Kilogramos (kg)">Kilogramos (kg)</option>
                        <option value="Gramos (g)">Gramos (g)</option>
                        <option value="Litros (L)">Litros (L)</option>
                        <option value="Mililitros (ml)">Mililitros (ml)</option>
                      </select>
                      {errors.Measure && (
                        <p className="text-red-500">{errors.Measure.message}</p>
                      )}
                      <div className="invalid-feedback">Ingrese la medida</div>
                    </div>
                  </div>

                  <div className="control">
                    <div className="form-group col-md-6">
                      <label htmlFor="SuppliesCategory_ID" className="form-label">
                        Categoría
                      </label>
                      <select
                        {...register("SuppliesCategory_ID", {
                          required: "La categoría es requerida"
                        })}
                        className="form-select"
                        required
                      >
                        <option value="" disabled>
                          Selecciona una categoría
                        </option>
                        {Category_supplies.map((category) => (
                          <option value={category.ID_SuppliesCategory}>
                            {category.Name_SuppliesCategory}
                          </option>
                        ))}
                      </select>
                      {errors.SuppliesCategory_ID && (
                        <p className="text-red-500">{errors.SuppliesCategory_ID.message}</p>
                      )}
                      <div className="invalid-feedback">Ingrese la categoría</div>
                    </div>
                  </div>

                  <div className="buttonconfirm">
                    <div className="mb-3">
                      <button
                        className="btn btn-primary mr-5"
                        type="submit"
                        disabled={!isValid}
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
