import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import Login from './Login';
import Main from './Main';
import Sell from './Sell';
import CropSearch from './Search';

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path='/sell' element={<Sell />}/>
      <Route path='/crop-search' element={<CropSearch />}/>
    </Routes>
  </BrowserRouter>
);