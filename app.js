const tracer = require('dd-trace').init()
const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 3000;

let users;

fs.readFile( __dirname + "/" + "users.json", 'utf8', (err, data) => {
    if (err) throw err;
    users = JSON.parse(data);
})

app.get('/', (req, res) => {
    return res.send('<p>Endpoints:<p><p> - /users</p><p> - users/:id</p>');
})

app.get('/users', function (req, res) {
        res.send( users );
})

app.get('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const getUser = users.find(user => user.id === userId);
  
    if (!getUser) {
        res.status(500).send('User not found.')
    } else {
        res.json(getUser);
    }
});

app.use(function(req, res, next) {
    return res.status(404).send({ message: 'Route'+req.url+' Not found.' });
});

app.use(function(err, req, res, next) {
    return res.status(500).send({ error: err });
});

app.listen(PORT, () => {
    console.log('Express server currently running on port ${PORT}');
})
