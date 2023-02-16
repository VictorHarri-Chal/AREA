const { Octokit } = require("@octokit/rest");

let lastETags = {};

const githubTrigger = {

    checkGithubAction: async function checkGithubAction(action) {
        const [ownerName, repoName] = action.data.split("/");
        switch (action.trigger) {
            case "push":
                return await this.checkNewCommits(ownerName, repoName, action.token);
            case "issue":
                return await this.checkNewIssues(ownerName, repoName, action.token);
            case "pull_request":
                return await this.checkNewPullRequests(ownerName, repoName, action.token);
            default:
                console.log(`Unsupported trigger type: ${action.trigger}`);
                return false;
        }
    },

    async checkNewCommits(ownerName, repoName, token) {
        return await this.checkNewEvents("PushEvent", ownerName, repoName, token, (event) => {
            console.log(`Commit: ${event.payload.commits[0].message}`);
        });
    },

    async checkNewIssues(ownerName, repoName, token) {
        return await this.checkNewEvents("IssuesEvent", ownerName, repoName, token, (event) => {
            console.log(`Issue: ${event.payload.issue.title}`);
        }, true);
    },

    async checkNewPullRequests(ownerName, repoName, token) {
        return await this.checkNewEvents("PullRequestEvent", ownerName, repoName, token, (event) => {
            console.log(`Pull Request: ${event.payload.pull_request.title}`);
        });
    },

    async checkNewEvents(eventType, ownerName, repoName, token, callback, reverse = false) {
        const octokit = new Octokit({ auth: token });
        const requestOptions = {
            owner: ownerName,
            repo: repoName,
            per_page: 100,
            page: 1,
            headers: { "If-None-Match": lastETags[eventType] },
        };

        try {
            const response = await octokit.activity.listRepoEvents(requestOptions);

            lastETags[eventType] = response.headers.etag;
            const events = response.data.filter((event) => event.type === eventType);

            if (events.length > 0) {
                console.log(`New ${eventType} events detected:`);
                if (reverse) {
                    callback(events[0]);
                } else {
                    events.forEach(callback);
                }
                return true;
            } else {
                console.log(`No new ${eventType} events since last request.`);
                return false;
            }
        } catch (error) {
            if (error.status === 304) {
                console.log(`No new ${eventType} events since last request.`);
                return false;
            } else {
                throw error;
            }
        }
    },

    checkGithubReaction: async function checkGithubReaction(reaction) {
    }
};

module.exports = githubTrigger;