const path = require('path');
const fs = require('fs');
const MarkdownIt = require('markdown-it');
const meta = require('markdown-it-meta');

var md = new MarkdownIt();
md.use(meta);

class Post {
    constructor() {

    }
}

function get(handle) {
    var filePath = path.join(__dirname, 'posts', handle+'.md');
    fs.stat(filePath, function(err, fileInfo) {
        if (err) {
            console.error('No post found for handle: ', handle);
            return;
        }

        if (fileInfo.isFile()){
            fs.readFile(filePath, 'utf-8', function(err, data) {
                if (err) {
                    console.error('No post found for handle: ', handle);
                    return;
                }
                var post = new Post(md.render(data), md.meta);
                return post;
            });
            
        } else {
            console.error('No post found for handle: ', handle);
            return;
        }
    });
}

var PostModel = {
    get
}
export default PostModel;