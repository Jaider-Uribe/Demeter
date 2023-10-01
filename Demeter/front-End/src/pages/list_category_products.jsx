import React, { useEffect, useState } from 'react';
import { useCategoryProducts } from '../context/category_products.context';
import CategoryProductsCard from '../components/category_products.card';
import CreateCategoryProductsModal from './create_category_products';
import EditCategoryProductsModal from './edit_category_products';
import DeleteCategoryProductsModal from './delete_category_products';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  useEffect(() => {
    getCategory_products();
  }, []);

  if (Category_products.length < 0) return <h1>No hay categorías</h1>;

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCategoryProducts(Category_products);
    } else {
      const filtered = Category_products.filter(category_product =>
        category_product.Nombre_Categoria.toLowerCase().includes(searchTerm.toLowerCase())
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
      deleteCategory_products(categoryProductToDelete.ID_CATEGORIA_PRODUCTO);
      setCategoryProductToDelete(null);
      setIsDeleteModalOpen(false);
      setIsDataChanged(true);
    }
  };

  const cancelDelete = () => {
    setCategoryProductToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const generateCategoryProductsPDF = () => {
    const docDefinition = {
      content: [
        { text: 'Lista de categorías de productos', style: 'header' },
        { text: ' ', margin: [0, 10] },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: [
              ['Nombre', 'Estado'],
              ...filteredCategoryProducts.map((categoryProduct) => [
                categoryProduct.Nombre_Categoria,
                categoryProduct.Estado ? 'Habilitado' : 'Deshabilitado',
              ]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
        },
      },
    };

    pdfMake.createPdf(docDefinition).download('Lista_de_Categorias_de_Productos.pdf');
  };

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
        <button
          onClick={generateCategoryProductsPDF}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-5 rounded border border-orange-500 hover:border-orange-700 focus:outline-none focus:shadow-outline"
          style={{ marginLeft: '445px' }}
        >
          Generar PDF
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
      <table className="table-auto mx-auto w-full">
        <thead>
          <tr className="bg-[#201E1E] text-white">
            <th className="border border-gray-400 px-4 py-2">Nombre</th>
            <th className="border border-gray-400 px-4 py-2">Estado</th>
            <th className="border border-gray-400 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategoryProducts.map(categoryProduct => (
            <CategoryProductsCard
              Category_products={categoryProduct}
              key={categoryProduct.ID_CATEGORIA_PRODUCTO}
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
    </div>
  );
}

export default ListCategoryProducts;
