import {Meteor} from 'meteor/meteor';
import {LT_LocationReact} from "../../imports/collections/lt_location";

if (Meteor.isServer) {
    Meteor.publish('lt_locationReact', function () {
        if (this.userId) {
            return LT_LocationReact.find({});
        }
        return this.ready();

    });
}
