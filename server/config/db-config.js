import mongoose from "mongoose";

const DbConfig = async () => {
    try {
         // Ensure that MONGO_URI is present in the environment variables
         if (!process.env.MONGO_URI) {
            console.error("MONGO_URI is not defined");
            process.exit(1);
        }
        // Connect to MongoDB using Mongoose
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default DbConfig;