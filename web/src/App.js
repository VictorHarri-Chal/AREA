import React from 'react';
import './App.css';
import Home from './pages/Home/'
import Dashboard from './pages/Dashboard/'
import Login from './pages/Login/'
import ClientApk from './pages/ClientApk';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route exact path='/dashboard' element={<Dashboard/>} />
                <Route exact path='/login' element={<Login/>} />
                <Route exact path='/client.apk' element={<ClientApk/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;