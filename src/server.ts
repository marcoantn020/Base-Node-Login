import express from 'express';
import routes from './routes';
import 'reflect-metadata'
import './database'
import 'dotenv'
// const dot = require('dotenv').config()

const cors = require('cors')

const app = express();
app.use(cors())
const port = 3333;
routes(app);


app.listen(port, () => console.log(`Server is running on port ${port}`));