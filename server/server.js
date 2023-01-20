const express = require('express');
const mongoose = require('mongoose');
const User = require('./src/models/user.model.js');
const utils = require('./src/utils/utils.js');

const axios = require('axios');

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
        // console.log('data:', response.data);
        // const revdata = response.data.reverse();
        const pushEvent = response.data.find(event => event.type === 'PushEvent');
        if(pushEvent) {
            // console.log('commits: ', pushEvent.payload.commits);
            const commits = pushEvent.payload.commits.reverse();
            console.log("Push detected on repository: " + repositoryName + " with commit: " + commits[0].message);
        }
    } else if (action === "issue") {
        console.log("New issue detected on repository: " + repositoryName);
    }
    } catch (error) {
        console.error(error);
    }
}


function serverProcess() {
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