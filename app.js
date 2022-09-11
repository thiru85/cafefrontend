const axios = require('axios');
const { response } = require('express');
const express = require('express');
const app = express();
const port = 3000;
const os = require('os');
const hostname = os.hostname();
var coffeeType, coffeeSize, coffeeContainer, cakeSize, cakeType, cakeContainer;

app.get('/', (req, res) => {
    
    Promise.all([
                axios.get("coffeeapi"),
                axios.get("cakeapi")])
    .then(response => {
        //console.log("you desperately need a " + response.data.coffeeType);
        coffeeType = response[0].data.coffeeType;
        coffeeSize = response[0].data.coffeeSize;
        coffeeContainer = response[0].data.containerID;
        cakeSize = response[1].data.cakeSize;
        cakeType = response[1].data.cakeName;
        cakeContainer = response[1].data.containerID;
        console.log(coffeeType + ' ' + coffeeSize);
        console.log(response[1].data)
        })
    .catch(error => {
        console.log(error);
        });
    return res.send(
    `<!DOCTYPE html>\
    <html>\
    <head>\
    <title>Hello Nordics</title>\
    <meta http-equiv="refresh" content="3">\
    </head>\
    <body>\
    <h1>Hello Nordics!</h1>\
    <p>This is a simple frontend powered by Node.js to display information like: </p>\
    <ol>\
    <li>What Coffee you need...</li>\
    <li>What Cake goes along with it...</li>\
    </ol>\
    <p>And more...</p>\
    <p>So, here you go!</p>` + `
    <p></p>` + '<h2>You need a ' + coffeeSize + ' ' + coffeeType + ' that goes really well with a: ' + `
    <h2>${cakeSize} ${cakeType}!</h2>\
    <p></p>\
    <h3>This content was served by the: ${coffeeContainer} coffeeAPI pod and the ${cakeContainer} cakeAPI pod! </h3>\
    <h4>You're seeing this, from: ${hostname}!</h4>
    <ln>
    </body>    
    </html>`);
})

app.listen(port, () => {    
    console.log("Listening on 3000")
});
