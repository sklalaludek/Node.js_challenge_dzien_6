const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.static('./public/zadanieDnia/'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

function addComment(commentsCookieValue, newComment) {
    const comments = readComments(commentsCookieValue);
    comments.push(newComment);
    return JSON.stringify(comments);
}

function readComments(commentsCookieValue) {
    return commentsCookieValue ? JSON.parse(commentsCookieValue) : [];
}

app.get('/', (req, res) => {
	let comments = readComments(req.cookies.comments);
	res.send(`
		<h3>Dodane komentarze:</h3>
		      ${comments} <br><br>
		<a href="add.html">Dodaj komentarz</a>
	`);
});

app.post('/save', (req, res) => {
	let comments = addComment(req.cookies.comments, req.body.comment)
	res.cookie('comments', comments, {
        maxAge: 2592000000
    });
	res.send(`
		<p>Komentarz: ${req.body.comment} został dodany</p>
		<a href="/">Powrót</a>
	`);
});

app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});
