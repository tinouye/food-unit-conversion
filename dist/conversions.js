"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConversion = void 0;
const convert_units_1 = __importDefault(require("convert-units"));
const densityTable = require('./densities.json');
const weight = { "oz": "Ounce", "lb": "Pound", "g": "Gram", "kg": "Kilogram" };
const volume = {
    "tsp": "Teaspoon",
    "Tbp": "Tablespoon",
    "fl-oz": "Fluid Ounce",
    "cup": "Cup",
    "pint": "Pint",
    "quart": "Quart",
    "gal": "Gallon",
    "ml": "Mililiter",
    "l": "Liter"
};
const findUnitType = function (unit) {
    if (unit in weight) {
        return "weight";
    }
    else if (unit in volume) {
        return "volume";
    }
    else {
        throw (new Error("Invalid Unit"));
    }
};
const makeConversion = function (reqbody) {
    console.log(reqbody);
    let output;
    reqbody.density = densityTable[reqbody.density];
    console.log(reqbody);
    //Determine unit type
    const unit1Type = convert_units_1.default().describe(reqbody.unit1).measure;
    const unit2Type = convert_units_1.default().describe(reqbody.unit2).measure;
    //Convert directly if 2 units are same type
    if (unit1Type == unit2Type) {
        output = convert_units_1.default(reqbody.val1).from(reqbody.unit1).to(reqbody.unit2);
    }
    else {
        let bridgeStart;
        let bridgeEnd;
        let conversionFactor;
        if (unit1Type == "mass") {
            bridgeStart = "g";
            bridgeEnd = "ml";
            conversionFactor = 1 / reqbody.density;
        }
        else if (unit1Type == "volume") {
            bridgeStart = "ml";
            bridgeEnd = "g";
            conversionFactor = reqbody.density;
        }
        console.log(reqbody.val1 + reqbody.unit1 + bridgeStart);
        const val1_metric = convert_units_1.default(reqbody.val1).from(reqbody.unit1).to(bridgeStart);
        const output_metric = val1_metric * (conversionFactor);
        console.log("Flag");
        output = convert_units_1.default(output_metric).from(bridgeEnd).to(reqbody.unit2);
    }
    return output.toString();
};
exports.makeConversion = makeConversion;
