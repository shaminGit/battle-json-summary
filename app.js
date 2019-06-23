var express = require('express');
var app = express();


app.use(express.static('public'));
app.get('/getJson', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(__dirname + "/" + "battles.json");
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
