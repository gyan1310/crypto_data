const body = document.querySelector("body")
const buy = document.createElement("div")
buy.id = "buy"
buy.innerText = "Buying opportunity"
body.append(buy)

const sell = document.createElement("div")
sell.id = "sell"
sell.innerText = "Selling opportunity"
body.append(sell)

function display_100_coins() {
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
                const coinSymbol = coin.symbol.toUpperCase();
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

                const coin_image_div = document.createElement("div")
                coin_image_div.id = "coin-image-div"

                const coin_name_symbol_div = document.createElement("div")
                coin_name_symbol_div.id = "coin-name-div"

                const coin_price_div = document.createElement("div")
                coin_price_div.id = "coin-price-div"

                // Create an image element for the cryptocurrency logo
                const img = document.createElement("img");
                img.id = "coin-image";
                img.src = coin.imageURL; // Use the imageURL without quotes
                img.alt = `${coin.name} logo`;
                coin_image_div.appendChild(img)

                // Create a paragraph element to display cryptocurrency name, symbol, and price
                const p = document.createElement("p");
                p.classList.add("coin-p");
                p.innerText = `${coin.name} (${coin.symbol})`;
                coin_name_symbol_div.appendChild(p)

                const cp = document.createElement("p")
                cp.id = "cp-p"
                cp.innerText = coin.currentPrice
                coin_price_div.appendChild(cp)

                // Append the image and paragraph to the coinDiv
                coinDiv.appendChild(coin_image_div);
                coinDiv.appendChild(coin_name_symbol_div);
                coinDiv.appendChild(coin_price_div)

                // Append the coinDiv to the body of the HTML document
                body.appendChild(coinDiv);
            });
        })
        .catch(error => {
            console.error('Error:', error); 
        }
    );
}

async function get_data () {
    api_url = "http://127.0.0.1:5000/btc_data"
    try {
        const response = await fetch(api_url);
        if (!response.ok) {
            throw new error("unable to fetch the data some issue with the api or with your method to send data ")
        }
        const data = await response.json()
        console.log("btc data ", data)

        const timedata = []

        for ( let i = 0; i< data.length; i++) {
            const time_data = data[i][0]
            timedata.push(time_data)
        }
        console.log(timedata)
        return timedata
    } catch (error) {
        console.log("error fetching btc data", error)
    }
}
get_data()
    .then({

    })
