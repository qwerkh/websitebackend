import {Meteor} from 'meteor/meteor';
import {LT_MapAgentReact} from "../../imports/collections/lt_mapAgent";

if (Meteor.isServer) {
    Meteor.publish('lt_mapAgentReact', function () {
        if (this.userId) {
            return LT_MapAgentReact.find({});
        }
        return this.ready();

    });
}
