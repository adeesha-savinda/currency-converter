const axios = require('axios');

const fixer = require('../constants/fixer');

exports.convertCurrency = async (req, res, next) => {
    try {
        const { API_KEY, url_latest } = fixer;
        const { fromCurrency, amount, toCurrency } = req.body;
        const response = await axios.get(url_latest, {
            params: {
                access_key: API_KEY,
                base: fromCurrency,
                symbols: toCurrency
            }
        });
        const { data } = response;

        if (!data.success) {
            const { error } = data;
            next(error);
        }

        res.json(data);
        console.log(data);
    } catch (error) {
        next(error);
    }
};