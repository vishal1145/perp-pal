const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://vipulkumar995318:3pWeycwuMFNdLuHC@cluster0.rjavb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', 
      {
        useNewUrlParser: true,  
        useUnifiedTopology: true,  
      }
    );
 
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;



