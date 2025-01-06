import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
    },
    color: {
        type: String,
    },
    image: {
        type: String,
    },
    classIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
    }],
})

const Subject = mongoose.models.Subject || mongoose.model('Subject', subjectSchema);

export default Subject;