const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
    service: {
        type: String,
        required: true
    },
    trigger : {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    data: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const reactionSchema = new mongoose.Schema({
    service: {
        type: String,
        required: true
    },
    trigger : {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    data: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const areaSchema = new mongoose.Schema({
    action: {
        type: actionSchema
    },
    reaction: {
        type: reactionSchema
    }
});

module.exports = mongoose.model('Area', areaSchema);
