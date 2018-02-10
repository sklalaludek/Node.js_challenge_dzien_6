//Twój kod
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('./public/zadanie01/'));
app.use(bodyParser.urlencoded());

app.post('/division', (req, res) => {
    const {
        dividend,
        divisor
    } = req.body;
    let result = Number(dividend) % Number(divisor);
    if (result === 0) {
        res.send(`${divisor} jest dzielnikiem liczby ${dividend}`);
    } else {
        res.send(`${divisor} nie jest dzielnikiem liczby ${dividend}`);
    }
});

app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});
