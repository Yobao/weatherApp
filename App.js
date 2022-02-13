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
function elementChildDeleter(element) {
  while (element.lastElementChild)
    element.removeChild(element.lastElementChild);
}

//Axios request for main table with few days forecast.
function getForecast(cityID) {
  !cityID ? (cityID = "44418") : cityID;

  axios.get(url + cityID).then((response) => {
    elementChildDeleter(table);
    elementChildDeleter(tableInfo);

    let data = response.data;
    let dataWeather = data.consolidated_weather;
    let city = document.createTextNode(data.title);
    let time = data.time.slice(data.time.indexOf("T") + 1, data.time.length);
    let timeUpdate = document.createTextNode(
      "Current Time: " + time.slice(0, time.indexOf("."))
    );
    let str = document.createElement("strong");
    let p = document.createElement("p");

    //Variable arrays for graph.
    let xAxis = [];
    let yAxisTemp = [];
    let yAxisMax = [];
    let yAxisMin = [];

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

      xAxis.push(row[0]);
      yAxisTemp.push(Math.round(forecast.the_temp));
      yAxisMax.push(Math.round(forecast.max_temp));
      yAxisMin.push(Math.round(forecast.min_temp));

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

    renderChart(xAxis, yAxisTemp, yAxisMax, yAxisMin);
  });
}
//Function call...???
getForecast();

//FUNCTION FOR CREATING CHART WITH TEMP, MIN & MAX VALUES.
function renderChart(xAxis, temp, max, min) {
  elementChildDeleter(pageChart);
  let trace1 = {
    x: [...xAxis],
    y: [...temp],
    type: "scatter",
    name: "Temperature",
  };
  let trace2 = {
    x: [...xAxis],
    y: [...max],
    type: "scatter",
    name: "Max",
  };
  let trace3 = {
    x: [...xAxis],
    y: [...min],
    type: "scatter",
    name: "Min",
  };
  let data = [trace1, trace2, trace3];

  let layout = {
    autosize: true,
    automargin: true,
    title: "Weather Forecast Chart",
    xaxis: {
      title: "Day of week",
    },
    yaxis: {
      title: "Temperature",
    },
  };

  pageChart.setAttribute("class", "my-6");
  Plotly.newPlot(pageChart, data, layout);
}

//Loop for inserting countries and cities into dropdown.
function dataLoop(data, dropdown) {
  data.forEach((row) => {
    let option = document.createElement("option");
    let value = document.createTextNode(row.title);

    option.appendChild(value);
    option.setAttribute("value", row.woeid);
    dropdown.appendChild(option);
  });
}

//23424750   24865675
//IIFE Axios request for list of European citties.
(async function getCountry() {
  let response = await axios.get(url + 24865675);
  elementChildDeleter(selectCountry);
  let countries = response.data.children;
  dataLoop(countries, selectCountry);
  let cities = await getCities(selectCountry.value);
})();

//Function for filtering countries in slicer.
async function getCities(id) {
  let response = await axios.get(url + id);
  elementChildDeleter(selectCity);
  let cities = response.data.children;
  dataLoop(cities, selectCity);
}

//FUNCTION for calculating heat index.
function heatCalculation(temperature, humidity, metric) {
  //Check whether inputs are less then treshold or empy.
  if (
    (metric === "°C" && (temperature < 26.7 || !temperature)) ||
    (metric === "°F" && (temperature < 80 || !temperature))
  )
    return alert("Given temperature is too low or input is empy.");

  //Conversion of celsius to fahrenheit for calculation.
  metric === "°C" ? (temperature = (9 / 5) * temperature + 32) : temperature;

  let heatIndexValue =
    Math.floor(
      (-42.379 +
        2.04901523 * temperature +
        10.14333127 * humidity -
        0.22475541 * temperature * humidity -
        6.83783 * 10 ** -3 * temperature ** 2 -
        5.481717 * 10 ** -2 * humidity ** 2 +
        1.22874 * 10 ** -3 * temperature ** 2 * humidity +
        8.5282 * 10 ** -4 * temperature * humidity ** 2 -
        1.99 * 10 ** -6 * temperature ** 2 * humidity ** 2) *
        100
    ) / 100;

  //Conversion back to Celsius.
  metric === "°C"
    ? (heatIndexValue = Math.floor((5 / 9) * (heatIndexValue - 32) * 100) / 100)
    : (heatIndexValue = Math.floor(heatIndexValue * 100) / 100);

  //Variables for inserting element into DOM.
  elementChildDeleter(heatIndex);
  let p = document.createElement("div");
  let text = document.createTextNode(
    `Heat Index for given inputs is ${heatIndexValue}`
  );

  //Creatin DOM element with result.
  p.appendChild(text);
  p.setAttribute("class", "title is-4");
  heatIndex.appendChild(p);

  let storageLength = localStorage.Index
    ? localStorage.Index.match(/,/g).length
    : 0;
  let storageArray;

  //Saves history into local storage...
  if (storageLength < 5) {
    localStorage.setItem(
      "Index",
      !localStorage.Index
        ? heatIndexValue + ","
        : localStorage.Index + heatIndexValue + ","
    );
  } else {
    storageArray = [...localStorage.Index.split(",", storageLength)];
    storageArray = storageArray.filter((posting, i) => i !== 0);
    storageArray.push(heatIndexValue);
    localStorage.setItem("Index", storageArray.join(",") + ",");
  }

  renderHeatHistory();
}

//localStorage.clear();
function renderHeatHistory() {
  if (!localStorage.Index) {
    elementChildDeleter(heatHistory);
  } else {
    let storageLength = localStorage.Index
      ? localStorage.Index.match(/,/g).length
      : 0;
    let storageArray = [...localStorage.Index.split(",", storageLength)];

    elementChildDeleter(heatHistory);

    storageArray.forEach((value, i) => {
      let tr = document.createElement("tr");
      let valueText = document.createTextNode(value);
      let position = document.createTextNode(i + 1);
      let tableColumns = [position, valueText];

      tableColumns.forEach((column) => {
        let td = document.createElement("td");
        let text = column;

        td.appendChild(text);
        tr.appendChild(td);
      });

      heatHistory.appendChild(tr);
    });
  }
}
renderHeatHistory();
