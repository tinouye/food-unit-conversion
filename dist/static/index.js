function sendConversion() {
    var xhttp = new XMLHttpRequest();
    //Load parameters into schema
    const params = {
        val1: document.getElementById("val1").value,
        unit1: document.getElementById("unit1").value,
        unit2: document.getElementById("unit2").value,
        density: document.getElementById("density").value
    };
    console.log("flag1:");
    console.log(params);
    //Headers set to accept urlencoded
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    let paramsArr = [];
    //Iterate through object to create an array
    for (const [key, value] of Object.entries(params)) {
        paramsArr.push(key + "=" + value);
    }
    console.log("flag2");
    console.log(paramsArr);
    let paramsStr = paramsArr.join("&");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("response").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "convert", true);
    xhttp.send(paramsStr);
}
