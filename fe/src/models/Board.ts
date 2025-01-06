
import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    color: {
        type: String,
    },
});

const Board = mongoose.models.Board || mongoose.model('Board', boardSchema);

export default Board;
