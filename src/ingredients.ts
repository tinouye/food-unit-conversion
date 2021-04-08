import express from "express"
const router = express.Router()
const unitsObject = require("./densities.json")

const ingredients = []

router.get('/', (req, res) => {
    res.json(unitsObject)
})

module.exports = router