
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
            getADM: true,
            getFTI: false,
            slot: 0,
        }
      ],
      reaction_blocs : [
        {
            id : 'discord_sendPrivateMessage',
            title: 'Send a PM',
            getADM: true,
            getFTI: false,
            slot: 0,
        },
        {
            id : 'discord_createNewGuild',
            title: 'Create a Guild',
            getADM: true,
            getFTI: false,
            slot: 0,
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
            getADM: true,
            getFTI: false,
            slot: 0,
        },
      ],
      reaction_blocs : [
          {
              id : 'github_createIssue',
              title: 'Create an issue',
              getADM: true,
              getFTI: false,
              slot: 0,
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
            getADM: true,
            getFTI: false,
            slot: 0,
        },
      ],
      reaction_blocs : [
        {
            id : 'twitter_sendTweet',
            title: 'Send a tweet',
            getADM: false,
            getFTI: true,
            slot: 0,
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
            getADM: false,
            getFTI: false,
            slot: 0,
        },
        {
            id : 'spotify_newPlaylist',
            title: 'New playlist',
            getADM: false,
            getFTI: false,
            slot: 1,
        }
      ],
      reaction_blocs : [
        {
            id : 'spotify_createPlaylist',
            title: 'Create a playlist',
            getADM: true,
            getFTI: false,
            slot: 0,
        },
        {
            id : 'spotify_pausePlayblack',
            title: 'Pause playback',
            getADM: false,
            getFTI: false,
            slot: 1,
        },
        {
            id : 'spotify_randomTrack',
            title: 'Random track to queue',
            getADM: false,
            getFTI: false,
            slot: 2,
        }
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
            getADM: true,
            getFTI: false,
            slot: 0,
        },
      ],
      reaction_blocs : [
        {
            id : 'youtube_sendComment',
            title: 'Send a comment',
            getADM: true,
            getFTI: false,
            slot: 0,
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
            getADM: true,
            getFTI: false,
            slot: 0,
        },
      ],
      reaction_blocs : [
        {
            id : 'twitch_sendMessage',
            title: 'Send a message',
            getADM: true,
            getFTI: false,
            slot: 0,
        },
      ]
    },
  ];

  export default menuButtons;