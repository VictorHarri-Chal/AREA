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
                DM : [
                    {
                        key : '208_terminator',
                        text: '208_terminator',
                        value: '208_terminator',

                    },
                    {
                        key : '209_teriaki',
                        text: '209_teriaki',
                        value: '209_teriaki',
                    }
                ]
            },
        ],
        reaction_blocs : [
            {
                key : 'github_createIssue',
                title: 'Create an issue',
                getADM : false,
            }
        ]
    },
    {
        key : 'twitter',
        title: 'Twitter',
        icon : <Icon icon="mdi:twitter" />,
        login : false,
        color : "#00acee"
    },
    {
        key : 'spotify',
        title: 'Spotify',
        icon : <Icon icon="mdi:spotify" />,
        login : true,
        color : "#1ed760",
        action_blocs : [
            {
                key : 'spotify_newStream',
                title: 'New stream',
            }
        ],
        reaction_blocs : [
            {
                key : 'spotify_newPlaylist',
                title: 'Create a playlist',
            }
        ]
    },
    {
        key : 'youtube',
        title: 'Youtube',
        icon : <Icon icon="mdi:youtube" />,
        login : true,
        color : "#fe0000"
    },
    {
        key : 'twitch',
        title: 'Twitch',
        icon : <Icon icon="mdi:twitch" />,
        login : true,
        color : "#6441a5"
    },
    {
        key : 'tools',
        title: 'Tools',
        icon : <Icon icon="mdi:puzzle" />,
        login : true,
        color : "#E7BC0D",
        action_blocs : [
            {
                key : 'blocs_and',
                title: 'And',
            },
            {
                key : 'blocs_or',
                title: 'Or',
            }
        ],
        reaction_blocs : [
            {
                key : 'blocs',
                title: 'NEED TO BE DEL',
            }
        ]

    }
]

export default ASData
