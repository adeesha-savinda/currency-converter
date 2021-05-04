const axios = require('axios');

const fixer = require('../constants/fixer');

exports.convertCurrency = async (req, res, next) => {
    try {
        const { API_KEY, url } = fixer;
        const { fromCurrency, amount, toCurrency } = req.body;

        const response = await axios.get(`${url}?access_key=${API_KEY}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`);

        // const response = await axios.get(`${url_la}?access_key=${API_KEY}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`);
        const { data } = response;

        // handle API error
        if (!data.success) {
            const { error } = data;
            return next(error);
        }

        //cache
        await req.redisClient.hmset('last_cache', 'from_currency', fromCurrency, 'to_currency', toCurrency, 'rate', data.info.rate);
        await req.redisClient.expire('last_cache', 86400);

        //send the result
        return res.status(200).json({
            amount: data.result,
            currency: toCurrency
        });

    } catch (error) {
        next(error);
    }
};