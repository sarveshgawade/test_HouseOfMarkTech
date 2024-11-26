import { configDotenv } from "dotenv";
configDotenv()
import app from "./app.js";

// importing the port from .env file. If nit found then port=3000 is set
const port = process.env.PORT || 3000

// starting the server on the respective port
app.listen(port,()=> {
    console.log(`Server listening on port: ${port}`)
})

