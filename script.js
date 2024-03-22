function toto(alcool) {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + alcool) //fetch = chercher / ici on va chercher la donnée
    .then((response) => response.json()) //on va chercher la réponse et on le transforme en json
    .then((data) => {
      const { drinks } = data;

      drinks.forEach((cocktail) => {
        //for each va chercher pour tout lister (boucle)
        const alcoolDiv = document.createElement("div");

        //   alcoolDiv.classList.add("alcool");

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

        let contenuDeMaDiv = "<h1>" + nomCocktail + "</h1>";
        contenuDeMaDiv =
          contenuDeMaDiv + `<img src="${cocktail.strDrinkThumb}" />`;

        for (let i = 0; i < ingredientsCocktail.length; i++) {
          contenuDeMaDiv =
            contenuDeMaDiv + "<p>" + ingredientsCocktail[i] + "</p>";
        }

        for (let i = 0; i < mesurecocktail.length; i++) {
          contenuDeMaDiv = contenuDeMaDiv + "<p>" + mesurecocktail[i] + "</p>";
        }

        alcoolDiv.innerHTML = contenuDeMaDiv;
        document.getElementById("cocktail").appendChild(alcoolDiv);
      });
    });
}


//dans index.html, dans la ballise boutton rajouter une propriété onClick ="fonction fléclée" (celle dans script.js)
// onclick="() => toto(alcool en fonction du boutton)"