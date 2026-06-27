const request =require('request')

const geocode=(address, callback)=>{
   const url='https://us1.locationiq.com/v1/search?key=pk.4434b153cdbe5ae4beaa0ae563a3f138&q='+encodeURIComponent(address)+'&format=json'
    request({url:url, json:true},(error, {body})=>{
        
        if(body.error) { callback('problem with the inputed address', undefined)}
        else if(body.length==0) {
            error='unable to find the location'
            callback(error, undefined)
        }
        else {            
            const data={lat: body[0].lat ,                
                        long:body[0].lon, 
                        location: body[0].display_name}
            
            callback(undefined,data ) 

            //{lat:lat, long:long, name:location}   
           
        }
    })

}

// request({url:url2, json:true},(error, response)=>{

//     if(error)console.log(error)
//     else if(response.body.length==0) console.log('Unable to find the location')
//     else {
//     const {lat,lon:long, display_name:name}=response.body[0]
//     // console.log(response.body)
//     console.log(lat, long, name)
//     }

// } )

module.exports={
    geocode:geocode
}

