import React, { useState, useEffect } from 'react';
import { useSupplies } from '../Context/supplies.context';
import { useCategorySupplies } from '../Context/suppliescategory.context';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import CreateSupplies from '../Components/CreateSupplies.jsx';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
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
                                                    {filteredSupplies.map((supply, index) => (
                                                        <tr key={supply.ID_Supplies}>
                                                            <td>{index + 1}</td>
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
                                            <div>
                                                <Stack spacing={2}>
                                                    <Pagination count={10} showFirstButton showLastButton />
                                                    <Pagination count={10} hidePrevButton hideNextButton />
                                                </Stack>
                                            </div>
                                        </div>
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
