import HomePage from './components/HomePage';
import Products from './components/Products';
import AddCategories from './components/admin/AddCategories';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route exact path='/' element={<HomePage/>}></Route>
            <Route exact path='/products' element={<Products/>}></Route>
            <Route exact path='/add/category' element={<AddCategories />}></Route>
          </Routes>
      </Router>
    </>
  );
}

export default App;
