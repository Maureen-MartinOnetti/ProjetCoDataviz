function recupereliste(id) {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id) //fetch = chercher / ici on va chercher la donnée
    .then((response) => response.json()) //on va chercher la réponse et on le transforme en json
    .then((data) => {
      const { drinks } = data;

      // document.getElementById("cocktail").innerHTML = "";

      drinks.sort((a, b) => a.strDrink.localeCompare(b.strDrink));

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
//dans index.html, dans la balise boutton rajouter une propriété onClick ="fonction fléclée" (celle dans script.js)
// onclick="() => toto(alcool en fonction du boutton)"

//1Creer une fonction qui permet de récupèrer la liste de l'api:
//https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
//Et qui prend en params l'ingrédient.
//Cette fonction retourne un tableau d'id.

const getCocktailByIngredient = async (ingredient) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const dataToJSon = await response.json();
  const { drinks } = dataToJSon;

  //Drinks est un array d'objet.
  return drinks.map((drink) => drink.idDrink);
};

//Créer une fonction qui regroupe les 2;
const fetchCocktails = async (indregient) => {
  document.getElementById("cocktail").innerHTML = "";
  const tableauIds = await getCocktailByIngredient(indregient);

  console.log("tableauIds:", tableauIds);

  //Si le tableau est vide. Je fais rien.
  if (tableauIds.length === 0) {
    return;
  }

  for (let i = 0; i <= tableauIds.length; i++) {
    const id = tableauIds[i];

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 500)
    );

    recupereliste(id);
  }
};
