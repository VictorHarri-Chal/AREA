const axios = require('axios');

let lastCommitSHA = '';

const trigger = {
    checkGithubTrigger: async function checkGithubTrigger(schema) {
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
                console.log("ici ça check");
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
}

module.exports = trigger;
