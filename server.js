//Imports
const express = require('express');
const mongoose = require('mongoose');
const taskroutes = require('./routes');

//express server and middleware
const app = express();
app.use(express.json());

//constants
const mongouri = 'mongodb://localhost:27017/phantomsdb';
const PORT = 3000;

//mongodb connection
mongoose.connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to the Database Successfuly!'))
.catch((err) => console.error('Connection Error: ',err));

//Use task routes
app.use('/', taskroutes);

//fire up server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})