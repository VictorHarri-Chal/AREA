const axios = require('axios');

let lastCommitSHA = '';

const githubTrigger = {
    checkGithubTrigger: async function checkGithubTrigger(action) {
        const repositoryName = action.data.repositoryName;
        const trigger = action.data.trigger;
        const access_token = action.token;
        let url = '';

        if (trigger === "push") {
            url = `https://api.github.com/repos/${repositoryName}/events`;
        } else if (trigger === "issue") {
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
        if (trigger === "push") {
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
        } else if (trigger === "issue") {
            console.log("New issue detected on repository: " + repositoryName);
        }
        } catch (error) {
            console.error(error);
        }
    }
}


module.exports = githubTrigger;
