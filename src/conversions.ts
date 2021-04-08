import convert from 'convert-units'
const densityTable = require('./densities.json')

const weight = {"oz":"Ounce", "lb":"Pound", "g":"Gram", "kg":"Kilogram"}
const volume = {
"tsp":"Teaspoon",
"Tbp":"Tablespoon",
"fl-oz":"Fluid Ounce",
"cup":"Cup",
"pint":"Pint",
"quart":"Quart",
"gal":"Gallon",
"ml":"Mililiter",
"l":"Liter"
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
    reqbody.density = densityTable[reqbody.density]
    console.log(reqbody)

    //Determine unit type
    const unit1Type = convert().describe(reqbody.unit1).measure
    const unit2Type = convert().describe(reqbody.unit2).measure

    //Convert directly if 2 units are same type
    if (unit1Type == unit2Type) {
        output = convert(reqbody.val1).from(reqbody.unit1).to(reqbody.unit2)
    }
    else {
        let bridgeStart: string
        let bridgeEnd: string
        let conversionFactor: number
        if (unit1Type == "mass") {
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
    let outputStr: string
    
    outputStr = Number.parseFloat(output.toString()).toPrecision(6);
    return outputStr;
}

export {makeConversion}