import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkWebhooks } from './controllers/webhooks.js';
import connectDB from './configs/mongodb.js';


const app = express();
const PORT = process.env.PORT || 3000;

//connecting db
await connectDB();

//Middlewares
app.use(cors());

//Routes list
app.get('/', (req, res)=> {
    res.send("API Working!")
})
app.post('/clerk', express.json(), clerkWebhooks)


app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})

