import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSupplier } from '../Context/Supplier.context';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';

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

export default function CreateSupplier() {
  const {register, handleSubmit, formState: {errors, setError }} = useForm();
  const {createSupplier, supplier} = useSupplier();
  const {selectedType, setSelectedType} = useState();
  const [open, setOpen] = React.useState(false);

  const onSubmit = handleSubmit(async (values) => {
    const isDocumentoDuplicate = supplier.some(supplier => supplier.Document === values.Document);
    const isEmailDuplicate = supplier.some(supplier => supplier.Email === values.Email);

    if (isDocumentoDuplicate) {
        setError('Document', {
            type: 'manual',
            message: 'El documento del proveedor ya existe.'
        });
        return;
    }

    if (isEmailDuplicate) {
        setError('Email', {
            type: 'manual',
            message: 'El correo del usuario ya existe.'
        });
        return;
    }

    createSupplier(values);

});



  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
        <button type="button" class="btn btn-primary" onClick={handleOpen}><i class="mr-2" data-feather="thumbs-up"></i>Registrar</button> 
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <div>
          <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h5>Registro de proveedores</h5>
                    </div>
                    <div class="card-body">
                        {/* <script>
                // Example starter JavaScript for disabling form submissions if there are invalid fields
                (function() {
                    'use strict';
                    window.addEventListener('load', function() {
                        // Fetch all the forms we want to apply custom Bootstrap validation styles to
                        var forms = document.getElementsByClassName('needs-validation');
                        // Loop over them and prevent submission
                        var validation = Array.prototype.filter.call(forms, function(form) {
                            form.addEventListener('submit', function(event) {
                                if (form.checkValidity() === false) {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }
                                form.classList.add('was-validated');
                            }, false);
                        });
                    }, false);
                })();
            </script> */}
                        <form class="was-validated" onSubmit={onSubmit}>
                        <div className="control">
                        <div class="form-group col-md-6">
                        <div className="mb-3">
                            <label htmlFor="Type_Document" className="form-label mt-3">Tipo de documento</label>
                            <select  
                                   {...register('Type_Document',{
                                    required: 'El tipo de documento es requerido',
                                })}
                                className="form-select"                                        
                                required
                            >
                                <option value="" disabled>Selecciona un tipo de documento</option>
                                <option value="cedulaCiudadania">Cédula de ciudadanía</option>
                                <option value="cedulaExtranjeria">Cédula de extranjería</option>
                                <option value="pasaporte">Pasaporte</option>
                            </select>
                            {errors.Type_Document && (<p className='text-red-500'>{errors.Type_Document.message}</p>)}
                            <div class="invalid-feedback">Ingrese el tipo de documento</div>
                        </div>
                    </div>

                    <div class="form-group col-md-6">
                    <label htmlFor="Document" className="form-label">Documento</label>
                    <input
                        {...register('Document',{
                            required: 'El documento es requerido',
                            validate: (value) => {
                                const parsedValue = parseInt(value);
                                if (isNaN(parsedValue) || parsedValue < 10000000 || parsedValue > 9999999999) {
                                    return 'El número no es valido, debe tener de 8 a 10 caracteres.';
                            }}

                        } 
                       
                        )}
                        type="text"
                        className="form-control"               
                    />
                    {errors.Document && (<p className='text-red-500'>{errors.Document.message}</p>)}
                </div>

                        </div>
                       
             

                <div className='control'>
                    <div class="form-group col-md-6">
                        <label htmlFor="Name_Supplier" className="form-label">Nombre</label>
                        <input
                            {...register('Name_Supplier',{
                                required: 'El nombre es obligatorio',
                                pattern: {
                                    value: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]*[a-záéíóúñ]$/,
                                    message: 'El nombre del proveedor debe tener la primera letra en mayúscula y solo letras.'
                                }
                            })}
                            type="text"
                            className="form-control"           
                        />
                        {errors.Name_Supplier && <p className="text-red-500">{errors.Name_Supplier.message}</p>}
                    </div>

                    <div class="form-group col-md-6">
                    <label htmlFor="Name_Business" className="form-label">Empresa</label>
                    <input
                    {...register('Name_Business',{
                        pattern: {
                            value: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]*[a-záéíóúñ]$/,
                            message: 'El nombre de la empresa debe tener la primera letra en mayúscula y solo letras.'
                        }
                    })}
                        type="text"
                        className="form-control"
                    />
                     {errors.Name_Business && <p className="text-red-500">{errors.Name_Business.message}</p>}
                </div>
                </div>
                

                

                <div className="control">
                <div class="form-group col-md-6">
                    <label htmlFor="Phone" className="form-label">Teléfono</label>
                    <input
                      {...register("Phone", {
                        required: 'El teléfono es requerido',
                        pattern: {
                            // value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                            // message: 'El correo electrónico no es válido'
                        }
                    })}

                        type="tel"
                        className="form-control"
                        required
                    />
                </div>

                <div class="form-group col-md-6">
                    <label htmlFor="Email" className="form-label">Email</label>
                    <input
                     {...register("Email", {
                        required: 'El correo es requerido',
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                            message: 'El correo electrónico no es válido'
                        }
                    })}
                        type="email"
                        className="form-control"      
                    />
                    {errors.Email && <p className="text-red-500">{errors.Email.message}</p>}
                </div>
                </div>

                <div className="city">
                <div class="form-group col-md-6">
                    <label htmlFor="City" className="form-label">Ciudad</label>
                    <input
                     {...register('City',{
                        required: 'La ciudad es requerida',
                        pattern: {
                            value: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]*[a-záéíóúñ]$/,
                            message: 'La ciudad debe tener la primera letra en mayúscula y solo letras.'
                        }
                    })}
                        type="text"
                        className="form-control"
                    />
                </div>
                </div>                              
                         <div className="buttonconfirm">
                         <div class="mb-3">
                                <button class="btn btn-primary mr-5" type="submit">Confirmar</button>
                                <button class="btn btn-primary" onClick={handleClose} type="submit" >Cancelar</button>
                            </div>
                         </div>
                         
                        </form>
                    </div>
                </div>
            </div>
          </div>
   
        </Box>
      </Modal>
    </React.Fragment>
  );
}