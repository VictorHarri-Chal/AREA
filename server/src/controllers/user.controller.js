// Un contrôleur intéragis avec MongoDB avec Mongoose et envoie des réponses HTTP au client

exports.allAccess = (req, res) => {
    console.log('accessed public');
    res.status(200).send("Public Permission.");
};

exports.userAccess = (req, res) => {
    console.log('accessed user');
    res.status(200).send("User Permission.");
};

exports.adminAccess = (req, res) => {
    console.log('accessed admin');
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
                            name: "new_issue_on_a_repository",
                            description: "A new issue is opened on a specific repository"
                        },
                        {
                            name: "new_push_on_a_repository",
                            description: "A new push on a specific repository"
                        },
                    ],
                    reactions: [
                        {
                            name: "new_issue_on_a_repository",
                            description: "Creates an issue on a specific repository"
                        }
                    ],
                    name: "spotify",
                    actions: [
                        {
                            name: "",
                            description: ""
                        },
                        {
                            name: "",
                            description: ""
                        },
                    ],
                    reactions: [
                        {
                            name: "",
                            description: ""
                        }
                    ]
                }
            ]
        }
    };
    res.json(response);
};
