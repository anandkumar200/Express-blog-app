import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const bloggs = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.render("index.ejs", {bloggs: bloggs});
});

app.get("/blogs", (req, res)=>{
    res.render("blog.ejs");
});

app.post("/blogs", (req, res)=>{
    let title = req.body["title"];
    let content = req.body["content"];
    bloggs.push({
        title: title,
        content: content
    });
    res.redirect("/");
});

app.get("/deletion", (req, res)=>{
    res.render("deletion.ejs", {bloggs});
});

app.post("/", (req, res)=>{
    console.log(req.body);
    let delNum = req.body.delNum;
    bloggs.splice(delNum - 1, 1);
    res.redirect("/");
});

app.get("/edit/:id", (req, res)=>{
    const id = req.params.id;
    res.render("edit.ejs", {bloggs: bloggs[id], id: id});
});

app.post("/edit/:id", (req, res)=>{
    const id = req.params.id;
    bloggs[id].title = req.body.title;
    bloggs[id].content = req.body.content;
    res.redirect("/");
});

app.listen(port, ()=>{
    console.log("Running Successfuly");
});