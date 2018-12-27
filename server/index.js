const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const todosController = require('./api/todos/controller');

const mongoose = require('mongoose');
const dev_db_url = 'mongodb://admin:admin123@ds139934.mlab.com:39934/todo';
const mongoDB = dev_db_url;
mongoose.connect(mongoDB);
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('connected', () => { console.log('Connected'); });
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static('dist'));

app.get('/api/todos', todosController.get);
app.get('/api/todos/:id', todosController.getById);
app.post('/api/todos', todosController.create);
app.delete('/api/todos/:id', todosController.delete);
app.post('/api/todo/:id', todosController.update);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port ' + port));
