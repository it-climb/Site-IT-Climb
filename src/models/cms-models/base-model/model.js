const uuid = require('uuid');

class BaseModel {

    constructor(data) {
        let currentDate = new Date();
        if (data && data.sys) {
            let {sys} = data;
            this.id = sys.id || uuid.v4();
            this.createdAt = sys.createdAt || currentDate;
            this.updatedAt = sys.updatedAt || currentDate;
        }
        else {
            this.id = uuid.v4();
            this.createdAt = currentDate;
            this.updatedAt = currentDate;
        }
    }
}

module.exports = BaseModel;
