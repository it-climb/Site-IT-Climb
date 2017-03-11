'use strict';
const
    _ = require('lodash'),
    uuid = require('uuid'),
    BaseModel = require('../base-model/model');

const defaultTicket = {
    id: uuid.v4(),
    title: '',
    shortDescription: '',
    fullDescription: '',
    price: 0.0,
    discountPrice: 0.0,
    discountDescription: ''
};


class Ticket extends BaseModel {

   constructor(ticket) {
       super(ticket);

       if (ticket && ticket.fields) {
           let {fields} = ticket;
           this.title = fields.title || '';
           this.shortDescription = fields.shortDescription || '';
           this.fullDescription = fields.fullDescription || '';
           this.price = fields.price || 0.0;
           this.discountPrice = fields.discountPrice || 0.0;
           this.discountDescription = fields.discountDescription || '';
       }else{
           Object.assign(this, defaultTicket);
       }
   }
    
}

module.exports = Ticket;


