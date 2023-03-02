const { Octokit } = require("@octokit/rest");

const db = require("../../models");
const AccessTokens = db.accessTokens;

let lastETags = {};
let isFirstCheck = true;
let tooken = "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";

async function getRepositories(token) {
    const octokit = new Octokit({
        auth: tooken,
    });

    try {
        const response = await octokit.repos.listForAuthenticatedUser();
        return response.data.map((repo) => `${repo.owner.login}/${repo.name}`);
    } catch (error) {
        console.error(error);
        return [];
    }
}

const githubTrigger = {

    getGithubData: async function getGithubData(action, userID) {

        var accessTokensSchema = await AccessTokens.findOne({ownerUserID: userID});

        if (action === 'newCommit' || action === 'newIssue' || action === 'createIssue') {
            return getRepositories(accessTokensSchema)
                .then((repositories) => {
                    return repositories;
                })
        } else {
            return Promise.resolve([]);
        }
    },

    checkGithubAction: async function checkGithubAction(action) {
        const [ownerName, repoName] = action.chosenItem.split("/");
        switch (action.trigger) {
            case "newCommit":
                return await this.checkNewCommits(ownerName, repoName, action.token);
            case "newIssue":
                return await this.checkNewIssues(ownerName, repoName, action.token);
            // case "pullRequest":
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
        const [ownerName, repoName] = reaction.chosenItem.split("/");

        if (reaction.trigger !== "createIssue") {
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