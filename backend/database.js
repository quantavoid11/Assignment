import pkg from 'pg';
import axios from "axios";
const {Client} = pkg;
import dotenv from 'dotenv';
dotenv.config({
    path:"./.env"
})
 const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});


export const connectToDb=async ()=> {
    try {
        await client.connect();
        console.log("Connected to Database")
    } catch (error) {
        console.log("Database connection error ", error);
        process.exit(1);
    }
}


 export const createTable=async ()=> {
     const createTable = `
  CREATE TABLE IF NOT EXISTS ticker_data (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) ,
    last NUMERIC,
    buy NUMERIC,
    sell NUMERIC,
    volume NUMERIC,
    base_unit VARCHAR(20),
    UNIQUE(name)
  );
`;
    try {
        await client.query(createTable);
        console.log("Table Created");
    } catch (error) {
        console.log("Error Creating table", error);
    }

}
export const fetchData=async ()=>{
    try{
        const response=await axios.get('https://api.wazirx.com/api/v2/tickers');
        const tickers=response.data;
        const key=Object.values(tickers);
        for(let i=0;i<10;i++){
            const ticker = key[i];
            console.log(ticker)
            const insertIntoTable = `
        INSERT INTO ticker_data (name, last, buy, sell, volume, base_unit)
  SELECT
    $1::VARCHAR AS name,
    $2 AS last,
    $3 AS buy,
    $4 AS sell,
    $5 AS volume,
    $6 AS base_unit
  WHERE NOT EXISTS (
    SELECT 1
    FROM ticker_data
    WHERE name = $1
  )
  RETURNING *;
      `;
            const values = [
                ticker.name,
                parseFloat(ticker.last),
                parseFloat(ticker.buy),
                parseFloat(ticker.sell),
                parseFloat(ticker.volume),
                ticker.base_unit,
            ];
            await client.query(insertIntoTable, values);

        }
        console.log("Tickers' data fetched successfully")
    }
    catch (error){
        console.log("Error fetching data",error);
    }
}
export const getTickerData=async ()=>{
    const query = 'SELECT * FROM ticker_data LIMIT 10;';
    try {
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching data from the database', error);
        return [];
    }
}




