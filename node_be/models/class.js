const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    className: { type: String, required: true },
    color: { type: String, required: true },
    boardIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
    }],
    publishStatus: {
        type: String,
        enum: ["published", "unpublished"],
        default: "published",
    }
});

const Class = mongoose.models.Class || mongoose.model('Class', classSchema);

module.exports = Class;
