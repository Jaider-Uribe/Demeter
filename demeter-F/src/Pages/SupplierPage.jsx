import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineEye, AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { useSupplier } from "../Context/Supplier.context";
import "../css/style.css";
import "../css/landing.css";
import "../fonts/cryptofont.css";
import "../fonts/feather.css";
import "../fonts/fontawesome.css";
import "../fonts//material.css";
import CreateSupplier from "../Components/CreateSupplier.jsx";
import DeleteSupplier from "../Components/DeleteSupplier.jsx";

function SupplierPage() {
  const { supplier, getSupplier, deleteSupplier, updateSupplier } =
    useSupplier();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getSupplier().then(console.log(supplier));
  }, []);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSuppliers = supplier.filter((supplierItem) => {
    const {
      Type_Document,
      Document,
      Name_Supplier,
      Name_Business,
      Phone,
      City,
      Email,
      State
    } = supplierItem;
    const searchString =
      `${Type_Document} ${Document} ${Name_Supplier} ${Name_Business} ${Phone} ${City} ${Email} ${State}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });


  const onUpdate = (event, id, modalView) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    updateSupplier(id, data);
    modalView(false);
  };

  return (
    <section class="pc-container">
      <div class="pcoded-content">
        <div class="row w-100">
          <div class="col-md-12">
            <div class=" w-100 col-sm-12">
              <div class="card">
                <div class="card-header">
                  <h5>Visualización del proveedor</h5>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6">
                      <CreateSupplier />
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <input
                          type="search"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Buscador"
                          value={searchTerm}
                          onChange={handleSearchChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="card-body table-border-style">
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th>Tipo de documento</th>
                            <th>Documento</th>
                            <th>Nombre</th>
                            <th>Empresa</th>
                            <th>Telefono</th>
                            <th>Ciudad</th>
                            <th>Email</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredSuppliers.map((supplierItem) => (
                            <tr key={supplierItem.ID_Supplier}>
                              <td>{supplierItem.Type_Document}</td>
                              <td>{supplierItem.Document}</td>
                              <td>{supplierItem.Name_Supplier}</td>
                              <td>{supplierItem.Name_Business}</td>
                              <td>{supplierItem.Phone}</td>
                              <td>{supplierItem.City}</td>
                              <td>{supplierItem.Email}</td>
                              <td>{supplierItem.State}</td>

                              <td>
                                <CreateSupplier
                                  key={supplierItem.ID_Supplier}
                                  onDefaultSubmit={(event, setOpen) =>
                                    onUpdate(
                                      event,
                                      supplierItem.ID_Supplier,
                                      setOpen
                                    )
                                  }
                                  buttonProps={{
                                    buttonText: (
                                      <i data-feather="thumbs-up">
                                        <BiEdit />
                                      </i>
                                    ),
                                    buttonClass: "btn btn-icon btn-primary"
                                  }}
                                />
                                <DeleteSupplier
                                  currentSupplier={supplierItem}
                                />
                                <button
                                  type="button"
                                  class="btn  btn-icon btn-success"
                                >
                                  <i data-feather="check-circle">
                                    <MdToggleOn />
                                  </i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SupplierPage;
