import express from 'express'
import { recordController } from '../DIP/recordsDIP'
import { authorizeJwt } from '../DIP/middleware'
import { authorizeRole } from '../middlewares/authorizeRole'
import { Role } from '@/domain/entities/utils'

const recordRouter = express.Router()

recordRouter.get('/:userId',authorizeJwt.execute,authorizeRole([Role.Admin,Role.User]),recordController.fetchById.bind(recordController))
recordRouter.post('/create',authorizeJwt.execute,authorizeRole([Role.Admin,Role.User]),recordController.execute.bind(recordController))

export default recordRouter;    