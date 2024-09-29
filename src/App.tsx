import React from 'react';
import './App.css';
import Home from './Home';
import Category from './Category';
import {Routes, Route} from 'react-router-dom';
import BasketPage from './BasketPage'; 
import RegisterPage from './RegisterPage';


function App() {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/Category/:categoryId' element={<Category/>} />
      <Route path="/Basket" element={<BasketPage />} />
      <Route path="/Register" element={<RegisterPage />} />
        
      
    </Routes>
    </div>
    
  );
}

export default App;
