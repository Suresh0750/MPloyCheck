

import RecordsRepsitory from "@/infrastructure/database/repositories/RecordsRepository";
import RecordController from "../controllers/recordsController";
import RecordsUsecase from "@/application/use_cases/user/RecordsUseCase";


const recordsRepsitory = new RecordsRepsitory()
const recordsUsecase = new RecordsUsecase(recordsRepsitory)
const recordController = new RecordController(recordsUsecase)

export {recordController} 