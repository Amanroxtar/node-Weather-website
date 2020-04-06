const path=require('path')
const express=require('express')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const hbs=require('hbs')

const app=express()

//Define paths for express config
const publicPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,"../template/views")
const partialsPath=path.join(__dirname,"../template/partials")

//Setup handelbars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPath))

app.get('',(req,res)=>{
    res.render('index',{
        name:'AMAN',
        title: 'Weather App'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'ABOUT PAGE',
        name: 'AMAN'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'HELP PAGE',
        name: 'AMAN'
    })
})

app.get('/Weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })
        
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Provide search'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:404,
        name:'Aman',
        errormsg:'Help arcticle not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:404,
        name:'Aman',
        errormsg:'Page not Found'
    })
})


app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})