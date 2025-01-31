const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    className: { type: String, required: true },
    color: { type: String, required: true },
    boardIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
    }],
});

const Class = mongoose.models.Class || mongoose.model('Class', classSchema);

module.exports = Class;
