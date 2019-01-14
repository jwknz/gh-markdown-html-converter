const express = require('express')
const app = express()
const path = require('path')
const showdown = require('showdown')
const { minify } = require('html-minifier')
const fetch = require('node-fetch')
const Base64 = require('js-base64').Base64

const port = 80


app.get('/', (req, res) => {
    res.send('You need to add your folder path');
})

app.get('/repos/:user/:repo/content', (req, res) => {

	let user = req.params.user
	let repo = req.params.repo
	let pathToFile = req.params.path
	
//	let url = `https://api.github.com/repos/${user}/${repo}`

	console.log(user)
	console.log(repo)
	
})

app.get('/repos/:user/:repo/content/:path*?', (req, res) => {

	let user = req.params.user
	let repo = req.params.repo
	let pathToFile = req.params.path
	
//	let url = `https://api.github.com/repos/${user}/${repo}`

	console.log(user)
	console.log(repo)
	console.log(pathToFile)	
	
})

app.listen(port, console.log(`Server listening....${port}`))