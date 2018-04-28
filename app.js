let express = require('express');
let app = express();
let fs = require('fs');
let bodyParser = require('body-parser');
let funcs = require('./public/index.js');

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.send('/public/index.html');
});

app.get('/getPhotoPost/:id', (req, res) => {
    let photoposts = JSON.parse(fs.readFileSync('data/posts.json'));
    photoposts.getPhotoPost = funcs.getPhotoPost;
    let photopost = photoposts.getPhotoPost(req.params.id);
    if(photopost){
		res.send(photopost);
		res.statusCode=200;
		res.end();
	}
	else{
 		res.statusCode=400;
		res.end();
	}
});

app.post('/getPhotoPosts', (req, res) => {
    let photoposts = JSON.parse(fs.readFileSync('data/posts.json'));
	for(let i=0;i<photoposts.length;i++)
	{
		photoposts[i].createdAt=new Date(photoposts[i].createdAt);
	}
    let filter=req.body;
	let skip=req.query.skip;
	let top=req.query.top;
	photoposts.getPhotoPosts=funcs.getPhotoPosts;
	
    let filtered_posts=photoposts.getPhotoPosts(new Number(skip),new Number(top),filter);
	if(filtered_posts)
	{
		res.send(JSON.stringify(filtered_posts));
		res.statusCode = 200;
		res.end();
	}
	else{
		res.statusCode = 400;
		res.end();
	}
});

app.post('/addPhotoPost', (req, res) => {
	let photoposts = JSON.parse(fs.readFileSync('data/posts.json'));
    let photopost = req.body;
	photopost.createdAt = new Date();
	photoposts.addPhotoPost = funcs.addPhotoPost;
	 if (photoposts.addPhotoPost(photopost)) {
        fs.writeFileSync('data/posts.json', JSON.stringify(photoposts));
		res.send("Post is added");
		res.statusCode=200;
		res.end();
                  
    } else {
        res.statusCode=400;
		res.end();
    }

});

app.delete('/removePhotoPost/:id', (req, res) => {
    let photoposts = JSON.parse(fs.readFileSync('data/posts.json'));
    photoposts.removePhotoPost = funcs.removePhotoPost;
    if (photoposts.removePhotoPost(req.params.id)) {
        fs.writeFileSync('data/posts.json', JSON.stringify(photoposts));
		res.send("Photopost is deleted");
		res.statusCode=200;
		res.end();
    } else {
        res.statusCode=400;
		res.end();
    }
});

app.put('/editPhotoPost/:id', (req, res) => {
    let photoposts = JSON.parse(fs.readFileSync('data/posts.json'));
    let photopost = req.body;
    photoposts.editPhotoPost = funcs.editPhotoPost;
    if (photoposts.editPhotoPost(req.params.id, photopost)) {
        fs.writeFileSync('data/posts.json', JSON.stringify(photoposts));
        res.send("Photopost was changed");
		res.statusCode = 200;
        res.end();
    } else {
        res.statusCode = 400;
        res.end();
    }
});

app.listen(3000, function() {
    console.log('Server port 3000!')
});