//Twój kod
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.static('./public/zadanie02/'));
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.post('/cookie/set', (req, res) => {
    const name = req.body.name;
    res.cookie('name', name, {
        maxAge: 2592000000
    });
    res.send(`Zapisano imię ${name} w cookie`)
});

app.get('/cookie/show', (req, res) => {
    const cookie = req.cookies.name;
    res.send(cookie);
});

app.get('/cookie/check', (req, res) => {
    if (req.cookies.name === undefined) {
        res.send('Imię zostało zapisane')
    } else {
        res.send('Imię nie zostało zapisane w ciastku!')
    }
});

app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});
