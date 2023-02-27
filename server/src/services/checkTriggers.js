const Area = require('../models/ar.model');
const Services = require('./services');


const trigger = {
    checkTriggers: async function checkTriggers() {
        try {
            const areas = await Area.find();
            for (const area of areas) {
                const serviceFunction = Services[area.action.service];
                const reactionFunction = Services[area.reaction.service];
                if (await serviceFunction.checkTrigger(area.action)) {
                    reactionFunction.startReaction(area.reaction);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = trigger;
