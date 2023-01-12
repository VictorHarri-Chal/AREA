import React, { useState } from 'react';
import './App.css';
import Home from './pages'
import { BrowserRouter as Router } from 'react-router-dom';

function fetchAPI() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(data => console.log(data))
}

function App() {
    return (
        <Router>
            <Home />
            <button onClick={(event)=>fetchAPI()}>La fève</button>
        </Router>
    );
}

export default App;