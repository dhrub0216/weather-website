
const path= require('path')
const express= require('express')
const hbs= require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')
const app=express()
const port= process.env.PORT  || 3000

const publicDirectoryPath= path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'The Dhrub Kumar',
        body: 'Hi there. How are you?',
        name: 'Dhrub Kumar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        founded: '2020',
        subscription: '1 year',
        name: 'Dhrub Kumar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        mode: 'call or text me',
        message: 'Please drop us a mail or call',
        name: 'Dhrub Kumar'
    })
})

app.get('/weather',(req,res)=> {
    if (!req.query.address)
        return res.send({
            error: 'address not provided'
        })
   
geocode (req.query.address,(error,{latitude,longitude,location}={})=>{ 
    if(error){
    return res.send({error})
    }
    forecast(latitude,longitude,location,(error,forecastData)=> {
        if (error){
            return res.send({error})
        }
        
            res.send({
                forecast: forecastData,
                location ,
                address: req.query.address
            }) 
    })
})
    
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        message: 'Help Article not found'
    })
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
       return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products:[]
    })   
})

app.get('*', (req,res)=>{
    res.render('error', {
        message: '404 Error Message'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on '+ port)
})

