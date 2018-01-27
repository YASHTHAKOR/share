import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
import user from './api/users';
const app = express();

mongoose.connect(config.mongoUrl,function(data) {
    console.log('connected to database');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users',user);
app.listen(3000,function () {
    console.log('server started  on 3000')
});