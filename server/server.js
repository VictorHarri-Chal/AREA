const express = require('express');
const mongoose = require('mongoose');
const User = require('./src/models/user.model.js');
const utils = require('./src/utils/utils.js');

const axios = require('axios');

let lastCommitSHA = '';

async function checkGithubTrigger(schema) {
    const repositoryName = schema.repositoryName;
    const action = schema.action;
    const access_token = schema.access_token;
    let url = '';
    if (action === "push") {
    url = `https://api.github.com/repos/${repositoryName}/events`;
    } else if (action === "issue") {
    url = `https://api.github.com/repos/${repositoryName}/issues`;
    } else {
    console.log("Invalid action provided. Please provide a valid action.");
    }

    try {
        const response = await axios.get(url, {
            headers: {
            'Authorization': 'Token ' + access_token
            }
        });
    if (action === "push") {
        const pushEvent = response.data.find(event => event.type === 'PushEvent');
        if(pushEvent) {
            const commits = pushEvent.payload.commits.reverse();
            const currentCommitSHA = commits[0].sha;
            if (currentCommitSHA !== lastCommitSHA) {
                console.log("Push detected on repository: " + repositoryName + " with commit: " + commits[0].message);
                lastCommitSHA = currentCommitSHA;
            }
        }
    } else if (action === "issue") {
        console.log("New issue detected on repository: " + repositoryName);
    }
    } catch (error) {
        console.error(error);
    }
}

function serverProcess() {
    // Load User's AREAs from schemas
    

    setInterval(() => {
        checkGithubTrigger({ repositoryName: "VictorHarri-Chal/AREA", action: "push", access_token: "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" });
    }, 3000);
}

function initDatabase() {
    mongoose.set('strictQuery', true);

    mongoose.connect('mongodb+srv://bissap:gerking123@cluster0.qpna6y2.mongodb.net/sadge?retryWrites=true&w=majority&authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("Connected to MongoDB");
    });
    serverProcess();
}

function initServer() {
    const app = express();

    app.get('/', (req, res) => {
    res.send('Hello World!');
    });
    const port = 8081;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
    initDatabase();
}

initServer();