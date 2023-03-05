// Un contrôleur intéragis avec MongoDB avec Mongoose et envoie des réponses HTTP au client

exports.allAccess = (req, res) => {
    res.status(200).send("Public Permission.");
};

exports.userAccess = (req, res) => {
    res.status(200).send("User Permission.");
};

exports.adminAccess = (req, res) => {
    res.status(200).send("Admin Only Permission.");
};

exports.about = (req, res) => {
    const response = {
        client: {
            host: req.connection.remoteAddress
        },
        server: {
            current_time: Math.floor(Date.now() / 1000), // Convert to Unix Time Stamp format
            services: [
                {
                    name: "github",
                    actions: [
                        {
                            name: "newIssue",
                            description: "A new issue is opened on a specific repository"
                        },
                        {
                            name: "newCommit",
                            description: "A new commit on a specific repository"
                        },
                    ],
                    reactions: [
                        {
                            name: "createIssue",
                            description: "Creates an issue on a specific repository"
                        }
                    ]
                },
                {
                    name: "discord",
                    actions: [
                        {
                            name: "receivePrivateMessage",
                            description: "Receives a private message"
                        },
                    ],
                    reactions: [
                        {
                            name: "sendPrivateMessage",
                            description: "Sends a private message"
                        },
                        {
                            name: "createNewGuild",
                            description: "Creates a new guild"
                        }
                    ]
                },
                {
                    name: "twitter",
                    actions: [],
                    reactions: [
                        {
                            name: "followRandomUser",
                            description: "Follows a random user"
                        },
                    ]
                },
                {
                    name: "spotify",
                    actions: [
                        {
                            name: "newStream",
                            description: "New stream"
                        },
                        {
                            name: "newPlaylist",
                            description: "New playlist"
                        },
                    ],
                    reactions: [
                        {
                            name: "createPlaylist",
                            description: "Creates a playlist"
                        },
                        {
                            name: "pausePlayback",
                            description: "Pauses playback"
                        },
                        {
                            name: "randomTrack",
                            description: "Adds random track to queue"
                        },
                    ]
                },
                {
                    name: "youtube",
                    actions: [
                        {
                            name: "newLike",
                            description: "New like on a video"
                        },
                        {
                            name: "newVideo",
                            description: "New video uploaded"
                        },
                    ],
                    reactions: []
                },
                {
                    name: "twitch",
                    actions: [
                        {
                            name: "onStream",
                            description: "Specific streamer is live"
                        },
                    ],
                    reactions: [
                        {
                            name: "banRandom",
                            description: "Bans a random user"
                        },
                    ]
                }
            ]
        }
    };
    res.json(response);
};
