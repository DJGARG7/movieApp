const axios = require('axios')

async function makeRequest(url) {
    const response = await axios.get(url);

    
    return response.data();  // .data, json()
}








async function makeRequest(url) {
    // Return a promise that can be awaited.
    return new Promise(callBack2)
}


function callBack2(resolve, reject) {
    request(url, callBack1)
}

function callBack1(error, response, body) {
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
}

///////////////////////////////////////////////////////////////////////////////////////////////////

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
////////////////////////////////////////////////


let makeRequest2 = () => {

} 