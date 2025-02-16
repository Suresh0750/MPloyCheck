import express from 'express'
import { adminController } from '../DIP/adminDIP'


const adminRouter = express.Router()

adminRouter.delete('/users/:id',adminController.deleteUser.bind(adminController))
adminRouter.route('/users').get(adminController.execute.bind(adminController)).put(adminController.updateUser.bind(adminController))
export default adminRouter;