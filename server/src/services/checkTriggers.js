const Area = require('../models/ar.model');
const Services = require('./services');


const trigger = {
    checkTriggers: async function checkTriggers() {
        try {
            const areas = await Area.find();
            for (const area of areas) {
                const actionServiceFunction = Services[area.action.service];
                const reactionServiceFunction = Services[area.reaction.service];
                if (await actionServiceFunction.checkTrigger(area.action)) {
                    reactionServiceFunction.startReaction(area.reaction);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = trigger;
