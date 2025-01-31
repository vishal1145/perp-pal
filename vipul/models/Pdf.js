const mongoose = require("mongoose");

const UploadDataSchema = new mongoose.Schema(
    {
        pdfFileName: {
            type: String,
            required: true,
        },
        filePath: {
            type: String,
            required: true,
        },
        jsonData: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("PdfData", UploadDataSchema);
