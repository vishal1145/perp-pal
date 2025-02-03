const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const subjectSchema = new Schema({
    subjectName: { type: String, required: true },
    color: { type: String, required: true },
    image: { type: String, required: false },
    classIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
    }],
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
    content: { type: String, required: true },
    publishStatus: {
        type: String,
        enum: ["published", "unpublished"],
        default: "published",
    }
});

const Subject = mongoose.models.Subject || model('Subject', subjectSchema);

module.exports = Subject;
