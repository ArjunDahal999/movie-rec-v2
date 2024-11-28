
import express from 'express'
import authRoute from './auth-route'
import bookMarkRoute from './bookmark-route'
import { userAuthenication } from '../middleware/authenticate-user';

const router = express.Router();

router.use('/', authRoute)
router.use('/', userAuthenication, bookMarkRoute)


export default router