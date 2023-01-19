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