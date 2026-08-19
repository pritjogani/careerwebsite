const mongoose = require('mongoose');


const URI = process.env.MONGODB_URI;


const connectdb = async () =>{
    try{
        
        await mongoose.connect(URI)

        console.log("database connection sucessful")

        
    } catch(error){

        console.error('database connection fail')
        process.exit(0)
    }
}

module.exports = connectdb;