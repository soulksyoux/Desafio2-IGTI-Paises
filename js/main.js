window.addEventListener("load", () => {
  loadTotalCountries();
});

const URL = "https://restcountries.eu/rest/v2/all";
let totalCountries = [];
let favoriteCountries = [];

const loadTotalCountries = async () => {
  try {
    const res = await fetch(URL);
    const countries = await res.json();
    countries.map((country) => {
      totalCountries = [
        ...totalCountries,
        {
          name: country.name,
          population: country.population,
          flag: country.flag,
        },
      ];
      return totalCountries;
    });
    render();
  } catch (err) {
    console.log(err);
  }
};

const render = () => {
  const showTotalCountries = () => {
    const listCountriesTotal = document.querySelector(".list-countries-total");
    listCountriesTotal.innerHTML = "";
    const setCountryAsFavourite = (addButton, buttonId) => {
      const setCountryAsFavouriteHandle = () => {
        const countryToFavorite = totalCountries.filter(
          (_, i) => i === buttonId
        );
        favoriteCountries = [...favoriteCountries, ...countryToFavorite];
        totalCountries = totalCountries.filter((_, i) => i !== buttonId);
        render();
      };
      addButton.addEventListener("click", setCountryAsFavouriteHandle);
    };

    totalCountries.forEach((country, index, countries) => {
      const countryContainer = document.createElement("div");
      countryContainer.classList.add("countryContainer");

      const addButton = document.createElement("button");
      addButton.textContent = "+";
      addButton.classList.add("addButton");
      setCountryAsFavourite(addButton, index);

      const countryFlag = document.createElement("img");
      countryFlag.src = country.flag;
      countryFlag.classList.add("countryFlag");

      const countryGroupNamePop = document.createElement("div");
      countryGroupNamePop.classList.add("countryGroupNamePop");
      const countryName = document.createElement("div");
      countryName.textContent = country.name;
      const countryPop = document.createElement("div");
      countryPop.textContent = country.population;
      countryGroupNamePop.appendChild(countryName);
      countryGroupNamePop.appendChild(countryPop);

      countryContainer.appendChild(addButton);
      countryContainer.appendChild(countryFlag);
      countryContainer.appendChild(countryGroupNamePop);

      listCountriesTotal.appendChild(countryContainer);
    });
  };

  const showFavoriteCountries = () => {
    const listCountriesFavorites = document.querySelector(
      ".list-countries-favorites"
    );
    listCountriesFavorites.innerHTML = "";

    const setCountryInTotalList = (delButton, buttonId) => {
      const setCountryInTotalListHandle = () => {
        const countryToTotalList = favoriteCountries.filter(
          (_, i) => i === buttonId
        );
        totalCountries = [...totalCountries, ...countryToTotalList];
        favoriteCountries = favoriteCountries.filter((_, i) => i !== buttonId);
        render();
      };
      delButton.addEventListener("click", setCountryInTotalListHandle);
    };

    favoriteCountries.forEach((country, index, countries) => {
      const countryContainer = document.createElement("div");
      countryContainer.classList.add("countryContainer");

      const delButton = document.createElement("button");
      delButton.textContent = "-";
      delButton.classList.add("delButton");
      setCountryInTotalList(delButton, index);

      const countryFlag = document.createElement("img");
      countryFlag.src = country.flag;
      countryFlag.classList.add("countryFlag");

      const countryGroupNamePop = document.createElement("div");
      countryGroupNamePop.classList.add("countryGroupNamePop");
      const countryName = document.createElement("div");
      countryName.textContent = country.name;
      const countryPop = document.createElement("div");
      countryPop.textContent = country.population;
      countryGroupNamePop.appendChild(countryName);
      countryGroupNamePop.appendChild(countryPop);

      countryContainer.appendChild(delButton);
      countryContainer.appendChild(countryFlag);
      countryContainer.appendChild(countryGroupNamePop);

      listCountriesFavorites.appendChild(countryContainer);
    });
  };

  const showNumberTotalCountries = () => {
    const numberTotalCountries = document.querySelector(
      "#numberTotalCountries"
    );
    numberTotalCountries.textContent = totalCountries.length;
  };

  const showTotalPopulation = () => {
    const totalPopulation = document.querySelector("#totalPopulation");
    const totalPop = totalCountries.reduce(
      (acc, country) => acc + country.population,
      0
    );

    totalPopulation.textContent = totalPop;
  };

  const showNumberTotalCountriesFavourite = () => {
    const numberTotalCountriesFav = document.querySelector(
      "#numberTotalCountriesFav"
    );
    numberTotalCountriesFav.textContent = favoriteCountries.length;
  };

  const showTotalPopulationFavourite = () => {
    const totalPopulationFav = document.querySelector("#totalPopulationFav");
    const totalPopFav = favoriteCountries.reduce(
      (acc, country) => acc + country.population,
      0
    );

    totalPopulationFav.textContent = totalPopFav;
  };

  showTotalCountries();
  showFavoriteCountries();
  showNumberTotalCountries();
  showTotalPopulation();
  showNumberTotalCountriesFavourite();
  showTotalPopulationFavourite();
};
