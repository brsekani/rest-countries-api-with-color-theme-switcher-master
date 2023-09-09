const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const hideRegionBtn = document.querySelector(".hide-region");
const backBtn = document.querySelector(".back");
const mainBody = document.querySelector("main");
const countriesBody = document.querySelector(".countries");
const countryCont = document.querySelector(".country-cont");
const LanguagesTag = document.querySelector(".Languages");
const continentsAllBtn = document.querySelectorAll(".continents");
const countryArray = [];
const langArray = [];

// Hide continents BTN
searchBtn.addEventListener("click", function () {
  hideRegionBtn.classList.toggle("hide");
});

const loadCountryAPI = () => {
  // Fetch url of rest country from website
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => dipslayCountries(data));
};

const FormatPopulation = function (number) {
  return number.toLocaleString("en-US");
};

// display all countries
const dipslayCountries = (countries) => {
  // functions
  const clickedCountry = function (countriesBody) {
    countriesBody.querySelectorAll(".country-cont").forEach((con) =>
      con.addEventListener("click", function () {
        const countryName = con.querySelector(".country").textContent;
        countries.map((country, i) => {
          if (countryName === country.name) {
            console.log(country);
            const langArray = [];

            // languages API Correction
            const languagesAPICorrection = function (languages) {
              languages.forEach((language, i) => {
                if (languages.length === 1) {
                  const lang1 = language.name;
                  langArray.push(lang1);
                } else if (languages.length != 2) {
                  let lang2 = language.name;
                  langArray.push(lang2);
                } else {
                  const lang3 = language.name;
                  langArray.push(lang3);
                }
              });
            };

            languagesAPICorrection(country.languages);

            const newWindow = window.open(",", "_blank");
            const htmlContent = `<html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>rest-countries-api-with-color-theme-switcher-master</title>
            <link rel="stylesheet" href="/style.css">
          </head>
          <body>
            <div>
                <nav>
                    <li>Where in the world</li>
                    <li></i>Dark Mode</li>
                  </nav>
                  <button class="back">Back</button>
                  <div class="country-preview">
                    <div class="country-flag-cont"><img src=${
                      country.flags.svg
                    } alt=""></div>
                    <div class="country-info-cont">
                        <h1>${country.name}</h1>
                        <div class="country-details">
                            <div class="country-details-right">
                                <p>Native Name: <Span>${
                                  country.nativeName
                                }</Span></p>
                                <p>Population: <Span>${FormatPopulation(
                                  country.population
                                )}</Span></p>
                                <p>Region: <Span>${country.region}</Span></p>
                                <p>Sub Region: <Span>${
                                  country.subregion
                                }</Span></p>
                                <p>Capital: <Span>${country.capital}</Span></p>
                            </div>
        
                            <div class="country-details-left">
                                <p>Top Level Domain: <Span>${
                                  country.topLevelDomain[0]
                                }</Span></p>
                                <p>Currencies: <Span>${
                                  country.currencies === undefined
                                    ? ""
                                    : country.currencies[0].name
                                }</Span></p>
                                <p class="Languages">Languages: <Span>${
                                  langArray[0] == undefined ? "" : langArray[0]
                                } </Span><Span>${
              langArray[1] == undefined ? "" : "," + " " + langArray[1]
            }</Span><Span>${
              langArray[2] == undefined ? "" : "," + " " + langArray[2]
            }</Span></p> 
                            </div>
                        </div>
                        <p class="BC-container">Border countries: <span class="BC">${
                          country.borders === undefined
                            ? "None"
                            : country.borders[0]
                        }</span> <span class="BC">${
              country.borders === undefined ? "None" : country.borders[1]
            }</span> <span class="BC">${
              country.borders === undefined ? "None" : country.borders[2]
            }</span></p>
                    </div>
                  </div>
            </div>
            <script src="/app1.js"></script>
          </body>
        </html>`;
            newWindow.document.write(htmlContent);
          }
        });
      })
    );
  };

  console.log(countries);

  const countriesHTML = countries.map((country) => getCountry(country));

  // displaying dig to html
  countriesBody.innerHTML = countriesHTML;

  clickedCountry(countriesBody);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Search Input
  searchInput.addEventListener("input", function () {
    let inputValue = searchInput.value;

    if (inputValue.length > 0) {
      inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
      const search = countries.filter((country) => {
        if (
          country.name.includes(inputValue) &&
          country.name.startsWith(inputValue.charAt(0))
        ) {
          return getCountry(country);
        }
      });
      const countriesHTML = search.map((country) => getCountry(country));
      console.log(countriesHTML);

      // displaying dig to html
      countriesBody.innerHTML = countriesHTML;
    } else {
      countriesBody.innerHTML = countriesHTML;
    }
    clickedCountry(countriesBody);
  });

  // Search continent BTNs
  continentsAllBtn.forEach((btn) => {
    let isToggled = false;
    btn.addEventListener("click", function () {
      if (btn.textContent === "America") {
        btn.textContent += "s";
      }
      const allContinent = function (continent) {
        const continents = countries.filter((country) => {
          if (btn.textContent === continent && country.region === continent) {
            return getCountry(country);
          }
        });
        const countriesHTML = continents.map((country) => getCountry(country));

        // displaying dig to html

        if (isToggled) {
          const countriesHTML = countries.map((country) => getCountry(country));
          countriesBody.innerHTML = countriesHTML;
        } else {
          countriesBody.innerHTML = countriesHTML;
        }
        isToggled = !isToggled;
      };

      allContinent(btn.textContent);
      clickedCountry(countriesBody);
    });
  });
};

// get data and set it to html
const getCountry = (country) => {
  // console.log(country);

  const HTML = `
  <div class="country-cont">
      <img class="country-img" src="${country.flags.png}" alt="">
      <h5 class="country">${country.name}</h5>
      <p class="population"><span class="bold">Population</span>: ${FormatPopulation(
        country.population
      )}</p>
      <p class="region"><span class="bold">Region</span>: ${country.region}</p>
      <p class="capital"><span class="bold">Capital</span>: ${
        country.capital
      }</p>
  </div>
  `;

  return HTML;
};

loadCountryAPI();

const children = mainBody.children;
for (const child of children) {
  child.addEventListener("click", function () {
    const closest = child.closest("country-cont");
  });
}
