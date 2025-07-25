import mongoose from "mongoose";

const connectionDB = async ()=>{
    try {
        await mongoose.connect(process.env.URL_MDB);
        console.log(`\n DB connnected sucessfully`);
    } catch (error) {
        console.log("DB connection Error", error);
        process.exit(1)
    }
}

export  {connectionDB};
