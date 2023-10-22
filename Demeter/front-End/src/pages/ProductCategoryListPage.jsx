import React, { useEffect, useState } from 'react';
import { useCategoryProducts } from '../context/productcategory.context';
import CategoryProductsCard from '../components/productcategory.card';
import CreateCategoryProductsModal from './ProductCategoryCreatePage';
import EditCategoryProductsModal from './ProductCategoryUpdatePage';
import DeleteCategoryProductsModal from './ProductCategoryDeletePage';

function ListCategoryProducts() {
  const { Category_products, getCategory_products, deleteCategory_products } = useCategoryProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategoryProducts, setFilteredCategoryProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryProductToEdit, setCategoryProductToEdit] = useState(null);
  const [categoryProductToDelete, setCategoryProductToDelete] = useState(null);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    getCategory_products();
  }, []);

  if (Category_products.length < 0) return <h1>No hay categorías de productos</h1>;

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCategoryProducts(Category_products);
    } else {
      const filtered = Category_products.filter(category_product =>
        category_product.Name_ProductCategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategoryProducts(filtered);
    }
  }, [searchTerm, Category_products]);

  const navigateToCreateCategoryProducts = () => {
    setIsModalOpen(true);
  };

  const handleEdit = (categoryProduct) => {
    setCategoryProductToEdit(categoryProduct);
    setIsEditModalOpen(true);
  };

  const handleDelete = (categoryProduct) => {
    setCategoryProductToDelete(categoryProduct);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (categoryProductToDelete) {
      deleteCategory_products(categoryProductToDelete.ID_ProductCategory);
      setCategoryProductToDelete(null);
      setIsDeleteModalOpen(false);
      setIsDataChanged(true);
    }
  };

  const cancelDelete = () => {
    setCategoryProductToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const categoryProductsToDisplay = filteredCategoryProducts.slice(startIndex, endIndex);

  return (
    <div className="mx-auto mt-4 contenedor">
      <h1 className="text-3xl font-bold text-center mb-20">Categorías de productos</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={navigateToCreateCategoryProducts}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-5 rounded border border-orange-500 hover:border-orange-700 focus:outline-none focus:shadow-outline"
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
          className="border-2 border-gray-800 rounded-lg p-2 focus:outline-none"
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
          {categoryProductsToDisplay.map((categoryProduct, count) => (
            <CategoryProductsCard
              categoryProduct={categoryProduct}
              key={categoryProduct.ID_ProductCategory}
              count={startIndex + count + 1}
              onEdit={() => handleEdit(categoryProduct)}
              onDelete={() => handleDelete(categoryProduct)}
            />
          ))}
        </tbody>
      </table>

      {isDeleteModalOpen && (
        <DeleteCategoryProductsModal
          onClose={cancelDelete}
          onDelete={confirmDelete}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}></div>
          <div className="modal-container">
            <CreateCategoryProductsModal onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}></div>
          <div className="modal-container">
            <EditCategoryProductsModal
              onClose={() => setIsEditModalOpen(false)}
              categoryProductToEdit={categoryProductToEdit}
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
            disabled={endIndex >= Category_products.length}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-5 rounded border border-orange-500 hover:border-orange-700 focus:outline-none focus:shadow-outline ml-2"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListCategoryProducts;