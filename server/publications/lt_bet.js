import {Meteor} from 'meteor/meteor';
import {LT_BetReact} from "../../imports/collections/lt_bet";

if (Meteor.isServer) {
    Meteor.publish('lt_betReact', function () {
        if (this.userId) {
            return LT_BetReact.find({});
        }
        return this.ready();

    });
}
