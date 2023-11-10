import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { useCategorySupplies } from '../Context/CategorySupplies.context.jsx'
import "../css/style.css";
import "../css/landing.css";
import CreateSuppliesCategory from "../Components/CreateSuppliesCategory.jsx";
import UpdateSuppliesCategory from "../Components/UpdateSuppliesCategory.jsx";
import DeleteSuppliesCategory from "../Components/DeleteSupplies.jsx";

function SuppliesCategoryPage() {
  const { Category_supplies, getCategory_supplies, deleteCategory_supplies, toggleCategorySupplyStatus } = useCategorySupplies();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSupplyCategoryToDelete, setSelectedSupplyCategoryToDelete] = useState(null);
  const [selectedSupplyCategoryToUpdate, setSelectedSupplyCategoryToUpdate] = useState(null);

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

  const handleDelete = (supplyCategory) => {
    setSelectedSupplyCategoryToDelete(supplyCategory);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedSupplyCategoryToDelete(null);
  };

  const handleUpdateSupplyCategory = (supplyCategory) => {
    setSelectedSupplyCategoryToUpdate(supplyCategory);
  };

  const barraClass = Category_supplies.State ? "" : "desactivado";

  return (
    <section className="pc-container">
      <div className="pcoded-content">
        <div className="row w-100">
          <div className="col-md-12">
            <div className=" w-100 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>VVisualización de categoria de insumos</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <CreateSuppliesCategory />
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
                                  <UpdateSuppliesCategory
                                    buttonProps={{
                                      buttonClass: `btn btn-icon btn-primary ${!suppliesCategory.State ? "text-gray-400 cursor-not-allowed" : ""}`,
                                      isDisabled: !suppliesCategory.State,
                                      buttonText: <BiEdit />,
                                    }}
                                    supplyCategoryToEdit={suppliesCategory}
                                    onUpdate={handleUpdateSupplyCategory}
                                  />
                                  <button
                                    onClick={() => handleDelete(suppliesCategory)}
                                    className={`btn btn-icon btn-danger ${!suppliesCategory.State ? "text-gray-400 cursor-not-allowed" : ""}`}
                                    disabled={!suppliesCategory.State}
                                  >
                                    <AiFillDelete />
                                  </button>
                                  <button
                                    type="button"
                                    className={`btn btn-icon btn-success ${suppliesCategory.State ? "active" : "inactive"}`}
                                    onClick={() => toggleCategorySupplyStatus(suppliesCategory.ID_SuppliesCategory)}
                                  >
                                    {suppliesCategory.State ? (
                                      <MdToggleOn className={`estado-icon active`} />
                                    ) : (
                                      <MdToggleOff className={`estado-icon inactive`} />
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

      {isDeleteModalOpen && (
        <DeleteSuppliesCategory
          onClose={closeDeleteModal}
          onDelete={() => {
            if (selectedSupplyCategoryToDelete) {
              deleteCategory_supplies(selectedSupplyCategoryToDelete.ID_SuppliesCategory);
              closeDeleteModal();
            }
          }}
        />
      )}

      {selectedSupplyCategoryToUpdate && (
        <UpdateSuppliesCategory
          supplyCategoryToEdit={selectedSupplyCategoryToUpdate}
          onUpdate={() => {
            setSelectedSupplyCategoryToUpdate(null);
          }}
        />
      )}
    </section>
  );
}

export default SuppliesCategoryPage;

   

