import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute';
import Purchase from './components/Purchase';
import Library from './components/Library';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter> 
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route element={<ProtectedRoute />} >
      <Route path='/profile' element={<Profile />} />
      <Route path='/purchase' element={<Purchase />} />
      <Route path='/library' element={<Library />} />
    </Route>
  </Routes>
  </BrowserRouter>
);

