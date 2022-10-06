const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000
// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/help', (req,res) =>{
    res.render('help',{
        title: 'Help',
        message: 'This is the help page',
        name: 'Luis Gomes'
    })
})
app.get('/about', (req,res) =>{
    res.render('about',{
        title: 'About Me',
        name: 'Luis Gomes'
    })
})

app.get('', (req,res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Luis Gomes'
    })
}

)
app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geoCode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({
                error
            })
        } 

        forecast(latitude,longitude, (error, {condition, currentTemp, feelsLikeTemp}= {}) => {
            if(error){
                return res.send({
                    error
                })
            } 

            res.send({
                forecast: 'Currently it is '+ condition +'. It is ' + currentTemp + ' outside, and it feels like ' +feelsLikeTemp+'.',
                location,
                address: req.query.address
            })

        })
        
    })

    
})

// app.get('/products', (req,res) => {
//     // console.log(req.query.search)
//     if(!req.query.search){
//         return res.send({
//             error: 'You must provide a search term!'
//         })
//     }

//     res.send({
//         products: []
//     })
// })

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title: '404',
        errorMessage: 'Help Article not found!',
        name: 'Luis Gomes'})
}) 
app.get('*',(req,res) =>{
    res.render('404',{
        title: '404',
        errorMessage: 'My 404 page!',
        name: 'Luis Gomes'})
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '!')
})