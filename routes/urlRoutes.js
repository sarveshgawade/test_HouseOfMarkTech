import {Router} from 'express'
import {shorten,redirect, getStats} from '../controllers/urlController.js'

// taking a router instance
const router = Router()

// defining the routes as per requirement
router.post('/shorten',shorten)
router.get('/:shortId',redirect)
router.get('/stats/:shortId',getStats)

// exporting the router 
export default router