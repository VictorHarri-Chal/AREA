
export const menuButtons = [
    {
      name: "Discord",
      icon: "discord",
      color: "#7289da",
      login: false,
      action_blocs : [
        {
            key : 'discord_receivePrivateMessage',
            title: 'Get a PM',
        }
      ],
      reaction_blocs : [
        {
            key : 'discord_sendPrivateMessage',
            title: 'Send a PM',
        }
      ]
    },
    {
      name: "Github",
      icon: "github",
      color: "#99aab5",
      login: false,
      action_blocs : [
        {
            key : 'github_newCommit',
            title: 'New commit',
        },
      ],
      reaction_blocs : [
          {
              key : 'github_createIssue',
              title: 'Create an issue',
          }
      ]
    },
    {
      name: "Twitter",
      icon: "twitter",
      color: "#00acee",
      login: false,
      action_blocs : [
        {
            key : 'twitter_newTweet',
            title: 'New tweet',
        },
      ],
      reaction_blocs : [
          {
              key : 'twitter_sendTweet',
              title: 'Send a tweet',
          }
      ]
    },
    {
      name: "Spotify",
      icon: "spotify",
      color: "#1ed760",
      login: false,
      action_blocs : [
        {
            key : 'spotify_newStream',
            title: 'New stream',
        },
      ],
      reaction_blocs : [
        {
            key : 'spotify_createPlaylist',
            title: 'Create a playlist',
        },
      ]
    },
    {
      name: "Youtube",
      icon: "youtube",
      color: "#fe0000",
      login: false,
      action_blocs : [
        {
            key : 'youtube_newVideo',
            title: 'New video',
        },
      ],
      reaction_blocs : [
        {
            key : 'youtube_sendComment',
            title: 'Send a comment',
        },
      ]
    },
    {
      name: "Twitch",
      icon: "twitch",
      color: "#6441a5",
      login: false,
      action_blocs : [
        {
            key : 'twitch_newStream',
            title: 'New stream',
        },
      ],
      reaction_blocs : [
        {
            key : 'twitch_sendMessage',
            title: 'Send a message',
        },
      ]
    },
  ];

  export default menuButtons;