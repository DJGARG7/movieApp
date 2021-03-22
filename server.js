const express = require('express');
const request = require('request')
const app = express()

// middlewares
app.set("view engine","ejs")
app.use('/public',express.static('public'))

app.get('/',(req,res)=>{
    // res.send("hell")
    res.render("home")
})
app.get('/AboutMe',(req,res)=>{
    // res.send("hell")
    res.render("AboutMe")
})
// app.get('/student/:roll',(req,res)=>{
//     console.log(req.params)
//     res.send(`welcome to number ${req.params.roll}`)
// })
async function makeRequest(url) {
    // Return a promise that can be awaited.
    return new Promise((resolve, reject) => {
        request(url,(error,response,body)=>
        {
            if(!error && response.statusCode===200)
            {
                const data = JSON.parse(body)
                // console.log(data);
                // Sort of like asynchronous return
                resolve(data)  
            } else {
                // Sort of like asynchronous throw Exception
                reject(`Request to OMDB API returns status code ${response.status}`)
            }          
        })
    })
}


app.get('/result',async (req,res)=>{
    // console.log(req.query)

    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=522b08e7&s=${req.query.movie}`

    try {
        // If request is sucessful, json data will be assigned to data. If not, will throw an exception
        const data = await makeRequest(url)
        // console.log(data);
        let dat = { Search: [],Response: 'True' }
    
        for( let movie of data['Search'] ) {
                // console.log(movie);
                let url0 = `http://www.omdbapi.com/?apikey=522b08e7&i=${movie.imdbID}`               
                 makeRequest(url0).then(data => {
                     movie.plot = data.Plot
                     dat.Search.push(movie)
                 })
        }

    // await Promise.all(data['Search'].map(async movie => {
    //         const data = await makeRequest(url0)
    //         movie.plot = data.plot
    //         dat.Search.push(movie)
    // })) 
        setTimeout(()=>{ res.render("result",{movieData:dat})},2000)
       
    } catch(e) {
        res.status('501').send({'Error': 'OMDB API error', 'Message': e});
    }
})

app.get('/result/:movie',(req,res)=>{
    
    const url = `http://www.omdbapi.com/?apikey=522b08e7&i=${req.params.movie}`
    console.log(url)
    request(url,(error,response,body)=>{
        if(!error && response.statusCode===200){
            const data = JSON.parse(body)
            // res.send(data)
            res.render("AboutMovie",{movieData:data})
        }else{
            res.send("something went wrong")
        }
    })
})
app.listen(3000,()=>{
    console.log('server has started')
})
