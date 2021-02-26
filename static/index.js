function sendConversion() {
    //Load parameters into schema
    var params = {
        val1: document.getElementById("val1").value,
        unit1: document.getElementById("unit1").value,
        unit2: document.getElementById("unit2").value,
        density: "none" //(document.getElementById("density") as HTMLInputElement).value
    };
    var paramsArr = [];
    //Iterate through object to create an array
    for (var _i = 0, _a = Object.entries(params); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        paramsArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
    }
    var paramsStr = paramsArr.join("&");
    console.log(paramsStr);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "convert", true);
    //Headers set to accept urlencoded
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("response").innerHTML = this.responseText;
        }
    };
    console.log("pre flight");
    console.log(xhttp);
    xhttp.send(paramsStr);
}
