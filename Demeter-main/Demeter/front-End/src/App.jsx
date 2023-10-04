import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import ListCategorySupplies from './pages/list_category_supplies';
import CreateCategorySupplies from './pages/create_category_supplies';
import { CategorySupplies } from './context/category_supplies.context';
import ListSupplies from './pages/list_supplies';
import CreateSupplies from './pages/create_supplies';
import { Supplies } from './context/supplies.context'
import ListCategoryProducts from './pages/list_category_products';
import CreateCategoryProducts from './pages/create_category_products';
import { CategoryProducts } from './context/category_products.context';

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
                  <Route path='/list_category_supplies' element={<ListCategorySupplies />} />
                  <Route path='/create_category_supplies' element={<CreateCategorySupplies />} />
                  <Route path='/create_category_supplies/:id' element={<CreateCategorySupplies />} />
                  <Route path='/list_supplies' element={<ListSupplies />} />
                  <Route path='/create_supplies' element={<CreateSupplies />} />
                  <Route path='/create_supplies/:id' element={<CreateSupplies />} />
                  <Route path='/list_category_products' element={<ListCategoryProducts />} />
                  <Route path='/create_category_products' element={<CreateCategoryProducts />} />
                  <Route path='/create_category_products/:id' element={<CreateCategoryProducts />} />
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
