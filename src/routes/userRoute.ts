import { Router } from "express";
import UserController from "../controllers/UserController";
import auth from '../middlewares';

const router = Router()

router
    .post("/users", UserController.create)

router.use(auth)
router
    .get("/users", UserController.getAll)
    .get("/users/:id", UserController.getOne)
    .put("/users/:id", UserController.update)
    .delete("/users/:id", UserController.destroy)

export default router