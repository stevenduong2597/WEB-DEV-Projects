import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.static("public"));
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

// Array of tasks
let tasks = []
let workList = []

app.get("/", (req, res) => {
  const date = new Date();
  const dateOptions = {
    weekday:"long", 
    day:"numeric",
    month:"long"
  };
  res.render("index.ejs", {tasks:tasks, today:date.toLocaleDateString("en-US", dateOptions)});
});

app.post("/submit", (req,res)=>{
  var newTask = req.body.newTask;
  tasks.push(newTask);
  res.redirect("/"); 
})

app.get("/worklist", (req, res) => {
  res.render("work.ejs", {tasks:workList});
});

app.post("/submitWorkList", (req,res)=>{
  var newTask = req.body.newTask;
  workList.push(newTask);
  res.redirect("/worklist"); 
})



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});