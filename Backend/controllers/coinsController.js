const axios = require('axios');


const coinList = {

    getListOfCoins: async function (req, res) {
        try {
            const pagination = req.body.pagination;

            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${pagination.pageSize}&page=${pagination.pageIndex}&sparkline=false&locale=en`)

            const data = response.data;
            const requiredFields = data.map((data) => {
                return {
                    name: data.name,
                    id: data.id,
                    symbol: data.symbol,
                    current_price: data.current_price,
                    high_24h: data.high_24h,
                    low_24h: data.low_24h,
                    market_cap_change_percentage_24h: data.market_cap_change_percentage_24h,
                    image: data.image,
                };
            })

            return res.json(requiredFields);

        } catch (error) {
            if (error.response.status === 429) {
                return res.status(429).json({ error: "To many request. Free public Coingecko version has request limit restriction, wait some minutes and try again." })
            }
            return res.status(400).json({ error: "Something went wrong" })
        }


    },

    getCoinDetails: async function (req, res) {

        try {

            const coin_id = req.params.coin_id
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin_id}`)
            const data = response.data;

            const requiredFields = {
                name: data.name,
                description: data.description.en,
                current_price: data.market_data.current_price.usd,
                high_price_24h: data.market_data.high_24h.usd,
                low_price_24h: data.market_data.low_24h.usd,
                price_change_24h: data.market_data.price_change_24h_in_currency.usd,
                price_change_7d: data.market_data.price_change_percentage_7d_in_currency.usd,
                price_change_14d: data.market_data.price_change_percentage_14d_in_currency.usd,
                price_change_30d: data.market_data.price_change_percentage_30d_in_currency.usd,
                price_change_30d: data.market_data.price_change_percentage_30d_in_currency.usd,
                price_change_1y: data.market_data.price_change_percentage_1y_in_currency.usd,
                image: data.image.large,
            }
            return res.json(requiredFields)

        } catch (error) {
            if (error.response.status === 429) {
                return res.status(429).json({ error: "To many request. Free public Coingecko version has request limit restriction, wait some minutes and try again." })
            }
            return res.status(400).json({ errorMessage: "Something went wrong" })
        }

    }

}

module.exports = coinList;