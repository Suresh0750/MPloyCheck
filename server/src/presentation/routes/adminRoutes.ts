import express from 'express'
import { adminController } from '../DIP/adminDIP'
import { authorizeJwt } from '../DIP/middleware'
import { authorizeRole } from '../middlewares/authorizeRole'
import { Role } from '@/domain/entities/utils'

const adminRouter = express.Router()

adminRouter.delete('/users/:id',authorizeJwt.execute,authorizeRole([Role.Admin]),adminController.deleteUser.bind(adminController))

adminRouter.route('/users')
  .all(authorizeJwt.execute,authorizeRole([Role.Admin]))
  .get(adminController.execute.bind(adminController))
  .put(adminController.updateUser.bind(adminController));

export default adminRouter;