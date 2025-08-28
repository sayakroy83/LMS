import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js';
import connectDB from './configs/mongodb.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';
import courseRouter from './routes/courseRoute.js';
import userRouter from './routes/userRoutes.js';


const app = express();
const PORT = process.env.PORT || 5000;

//connecting db
await connectDB();
await connectCloudinary()

//Middlewares
app.use(cors());
app.use(clerkMiddleware())

//Routes list
app.get('/', (req, res)=> {
    res.send("API Working!")
})
app.post('/clerk', express.json(), clerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter)
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)
app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)


app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})

