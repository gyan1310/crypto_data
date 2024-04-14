
const api_key = 'CG-E9qzVc59BBVpJ7xxzFihWonY'
const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': api_key}
  };

async function fetch_top_100_coins() {
    try {
        const response = await fetch(url, options);
    
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        console.log(data);

        const coins = [];
        for (let i = 0; i < data.length; i++) {
            const coin = data[i];
            const coinName = coin.name;
            const coinSymbol = coin.symbol;
            const coinCurrentPrice = coin.current_price;
            const coinImageURL = coin.image; // Image URL

            // Remove surrounding quotes from the image URL if present
            const cleanImageURL = coinImageURL.replace(/"/g, '');

            coins.push({ name: coinName, symbol: coinSymbol, currentPrice: coinCurrentPrice, imageURL: cleanImageURL });
        }

        return coins;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to be caught in the Promise chain
    }
}

// Call the function to fetch and display top 100 cryptocurrencies
fetch_top_100_coins()
    .then(coins => {
        const body = document.querySelector("body");

        coins.forEach(coin => {
            // Create a div element to hold each cryptocurrency's information
            const coinDiv = document.createElement("div");
            coinDiv.classList.add("coin-item");

            // Create an image element for the cryptocurrency logo
            const img = document.createElement("img");
            img.classList.add("coin-image");
            img.style.display = "inline";
            img.style.height = "30px";
            img.style.width = "30px";
            img.src = coin.imageURL; // Use the imageURL without quotes
            img.alt = `${coin.name} logo`;

            // Create a paragraph element to display cryptocurrency name, symbol, and price
            const p = document.createElement("p");
            p.classList.add("coin-p");
            p.style.display = "inline"
            p.style.textAlign = "center"
            p.innerText = `${coin.name} (${coin.symbol}): $${coin.currentPrice}`;

            // Append the image and paragraph to the coinDiv
            coinDiv.appendChild(img);
            coinDiv.appendChild(p);

            // Append the coinDiv to the body of the HTML document
            body.appendChild(coinDiv);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    }
);
