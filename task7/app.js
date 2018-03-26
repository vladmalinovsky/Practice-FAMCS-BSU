var express = require('express');
var app = express();
app.use(express.static('public'));
app.get('/', function(req, res) {
    res.send('/task7/public/index.html');
});
app.listen(3000, function() {
    console.log('Server port 3000!')
});