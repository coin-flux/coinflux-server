const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Use middlewares
app.use(express.json());
app.use(cors());

// GET all Currencies
app.get('/getAllCurrencies', async (req, res) => {
    const url = 'https://openexchangerates.org/api/currencies.json?app_id=6deca09aa85143e8a70de97e0211a32c';
    try {
        const response = await axios.get(url);
        const responseData = response.data;
        // console.log(responseData);
        return res.json(responseData);

    } catch (error) {
        console.error(error);

    }
});

// GET params and return Target value
app.get('/convert', async (req, res) => {
    const { sourceCurrency, targetCurrency, date, sourceAmount } = req.query;
    const url = `https://openexchangerates.org/api/historical/${date}.json?app_id=6deca09aa85143e8a70de97e0211a32c`;

    try {
        const response = await axios.get(url);
        const responseRates = response.data.rates;
        // console.log(responseRates);


        // Rates
        sourceRate = responseRates[sourceCurrency];
        targetRate = responseRates[targetCurrency];

        // Target amount
        const targetAmount = ((sourceAmount * targetRate) / sourceRate).toFixed(2);

        console.log('----------------------------------------------------------');
        console.log(`Source: ${sourceCurrency},  Rate: ${sourceRate}`);
        console.log(`Target: ${targetCurrency},  Rate: ${targetRate}`);
        console.log(`Amount: ${sourceAmount}, Value: ${targetAmount}`);
        console.log('----------------------------------------------------------');

        return res.json(targetAmount);

    } catch (error) {
        console.error(error);
    }

});

app.use((req,res)=>{
    res.send('<h1>Server is Running!</h1>');
})

app.listen(5000, () => {
    console.log("--- Server Started ---");
})