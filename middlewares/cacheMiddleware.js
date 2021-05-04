const cacheMiddleware = (req, res, next) => {
    const { fromCurrency, amount, toCurrency } = req.body;
    req.redisClient.hgetall('last_cache', (err, value) => {
        if (err) {
            next(err);
        }
        //if values are available in the cache
        console.log(value)
        console.log(req.body)
        if (value) {
            if (value.from_currency === fromCurrency && value.to_currency === toCurrency) {
                return res.status(200).json({
                    amount: (value.rate * amount),
                    currency: toCurrency
                });
            }
        }
        next();
    });
};

module.exports = cacheMiddleware;