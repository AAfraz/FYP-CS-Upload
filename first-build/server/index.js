var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");

var app = express(); // Create express app

// Allowing JSON data to be passed later on
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add middleware - Displaying the frontend
app.use(express.static(path.join(__dirname, "..", "build"))); // Locating build folder for the react build which is outside of server folder
app.use(express.static("public")); // Displaying default message if React app doesn't load - Order is important as express tries to read from top to bottom

// Setting up a connection to the SQL database
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fypdb1",
});

// Establish MySQL connection
connection.connect(function (err) {
  if (err) throw err;
  else {
    console.log("Connected to MySQL");
    // Start the app when connection is ready
    app.listen(5000);
    console.log("Server listening on port 5000");
  }
});

// Returning all the tasks
app.get("/api/tasks", (req, res) => {
  connection.query(
    "SELECT task.TaskID, task.Title, statustype.Status, task.DueDate FROM task JOIN statustype ON task.StatusTypeID = statustype.StatusTypeID;",
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    }
  );
});

// Returning projects for user 6
app.get("/api/userprojects", (req, res) => {
  connection.query(
    "SELECT project.ProjectID, project.Title, statustype.Status, project.DueDate FROM projectmember JOIN user ON projectmember.UserID = user.UserID JOIN project ON projectmember.ProjectID = project.ProjectID JOIN statustype ON project.StatusTypeID = statustype.StatusTypeID WHERE user.UserID = 6;",
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    }
  );
});

// Returning all the tasks for a specific project
app.get("/api/allprojecttasks/:projectId", (req, res) => {
  var projectId = parseInt(req.params.projectId)
  connection.query(
    "SELECT task.TaskID, task.Title, statustype.Status, task.DueDate FROM project JOIN task ON project.ProjectID = task.ProjectID JOIN statustype on task.StatusTypeID = statustype.StatusTypeID WHERE project.ProjectID = ?;",
    projectId,
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    }
  );
});

// Returning projects for specific user - Doesnt work - Build on later for multiple users
app.get("/api/user-projects-not-using", (req, res) => {
  var userId = req.params.userId;
  //console.log(userId);
  connection.query(
    // Using .format as .query expects valid SQL syntax
    connection.format(
      "SELECT project.Title, statustype.Status, project.DueDate FROM projectmember JOIN user ON projectmember.UserID = user.UserID JOIN project ON projectmember.ProjectID = project.ProjectID JOIN statustype ON project.StatusTypeID = statustype.StatusTypeID WHERE UserID = ?;",
      [userId]
    ),
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});
