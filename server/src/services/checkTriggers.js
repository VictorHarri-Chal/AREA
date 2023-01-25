const Area = require('../models/ar.model');
const Services = require('./services')


async function checkTriggers() {
    try {
        const areas = await Area.find();

        for (const area of areas) {
            const serviceFunction = Services[area.service];
            if (await serviceFunction.checkTrigger(area.action)) {
                serviceFunction.startReaction(area.reaction);
            }
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = checkTriggers;
