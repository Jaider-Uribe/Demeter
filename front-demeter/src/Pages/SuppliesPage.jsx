import React, { useState, useEffect } from 'react';
import { useSupplies } from '../Context/supplies.context';
import { useCategorySupplies } from '../Context/suppliescategory.context';
import ReactModal from 'react-modal';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { MdToggleOn, MdToggleOff, MdFirstPage, MdLastPage, MdChevronLeft, MdChevronRight } from "react-icons/md";
import CreateSupplies from '../Components/CreateSupplies.jsx';
// import EditSupplies from '../Components/EditSupplies.jsx';
// import DeleteSupplies from '../Components/DeleteSupplies.jsx';
import '../css/style.css';
import '../css/landing.css';
import '../fonts/cryptofont.css';
import '../fonts/feather.css';
import '../fonts/fontawesome.css';
import '../fonts/material.css';

function SuppliesPage() {
    const { supplies, getSupplies, toggleSupplyStatus, createSupplies, updateSupplies, deleteSupplies } = useSupplies();
    const { Category_supplies } = useCategorySupplies();
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [supplyToEdit, setSupplyToEdit] = useState(null);
    const [supplyToDelete, setSupplyToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const pagesToShow = 5;

    useEffect(() => {
        getSupplies();
    }, []);

    const filteredSupplies = supplies.filter((supply) =>
        supply.Name_Supplies.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const navigateToCreateSupplies = () => {
        setCreateModalOpen(true);
      };

    const handleEditSupply = (supply) => {
        setSupplyToEdit(supply);
        setEditModalOpen(true);
    };

    const handleDeleteSupply = (supply) => {
        setSupplyToDelete(supply);
        setDeleteModalOpen(true);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const suppliesToDisplay = filteredSupplies.slice(startIndex, endIndex);

    const pageCount = Math.ceil(filteredSupplies.length / itemsPerPage);

    const clearSearchTerm = () => {
        setSearchTerm('');
    };

    const handleToggleState = (supply) => {
        toggleSupplyStatus(supply.ID_Supplies);
        getSupplies();
    };

    const handleFirstPage = () => {
        const newPage = Math.max(1, currentPage - pagesToShow);
        setCurrentPage(newPage);
    };

    const handleLastPage = () => {
        const newPage = Math.min(pageCount, currentPage + pagesToShow);
        setCurrentPage(newPage);
    };

    return (
        <section className="pc-container">
            <div className="pcoded-content">
                <div className="row w-100">
                    <div className="col-md-12">
                        <div className="w-100 col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>INSUMOS</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button className="btn btn-icon btn-primary" onClick={navigateToCreateSupplies}>Crear insumo</button>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <div className="search-bar">
                                                    <input
                                                        type="search"
                                                        className="form-control"
                                                        placeholder="Buscador"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body table-border-style">
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Nombre</th>
                                                        <th>Cantidad</th>
                                                        <th>Medida</th>
                                                        <th>Stock</th>
                                                        <th>Categoria</th>
                                                        <th>Estado</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {suppliesToDisplay.map((supply, index) => (
                                                        <tr key={supply.ID_Supplies}>
                                                            <td>{startIndex + index + 1}</td>
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
                                                            <td className="action-buttons">
                                                                <button type="button" className="btn btn-icon btn-primary" onClick={() => handleEditSupply(supply)}>
                                                                    <BiEdit />
                                                                </button>
                                                                <button type="button" className="btn btn-icon btn-primary" onClick={() => handleDeleteSupply(supply)}>
                                                                    <AiFillDelete />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className={`btn btn-icon btn-primary ${supply.State ? 'inactive' : 'active'}`}
                                                                    onClick={() => handleToggleState(supply)}
                                                                >
                                                                    {supply.State ? <MdToggleOn /> : <MdToggleOff />}
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="pagination ">
                                        <button
                                            className={`btn btn-icon btn-primary action-buttons ${currentPage <= pagesToShow ? 'disabled' : ''}`}
                                            onClick={handleFirstPage}
                                            disabled={currentPage <= pagesToShow}
                                        >
                                            <MdFirstPage />
                                        </button>
                                        <button
                                            className={`btn btn-icon btn-primary action-buttons ${currentPage === 1 ? 'disabled' : ''}`}
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            <MdChevronLeft />
                                        </button>
                                        {Array.from({ length: pageCount }, (_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentPage(index + 1)}
                                                className={`btn btn-icon btn-primary action-buttons ${currentPage === index + 1 ? 'active' : ''}`}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                        <button
                                            className={`btn btn-icon btn-primary action-buttons ${currentPage === pageCount ? 'disabled' : ''}`}
                                            onClick={() => setCurrentPage(currentPage + 1)}
                                            disabled={currentPage === pageCount}
                                        >
                                            <MdChevronRight />
                                        </button>
                                        <button
                                            className={`btn btn-icon btn-primary action-buttons ${currentPage >= pageCount - pagesToShow ? 'disabled' : ''}`}
                                            onClick={handleLastPage}
                                            disabled={currentPage >= pageCount - pagesToShow}
                                        >
                                            <MdLastPage />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ventana modal para Crear Suministro */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay" onClick={() => setCreateModalOpen(false)}></div>
                    <div className="modal-container">
                        <CreateSupplies
                            onClose={() => setCreateModalOpen(false)}
                            onCreated={() => {
                                setCreateModalOpen(false);
                                getSupplies();
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Ventana modal para Editar Suministro */}
            {/* {isEditModalOpen && supplyToEdit && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay" onClick={() => setEditModalOpen(false)}></div>
                    <div className="modal-container">
                        <EditSupplies
                            onClose={() => setEditModalOpen(false)}
                            supplyToEdit={supplyToEdit}
                            onEdited={() => {
                                setEditModalOpen(false);
                                getSupplies();
                            }}
                        />
                    </div>
                </div>
            )} */}

            {/* Ventana modal para Eliminar Suministro */}
            {/* {isDeleteModalOpen && supplyToDelete && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay" onClick={() => setDeleteModalOpen(false)}></div>
                    <div className="modal-container">
                        <DeleteSupplies
                            onClose={() => setDeleteModalOpen(false)}
                            supplyToDelete={supplyToDelete}
                            onDelete={() => {
                                setDeleteModalOpen(false);
                                deleteSupplies(supplyToDelete.ID_Supplies);
                            }}
                        />
                    </div>
                </div>
            )} */}

        </section>
    );
}

export default SuppliesPage;
