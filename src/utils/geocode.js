const request = require('request')

const geoCode = (address,callback) => {
    // Geocoding

    // Address -> Lat/Long -> Weather

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibGdvbWVzMTA0IiwiYSI6ImNsOGtlNmgybjE1eWozcG81ejFldjNmNTUifQ.iQN-CtpvTFU9WsKr6Yv0ww&limit=1'

    request({url, json: true}, (error,{body} = {}) => {
        //console.log(response.body.currentConditions)
        if(error) {
            callback('Unable to connect to location service!')
        } else if (body.features.length === 0) {
            callback('Unable to find location!')
        }else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geoCode