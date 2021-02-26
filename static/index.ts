function sendConversion() {

    //Establish parameters typing
    interface Parameters {
        val1: string;
        unit1: string;
        unit2: string;
        density: string;
    }
    
    //Load parameters into schema
    const params: Parameters = {
        val1: (document.getElementById("val1") as HTMLInputElement).value,
        unit1: (document.getElementById("unit1") as HTMLInputElement).value,
        unit2: (document.getElementById("unit2") as HTMLInputElement).value,
        density: "none" //(document.getElementById("density") as HTMLInputElement).value
      }

    let paramsArr = []

    //Iterate through object to create an array
    for(const[key, value] of Object.entries(params)) {
        paramsArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(value))
    }

    let paramsStr = paramsArr.join("&")
    console.log(paramsStr)


    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "convert", true);
    //Headers set to accept urlencoded
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("response").innerHTML = this.responseText;
      }
    };
    console.log("pre flight")
    console.log(xhttp)
    xhttp.send(paramsStr);
  }

