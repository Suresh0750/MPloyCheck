import express from 'express'
import cors from 'cors' 
import userRouter from './presentation/routes/userRoutes';
import recordRouter from './presentation/routes/recordRoutes';
import adminRouter from './presentation/routes/adminRoutes';
import { errorHandler } from './presentation/middlewares/ErrorHandler';
import { CLIENT_URL } from './config/env'; 


const app = express()

console.log("CLIENT_URL",CLIENT_URL)
app.use(cors({
    origin : CLIENT_URL,
    credentials : true,
}))

app.use(express.json())

app.use('/api/user',userRouter)
app.use('/api/record',recordRouter)
app.use('/api/admin',adminRouter)

app.use(errorHandler)

export default app; 