import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineEye, AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { useSupplies } from "../Context/Supplies.context.jsx";
import { useCategorySupplies } from '../Context/SuppliesCategory.context.jsx';
import "../css/style.css";
import "../css/landing.css";
import "../fonts/cryptofont.css";
import "../fonts/feather.css";
import "../fonts/fontawesome.css";
import "../fonts/material.css";
import CreateSupplies from "../Components/CreateSupplies.jsx";
import DeleteSupplies from "../Components/DeleteSupplies.jsx";

function SuppliesPage() {
  const { supplies, getSupplies, updateSupplies, deleteSupplies } = useSupplies();
  const { Category_supplies } = useCategorySupplies();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getSupplies();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSupplies = supplies.filter((suppliesItem) => {
    const { Name_Supplies } = suppliesItem;
    const searchString = `${Name_Supplies}`.toLowerCase();
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
    <section className="pc-container">
      <div className="pcoded-content">
        <div className="row w-100">
          <div className="col-md-12">
            <div className="w-100 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Visualización de insumos</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <CreateSupplies />
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="search"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Buscador"
                          value={searchTerm}
                          onChange={handleSearchChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card-body table-border-style">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Medida</th>
                            <th>Existencias</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredSupplies.map((suppliesItem) => (
                            <tr key={suppliesItem.ID_Supplies}>
                              <td>{suppliesItem.Name_Supplies}</td>
                              <td>{suppliesItem.Unit}</td>
                              <td>{suppliesItem.Measure}</td>
                              <td>{suppliesItem.Stock}</td>
                              <td>{suppliesItem.State}</td>
                              <td>
                                {suppliesItem.SuppliesCategory_ID
                                  ? Category_supplies.find(
                                      (categoryItem) =>
                                        categoryItem.ID_SuppliesCategory ===
                                        suppliesItem.SuppliesCategory_ID
                                    )?.Name_SuppliesCategory || ''
                                  : ''}
                              </td>
                              <td>
                                <CreateSupplies
                                  key={suppliesItem.ID_Supplies}
                                  onDefaultSubmit={(event, setOpen) =>
                                    onUpdate(
                                      event,
                                      suppliesItem.ID_Supplies,
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
                                <DeleteSupplies
                                  currentSupplies={suppliesItem}
                                />
                                <button
                                  type="button"
                                  className="btn  btn-icon btn-success"
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
