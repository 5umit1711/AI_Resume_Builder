import express from 'express';
import dotenv from 'dotenv';
import connection from './config/connection.js';
import resumeRouter from './routes/routes.js';
import bodyParser from 'body-parser';
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

app.use("/api", resumeRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
})


app.listen(PORT, async()=>{
    await connection();
    console.log("Server started");
})