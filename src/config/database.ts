import { connect } from "mongoose";
import { MONGODB_URI } from "../utils/secret";
const mongoURI: string = MONGODB_URI

const databaseConnect = async () => {
    try {
        await connect(mongoURI);
        console.log("Database connection successful");
    } catch (error) {
        console.log(error);
        console.log("Database connection error");
    }
}

export default databaseConnect;
