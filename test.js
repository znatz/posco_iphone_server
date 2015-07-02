var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var parser = require('body-parser');

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.get('/', function(req, res){
  res.sendfile('./index.html');
});

io.on('connection', function(socket){
  socket.on('chat', function(msg){
    console.log('message: ' + msg);
    io.emit('chat',msg);
  });
});


app.post('/', function(req,res) {
    console.log(req.body.cusine);
    var result = req.body.cusine.replace(/\(/g,'[');
    result = result.replace(/\)/g,']');
    result = "テーブル" + req.body.key + "から" + result;
    io.emit('chat',result);
    console.log(req.body.key);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
