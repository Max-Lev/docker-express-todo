const express = require('express');
const app = express();
const db = require('./persistence');
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');
const cors = require('cors');
// import * as events from './mocks/events.json';
const events = require('./mocks/events');
app.use(cors());
app.use(require('body-parser').json());
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
    console.log('INDEX.JS RUNING !');
    res.json(events);

});

app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

// app.listen(3000, () => console.log('Listening on port 3000'));
console.log(process.env.PORT);
db.init().then(() => {
    app.listen(3000, () =>
        console.log('Listening on port http://localhost:3000'));
}).catch((err) => {
    console.error(err);
    process.exit(1);
});

const gracefulShutdown = () => {
    db.teardown()
        .catch(() => { })
        .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
