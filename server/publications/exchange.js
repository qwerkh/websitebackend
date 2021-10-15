import {Meteor} from 'meteor/meteor';
import {ExchangeReact, Exchange} from "../../imports/collections/exchange";

if (Meteor.isServer) {
    Meteor.publish('exchangeReact', function () {
        if (this.userId) {
            return ExchangeReact.find({});
        }
        return this.ready();

    });

    Meteor.publish('exchangeActive', function () {
        if (this.userId) {
            return Exchange.find({status: true});
        }
        return this.ready();

    });
}
