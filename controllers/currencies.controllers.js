const currenciesRepository = require('../repositories/currencies.repository');
const currenciesServices = require('../services/currencies.services');

exports.createCurrency = async (req, res) => {
    try {
        const { code, rate } = req.body;

        currenciesRepository.validateCurrency({ code, rate });

        const currencyRate = await currenciesServices.getCurrencyRate({ code, rate });

        if (currencyRate === undefined) {
            res.status(400).send({ message: 'No rate was found for this currency, please provide a rate.' });
        } else {
            await currenciesRepository.createCurrency({
                code: req.body.code,
                rate: currencyRate,
            });
            res.status(201).send({ message: 'Successfully registered currency!' });
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).send({ message: error.message });
        } else if (error.name === 'MongoServerError' && error.message.includes('duplicate key')) {
            res.status(409).send({ message: 'Failed to register currency: Duplicate code.' });
        } else {
            res.status(500).send({ message: 'Failed to register currency.' });
        }
    }
};