const Twitter = require('twitter-api-client');

// Initialize the client with your API key and secret

// Function to follow a random user
async function followRandomUser(reaction) {
    const twitterClient = new Twitter.TwitterClient({
        apiKey: 'N8hr5udpp5kKD4P6p4menRdc7',
        apiSecret: 'VHNHxjDjVkDf0XfGirloJay8Vba9Zd1OoTzJj4JcHf8l4laVCO',
        accessToken: reaction.token,
    });
    try {
        // Get a list of random users
        const response = await twitterClient.accountsAndUsers.usersSearch({ q: 'random', count: 10 });

        // Select a random user from the list
        const randomUser = response.users[Math.floor(Math.random() * response.users.length)];

        // Follow the selected user
        const followResponse = await twitterClient.accountsAndUsers.follow({ user_id: randomUser.id_str });

        console.log(`Followed user @${randomUser.screen_name}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Export the Twitter trigger object
const twitterTrigger = {
    checkTwitterAction: async function checkTwitterAction(action) {
        // Implement the checkTwitterAction function as before
    },

    checkTwitterReaction: async function checkTwitterReaction(reaction) {
    if (reaction.trigger == "followRandomUser")
        await followRandomUser(reaction);
    },
};

module.exports = twitterTrigger;
