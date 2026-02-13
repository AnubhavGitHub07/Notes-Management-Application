import dotenv from "dotenv"; 
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000; // Default port is 3000

connectDB();

app.listen(PORT , "0.0.0.0" , () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});