const mongoose = require('mongoose');


const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/user-auth')
        console.log('Connected to database');
    }catch(err){
        console.log(err);
    }
}

module.exports = connectDB;
