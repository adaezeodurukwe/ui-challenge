import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StoreContextProvider from './contexts/StoreContext';
import Home from './pages/Home';

function App() {
  return (
    <StoreContextProvider>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>

      </BrowserRouter>
    </StoreContextProvider>

  );
}

export default App;
