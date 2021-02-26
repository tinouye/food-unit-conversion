"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConversion = void 0;
const convert = require('convert-units');
const makeConversion = function (reqbody) {
    let output;
    console.log(reqbody);
    if (reqbody.density == "none") {
        output = convert(reqbody.val1).from(reqbody.unit1).to(reqbody.unit2);
    }
    return output.toString();
};
exports.makeConversion = makeConversion;
