// BUILD YOUR SERVER HERE

//imports
const exprss = require("express");
const Users = require("./users/model.js");

// Instance of express appp
const server = exprss();

// Global middleware
server.use(exprss.json());

// End points

server.post("/api/users", async (req, res) => {
 try {
  const { name, bio } = req.body;
  const newUser = await Users.insert({ name, bio });

  if (!name || !bio) {
   res
    .status(400)
    .json({ message: "Please provide name and bio for the user" });
  } else {
   res.status(201).json(newUser);
  }
 } catch (err) {
  res.status(500).json({
   message: "There was an error while saving the user to the database",
  });
 }
});

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

server.get("/api/users/:id", async (req, res) => {
 try {
  const { id } = req.params;
  const user = await Users.findById(id);
  if (!user) {
   res
    .status(404)
    .json({ message: "The user with the specified ID does not exist" });
  } else {
   res.status(200).json(user);
  }
 } catch (err) {
  res
   .status(500)
   .json({ message: "The user information could not be retrieved" });
 }
});

server.delete("/api/users/:id", async (req, res) => {
 try {
  const { id } = req.params;
  const user = await Users.findById(id);
  if (!user) {
   res
    .status(404)
    .json({ message: "The user with the specified ID does not exist" });
  } else {
   const deletedUser = await Users.remove(user.id);
   res.json(deletedUser);
  }
 } catch (err) {
  res.status(500).json({ message: "The user could not be removed" });
 }
});

server.put("/api/users/:id", async (req, res) => {
 try {
  const updatedleUser = await Users.findById(req.params.id);
  if (!updatedleUser) {
   res.status(404).json({
    message: "The user with the specified ID does not exist",
   });
  } else {
   if (!req.body.name || !req.body.bio) {
    res.status(400).json({
     message: "Please provide name and bio for the user",
    });
   } else {
    const updatedUser = await Users.update(req.params.id, req.body);
    res.status(200).json(updatedUser);
   }
  }
 } catch (err) {
  res.status(500).json({
   message: "error updating user",
   err: err.message,
   stack: err.stack,
  });
 }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
