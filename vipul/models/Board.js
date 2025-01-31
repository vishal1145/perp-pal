const mongoose = require('mongoose');


const boardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    color: { type: String, required: true },
});


const Board = mongoose.models.Board || mongoose.model('Board', boardSchema);
module.exports = Board;
