import express from 'express'
// prettier-ignore
import  {createUser, deleteUser, getOneUser, getUsers} from '../controller/users.js'

const router = express.Router()

router.get('/', getUsers)

router.get('/:fname', getOneUser)

router.delete('/:fname', deleteUser)

router.post('/', createUser)

export default router
