// import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assests/banner_mens.png';
import women_banner from './Components/Assests/banner_women.png';
import kid_banner from './Components/Assests/banner_kids.png'
import LoginSignup from './Pages/LoginSignup';

function App() {
  return (
    <div className="App">
      <Router>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Shop/>}/>
      <Route path='/men' element={<ShopCategory banner={men_banner} category='men'/>}/>
      <Route path='/women' element={<ShopCategory banner={women_banner}category='women'/>}/>
      <Route path='/kids' element={<ShopCategory banner={kid_banner} category='kid'/>}/>
      <Route path='/product' element={<Product/>}>
        <Route path=':productId' element={<Product/>}/>
      </Route>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<LoginSignup/>}/>
     </Routes>
     <Footer/>
     </Router>
     
    </div>
  );
}

export default App;
