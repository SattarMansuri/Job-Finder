const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/authMiddleware')
const jobController = require('../controllers/jobDetail')

router.post('/create', verifyToken, jobController.createJobPost)
router.get('/details/:jobId', jobController.getJobDetailsById)
router.get('/all-jobs', jobController.getAllJobs)
router.put('/edit/:jobId', verifyToken, jobController.UpdateJobDetailsById)

module.exports = router