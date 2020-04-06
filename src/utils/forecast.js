const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url="https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=c02cd7ca118aa8e78805dd451bf37c1f&units=metric"

    request({ url, json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect Weather Services',undefined)
        }else if(body.cod==="400"){
            callback(body.message,undefined)
        }else{
            callback(undefined,"Temperature is "+body.main.temp+" degress and status is "+body.weather[0].main)
        }   
    })
}

module.exports=forecast