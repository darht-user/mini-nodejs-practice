const rp = require('request-promise')

module.exports = async function (city = '') {
    if (!city) {
        throw new Error('Empty name')
    }

    const KEY = '6c2c2d457c60ba2801d742e55354cbcd'
    const uri = 'http://api.openweathermap.org/data/2.5/weather'

    const options = {
        uri,
        qs: {
            appid: KEY,
            q: city,
            units: 'imperial'
        },
        json: true

    }

    try {
        const data = await rp(options)
        const celsius = ((data.main.temp - 32)/1.8000).toFixed(0)
        return {
            weather: `${data.name}: ${celsius}`,
            error: null
        }
    } catch (error) {        
        return {
            weather: null,
            error: error.error.message
        }
    }
}