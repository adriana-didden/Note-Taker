var express = require("express");
var path = require("path");
const fs = require("fs");
const data = require("./db/db.json");

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});


app.get("/api/notes", function(req, res){
    res.json(data)
})
app.post("/api/notes", function(req, res){
    console.log("host");
    
    const note=req.body;
    let id;
    if (!data.length ) id =0
    else id = data[data.length-1].id+1
    note.id=id;
    data.push(note)
    console.log(note)
    fs.writeFile("./db/db.json", JSON.stringify(data), "utf-8", err => {
        if (err) throw err
        res.json(data)
    })
})
app.delete("/api/notes/:id",(req, res )=>{
    const id = req.params.id
    console.log(id)
    const index = data.findIndex(note=>note.id===parseInt(id))
    data.splice(index,1)
    fs.writeFile("./db/db.json", JSON.stringify(data), "utf-8", err => {
        if (err) throw err
        res.json(data)
    })


} )
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));