const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async() => {
    try{
        await mongoose.connect(db, { 
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex : true
        });
        console.log('Mongoose connected.');
    }
    catch(err){
        console.error(err);
        //Stop execution on error
        process.exit(1);
    }
}

module.exports = connectDB;