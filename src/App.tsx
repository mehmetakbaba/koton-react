import React from 'react';
import './App.css';
import Home from './Home';
import Category from './Category';
import {Routes, Route} from 'react-router-dom';


function App() {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/Category/:categoryId' element={<Category/>} />
        
      
    </Routes>
    </div>
    
  );
}

export default App;
