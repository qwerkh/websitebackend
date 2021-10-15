import {Meteor} from 'meteor/meteor';
import {TestingReact} from "../../imports/collections/testing";

if (Meteor.isServer) {
    Meteor.publish('testingReact', function () {
        if (this.userId) {
            return TestingReact.find({});
        }
        return this.ready();

    });
}
