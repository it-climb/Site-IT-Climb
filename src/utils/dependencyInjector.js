'use strict';

module.exports = (req, dependencies) => {
    return req.dependencies instanceof Array
        ?
        req.dependencies.concat(dependencies)
        :
        dependencies;
};