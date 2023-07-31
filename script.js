let view = "grid";

const container = document.getElementById("container");
const gridButton = document.getElementById("gridButton");
const listButton = document.getElementById("listButton");
let coinsdata;
gridButton.classList.add("active");


gridButton.addEventListener("click", function () {
  view = "grid";
  gridButton.classList.add("active");
  listButton.classList.remove("active");
  console.log("grid button clicked");
  renderData();

});

listButton.addEventListener("click", function () {
  view = "list";
  listButton.classList.add("active");
  gridButton.classList.remove("active");
  console.log("list button clicked");
  renderData();

});

fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
)
  .then((response) => response.json())
  .then((data) => {
    coinsdata = data;
    renderData();
  });

function renderData() {
  console.log(coinsdata);
  container.innerHTML = "";
  if (view == "grid") {
    coinsdata.forEach((coin) => {
        container.innerHTML+=`
        <div class="card">
        <div class="row-1">
         <img src="${coin.image}" alt="logo">
         <div>
             <p class="symbol">${coin.symbol}</p>
             <p class="id">${coin.id}</p>
         </div>
        </div>
        <p class="price_change_percentage_24h" ${coin.price_change_percentage_24h>0?`style="color:green; border: 1px solid green"`:`style="color:red; border: 1px solid red;"`}>${coin.price_change_percentage_24h} %</p>
        <p class="current_price" ${coin.price_change_percentage_24h>0?`style="color:green; "`:`style="color:red;"`}>$ ${coin.current_price}</p>
        <p class="total_volume">Total Volume: ${coin.total_volume}</p>
        <p class="market_cap">Market Cap: $ ${coin.market_cap}</p>
       </div>
        `
    });
  } else {
    
  container.innerHTML+=`
        <table class="list">
        <thead>
          <tr class="list-header">
            <td>Name</td>
            <td>%age change</td>
            <td>Price($)</td>
            <td>Total Volume</td>
            <td>Market Cap</td>
          </tr>
        </thead>
        <tbody>

          ${coinsdata.map(coin=>`
          <tr>
            <td id="list-col-1">
              <div class="row-1">
                <img src="${coin.image}" alt="logo" />
                <div>
                  <p class="symbol">${coin.symbol}</p>
                  <p class="id">${coin.id}</p>
                </div>
              </div>
            </td>
            <td id="list-col-2">
              <p class="price_change_percentage_24h" ${coin.price_change_percentage_24h>0?`style="color:green; border: 1px solid green"`:`style="color:red; border: 1px solid red;"`}>
                ${coin.price_change_percentage_24h}
              </p>
            </td>
            <td id="list-col-3">
              <p class="current_price" ${coin.price_change_percentage_24h>0?`style="color:green; "`:`style="color:red;"`}>${coin.current_price}</p>
            </td>
            <td id="list-col-4">
              <p class="total_volume">Total Volume: ${coin.total_volume}</p>
            </td>
            <td id="list-col-5">
              <p class="market_cap">Market Cap: ${coin.market_cap}</p>
            </td>
          </tr>
        `).join(" ")}
        </tbody>
      </table>
        `;
  }
}