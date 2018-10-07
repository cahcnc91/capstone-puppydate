const express = require('express')
const router = express.Router();


//@route  GET api/userss/test
//@desc   Tests users route
//@access Public
router.get('/test', (req, res) => res.json({msg: 'Users works'}));

module.exports = router;