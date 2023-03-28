const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
require('dotenv').config();
var cors = require('cors')
app.use(morgan('combined'));
const route = require('./routes');
const db = require('./config/db');
const corsOptions = {
    AccessControlAllowOrigin: '*',
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true,
    optionSuccessStatus:200,
  }
  app.use(cors(corsOptions))
db.connect();

app.use(express.json());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


route(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


