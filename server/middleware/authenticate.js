import jwt from 'jsonwebtoken';
import config from '../config'

module.exports = function(req,res,next) {
        jwt.verify(req.headers['x-auth'], config.jwtSecret,function(err,decoded) {
            if(err) {
                res.status(401).send('invalid token');
                return;
            }
            req.decoded = decoded;
            next();
        })
};