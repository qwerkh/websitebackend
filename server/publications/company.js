import {Meteor} from 'meteor/meteor';
import {Company} from "../../imports/collections/company";

if (Meteor.isServer) {
    Meteor.publish('company', function () {
        return Company.find({});
    });

}