import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import path from "path"
import urlRouter from './routes/url.js'
import {connectionDB} from "./db.js"
import URL from "./model/url.js";
import cors from 'cors'

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const app = express();
const port = process.env.PORT || 5000;


connectionDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
}).catch((error) => {
    console.log("Failed to connect to DB", error);
    process.exit(1);
});

app.use(cors());

app.use(express.json());

app.get('/', (req, res) =>{
    return res.send("hello");
})
app.use('/url', urlRouter );



