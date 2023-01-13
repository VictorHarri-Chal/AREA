import React, { useState } from 'react';
import './App.css';
import Home from './pages'
import { BrowserRouter as Router } from 'react-router-dom';

function fetchAPI() {
    // Ajoutez l'en-tête d'authentification
    const headers = new Headers({
        'Authorization': `Token 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`
    });

    // Modifiez l'URL pour se connecter à l'API de Github
    fetch("https://api.github.com/repos/VictorHarri-Chal/AREA/pulls", {headers})
        .then(res => res.json())
        .then(data => {
            // Affichez un message pour chaque pull request
            data.forEach(pullRequest => {
                console.log(`Nouvelle pull request : ${pullRequest.title}`);
            });
        })
        .catch(error => console.log(error))
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
