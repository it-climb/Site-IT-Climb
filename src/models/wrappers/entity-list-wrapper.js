class EntityListWrapper{

    constructor(entityArray){
        if((Array.isArray(entityArray))){
            this.items = entityArray;
            this.total = entityArray.length;
        }else{
            this.items = [];
            this.total = 0;
        }
    }
}

module.exports = EntityListWrapper;