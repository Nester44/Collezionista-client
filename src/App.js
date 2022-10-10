import './App.css';
import React, { useState, useEffect } from 'react'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './common/routes/AppRoutes';
import { checkAuth } from './slices/auth-slice';
import { useDispatch } from 'react-redux';



function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const checkAuthorization = async () => {
      await dispatch(checkAuth())
    }
    checkAuthorization()
      .catch(console.error)

  }, [dispatch])

  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div >
  );
}

export default App;
