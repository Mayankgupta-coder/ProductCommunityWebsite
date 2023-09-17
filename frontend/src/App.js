import HomePage from './components/HomePage';
import Products from './components/Products';
import AddCategories from './components/admin/AddCategories';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import AddProducts from './components/admin/AddProducts';
import ManageProducts from './components/admin/ManageProducts';
import ManageCategories from './components/admin/ManageCategories';
import ProductDetails from './components/ProductDetails';
import UpdateProductDetails from './components/admin/UpdateProductDetails';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import Admin from './components/admin/Admin';
import AdminLogin from './components/admin/AdminLogin';
function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route exact path='/' element={<HomePage/>}></Route>
            <Route exact path='/products/category/:id' element={<Products/>}></Route>
            <Route exact path='/product/:productId' element={<ProductDetails/>}></Route>
            <Route exact path='/register/user' element={<UserRegistration />}></Route>
            <Route exact path='/login/user' element={<UserLogin />}></Route>
            <Route exact path='/login/admin' element={<AdminLogin />}></Route>
            <Route exact path='/admin' element={<Admin />}>
              <Route exact path='add/category' element={<AddCategories />}></Route>
              <Route exact path='add/product' element={<AddProducts />}></Route>
              <Route exact path='manage/product' element={<ManageProducts />}></Route>
              <Route exact path='manage/category' element={<ManageCategories />}></Route>
              <Route exact path='update/product/:productId' element={<UpdateProductDetails />}></Route>
            </Route>
          </Routes>
      </Router>
    </>
  );
}

export default App;
