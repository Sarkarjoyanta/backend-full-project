const express = require('express')
const router = express.Router()
const apiRoutes = require("./api")

const api = process.env.BASE_URL

router.use(api, apiRoutes)
router.use(api,function(req, res){
   return res.send({error: "NO API FOUND ON THIS ROUTE"})
})

module.exports = router;