import express from "express"
const router = express.Router()
const unitsObject = require("./units.json")

const units = {}

router.get('/', (req, res) => {
    res.json(unitsObject)
})

module.exports = router