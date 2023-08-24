import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateCategorySupplies from './pages/create_category_supplies';
import { CategorySupplies } from './context/category_supplies.context';
import Supplies from './pages/supplies';
import ListCategorySupplies from './pages/list_category_supplies';

function App() {
  return (
    <CategorySupplies>
      <BrowserRouter>
        <main className='container mx-auto px-10'>
          <Routes>
            <Route path='/' element={<h1>Home</h1>} />
            <Route path='/list_category_supplies' element={<ListCategorySupplies />} />
            <Route path='/create_category_supplies' element={<CreateCategorySupplies />} />
            <Route path='/create_category_supplies/:id' element={<CreateCategorySupplies />} />

            <Route path='/supplies' element={<Supplies />} />
            <Route path='/Add-supplies' element={<h1>nuevo insumo</h1>} />
            <Route path='/supplies/:id' element={<h1>actualizar insumo</h1>} />
          </Routes>
        </main>
      </BrowserRouter>
    </CategorySupplies>
  )
}

export default App
