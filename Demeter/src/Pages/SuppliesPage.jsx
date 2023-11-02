import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineEye, AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { useSupplies } from "../Context/Supplies.context.jsx"
import { useCategorySupplies } from '../Context/CategorySupplies.context.jsx'
import "../css/style.css";
import "../css/landing.css";
import "../fonts/cryptofont.css";
import "../fonts/feather.css";
import "../fonts/fontawesome.css";
import "../fonts//material.css";
import CreateSupplies from "../Components/CreateSupplies.jsx";
import DeleteSupplies from "../Components/DeleteSupplies.jsx";

function SuppliesPage() {
  const { supplies, getSupplies, updateSupplies } = useSupplies();
  const { Category_supplies } = useCategorySupplies();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getSupplies();
  }, []);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSupplies = supplies.filter((supply) => {
    const {
      Name_Supplies,
    } = supply;
    const searchString =
      `${Name_Supplies}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });


  const onUpdate = (event, id, modalView) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    updateSupplies(id, data);
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
                  <h5>Visualización de insumos</h5>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6">
                      <CreateSupplies />
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
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Medida</th>
                            <th>Existencias</th>
                            <th>Categoria</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredSupplies.map((supply) => (
                            <tr key={supply.ID_Supplies}>
                              <td>{supply.Name_Supplies}</td>
                              <td>{supply.Unit}</td>
                              <td>{supply.Measure}</td>
                              <td>{supply.Stock}</td>
                              <td>
                                {supply.SuppliesCategory_ID
                                  ? Category_supplies.find(
                                    (category) =>
                                    category.ID_SuppliesCategory ===
                                      supply.SuppliesCategory_ID
                                  )?.Name_SuppliesCategory || ''
                                  : ''}
                              </td>
                              <td>{supply.State ? 'Habilitado' : 'Deshabilitado'}</td>
                              <td>
                                <CreateSupplies
                                  key={supply.ID_Supplies}
                                  onDefaultSubmit={(event, setOpen) =>
                                    onUpdate(
                                      event,
                                      supply.ID_Supplies,
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
                                {/* <DeleteSupplies
                                  currentSupplies={supply}
                                /> */}
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

export default SuppliesPage;
