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
    try {
        const api_url_get_data = "http://127.0.0.1:5000/btc_data";
        const response = await fetch(api_url_get_data)
        
        if(!response.ok){
            throw new error("lund koi data nahi aaa raha kuch bakchodi hui hai bhosad-pappu 😁", error)
        }
        const data = await response.json()
        console.log("retrived data = ", data)

        // create an array to store the data and do bakchodi 

        const crypto_data = []

        for (const timestamp in data) {
            if (data.hasOwnProperty(timestamp)) {
                const btc_data = data[timestamp]

                // appending the important things in the variable to create the dict
                const open_p = btc_data["Open"]
                const close_p = btc_data["Close"]
                const high_p = btc_data["High"]
                const low_p = btc_data["Low"]

                const data_dict = {
                    time_stamp : timestamp,
                    open_price : open_p,
                    close_price : close_p,
                    high_price : high_p,
                    low_price : low_p
                }
                crypto_data.push(data_dict)
            }
        }
        console.log(' data preview ', crypto_data )
        return crypto_data
    } catch (error) {
        console.log("phir se kuch bakchodi ho gai betichod ")
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const crypto_data = await get_data()
        const print_on_screen = document.querySelector("#result-c")
        crypto_data.forEach(entry => {
            const entryHTML = `
                <div>
                    <p>Open Price: ${entry.open_price}</p>
                    <p>High Price: ${entry.high_price}</p>
                    <p>Low Price: ${entry.low_price}</p>
                    <p>Close Price: ${entry.close_price}</p>
                </div>
            `;
            print_on_screen.innerHTML += entryHTML;
        })
    } catch(error) {
        console.log(error)
    }
})
