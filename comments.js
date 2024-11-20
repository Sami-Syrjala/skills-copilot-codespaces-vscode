// Create web server
let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let fs = require("fs");
let path = require("path");

let commentsPath = path.join(__dirname, "comments.json");

app.use(bodyParser.json());

app.get("/comments", function(req, res) {
    fs.readFile(commentsPath, "utf8", function(err, data) {
        if (err) {
            res.status(500).send("Server error");
            return;
        }

        let comments = JSON.parse(data);
        res.send(comments);
    })
});

app.post("/comments", function(req, res) {
    let comment = req.body;

    fs.readFile(commentsPath, "utf8", function(err, data) {
        if (err) {
            res.status(500).send("Server error");
            return;
        }

        let comments = JSON.parse(data);
        comments.push(comment);

        fs.writeFile(commentsPath, JSON.stringify(comments), function(err) {
            if (err) {
                res.status(500).send("Server error");
                return;
            }

            res.send("Comment added");
        });
    });
});

app.listen(3000, function() {
    console.log("Server is listening on port 3000");
});