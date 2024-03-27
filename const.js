let alcool1 = "vodka";
let alcool2 = "rum";
let alcool3 = "gin";
let alcool4 = "tequila";

const getAlcool = async (alcool) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${alcool}`;
  const response = await fetch(url);
  const data = await response.json();
  const alcoolType = data.drinks;
  console.log(alcoolType.length);
  return { name: alcool, count: alcoolType.length };
};
let alcoolData;
let totalCocktails = 0;

const getAllAlcools = async () => {
  const promises = [
    getAlcool(alcool1),
    getAlcool(alcool2),
    getAlcool(alcool3),
    getAlcool(alcool4),
  ];
  const results = await Promise.all(promises);
  alcoolData = results.map((result) => ({
    name: result.name,
    count: result.count,
  }));
  alcoolData.forEach((alcool) => {
    totalCocktails += alcool.count;
  });
};

getAllAlcools().then(() => {
  console.log(alcoolData);
  console.log(totalCocktails);
  createGraph(alcoolData, totalCocktails);
});

function createGraph(alcoolData) {
  const width = 400;
  const height = 300;
  const margin = { top: 20, bottom: 20, left: 10, right: 10 };

  const xScale = d3
    .scaleBand()
    .range([margin.left, width - margin.right])
    .domain(
      alcoolData.map(function (d) {
        return d.name;
      })
    )
    .padding(0.2);

  const yScale = d3
    .scaleLinear()
    .range([height - margin.bottom, margin.top])
    .domain([
      0,
      d3.max(alcoolData, function (d) {
        return d.count;
      }),
    ]);

  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg
    .append("g")
    .attr("class", "axis-x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .selectAll("text")
    .style("text-anchor", "end");

  svg
    .selectAll(".bar")
    .data(alcoolData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d.name))
    .attr("y", (d) => yScale(d.count))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => height - margin.bottom - yScale(d.count));
}
