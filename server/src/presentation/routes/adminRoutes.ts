import express from 'express'
import { adminController } from '../DIP/adminDIP'


const adminRouter = express.Router()

adminRouter.get('/users', adminController.execute.bind(adminController));

export default adminRouter;