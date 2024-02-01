
import { getTickerData} from "../database.js";
export const getDataController=async(req,res)=>{
    try{
        try {
            const storedData = await getTickerData();
            res.json(storedData);
        } catch (error) {
            console.error('Error fetching data from the database', error);
            res.status(500).send('Internal Server Error');
        }
    }
    catch (error) {
        res.status(500).send('Internal Server Error');

    }
}