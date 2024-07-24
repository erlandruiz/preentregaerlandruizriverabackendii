import { Router } from "express";
import * as controllerUser from '../controllers/user.controllers.js'

const router = Router();

router.post('/', controllerUser.createUser);
router.get('/', controllerUser.getAllUser);
router.get('/:id', controllerUser.getUserById)



export default router;
