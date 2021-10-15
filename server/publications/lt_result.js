import {Meteor} from 'meteor/meteor';
import {LT_ResultReact} from "../../imports/collections/lt_result";

if (Meteor.isServer) {
    Meteor.publish('lt_resultReact', function () {
        if (this.userId) {
            return LT_ResultReact.find({});
        }
        return this.ready();

    });
}
