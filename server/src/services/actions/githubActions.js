const axios = require('axios');
const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  repositoryName: String,
  issueId: String,
  title: String,
  createdAt: Date,
});

const Issue = mongoose.model('Issue', issueSchema);

const githubTrigger = {
  checkGithubTrigger: async function checkGithubTrigger(action) {
    const repositoryName = action.data.repositoryName;
    const trigger = action.data.trigger;
    const access_token = action.token;
    let url = '';

    if (trigger === 'push') {
      url = `https://api.github.com/repos/${repositoryName}/events`;
    } else if (trigger === 'issue') {
      url = `https://api.github.com/repos/${repositoryName}/issues`;
    } else {
      console.log('Invalid action provided. Please provide a valid action.');
    }

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: 'Token ' + access_token,
        },
      });
      if (trigger === 'push') {
        const pushEvent = response.data.find((event) => event.type === 'PushEvent');
        if (pushEvent) {
          const commits = pushEvent.payload.commits.reverse();
          console.log(
            'Push detected on repository: ' + repositoryName + ' with commit: ' + commits[0].message
          );
          return true;
        }
      } else if (trigger === 'issue') {
        const currentIssue = response.data[0];
        const existingIssue = await Issue.findOne({ issueId: currentIssue.id });
        if (!existingIssue) {
          console.log(
            'New issue detected on repository: ' +
              repositoryName +
              ' with title: ' +
              currentIssue.title
          );
          const newIssue = new Issue({
            repositoryName: repositoryName,
            issueId: currentIssue.id,
            title: currentIssue.title,
            createdAt: currentIssue.created_at,
          });
          await newIssue.save();
          return true;
        }
      }
    } catch (error) {
      console.error(error);
    }
    return false;
  },
};

module.exports = githubTrigger;
