const request= require('request')

const geocode=(address,callback)=> {
    const geocodeURL= 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZGhydWIwMjE2IiwiYSI6ImNrYzNkd2JibjA4eHUydXF1YWJtZWRncXoifQ.yWuluEW3qduVbhKhi_bHjA&limit=1'
    
    request({url: geocodeURL,json: true}, (error, response)=>{
        if(error)
            callback("Unable to reach to weather service", undefined)
        else if(response.body.features.length===0)
            callback("Location Error", undefined)
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location: response.body.features[0].place_name
             } )
        }
    })
    }
    
module.exports= geocode