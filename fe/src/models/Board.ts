import mongoose, { Document, Schema, Model } from "mongoose";

export interface IBoard extends Document {
    name: string;
    image: string;
    color: string;
}

const boardSchema = new Schema<IBoard>({
    name: { type: String },
    image: { type: String },
    color: { type: String },
});

const Board: Model<IBoard> = mongoose.models.Board || mongoose.model<IBoard>('Board', boardSchema);

export default Board;
