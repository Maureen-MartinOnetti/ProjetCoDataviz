// let ingredients =["alcool.strMeasure1", "alcool.strMeasure2","alcool.strMeasure3", "alcool.strMeasure4", "alcool.strMeasure5", "alcool.strMeasure6"]
// for (let i = 0; i < alcool.strIngredient1.length; i ++){
//     if(alcool.strIngredient1 === 'null'){
//         return ""
//     }
// }

fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=vodka") //fetch = chercher / ici on va chercher la donnée
  .then((response) => response.json()) //on va chercher la réponse et on le transforme en json
  .then((data) => {
    console.log(data.drinks);
    data.drinks.forEach((alcool) => {
      //for each va chercher pour tout lister (boucle)
      const alcoolDiv = document.createElement("div");
      console.log(alcool);
      alcoolDiv.classList.add("alcool");
      alcoolDiv.innerHTML = `
              

              <h1>${alcool.strDrink}</h1>

              <img src="${alcool.strDrinkThumb}" />
             <p>${alcool.strIngredient1}</p>
             <p>${alcool.strIngredient2}</p>
             <p>${alcool.strIngredient3}</p>
             <p>${alcool.strIngredient4}</p>
             <p>${alcool.strIngredient5}</p>
             <p>${alcool.strIngredient6}</p>


             <p>${alcool.strMeasure1}</p>
             <p>${alcool.strMeasure2}</p>
             <p>${alcool.strMeasure3}</p>
             <p>${alcool.strMeasure4}</p>
             <p>${alcool.strMeasure5}</p>
             <p>${alcool.strMeasure6}</p>

        
              `;
      document.getElementById("alcool").appendChild(alcoolDiv);
    });
  });