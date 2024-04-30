const express = require('express');
const app = express();

app.get('/', (req,res)=> {
    res.send("Welcome to my nodejs app!")
});

app.listen(3000, function() {
    console.log("app listeninf on port 3000")
});
