    function successFunc(data) {
      console.log(data);
      document.getElementById("description").innerHTML = "Hello JavaScript!";
    }

    function errorFunc(e) {
      console.log(e);
      document.getElementById("description").innerHTML = e;
    }

    Sheetsu.read("https://sheetsu.com/apis/v1.0su/3e1d00ced9a4",
     {}).then(successFunc, errorFunc);
