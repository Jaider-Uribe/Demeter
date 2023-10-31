import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import ListCategorySupplies from './pages/SuppliesCategoryListPage';
import { CategorySupplies } from './context/suppliescategory.context';
import ListSupplies from './pages/SuppliesListPage';
import { Supplies } from './context/supplies.context'
import ListCategoryProducts from './pages/ProductCategoryListPage';
import { CategoryProducts } from './context/productcategory.context';

function App() {
  return (
    <CategoryProducts>
      <CategorySupplies>
        <Supplies>
          <BrowserRouter>
          <div className="flex">
              <Menu />
              <main className='container mx-auto px-10 flex-grow'>
                <Routes>
                  <Route path='/' element={<h1>Home</h1>} />
                  <Route path='/SuppliesCategoryListPage' element={<ListCategorySupplies />} />
                  <Route path='/SuppliesListPage' element={<ListSupplies />} />
                  <Route path='/ProductCategoryListPage' element={<ListCategoryProducts />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </Supplies>
      </CategorySupplies>
    </CategoryProducts>
  )
}

export default App
