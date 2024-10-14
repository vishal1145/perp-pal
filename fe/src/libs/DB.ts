import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI || '').then(()=>{
    console.log('connet db')
  }).catch((err)=>[
    console.log(err)
  ]);
};

export default connectDB;
