var current = document.querySelector("#current");
// var fiveDay = document.querySelector("#5day");
var searchLabel = document.querySelector("#searchLabel");
var searchInput = document.querySelector("#searchInput");
var submitBtn = document.querySelector("#submitBtn");
var apiKey = "13f6e1ce2c55bbeec150c9d169520dd1"; 
//388964fc2ffae47f3a212b1f9aac6d8b  <--Alternate API key may be needed.






submitBtn.addEventListener("click", function(event){
    var city = searchInput.value
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    console.log(apiURL);
    event.preventDefault();
    fetch(apiURL)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);

        var currentData = data;

        var api2URL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + currentData.coord.lat + "&lon=" + currentData.coord.lon + "&appid=" + apiKey;
        console.log(api2URL);
        event.preventDefault();
        fetch(api2URL)
        .then(function (res) {
            return res.json();
        })
        .then(function (data2) {
            console.log(data2);
        })    
})


//
.catch(function (err) {
    console.error(err);
});

    
});


/* <body>
    <header>
        <h1>Weather; or Not!</h1>
    </header>
    <div>
        <label id="searchLabel">Search here for your city: </label>
        <input id="searchInput"></input>
        <container class="searhis">
            <button id="submitBtn" type="submit">Search</button>
        </container>
    </div>
    <div id="current"></div>
    <div id="5day"></div>
    <script src="assets/js/script.js"></script>
</body> */


