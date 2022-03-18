// const { escapeXML } = require("ejs");
// const { Template } = require("ejs");

var current = document.querySelector("#current");

// var fiveDay = document.querySelector("#5day");
var searchLabel = document.querySelector("#searchLabel");

var searchInput = document.querySelector("#searchInput");

var submitBtn = document.querySelector("#submitBtn");

var apiKey = "13f6e1ce2c55bbeec150c9d169520dd1"; 
//388964fc2ffae47f3a212b1f9aac6d8b  <--Alternate API key may be needed.




//It was suggested I refactor my Script to address seperation of needs :(
function dataFetch(city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    // console.log(apiURL);
    fetch(apiURL)
    .then(function (res){
        return res.json();
    })
    //verify with user in case of data input errors; allow valid input values to generate dynamic html buttons:
    .then(function (data) {
        console.log(data);
        if(data.cod!=="404"){
            historyCol(city);
        }
        else if(data.cod==="404") {
            searchInput.value= "";
            alert("Please Enter Valid City-Name");
            return;
        }
        //run relevent data from search query to pull specific weather data from One-Call weather API
        console.log(data);
        var oneCallApiURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ data.coord.lat + "&lon="+data.coord.lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;
        
        //import weather visual icon for added information clarity
        var iconID = data.weather[0].icon;
        var iconFetch = "http://openweathermap.org/img/w/"+ iconID + ".png";
        var iconDisp = document.createElement('img');
        iconDisp.src = iconFetch;

        //maintain presented Date so users can verify relevence of presented data:
        var dateFetch = data.dt;
        var dateMilSecs = dateFetch*1000;
        var dateUse = new Date(dateMilSecs);
        var dateDisp = dateUse.toLocalString();
        citySearch.textContent = city + " " + dateDisp + " ";
        citySearch.appendChild(iconDisp);


        fetch(oneCallApiURL)
        .then(function(res) {
            return res.json();
        })

        //Display current weather statistics:
        .then(function(data_2){
            temp.textContent = "Temp: " + data_2.cuurent.temp;
            humidity.textContent = "Humidity: " + data_2.current.humidity;
            wind.textContent = "Wind-speed: " + data_2.current.wind_speed + " MPH";
            uvIndex.textContent = "UV Index: " + data_2.current.uvi;

            forcastHeader.classList.remove("d-none")
            var dailyStats = data_2.daily;
            forcast.innerHTML = ""
            searchInput.value = ""
            //generate 5-Day forcast information display; 
            for (let i =0; i < dailyStats.length; i++) {
                const el = dailyStats[i];
                if (i>0 && I<6) {
                    var forcastDiv = document.createElement("div")
                    var forcastHead = document.createElement("h3")
                    var forcastPic = document.createElement('img')
                    var forcastPicFind = el.weather[0].icon;
                    var forcastPicPull = "http://openweathermap.org/img/w/"+ forcastPicFind + ".png";

                    var tempEl = document.createElement("p")
                    var humidEl = document.createElement("p")
                    var windEl = document.createElement("p")
                    var uvEl = document.createElement("p")

                    var dateFetch = data.dt;
                    var dateMilSecs = dateFetch*1000;
                    var dateUse = new Date(dateMilSecs);
                    var dateDisp = dateUse.toLocalString();

                    forcastDiv.id = el.length
                    //set styling for forcast elements: return and verify satisfies preference
                    forcastDiv.className = "card col-2 bg-secondary"
                    h3.innerText = dateDisp;
                    forcastPic.src = forcastPicPull;

                    tempEl.textContent = "Tempurature: " + el.temp.day;
                    humidEl.textContent = "Humidity: " + el.humidity/*.day*/;
                    windEl.textContent = "Wind-Speed: " + el.wind_speed/*.day*/;
                    uvEl.textContent = "UV Index: " + el.uvi/*.day*/;

                    forcastHead.appendChild(forcastPic);
                    forcastDiv.appendChild(forcastHead);
                    forcastDiv.appendChild(tempEl);
                    forcastDiv.appendChild(humidEl);
                    forcastDiv.appendChild(windEl);
                    forcastDiv.appendChild(uvEl);
                    forcast.appendChild(forcastDiv);
                }
            };
        })
    })
.catch(function (err) {
    console.error(err);
});
}

//Previousely Searched Section:
var historyBar = function(city){
    if(cityArray.indexOf(city)<0){
    cityArray.push(city)
    localStorage.setItem("History", JSON.stringify(cityArray))
    historySel();
};
    console.log(cityArray);
}

var historySel = function() {
    historyDiv.innerHTML="";
    cityArray.forEach(city => {
        var histClick = document.createElement("button");
        histClick.className = "mt-1 col-12";
        histClick.id = city;
        histClick.innerText = city;
        histClick.addEventListener("click", function(event) {
            var city = event.target.id;
            dataFetch(city);
        })
        historyDiv.appendChild(histClick);
    });
}

historySel();

submitBtn.addEventListener("click", function() {
    var city = searchInput.value;
    if (city === "") {
        alert("Please Enter a City Name");
        return;
    }
    dataFetch(city);
});




