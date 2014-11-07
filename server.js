var express = require('express');
var app = express();

//var mongo = require('mongodb');
//var monk = require('monk');
//var db = monk(process.env.MONGOHQ_URL || 'localhost:27017/student_expenses');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

//app.use(function (req, res, next) {
//    req.db = db;
//    next();
//});

/*
app.get('/outagesList.json', function (req, res) {
    var db = req.db;

    var collection = db.get('outages');

    collection.find({}, { sort : [['start', 'asc']] }, function (e, docs) {
        res.send(docs);
    });
});
*/

app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'))
});