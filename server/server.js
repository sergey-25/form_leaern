require('dotenv').config()
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const router = require('./routes/index');
const errorHandlingMiddleware = require('./middleware/ErrorHandlingMiddleware');
const cors = require('cors');


const PORT = process.env.PORT || 5000


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandlingMiddleware)


const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`server run on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start();