const express = require('express');
const app = express();

app.get('/', (req,res)=> {
    res.send("Welcome to my nodejs app! v4")
});

app.listen(3000, function() {
    console.log("New version of app listening on port 3000")
});
