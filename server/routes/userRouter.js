import { Router } from 'express'
 import {getUsers,getUserById,UpdateUser,DeleteUser} from '../controllers/auth.js'

 
const router = new Router()
// Get Me
// http://localhost:6060/users
router.get('/',getUsers)

//get by id 

router.get('/:id', getUserById);


//UPDATE
router.put("/:id", UpdateUser)

//DELETE
router.delete("/:id", DeleteUser)



export default router