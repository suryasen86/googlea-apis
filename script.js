  const button = document.querySelector("button");

  button.addEventListener("click", () => {
    if (navigator.geolocation) {
      //if browser support geolocation api
      button.innerText = "Allow to detect location";
      // geolocation.getCurrentPosition method is used to get current position of the device
      // it takes three paramaters success, error, options. If everything is right then success
      // callback function will call else error callback function will call. We don't need third paramater for this project
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      button.innerText = "Your browser not support";
    }
  });

  async function onSuccess(position) {
    button.innerText = "Detecting your location...";
    let { latitude, longitude } = position.coords;

    let data = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDsDKH-37DS6ZnGY_oIi7t5YE0oAAZ-V88`
    );

    let newdata = await data.json();
    console.log(newdata);
  }

  function onError(error) {
    if (error.code == 1) {
      //if user denied the request
      button.innerText = "You denied the request";
    } else if (error.code == 2) {
      //if location in not available
      button.innerText = "Location is unavailable";
    } else {
      //if other error occured
      button.innerText = "Something went wrong";
    }
    button.setAttribute("disabled", "true"); //disbaled the button if error occured
  }
