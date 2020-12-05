var latitude;
var longitude;

navigator.geolocation.getCurrentPosition(function () {}, function () {}, {});
//The working next statement.
navigator.geolocation.getCurrentPosition(position => {
  console.log(position);
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  console.log(latitude);
  console.log(longitude);

  var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=8e5271b4ba8b5bfac5450a3eb73594ec';
          
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    currentWeather = data.weather[0].main ;
  });
  
}, function (e) {
    //Your error handling here
}, {
    enableHighAccuracy: true
});



// async function getCoor(position){
//   latitude = position.coords.latitude;
//   longitude = position.coords.longitude;
// }


// function errorCoor(){

// }