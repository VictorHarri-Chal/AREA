import React from 'react'
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
                title: 'Get a private message',
            }
        ],
        reaction_blocs : [
            {
                key : 'discord_sendPrivateMessage',
                title: 'Send a private message',
            }
        ]
    },
    {
        key : 'github',
        title: 'Github',
        icon : <Icon icon="mdi:github" />,
        login : true,
        color : "#99aab5"
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
        color : "#1ed760"
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
        key : 'blocs',
        title: 'Blocs',
        icon : <Icon icon="mdi:puzzle" />,
        color : "#99aab5"
    }
]

export default ASData
