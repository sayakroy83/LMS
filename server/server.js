import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import { clerkWebhooks } from './controllers/webhooks.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

//Routes
app.get('/', (req, res)=> {
    res.send("Working!")
})
app.post('/clerk', express.json(), clerkWebhooks)

mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("MongoDB Connected !!")
    app.listen(PORT, ()=> {console.log(`Server is running on port ${PORT}`)})
})
.catch((err)=> {
    console.log("MongoDB Connection Failed !!", err)
})

