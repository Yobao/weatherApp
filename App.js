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

axios.get(url + "44418").then((response) => {
  let data = response.data;
  let dataWeather = data.consolidated_weather;
  let date = document.createTextNode(
    "Date: " + data.time.slice(0, data.time.indexOf("T"))
  );
  let time = data.time.slice(data.time.indexOf("T") + 1, data.time.length);
  let timeUpdate = document.createTextNode(
    "Current Time: " + time.slice(0, time.indexOf("."))
  );
  let p = document.createElement("p");
  p.appendChild(timeUpdate);
  tableInfo.appendChild(p);

  /*   let sunrise = data.sun_rise;
  let sunset = data.sun_set;

  let info = [date, timeUpdate];

  info.forEach((row) => {
    let p = document.createElement("p");
    p.appendChild(row);
    tableInfo.appendChild(p);
  }); */

  dataWeather.forEach((forecast, i) => {
    let tr = document.createElement("tr");
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

    row.forEach((column) => {
      let td = document.createElement("td");
      let val = document.createTextNode(column);
      td.appendChild(val);
      tr.appendChild(td);
    });

    table.appendChild(tr);
  });
});

//data[i].push(data[i].created.slice(index + 1, data[i].created.length))

//let time = data[i].created.slice(index + 1, data[i].created.length);

//arr.push(data[i].created.slice(0, index));

/*

axios.get(url + "44418").then((response) => {
  let data = response.data;

  console.log(data);

  for (let i = 0; i < data.length; i++) {
    let index = data[i].created.indexOf("T");
    let date = data[i].created.slice(0, index);
    if (arr[date] === undefined) arr[date] = [];
  }

  let logpoints2;
});
-----------------------------------------------------------------

axios.get(url + "44418").then((response) => {
  let data = response.data;
  let dataWeather = data.consolidated_weather;

  let max_temp, min_temp, wind_speed, humidity, visibility, airpressure;

  let rows = [
    max_temp,
    min_temp,
    wind_speed,
    humidity,
    visibility,
    airpressure,
  ];

  let timeUpdate = data.time;
  let sunrise = data.sun_rise;
  let sunset = data.sun_set;
  let trh = document.createElement("tr");
  let trb = document.createElement("tr");
  let td = document.createElement("td");

  dataWeather.forEach((forecast) => {
    let weekday = weekdayArr[new Date(forecast.applicable_date).getDay()];
    let th = document.createElement("th");
    let text = document.createTextNode(weekday);

    th.appendChild(text);
    trh.appendChild(th);
  });

  tableHead.appendChild(trh);

  console.log(dataWeather);
  let logpoints2;
});
-----------------------------------------------------------------

arr = {
  day 1: [
    {posting 1},
    {posting 2}
  ],
  day 2: [
    {posting 1},
    {posting 2}
  ],
  day 3: [
    {posting 1},
    {posting 1}
  ]
}

*/
