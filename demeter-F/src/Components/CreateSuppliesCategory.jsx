import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useCategorySupplies } from '../Context/CategorySupplies.context';
import { useForm } from 'react-hook-form';

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

function CreateCategory_supplies({
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
} = useForm();

    const { Category_supplies, createCategory_supplies } = useCategorySupplies();

    const [open, setOpen] = useState(false);

    const onSubmit = handleSubmit(async (values) => {
        const isNameDuplicate = Category_supplies.some(
            (SuppliesCategory) => SuppliesCategory.Name_SuppliesCategory === values.Name_SuppliesCategory
        );

        if (isNameDuplicate) {
            setError('Name_SuppliesCategory', {
                type: 'manual',
                message: 'El nombre de la categoria ya existe.',
            });
            return;
        }

        createCategory_supplies(values);
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
                                <h5>Registro de categoria de insumos</h5>
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
                                    <div className="city">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="Name_SuppliesCategory" className="form-label">
                                                Nombre
                                            </label>
                                            <input
                                                {...register('Name_SuppliesCategory', {
                                                    required: 'Este campo es obligatorio',
                                                    pattern: {
                                                        value: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]*[a-záéíóúñ]$/,
                                                        message:
                                                            'El nombre de la categoria de insumo debe tener la primera letra en mayúscula, el resto en minúscula y solo se permiten letras.',
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

export default CreateCategory_supplies;
