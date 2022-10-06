const request = require('request')

const forecast = (lat,long,callback) => {
    
    const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+ lat + ',' +long+'?unitGroup=metric&key=MZWFF8QZU2QK6RMWDYPS5X24D&contentType=json'

    request({url, json: true}, (error,{body}) => {
    //console.log(response.body.currentConditions)
    if(error){
        callback('Unable to connect to weather service!')
    } else if (body.error){
        callback('Unable to find location!')
    } else {
        callback(undefined,{
            condition : body.currentConditions.conditions,
            currentTemp: body.currentConditions.temp,
            feelsLikeTemp: body.currentConditions.feelslike
        })
    }
   })

}

module.exports = forecast