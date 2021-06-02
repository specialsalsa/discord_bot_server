// SERVER JS - FILE WHERE THE SERVER RUNS/STARTS


require("dotenv").config();

// import the packages
const express = require('express');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const router = require('./Routes/router');
const cors = require('cors');
// port variable - if it's not 4000 , it will be any other that is available
const port = process.env.PORT;

// variable that creates the Express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(expressSanitizer());

// link/attach the router with the app
app.use(router);


// start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


