import HomePage from './components/HomePage';
import Products from './components/Products';
import AddCategories from './components/admin/AddCategories';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import AddProducts from './components/admin/AddProducts';
import ManageProducts from './components/admin/ManageProducts';
import ManageCategories from './components/admin/ManageCategories';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route exact path='/' element={<HomePage/>}></Route>
            <Route exact path='/products' element={<Products/>}></Route>
            <Route exact path='/product/:id' element={<ProductDetails/>}></Route>
            <Route exact path='/add/category' element={<AddCategories />}></Route>
            <Route exact path='/add/product' element={<AddProducts />}></Route>
            <Route exact path='/manage/product' element={<ManageProducts />}></Route>
            <Route exact path='/manage/category' element={<ManageCategories />}></Route>
          </Routes>
      </Router>
    </>
  );
}

export default App;
