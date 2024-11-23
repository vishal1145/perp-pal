import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    about:string;
    address:string;
    profileImage:string;
}

const userSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    
    about: {
        type: String, 
    },
    address: {
        type: String, 
    },
    profileImage:{
      type:String,
    }
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
