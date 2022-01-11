// BUILD YOUR SERVER HERE

//imports
const exprss = require("express");
const Users = require("./users/model.js");

// Instance of express appp
const server = exprss();

// Global middleware
server.use(exprss.json());

// End points

server.get("/api/users", (req, res) => {
 Users.find()
  .then((users) => {
   res.json(users);
  })
  .catch((err) => {
   res.status(500).json({
    message: "error getting users",
    err: err.message,
   });
  });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
