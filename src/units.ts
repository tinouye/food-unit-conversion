const router = express.Router()
const csv = require('csv-parser')
const fs = require('fs')

const units = {}

router.get('/', (req, res) => {
    console.log("foo")
})