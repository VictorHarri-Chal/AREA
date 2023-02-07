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