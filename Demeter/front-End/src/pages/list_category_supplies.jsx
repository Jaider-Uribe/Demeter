import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySuppliesCard from '../components/category_supplies.card';
import { useCategorySupplies } from '../context/category_supplies.context';
import CreateCategorySuppliesModal from './create_category_supplies';
import EditCategorySuppliesModal from './edit_category_supplies';
import DeleteCategorySuppliesModal from './delete_category_supplies';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useSupplies } from "../context/supplies.context"; 

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function ListCategorySupplies() {
  const { Category_supplies, getCategory_supplies, deleteCategory_supplies } = useCategorySupplies();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSupplies, setFilteredSupplies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categorySupplyToEdit, setCategorySupplyToEdit] = useState(null);
  const [categorySupplyToDelete, setCategorySupplyToDelete] = useState(null);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [cannotDelete, setCannotDelete] = useState(null); 
  const navigate = useNavigate();

  const { supplies, getSupplies } = useSupplies(); 

  useEffect(() => {
    getCategory_supplies();
    getSupplies();
  }, []);

  if (Category_supplies.length < 0) return <h1>No hay categorías de suministros</h1>;

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredSupplies(Category_supplies);
    } else {
      const filtered = Category_supplies.filter(category_supply =>
        category_supply.Nombre_Categoria.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSupplies(filtered);
    }
  }, [searchTerm, Category_supplies]);

  const handleDelete = async (categorySupply) => {
    const isCategoryInUse = supplies.some(
      (supply) => supply.CATEGORIA_INSUMO_ID === categorySupply.ID_CATEGORIA_INSUMO
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
      deleteCategory_supplies(categorySupplyToDelete.ID_CATEGORIA_INSUMO);
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

  const generateCategorySuppliesPDF = () => {
    const docDefinition = {
      content: [
        { text: 'Lista de categorías de suministros', style: 'header' },
        { text: ' ', margin: [0, 10] },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: [
              ['Nombre', 'Estado'],
              ...Category_supplies.map((categorySupply) => [
                categorySupply.Nombre_Categoria,
                categorySupply.Estado ? 'Habilitado' : 'Deshabilitado',
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

    pdfMake.createPdf(docDefinition).download('Lista_de_Categorias_de_Suministros.pdf');
  };

  return (
    <div className="mx-auto mt-4 contenedor">
      <h1 className="text-3xl font-bold text-center mb-20">Categoría de Insumos</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={navigateToCreateCategorySupplies}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-5 rounded border border-orange-500 hover:border-orange-700 focus:outline-none focus:shadow-outline"
        >
          Crear categoría
        </button>
        <button
          onClick={generateCategorySuppliesPDF}
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
          {filteredSupplies.map(category_supply => (
            <CategorySuppliesCard
              Category_supplies={category_supply}
              key={category_supply.ID_CATEGORIA_INSUMO}
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
    </div>
  );
}

export default ListCategorySupplies;
