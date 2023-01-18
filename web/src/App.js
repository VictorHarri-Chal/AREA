import React from 'react';
import './App.css';
import Home from './pages/Home/'
import Dashboard from './pages/Dashboard/'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route exact path='/dashboard' element={<Dashboard/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;