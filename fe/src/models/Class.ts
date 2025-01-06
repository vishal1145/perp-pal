import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    className: {
        type: String,
    },
    color: {
        type: String,
    },
    boardIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
    }],
})

const Class = mongoose.models.Class || mongoose.model('Class', classSchema);

export default Class;