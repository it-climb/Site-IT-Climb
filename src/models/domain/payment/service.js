'use strict';
const config = require('./../../../config/index'),
    stripe = require('stripe')(config.stripe.secret),
    _ = require('lodash'),
    boom = require('boom'),
    mongoose = require('mongoose'),
    PaymentModel = mongoose.model('Payment');

let PaymentService = {

    checkout: (ticketId, paymentData, stripeToken, additionalData)=> {
       /* if (!_.isNumber(paymentData.amount) || paymentData.amount <= 0) {
            return Promise.reject(boom.badData(`Payment amount must be a positive number`));
        }
        if (!PaymentService._isStripeToken(stripeToken)) {
            return Promise.reject(boom.badData(`Stripe Token [${stripeToken}] is missing or invalid`));
        }
        let paymentAmount = Math.round(paymentData.amount * 100);

        let finderPromise = TicketModel.findById(ticketId).exec();

        return finderPromise
            .bind({})
            .then((/!**Instance.<Ticket>*!/ ticket)=> {

                let chargeOptions = {
                        amount: paymentAmount,//since stripe accepts only smallest currency unit
                        currency: 'usd',
                        source: stripeToken,
                        description: `Payment for ticket [${ticket['_id']}] ${ticket['name']}`,
                        metadata: {
                            ticketId: ticket.id
                        }
                    };

                this.ticket = ticket;
                this.paymentAmount = paymentAmount;
                return stripe.charges.create(chargeOptions);
            })
            .then((/!**stripe.Transfer*!/charges)=> {
                var payment = new PaymentModel({ ticked: this.ticked, amount: this.paymentAmount, paymentProvider: 'stripe', paymentTransactionId: charges.id });
                return payment.save();
            })
            .then(contribution=> {
                console.log('contribution', contribution);
                return contribution;
            })
            .catch(err=> {
                throw err;
            })*/
    },

    _isStripeToken: (token)=> {
        //i'm unsure about min token length, though in all samples it has at least 12 chars
        return typeof token === 'string' && /^(b?tok|pii)_[a-zA-Z0-9]{12,}$/.test(token);
    }

};

module.exports = PaymentService;