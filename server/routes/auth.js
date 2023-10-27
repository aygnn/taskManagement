import { Router } from 'express'
 import {login,postUser} from '../controllers/auth.js'

const router = new Router()


router.get('/',(req,res)=>{
    res.send("Auth")
})

// Register
// http://localhost:6060/auth/register
router.get('/register',(req,res)=>{
    res.send("Reg")
})
router.post('/register', postUser)



// Login
// http://localhost:6060/auth/login
router.post('/login', login)



export default router



