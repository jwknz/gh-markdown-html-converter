const path = require('path')
const express = require('express')
const app = express()
const showdown = require('showdown')
const { minify } = require('html-minifier')
const { Base64 } = require('js-base64')
const request = require('superagent')
require('dotenv').load()

const port = 80

app.use('/src', express.static(path.join(__dirname, "src")))

app.get('/', (req, res) => {
    res.send('You need to add your folder path');
})

app.get('/m/repos/:user/:repo/content/*', (req, res) => {

	let user = req.params.user
	let repo = req.params.repo
	let pathToFile = req.params[0]

	console.log(pathToFile)

	let file = pathToFile.slice(0, -3);
	file += `.md`;

	console.log(file)
	
	let url = `https://api.github.com/repos/${user}/${repo}/contents/${file}`

	request
	.get(url)
    .query({ 
        client_id: process.env.CLIENT_ID, 
        client_secret: process.env.CLIENT_SECRET
    })
	.set('Accept', 'application/json')
	.then(result => {

		const text = Base64.decode(result.body.content);

		let converter = new showdown.Converter()
		converter.setFlavor('github')
		html = converter.makeHtml(text);

		let css = `<link rel="stylesheet" href="/src/style.css" >${html}`

		let output = minify(css, {
			collapseWhitespace: true,
			minifyJS: true
		});

		res.send(output)
	})
	.catch(err => {
		console.log(err)
	})
})

app.get('/d/repos/:user/:repo/content/*', (req, res) => {

	let user = req.params.user
	let repo = req.params.repo
	let pathToFile = req.params[0]

	console.log(pathToFile)

	let file = pathToFile.slice(0, -3);
	file += `.md`;

	console.log(file)
	
	let url = `https://api.github.com/repos/${user}/${repo}/contents/${file}`

	request
	.get(url)
    .query({ 
        client_id: process.env.CLIENT_ID, 
        client_secret: process.env.CLIENT_SECRET
    })
	.set('Accept', 'application/json')
	.then(result => {

		const text = Base64.decode(result.body.content);

		let converter = new showdown.Converter()
		converter.setFlavor('github')
		html = converter.makeHtml(text);

		let output = minify(html, {
			collapseWhitespace: true,
			minifyJS: true
		});

		res.write(`document.write(\`${output}\`);`);
		res.end();
	})
	.catch(err => {
		console.log(err)
	})
})

app.listen(port, console.log(`Server listening....${port}`))