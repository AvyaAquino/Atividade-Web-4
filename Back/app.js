const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const routes = require('./routes/index');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use('/api', routes);

sequelize
    .sync({ alter: true} )
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.log(err);
    });