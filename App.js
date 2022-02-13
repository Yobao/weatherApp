"use strict";

let arr = {};
const weekdayArr = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//Func. declaration for deleteting all the children in specified element to re-render.
function deleter(element) {
  while (element.lastElementChild)
    element.removeChild(element.lastElementChild);
}

//Axios request for main table with few days forecast.
function getForecast(cityID) {
  !cityID ? (cityID = "44418") : cityID;

  axios.get(url + cityID).then((response) => {
    deleter(table);
    deleter(tableInfo);

    let data = response.data;
    let dataWeather = data.consolidated_weather;
    let city = document.createTextNode(data.title);
    let date = document.createTextNode(
      "Date: " + data.time.slice(0, data.time.indexOf("T"))
    );
    let time = data.time.slice(data.time.indexOf("T") + 1, data.time.length);
    let timeUpdate = document.createTextNode(
      "Current Time: " + time.slice(0, time.indexOf("."))
    );
    let str = document.createElement("strong");
    let p = document.createElement("p");

    str.appendChild(city);
    str.setAttribute("class", "is-size-4");
    p.appendChild(timeUpdate);
    tableInfo.appendChild(str);
    tableInfo.appendChild(p);

    //Loop for each of forecasted day.
    dataWeather.forEach((forecast, i) => {
      let tr = document.createElement("tr");
      //Array (neccessary for looping) consisting of each forecasted day values.
      let row = [
        !i ? "Today" : weekdayArr[new Date(forecast.applicable_date).getDay()],
        forecast.weather_state_abbr,
        Math.round(forecast.max_temp) + "°C",
        Math.round(forecast.min_temp) + "°C",
        Math.round(forecast.wind_speed) + "mph",
        forecast.humidity + "%",
        Math.round(forecast.visibility * 10) / 10 + " miles",
        forecast.air_pressure + "mb",
        forecast.predictability + "%",
      ];

      //For each column insert values into row, then insert whole row.
      row.forEach((column, i) => {
        let td = document.createElement("td");
        let val = document.createTextNode(column);
        //If statement for isnerting pictures into table.
        if (i === 1) {
          let img = document.createElement("IMG");
          img.setAttribute("src", `img/${column}.png`);
          img.setAttribute("width", "32");
          img.setAttribute("height", "32");
          td.appendChild(img);
          tr.appendChild(td);
        } else {
          td.appendChild(val);
          tr.appendChild(td);
        }
      });

      table.appendChild(tr);
    });
  });
}
//Function call...
getForecast();

//23424750   24865675
//IIFE Axios request for list of European citties.
(async function getCountry() {
  let response = await axios.get(url + 24865675);
  deleter(selectCountry);
  let countries = response.data.children;
  dataLoop(countries, selectCountry);
  let cities = await getCities(selectCountry.value);
})();

//Function for filtering countries in slicer.
async function getCities(id) {
  let response = await axios.get(url + id);
  deleter(selectCity);
  let cities = response.data.children;
  dataLoop(cities, selectCity);
}

//Loop for inserting countries and cities into dropdown...
function dataLoop(data, dropdown) {
  data.forEach((row) => {
    let option = document.createElement("option");
    let value = document.createTextNode(row.title);

    option.appendChild(value);
    option.setAttribute("value", row.woeid);
    dropdown.appendChild(option);
  });
}
