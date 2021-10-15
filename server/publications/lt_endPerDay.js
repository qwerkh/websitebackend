import {Meteor} from 'meteor/meteor';
import {LT_EndPerDayReact} from "../../imports/collections/lt_endPerDay";

if (Meteor.isServer) {
    Meteor.publish('lt_endPerDayReact', function () {
        if (this.userId) {
            return LT_EndPerDayReact.find({});
        }
        return this.ready();

    });
}
