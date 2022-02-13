const openPage = function () {
  for (let i = 0; i < pages.length; i++) {
    let pagesID = pages[i].id.slice(
      pages[i].id.indexOf("-") + 1,
      pages[i].id.length
    );

    let buttonID = this.id.slice(this.id.indexOf("-") + 1, this.id.length);

    if (pagesID === buttonID) {
      pages[i].classList.remove("is-hidden");
    } else {
      pages[i].classList.add("is-hidden");
    }

    if (buttonID === "heat") calcu.classList.remove("is-hidden");
    if (
      (buttonID === "history" || buttonID === "calculation") &&
      pagesID === "heat"
    )
      pages[i].classList.remove("is-hidden");
  }
};

//Listener to open particular body page.
navbarButtons.forEach((button) => {
  button.addEventListener("click", openPage);
});

//Listener for dropdowns.
selectCountry.addEventListener("change", () => {
  getCities(selectCountry.value);
});
search.addEventListener("click", () => {
  getForecast(selectCity.value);
});

//Listener for heat index calculator...
