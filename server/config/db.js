import mongoose from "mongoose";

export const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MONGODB CONNECTED`.italic.bold.white);
    }
    catch(error){
        console.log(`Error: ${error.message}`.bold.red);
    }
}