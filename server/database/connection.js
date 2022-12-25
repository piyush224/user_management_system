const mongoose =  require("mongoose");
const MONGO_URI = "";

const connectDB = async ()=>{
    try{
        const con = await mongoose.connect(MONGO_URI, {
            useNewUrlParser : true,
            useUnifiedTopology : true,
        });
        console.log(`MongoDB Connected :${con.connection.host}`);
    }catch(err){
        console.log("#####################");
        console.log(err);
        console.log("#####################");
        process.exit(1);
        
    }
}

module.exports = connectDB;