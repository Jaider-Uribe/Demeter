import React, { useEffect, useState } from 'react';
import CategorySuppliesCard from '../components/suppliescategory.card';
import { useCategorySupplies } from '../context/suppliescategory.context';
import CreateCategorySuppliesModal from './SuppliesCategoryCreatePage';
import EditCategorySuppliesModal from './SuppliesCategoryUpdatePage';
import DeleteCategorySuppliesModal from './SuppliesCategoryDeletePage';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useSupplies } from "../context/supplies.context";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function ListCategorySupplies() {
  const { Category_supplies, getCategory_supplies, deleteCategory_supplies } = useCategorySupplies();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategorySupplies, setFilteredCategorySupplies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categorySupplyToEdit, setCategorySupplyToEdit] = useState(null);
  const [categorySupplyToDelete, setCategorySupplyToDelete] = useState(null);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [cannotDelete, setCannotDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;


  const { supplies, getSupplies } = useSupplies();

  useEffect(() => {
    getCategory_supplies();
    getSupplies();
  }, []);

  if (Category_supplies.length < 0) return <h1>No hay categorías de insumos</h1>;

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCategorySupplies(Category_supplies);
    } else {
      const filtered = Category_supplies.filter(category_supply =>
        category_supply.Name_SuppliesCategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategorySupplies(filtered);
    }
  }, [searchTerm, Category_supplies]);

  const handleDelete = async (categorySupply) => {
    const isCategoryInUse = supplies.some(
      (supply) => supply.SuppliesCategory_ID === categorySupply.ID_SuppliesCategory
    );

    if (isCategoryInUse) {
      setIsDeleteModalOpen(true);
      setCategorySupplyToDelete(categorySupply);
      setCannotDelete(
        'No se puede eliminar esta categoría de insumo porque está asociada a insumos existentes.'
      );
    } else {
      setIsDeleteModalOpen(true);
      setCategorySupplyToDelete(categorySupply);
      setCannotDelete(null);
    }
  };

  const confirmDelete = () => {
    if (categorySupplyToDelete) {
      deleteCategory_supplies(categorySupplyToDelete.ID_SuppliesCategory);
      setCategorySupplyToDelete(null);
      setIsDeleteModalOpen(false);
      setIsDataChanged(true);
    }
  };

  const cancelDelete = () => {
    setCategorySupplyToDelete(null);
    setCannotDelete(null);
    setIsDeleteModalOpen(false);
  };

  const navigateToCreateCategorySupplies = () => {
    setIsModalOpen(true);
  };

  const handleEdit = (categorySupply) => {
    setCategorySupplyToEdit(categorySupply);
    setIsEditModalOpen(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const categorySuppliesToDisplay = filteredCategorySupplies.slice(startIndex, endIndex);

  return (
    <div className="mx-auto mt-4 contenedor">
      <h1 className="text-3xl font-bold text-center mb-20">Categoría de Insumos</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={navigateToCreateCategorySupplies}
          className="bg-orange-500 hover-bg-orange-700 text-white font-bold py-2 px-5 rounded border border-orange-500 hover-border-orange-700 focus-outline-none focus-shadow-outline"
        >
          Crear categoría
        </button>
        <input
          type="text"
          placeholder="Buscar categoría"
          value={searchTerm}
          onChange={(e) => {
            const inputValue = e.target.value;
            const filteredInput = inputValue.replace(/[^a-zA-Z]/g, '');
            setSearchTerm(filteredInput);
          }}
          className="border-2 border-gray-800 rounded-lg p-2 focus-outline-none"
        />
      </div>
      <table className="table-custom mx-auto w-full border-separate">
        <thead>
          <tr className="bg-[#c0c0c0] text-black">
            <th className="border border-gray-400 px-4 py-4 w-1/4 text-left">#</th>
            <th className="border border-gray-400 px-4 py-4 w-1/4 text-center">Nombre</th>
            <th className="border border-gray-400 px-4 py-4 w-1/4 text-center">Estado</th>
            <th className="border border-gray-400 px-4 py-4 w-1/4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorySuppliesToDisplay.map((category_supply, count) => (
            <CategorySuppliesCard
              categorySupply={category_supply}
              key={category_supply.ID_SuppliesCategory}
              count={startIndex + count + 1}
              onEdit={() => handleEdit(category_supply)}
              onDelete={() => handleDelete(category_supply)}
            />
          ))}
        </tbody>
      </table>

      {isDeleteModalOpen && (
        <DeleteCategorySuppliesModal
          onClose={cancelDelete}
          cannotDelete={cannotDelete}
          onConfirmDelete={confirmDelete}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteCategorySuppliesModal
          onClose={cancelDelete}
          cannotDelete={cannotDelete}
          onConfirmDelete={confirmDelete}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}></div>
          <div className="modal-container">
            <CreateCategorySuppliesModal onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}></div>
          <div className="modal-container">
            <EditCategorySuppliesModal
              onClose={() => setIsEditModalOpen(false)}
              categorySupplyToEdit={categorySupplyToEdit}
            />
          </div>
        </div>
      )}

      <div className="pagination">
        <div className="pagination text-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-5 rounded border border-orange-500 hover:border-orange-700 focus:outline-none focus:shadow-outline mr-2"
          >
            Anterior
          </button>
          <span>Página {currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={endIndex >= Category_supplies.length}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-5 rounded border border-orange-500 hover:border-orange-700 focus:outline-none focus:shadow-outline ml-2"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListCategorySupplies;