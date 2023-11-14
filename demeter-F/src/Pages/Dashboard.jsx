import React, { useEffect, useState } from 'react';
import { useShopping } from '.';
import { useSupplies } from '.';
import { Bar } from 'react-chartjs-2';

const Dashboard = () => {
  const { shoppingDetails, shopping, Count, fetchGain } = useShopping();
  const { supplies } = useSupplies();

  const [mostSoldProducts, setMostSoldProducts] = useState([]);
  const [mostPurchasedSupplies, setMostPurchasedSupplies] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const productsSold = {};
    const suppliesPurchased = {};

    shoppingDetails.forEach((detail) => {
      // Para obtener productos más vendidos
      if (productsSold[detail.Product_ID]) {
        productsSold[detail.Product_ID].Lot_ProductDetail += detail.Lot_ProductDetail;
      } else {
        productsSold[detail.Product_ID] = {
          ID_Product: detail.Product_ID,
          Lot_ProductDetail: detail.Lot_ProductDetail,
        };
      }

      // Para obtener insumos más comprados
      if (suppliesPurchased[detail.Supplies_ID]) {
        suppliesPurchased[detail.Supplies_ID].Lot_ProductDetail += detail.Lot_ProductDetail;
      } else {
        suppliesPurchased[detail.Supplies_ID] = {
          ID_Supplies: detail.Supplies_ID,
          Lot_ProductDetail: detail.Lot_ProductDetail,
        };
      }
    });

    // Ordenar productos más vendidos e insumos más comprados
    const sortedProducts = Object.values(productsSold).sort((a, b) => b.Lot_ProductDetail - a.Lot_ProductDetail);
    const sortedSupplies = Object.values(suppliesPurchased).sort((a, b) => b.Lot_ProductDetail - a.Lot_ProductDetail);

    setMostSoldProducts(sortedProducts.slice(0, 5)); // Tomar los primeros 5 productos
    setMostPurchasedSupplies(sortedSupplies.slice(0, 5)); // Tomar los primeros 5 insumos
  }, [shoppingDetails]);

  useEffect(() => {
    // Calcular las ganancias totales
    const totalMoney = shopping.reduce((total, sale) => total + sale.Total, 0);
    setTotal(totalMoney);
    fetchGain(totalMoney);
  }, [shopping, fetchGain]);

  const dataForChart = {
    labels: mostSoldProducts.map((product) => `Producto ${product.ID_Product}`),
    datasets: [
      {
        label: 'Unidades Vendidas',
        data: mostSoldProducts.map((product) => product.Lot_ProductDetail),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Productos Más Vendidos</h2>
      <ul>
        {mostSoldProducts.map((product) => (
          <li key={product.ID_Product}>
            Producto ID: {product.ID_Product}, Unidades Vendidas: {product.Lot_ProductDetail}
          </li>
        ))}
      </ul>

      <h2>Insumos Más Comprados</h2>
      <ul>
        {mostPurchasedSupplies.map((supply) => (
          <li key={supply.ID_Supplies}>
            Insumo ID: {supply.ID_Supplies}, Unidades Compradas: {supply.Lot_ProductDetail}
          </li>
        ))}
      </ul>

      <h2>Ganancias Totales</h2>
      <p>Ganancias Totales: {total}</p>

      <h2>Gráfico de Barras</h2>
      <Bar data={dataForChart} />

    </div>
  );
};

export default Dashboard;
