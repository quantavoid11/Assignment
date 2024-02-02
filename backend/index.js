import express from 'express';
import dotenv from 'dotenv';
import {getDataController} from "./Controller/getDataController.js";
import {connectToDb, createTable} from "./database.js";
import cors from "cors";

dotenv.config({
    path:"./.env"
});
const app=express();

app.use(cors({origin:'*'}));

app.get("/getStoredData",getDataController);


connectToDb()
    .then(()=>{
        createTable()
            .then(()=>{
                app.listen(3000,()=>{
                    console.log("app is listening on port 3000")
                })
            })
            .catch(error=>{
                console.log(error);
            })
    })
    .catch(error=>{
        console.log(error);
    })


