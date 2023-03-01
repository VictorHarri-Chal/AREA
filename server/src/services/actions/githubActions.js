const { Octokit } = require("@octokit/rest");

let lastETags = {};
let isFirstCheck = true;

const githubTrigger = {
    checkGithubAction: async function checkGithubAction(action) {
        const [ownerName, repoName] = action.data.split("/");
        switch (action.trigger) {
            case "push":
                return await this.checkNewCommits(ownerName, repoName, action.token);
            case "issue":
                return await this.checkNewIssues(ownerName, repoName, action.token);
            // case "pull_request":
            //     return await this.checkNewPullRequests(ownerName, repoName, action.token);
            default:
                console.log(`Unsupported trigger type: ${action.trigger}`);
                return false;
        }
    },

    async checkNewCommits(ownerName, repoName, token) {
        const octokit = new Octokit({ auth: token });
        const requestOptions = {
            owner: ownerName,
            repo: repoName,
            per_page: 1,
            page: 1,
            headers: { "If-None-Match": lastETags["PushEvent"] },
        };

        try {
            const response = await octokit.activity.listRepoEvents(requestOptions);
            lastETags["PushEvent"] = response.headers.etag;
            const event = response.data[0];

            // console.log('test');
            if (isFirstCheck) {
                isFirstCheck = false;
                // console.log(`No new PushEvent events since last request.`);
                return false;
            }
            if (event) {
                console.log(`Last push event detected: ${event.payload.commits[0].message}`);
                return true;
            } else {
                // console.log(`No new PushEvent events since last request.`);
                return false;
            }
        } catch (error) {
            if (error.status === 304) {
                // console.log(`No new PushEvent events since last request.`);
                return false;
            } else {
                throw error;
            }
        }
    },

    async checkNewIssues(ownerName, repoName, token) {
        const octokit = new Octokit({ auth: token });
        const requestOptions = {
            owner: ownerName,
            repo: repoName,
            per_page: 1,
            page: 1,
            headers: { "If-None-Match": lastETags["IssuesEvent"] },
        };

        try {
            const response = await octokit.issues.listForRepo(requestOptions);
            lastETags["IssuesEvent"] = response.headers.etag;
            const issue = response.data[0];

            if (isFirstCheck) {
                isFirstCheck = false;
                // console.log(`No new IssuesEvent events since last request.`);
                return false;
            }
            if (issue) {
                console.log(`Last issue detected: ${issue.title}`);
                return true;
            } else {
                // console.log(`No new IssuesEvent events since last request.`);
                return false;
            }
        } catch (error) {
            if (error.status === 304) {
                // console.log(`No new IssuesEvent events since last request.`);
                return false;
            } else {
                throw error;
            }
        }
    },

    checkGithubReaction: async function checkGithubReaction(reaction) {
        const [ownerName, repoName] = reaction.data.split("/");

        if (reaction.trigger !== "issue") {
            console.log(`Unsupported trigger type: ${trigger}`);
            return false;
        }

        const octokit = new Octokit({ auth: reaction.token });

        try {

            const issue = await octokit.issues.create({
                owner: ownerName,
                repo: repoName,
                title: "New issue created by reaction",
                body: "This issue was created in response to a reaction on an existing issue.",
            });


            console.log(`Created new issue: ${issue.data.html_url}`);
            return true;
        } catch (error) {
            console.error(`Error creating issue: ${error}`);
            return false;
        }
    }

};

module.exports = githubTrigger;