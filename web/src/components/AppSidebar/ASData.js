import { Icon } from '@iconify/react';

export const ASData = [
    {
        key : 'discord',
        title: 'Discord',
        icon : <Icon icon="mdi:discord" />,
        login : false,
        color : "#7289da",
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
        key : 'github',
        title: 'Github',
        icon : <Icon icon="mdi:github" />,
        login : false,
        color : "#99aab5",
        action_blocs : [
            {
                key : 'github_newCommit',
                title: 'New commit [GNC_DM]',
                placeHolder : 'Select a repository',
                getADM : true,
                DM : []
            },
            {
                key : 'github_newIssue',
                title: 'New commit [GNC_DM]',
                placeHolder : 'Select a repository',
                getADM : true,
                DM : []
            },
        ],
        reaction_blocs : [
            {
                key : 'github_createIssue',
                title: 'Create an issue',
                placeHolder : 'Select a repository',
                getADM : true,
                DM: []
            },
        ]
    },
    {
        key : 'twitter',
        title: 'Twitter',
        icon : <Icon icon="mdi:twitter" />,
        login : false,
        color : "#00acee",
        action_blocs : [],
        reaction_blocs : []
    },
    {
        key : 'spotify',
        title: 'Spotify',
        icon : <Icon icon="mdi:spotify" />,
        login : false,
        color : "#1ed760",
        action_blocs : [
            {
                key : 'spotify_newStream',
                title: 'New stream',
            },
            {
                key : 'spotify_newPlaylist',
                title: 'New playlist',
            }
        ],
        reaction_blocs : [
            {
                key : 'spotify_createPlaylist',
                title: 'Create a playlist',
            },
            {
                key : 'spotify_pausePlayblack',
                title: 'Pause playback',
            },
            {
                key : 'spotify_randomTrack',
                title: 'Random track to queue',
            }
        ]
    },
    {
        key : 'youtube',
        title: 'Youtube',
        icon : <Icon icon="mdi:youtube" />,
        login : false,
        color : "#fe0000",
        action_blocs : [],
        reaction_blocs : []
    },
    {
        key : 'twitch',
        title: 'Twitch',
        icon : <Icon icon="mdi:twitch" />,
        login : false,
        color : "#6441a5",
        action_blocs : [
            {
                key : 'twitch_onStream',
                title: 'On stream',
                getADM : true,
                placeHolder : 'Select a streamer',
                DM : []
            }
        ],
        reaction_blocs : [
            {
                key : 'twitch_banRandom',
                title: 'Ban a random',
            }
        ]
    }
]

export default ASData
