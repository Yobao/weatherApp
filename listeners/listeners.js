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
  }
};

//Listener to open particular body page.
navbarButtons.forEach((button) => {
  button.addEventListener("click", openPage);
});
