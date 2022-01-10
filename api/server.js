// BUILD YOUR SERVER HERE

//imports
const exprss = require("express");
const Users = require('./users/model.js')

// Instance of express app
const server = exprss();

// Global middleware
server.use(exprss.json)


// End points
module.exports = {
    
}; // EXPORT YOUR SERVER instead of {}
