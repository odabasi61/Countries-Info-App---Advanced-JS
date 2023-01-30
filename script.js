"use strict";

const countriesEl = document.querySelector(".countries");
const dropDown = document.querySelector(".dropDown");
const drop = document.querySelector(".drop");
const region = document.querySelectorAll(".region");
const search = document.querySelector(".search");
const toggle = document.querySelector(".toggle");
const moon = document.querySelector(".moon");

async function getCountry() {
  const URL = await fetch("https://restcountries.com/v3.1/all");
  const res = await URL.json();
  console.log(res);
  res.forEach((element) => {
    showCountry(element);
  });
}
getCountry();

function showCountry(data) {
  const country = document.createElement("div");
  country.classList.add("country");
  country.innerHTML = ` <div class="country-img">
  <img src="${data.flags.svg}" alt="" />
</div>
<div class="country-info">
  <h5 class='countryName'>${data.name.common}</h5>
  <p><strong>Population:</strong> ${data.population}</p>
  <p class='regionName'><strong>Region:</strong> ${data.region}</p>
  <p><strong>Capital:</strong> ${data.capital}</p>
</div>`;
  countriesEl.appendChild(country);
  country.addEventListener("click", () => {
    showCountryDetail(data);
  });
}

dropDown.addEventListener("click", () => {
  drop.classList.toggle("showDropDown");
});

const regionName = document.getElementsByClassName("regionName");
const countryName = document.getElementsByClassName("countryName");
region.forEach((element) => {
  element.addEventListener("click", () => {
    // console.log(element);
    Array.from(regionName).forEach((elem) => {
      // console.log(element);
      if (
        elem.innerText.includes(element.innerText) ||
        element.innerText == "ALL"
      ) {
        elem.parentElement.parentElement.style.display = "grid";
      } else {
        elem.parentElement.parentElement.style.display = "none";
      }
    });
  });
});

search.addEventListener("input", () => {
  Array.from(countryName).forEach((elem) => {
    if (elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      elem.parentElement.parentElement.style.display = "grid";
    } else {
      elem.parentElement.parentElement.style.display = "none";
    }
  });
});

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  moon.classList.toggle("fas");
});

const countryModal = document.querySelector(".countryModal");

function showCountryDetail(data) {
  countryModal.classList.toggle("show");
  countryModal.innerHTML = `
  <button class="back">Back</button>
      <div class="modal">
        <div class="leftModal">
          <img src="${data.flags.svg}" alt="" />
        </div>
        <div class="rightModal">
          <h1>${data.name.common}</h1>
          <div class="modalInfo">
            <div class="innerLeft inner">
              <p><strong>Official Name:</strong> ${data.name.official}</p>
              <p><strong>Population:</strong> ${data.population}</p>
              <p><strong>Region:</strong> ${data.region}</p>
              <p><strong>Sub-Region:</strong> ${data.subregion}</p>
            </div>
            <div class="innerRight inner">
              <p><strong>Capital:</strong> ${data.capital}</p>
              <p><strong>Area:</strong> ${data.area} km²</p>
              <p><strong>Currency:</strong> ${
                data.currencies[Object.keys(data.currencies)].name
              }</p>
              <p><strong>Languages:</strong> ${Object.values(data.languages)
                .toString()
                .split(",")
                .join(", ")}</p>
            </div>
          </div>
        </div>
      </div>`;
  const back = countryModal.querySelector(".back");
  back.addEventListener("click", () => {
    countryModal.classList.toggle("show");
  });
}
