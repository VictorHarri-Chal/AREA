
export const menuButtons = [
    {
      name: "Discord",
      icon: "discord",
      color: "#7289da",
      login: false,
      action_blocs : [
        {
            id : 'discord_receivePrivateMessage',
            title: 'Get a PM',
        }
      ],
      reaction_blocs : [
        {
            id : 'discord_sendPrivateMessage',
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
            id : 'github_newCommit',
            title: 'New commit',
        },
      ],
      reaction_blocs : [
          {
              id : 'github_createIssue',
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
            id : 'twitter_newTweet',
            title: 'New tweet',
        },
      ],
      reaction_blocs : [
          {
              id : 'twitter_sendTweet',
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
            id : 'spotify_newStream',
            title: 'New stream',
        },
      ],
      reaction_blocs : [
        {
            id : 'spotify_createPlaylist',
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
            id : 'youtube_newVideo',
            title: 'New video',
        },
      ],
      reaction_blocs : [
        {
            id : 'youtube_sendComment',
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
            id : 'twitch_newLivestream',
            title: 'New livestream',
        },
      ],
      reaction_blocs : [
        {
            id : 'twitch_sendMessage',
            title: 'Send a message',
        },
      ]
    },
  ];

  export default menuButtons;