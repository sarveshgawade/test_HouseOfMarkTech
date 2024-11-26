import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv()

// function to connect with MongoDB 
const connectToDB = async () => {
    try {

        // connecting with the database using the url provided in the .env file
        const {connection} = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected with DB: ${connection.host}`);
        
    } catch (error) {
        console.log(`Error in DB connection: ${error}`);
    }
}

export default connectToDB