import React from 'react';
import '../css/style.css';

const modalStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '250px',
  width: '400px',
  padding: '20px',
  backgroundColor: 'white',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '4px',
  textAlign: 'center',
};

const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const buttonStyles = {
  marginTop: '80px',
  marginRight: '-10%',
  marginLeft: '17%',
};

function DeleteProductCategory({ onClose, onDelete }) {
  return (
    <div style={overlayStyles} onClick={onClose}>
      <div style={modalStyles}>
        <h1 className="text-3xl font-semibold">Eliminar categoría de producto</h1>
        <p className="deleteText">¿Está seguro de que desea eliminar esta categoría?</p>
        <div className="flex justify-between ">
          <button onClick={onDelete} style={buttonStyles} className="btn btn-icon btn-danger">
            Eliminar
          </button>
          <button onClick={onClose} style={buttonStyles} className="btn btn-icon btn-primary">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductCategory;
