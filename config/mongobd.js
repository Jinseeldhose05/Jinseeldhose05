const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/example'; // Replace with your actual MongoDB URI

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error.message);
        process.exit(1); // Exit process if connection fails
    }
};

module.exports = connectDB;