// core libraries
const http = require('http');
const path = require('path');
const fs = require('fs');

// 3rd party libraries
const express = require('express');
const MarkdownIt = require('markdown-it');
const meta = require('markdown-it-meta');

// create express app
var app = express();
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

var md = new MarkdownIt();
md.use(meta);

// middleware
app.get('/', function(req, res){
    res.render('index', {});
});

app.get('/post/:handle', function(req, res, next) {
    var filePath = path.join(__dirname, 'posts', req.params.handle+'.md');
    fs.stat(filePath, function(err, fileInfo) {
        if (err) {
            next();
            return;
        }

        if (fileInfo.isFile()){
            fs.readFile(filePath, 'utf-8', function(err, data) {
                if (err) {
                    next();
                    return;
                }
                md.render(data);
                console.log(md.meta);
                res.render('post.view.ejs', {
                    postName:   req.params.handle,
                    markdown:   md.render(data),
                    meta:       md.meta
                });
            });
            
        } else {
            next();
        }
    });
    
});

app.use(function(req, res) {
    res.status = 404;
    res.end('not found');
});

// create server
http.createServer(app).listen(3005, function() {
    console.log('dustandsepia server listening on port 3005');
});

