const request=require('request')

const forecast=(lat,long,callback)=>{
    const url='https://api.weatherstack.com/current?access_key=1603e67563ba115e00e9b97e9ccf70b9&query='+lat+','+long
    request({url:url, json:true},(error, {body})=>{
        if(error){
        callback("something went wrong, unable to connect", undefined)
        }else if(body.error) callback('check the location and try again', undefined)
        else callback(undefined, {
                                    temperature:body.current.temperature,
                                    current_weather: body.current.weather_descriptions[0],                                    
                                    feelslike: body.current.feelslike,
                                    theForecast:'it is currently  ' + body.current.temperature + '  degrees and it feels like ' + body.current.feelslike
                                })
            
            // console.log(response.body.current.weather_descriptions[0],'. it is currently ', response.body.current.temperature,'degrees and it feels like ',response.body.current.feelslike)
    })
}

module.exports=forecast