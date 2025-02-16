import express from 'express'
import { recordController } from '../DIP/recordsDIP'


const recordRouter = express.Router()

recordRouter.get('/:userId',recordController.fetchById.bind(recordController))
recordRouter.post('/create',recordController.execute.bind(recordController))

export default recordRouter;