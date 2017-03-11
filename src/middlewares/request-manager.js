'use strict';

module.exports = (req, res, next) => {
    console.log('from request - manager');
    if (req.isServerRequest) {
        next();
    } else {
        const result = {};
        if (req.dependencies instanceof Array) {
            req.dependencies.forEach(entry=>{
                Object.keys(entry).forEach(key=>{
                    result[key] = entry[key];
                })
            });
        }
        res.json({...result});
    }
};