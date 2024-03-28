const getCocktailByIngredient = async (ingredient) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const dataToJSon = await response.json();
  const { drinks } = dataToJSon;
  return drinks.map((drink) => drink.idDrink);
};

const fetchCocktails = async (alcool, page = 1) => {
  const perPage = 12; // Nombre de cocktails par page
  const start = (page - 1) * perPage;
  const end = start + perPage;

  document.getElementById("cocktail").innerHTML = "";
  const cocktailIds = await getCocktailByIngredient(alcool);

  if (cocktailIds.length === 0) {
    return;
  }

  const currentPageCocktails = cocktailIds.slice(start, end);
  for (let id of currentPageCocktails) {


    recupereliste(id);
  }

  // Ajout de la pagination
  const totalPages = Math.ceil(cocktailIds.length / perPage);
  addPaginationButtons(page, totalPages, alcool);
};

function addPaginationButtons(currentPage, totalPages, alcool) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  if (totalPages <= 1) {
    return;
  }

  if (currentPage > 1) {
    const previousButton = document.createElement("button");
    previousButton.innerText = "Précédent";
    previousButton.addEventListener("click", () => {
      if (currentPage > 1) {
        fetchCocktails(alcool, currentPage - 1);
      }
    });
    paginationContainer.appendChild(previousButton);
  }

  if (currentPage < totalPages) {
    const nextButton = document.createElement("button");
    nextButton.innerText = "Suivant";
    nextButton.addEventListener("click", () => {
      if (currentPage < totalPages) {
        fetchCocktails(alcool, currentPage + 1);
      }
    });
    paginationContainer.appendChild(nextButton);
  }
}

function recupereliste(id) {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id)
    .then((response) => response.json())
    .then((data) => {
      const { drinks } = data;

      drinks.sort((a, b) => a.strDrink.localeCompare(b.strDrink));

      drinks.forEach((cocktail) => {
        const alcoolDiv = document.createElement("div");
        alcoolDiv.classList.add("card");
        const nomCocktail = cocktail.strDrink;
        const imageCocktail = cocktail.strDrinkThumb;
        const ingredientsCocktail = [];
        for (let i = 0; i <= 14; i++) {
          const maCle = "strIngredient" + (i + 1);
          const unIngredient = cocktail[maCle];
          if (unIngredient !== null) {
            ingredientsCocktail.push(unIngredient);
          }
        }
        const mesurecocktail = [];
        for (let i = 0; i <= 14; i++) {
          const maCle = "strMeasure" + (i + 1);
          const uneMesure = cocktail[maCle];
          if (uneMesure !== null) {
            mesurecocktail.push(uneMesure);
          }
        }

        let contenuDeMaDiv = "<div>";
        contenuDeMaDiv = contenuDeMaDiv + "<h2>" + nomCocktail + "</h2>";
        contenuDeMaDiv =
          contenuDeMaDiv + `<img src="${cocktail.strDrinkThumb}" />`;
        contenuDeMaDiv = contenuDeMaDiv + "</div>";
        contenuDeMaDiv = contenuDeMaDiv + "<div class='containerInformation'>";

        contenuDeMaDiv = contenuDeMaDiv + "<div>";
        for (let i = 0; i < ingredientsCocktail.length; i++) {
          contenuDeMaDiv =
            contenuDeMaDiv + "<p>" + ingredientsCocktail[i] + "</p>";
        }
        contenuDeMaDiv = contenuDeMaDiv + "</div>";

        contenuDeMaDiv = contenuDeMaDiv + "<div>";
        for (let i = 0; i < mesurecocktail.length; i++) {
          contenuDeMaDiv = contenuDeMaDiv + "<p>" + mesurecocktail[i] + "</p>";
        }
        contenuDeMaDiv = contenuDeMaDiv + "<div>";
        contenuDeMaDiv = contenuDeMaDiv + "</div>";

        alcoolDiv.innerHTML = contenuDeMaDiv;
        document.getElementById("cocktail").appendChild(alcoolDiv);
      });
    });
}
