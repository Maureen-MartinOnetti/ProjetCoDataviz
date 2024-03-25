function recupereliste(alcool) {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + alcool) //fetch = chercher / ici on va chercher la donnée
    .then((response) => response.json()) //on va chercher la réponse et on le transforme en json
    .then((data) => {
      const { drinks } = data;

      document.getElementById("cocktail").innerHTML= ''


      drinks.forEach((cocktail) => {
        //for each va chercher pour tout lister (boucle)
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
        contenuDeMaDiv = contenuDeMaDiv+ "<h2>" + nomCocktail + "</h2>";
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
//dans index.html, dans la balise boutton rajouter une propriété onClick ="fonction fléclée" (celle dans script.js)
// onclick="() => toto(alcool en fonction du boutton)"
