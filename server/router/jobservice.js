const express = require('express');
const router = express.Router();
const hrmiddleware = require('../middleware/hr-middleware');
const usermiddleware = require('../middleware/usermiddleware');
const authjob = require("../controller/jobscontroller")


router.route("/addjob").post(usermiddleware,hrmiddleware,authjob.addJob)
router.route("/updatejob/:id").put(usermiddleware, hrmiddleware,authjob.updatejobinfo) //testing is not done
router.route("/deletejob/job/:id").delete(usermiddleware, hrmiddleware, authjob.deletejob) //testing is not done
router.route("/alljobtitle").get(authjob.getAlljobtitle)
router.route("/alljobtitle").get(authjob.getAlljobtitle)


module.exports = router;

