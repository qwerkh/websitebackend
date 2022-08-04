import {Meteor} from 'meteor/meteor';
import {Web_MajorReact} from "../../imports/collections/major";

if (Meteor.isServer) {
    Meteor.publish('web_majorReact', function () {
        return Web_MajorReact.find({});
    });

}