const convert = require('convert-units')

const makeConversion = function(reqbody) {
    let output: number
    console.log(reqbody)
    if (reqbody.density == "none") {
        output = convert(reqbody.val1).from(reqbody.unit1).to(reqbody.unit2)
    }
    return output.toString()
}

export {makeConversion}