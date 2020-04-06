const request=require('request')

const geocode=(address,callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYW1hbnJveCIsImEiOiJjazhobjB0cHMwMXg4M29wY3g5MXBmcDNsIn0.nTok_RUa5pju7CERNiR_Jg&limit=1'

    request({ url, json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect to location services.",undefined)
        }else if(body.features.length===0){
            callback("Unable to find location.Try another Search.",undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
