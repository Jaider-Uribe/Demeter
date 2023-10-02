import React, { useEffect, useState } from 'react';
import { useSupplies } from '../context/supplies.context';
import SuppliesCard from '../components/supplies.card';
import CreateSuppliesModal from './create_supplies';
import EditSuppliesModal from './edit_supplies';
import DeleteSuppliesModal from './delete_supplies';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import logo from '../img/logo.png';
import { useCategorySupplies } from "../context/category_supplies.context";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function ListSupplies() {
  const { supplies, getSupplies, deleteSupplies } = useSupplies();
  const { Category_supplies } = useCategorySupplies();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSupplies, setFilteredSupplies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [supplyToEdit, setSupplyToEdit] = useState(null);
  const [supplyToDelete, setSupplyToDelete] = useState(null);

  useEffect(() => {
    getSupplies();
  }, []);

  if (supplies.length < 0) return <h1>No hay insumos</h1>;

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredSupplies(supplies);
    } else {
      const filtered = supplies.filter((supply) =>
        supply.Nombre_Insumo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSupplies(filtered);
    }
  }, [searchTerm, supplies]);

  const navigateToCreateSupplies = () => {
    setIsModalOpen(true);
  };
  
  const handleCreated = () => {
    getSupplies(); 
  };

  const handleEdit = (supply) => {
    setSupplyToEdit(supply);
    setIsEditModalOpen(true);
  };

  const handleDelete = (supply) => {
    setSupplyToDelete(supply);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (supplyToDelete) {
      deleteSupplies(supplyToDelete.ID_INSUMO);
      setSupplyToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setSupplyToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const generatePDF = () => {
    const docDefinition = {
      content: [
        { text: 'Lista de insumos', style: 'header' },
        { text: ' ', margin: [0, 10] },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*', '*'],
            body: [
              ['Nombre', 'Cantidad', 'Medida', 'Stock Mínimo', 'Categoría', 'Estado'],
              ...filteredSupplies.map((supply) => [
                supply.Nombre_Insumo,
                supply.Cantidad_Insumo || '', 
                supply.Medida_Insumo,
                supply.Stock_Minimo || '', 
                supply.CATEGORIA_INSUMO_ID ? (
                  Category_supplies.find((category) => category.ID_CATEGORIA_INSUMO === supply.CATEGORIA_INSUMO_ID)?.Nombre_Categoria || ''
                ) : '',
                supply.Estado ? 'Habilitado' : 'Deshabilitado',
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

    pdfMake.createPdf(docDefinition).download('Lista_de_Insumos.pdf'); 
  };

  return (
    <div className="mx-auto mt-4 contenedor">
      <h1 className="text-3xl font-bold text-center mb-20">Insumos</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={navigateToCreateSupplies}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-5 rounded border border-orange-500 hover:border-orange-700 focus:outline-none focus:shadow-outline"
        >
          Crear insumo
        </button>
        <button
          onClick={generatePDF}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-5 rounded border border-orange-500 hover:border-orange-700 focus:outline-none focus:shadow-outline"
          style={{ marginLeft: '460px' }}
        >
          Generar PDF
        </button>
        <input
          type="text"
          placeholder="Buscar insumo por nombre"
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
            <th className="border border-gray-400 px-4 py-2 w-1/7">Nombre</th>
            <th className="border border-gray-400 px-4 py-2 w-1/7">Cantidad</th>
            <th className="border border-gray-400 px-4 py-2 w-1/6">Medida</th>
            <th className="border border-gray-400 px-4 py-2 w-1/7">Stock Mínimo</th>
            <th className="border border-gray-400 px-4 py-2 w-1/8">Categoría asociada</th>
            <th className="border border-gray-400 px-4 py-2 w-1/7">Estado</th>
            <th className="border border-gray-400 px-4 py-2 w-1/7">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredSupplies.map((supply) => (
            <SuppliesCard
              supplies={supply}
              key={supply.ID_INSUMO}
              onEdit={() => handleEdit(supply)}
              onDelete={() => handleDelete(supply)}
            />
          ))}
        </tbody>
      </table>

      {isDeleteModalOpen && (
        <DeleteSuppliesModal
          onClose={cancelDelete}
          onDelete={confirmDelete}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}></div>
          <div className="modal-container">
            <CreateSuppliesModal onClose={() => setIsModalOpen(false)} onCreated={handleCreated} />
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}></div>
          <div className="modal-container">
            <EditSuppliesModal onClose={() => setIsEditModalOpen(false)} supplyToEdit={supplyToEdit} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ListSupplies;


