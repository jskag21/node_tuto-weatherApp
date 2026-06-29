

const weatherForm=document.querySelector('form')
const searchInput=document.querySelector('input')
const messageOne=document.getElementById('messageOne')
const messageTwo=document.getElementById('messageTwo')
const locationDumper=document.querySelector('.myLocation')
const temperatureDumper=document.querySelector('.theTemperature span')
const temperatureDumperWrapper=document.querySelector('.theTemperature')


weatherForm.addEventListener('submit',(e)=>{
    
    document.querySelector('.loader').style.display='block'
    messageOne.style.display='none'
    messageTwo.style.display='none'
    temperatureDumperWrapper.style.display='none'

    
    e.preventDefault()
    const location=searchInput.value

    // messageOne.textContent=''
    // messageTwo.textContent=''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
        if(data.error) {

            document.querySelector('.loader').style.display='none'              
            messageTwo.style.display='none'
            temperatureDumperWrapper.style.display='none'
                
            messageOne.style.display='block'
            messageOne.textContent=''+data.error
                //return  console.log(data.error)

            // messageOne.textContent=data.error
            // messageOne.classList.add('errorMessage')
            //console.log(data.error)
        }
        else{
            // messageOne.appendChild(lImg)
            // messageOne.textContent=data.location
            // messageTwo.textContent=data.forecast.theForecast

            //console.log(data.forecast.temperature, data.forecast.theForecast, data.location)
            document.querySelector('.loader').style.display='none'
            messageTwo.style.display='block'
            temperatureDumperWrapper.style.display='block'
            locationDumper.textContent=data.location 
            temperatureDumper.textContent=''+data.forecast.temperature
            console.log(data.location )
            console.log('temperature  '+ data.forecast.temperature ,)    
        }
        })

    })


})