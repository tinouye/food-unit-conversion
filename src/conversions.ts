const convert = require('convert-units')
const densityTable = require('./densities.json')

const weight = {"oz":"Ounce", "lb":"Pound", "g":"Gram", "kg":"Kilogram"}
const volume = {
"tsp":"Teaspoon",
"tbsp":"Tablespoon",
"fl-oz":"Fluid Ounce",
"cup":"Cup",
"pint":"Pint",
"quart":"Quart",
"gal":"Gallon"
}

const findUnitType = function(unit: string) {
    if (unit in weight) {
        return "weight"
    }
    else if (unit in volume) {
        return "volume"
    }
    else {
        throw(new Error("Invalid Unit"))
    }
}

const makeConversion = function(reqbody) {
    let output: number
    console.log(reqbody)

    const unit1Type = findUnitType(reqbody.unit1)
    const unit2Type = findUnitType(reqbody.unit2)

    //Convert directly if 2 units are same type
    if (unit1Type == unit2Type) {
        output = convert(reqbody.val1).from(reqbody.unit1).to(reqbody.unit2)
    }
    else {
        let bridgeStart: string
        let bridgeEnd: string
        let conversionFactor: number
        if (unit1Type == "weight") {
            bridgeStart = "g"
            bridgeEnd = "ml"
            conversionFactor = 1/reqbody.density
        }
        else if (unit1Type == "volume") {
            bridgeStart = "ml"
            bridgeEnd = "g"
            conversionFactor = reqbody.density
        }

        const val1_metric = convert(reqbody.val1).from(reqbody.unit1).to(bridgeStart)
        const output_metric = val1_metric*(conversionFactor)
        output = convert(output_metric).from(bridgeEnd).to(reqbody.unit2)
    }

    return output.toString()
}

export {makeConversion}