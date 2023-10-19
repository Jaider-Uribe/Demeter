import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import ListCategorySupplies from './pages/SuppliesCategoryListPage';
import CreateCategorySupplies from './pages/SuppliesCategoryCreatePage';
import { CategorySupplies } from './context/suppliescategory.context';
import ListSupplies from './pages/SuppliesListPage';
import CreateSupplies from './pages/SuppliesCreatePage';
import { Supplies } from './context/supplies.context'
import ListCategoryProducts from './pages/ProductCategoryListPage';
import CreateCategoryProducts from './pages/ProductCategoryCreatePage';
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
                  <Route path='/SuppliesCategoryCreatePage' element={<CreateCategorySupplies />} />
                  <Route path='/SuppliesCategoryCreatePage/:id' element={<CreateCategorySupplies />} />
                  <Route path='/SuppliesListPage' element={<ListSupplies />} />
                  <Route path='/SuppliesCreatePage' element={<CreateSupplies />} />
                  <Route path='/SuppliesCreatePage/:id' element={<CreateSupplies />} />
                  <Route path='/ProductCategoryListPage' element={<ListCategoryProducts />} />
                  <Route path='/ProductCategoryCreatePage' element={<CreateCategoryProducts />} />
                  <Route path='/ProductCategoryCreatePage/:id' element={<CreateCategoryProducts />} />
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
