"use strict";

let arr = {};

axios.get(url + "44418").then((response) => {
  let data = response.data;
  let dataWeather = data.consolidated_weather;
  let timeUpdate = data.time;
  let sunrise = data.sun_rise;
  let sunset = data.sun_set;

  console.log(dataWeather);
  let logpoints2;
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
