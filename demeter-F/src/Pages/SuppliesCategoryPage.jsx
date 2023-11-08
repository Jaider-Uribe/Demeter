import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { useCategorySupplies } from '../Context/CategorySupplies.context.jsx'
import "../css/style.css";
import "../css/landing.css";
import CreateSuppliesCategory from "../Components/CreateSuppliesCategory.jsx";
// import DeleteSuppliesCategory from "../Components/DeleteSupplies.jsx";

function SuppliesCategoryPage() {
  const { Category_supplies, getCategory_supplies, updateCategory_supplies, toggleCategorySupplyStatus } = useCategorySupplies();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getCategory_supplies();
  }, []);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSuppliesCategory = Category_supplies.filter((suppliesCategory) => {
    const {
      Name_SuppliesCategory,
    } = suppliesCategory;
    const searchString =
      `${Name_SuppliesCategory}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });


  const onUpdate = (event, id, modalView) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    updateCategory_supplies(id, data);
    modalView(false);
  };

  const barraClass = Category_supplies.State ? "" : "desactivado";

  return (
    <section class="pc-container">
      <div class="pcoded-content">
        <div class="row w-100">
          <div class="col-md-12">
            <div class=" w-100 col-sm-12">
              <div class="card">
                <div class="card-header">
                  <h5>Visualización de categoria de insumos</h5>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6">
                      <CreateSuppliesCategory />
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
                            <th>Estado</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredSuppliesCategory.map((suppliesCategory) => (
                            <tr key={suppliesCategory.ID_SuppliesCategory}>
                              <td>{suppliesCategory.Name_SuppliesCategory}</td>
                              <td>{suppliesCategory.State ? 'Habilitado' : 'Deshabilitado'}</td>
                              <td>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                  <button
                                    onClick={() => handleEdit(suppliesCategory)}
                                    className={`btn btn-icon btn-primary ${!suppliesCategory.State ? "text-gray-400 cursor-not-allowed" : ""}`}
                                    disabled={!suppliesCategory.State}
                                  >
                                    <BiEdit />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(suppliesCategory)}
                                    className={`btn btn-icon btn-danger ${!suppliesCategory.State ? "text-gray-400 cursor-not-allowed" : ""}`}
                                    disabled={!suppliesCategory.State}
                                  >
                                    <AiFillDelete />
                                  </button>
                                  <button
                                    type="button"
                                    className={`btn btn-icon btn-success ${barraClass}`}
                                    onClick={() => toggleCategorySupplyStatus(suppliesCategory.ID_SuppliesCategory)}
                                  >
                                    {suppliesCategory.State ? (
                                      <MdToggleOn className={`estado-icon active ${barraClass}`} />
                                    ) : (
                                      <MdToggleOff className={`estado-icon inactive ${barraClass}`} />
                                    )}
                                  </button>
                                </div>
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

export default SuppliesCategoryPage;
