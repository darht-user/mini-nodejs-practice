const express = require('express')
const bodyParser= require('body-parser')
const weatherRequest = require('./requests/weather.request')

const app = express()
// API key - 6c2c2d457c60ba2801d742e55354cbcd

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('index', {weather: null, error: null})
})

app.post('/', async (req, res) => {
    const { city } = req.body
    const {weather, error} = await weatherRequest(city)
    
    res.render('index', {weather, error})
})

app.listen(8080, () => {
    console.log('server has started on port 8080')
})