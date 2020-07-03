const request= require('request')

const forecast= ((longitude,latitude,location, callback)=>{

    const url= 'http://api.weatherstack.com/current?access_key=15557e4e78b6423d80ecf631708ad07e&query=' +latitude + ',' + longitude + '&units=f'
    request({url:url,json: true}, (error,response)=> {
    if (error)
        callback("No internet",undefined)
    else if (response.body.success===false)
        callback("coordinate error",undefined)
    else
        callback(undefined,response.body.current.weather_descriptions[0] + ". The current temp of " + 
       location+ ' is ' + response.body.current.temperature + " but it feels like " +
         response.body.current.feelslike)
    })
})

module.exports= forecast