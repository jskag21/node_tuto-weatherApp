const path=require ('path')
const express=require('express')

const hbs=require('hbs')
const { error } = require('console')

const {geocode}=require('./utils/geocode')
const forecast=require('./utils/forecast')


// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app=express()
const port= process.env.PORT || 3000
//setting up paths
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//configuring hbs
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

//app routes
app.get('',(req,res)=>{
    // res.send('Hello express!')
    res.render('index',{
        title:'Weather App',
        name:'Glody kaswangala'
    })
})
app.get('/weather',(req,res)=>{
    
    if(!req.query.address) return res.send({
        error:'you must provide an address'
    })
    
    geocode(req.query.address, (error,{lat, long, location}={})=>{
        if(error) return res.send({error:error})
       
        forecast(lat,long,(error,forecastData)=>{
            
            if(error){
                console.log('something went wrong! ')
                return  {error:error}}
            else {
                console.log('successfull request')
                return  res.send({
                            forecast:forecastData,
                            location: location,
                            address:req.query.address
                            })
                }
              //{forcast:forecastData, location: data.location}
             // console.log('weather of: ', data.location)
            // console.log(forecastData)
        
        })    
       
     })

    //console.log(myGcodeFunction)
    //if(myGcodeFunction.error) return res.send({error:myGcodeFunction.error})
    // res.send({
    //     forcast:myGcodeFunction.forcast,
    //     location: myGcodeFunction.location,
    //     address:req.query.address
    //})
})
app.get('/product', (req, res)=>{
    console.log(req.query)
    if(!req.query.search) return res.send({
        error:'you must provide a search term'
    })
    res.send({
        products:[]
    })
})

app.get('/about',(req,res)=>{
    // res.send("<h1>About Page</h1>")
    res.render('about',{
        title:'About Me',
        name:'Gloire Kaswa'
    })
})

app.get('/help',(req,res)=>{
    //res.sendFile(path.join(__dirname, '../public/help1.html'))
    res.render('help',{
        text:'the help page content',
        title:'Help',
        name:'Gloire Kaswa'
    })
})

app.get('/help/*all',(req,res)=>{
    res.render('404',{
        text:'Help article not found',
        title:"404 page"
    })
})
app.use('/*all',(req,res)=>{
    //res.sendFile(path.join(__dirname, '../public/help1.html'))
    res.render('404',{
        title:'404 page',
        text:'Page not found'
    })
})





app.listen(port,()=>{
    console.log('surving on port', port)
})