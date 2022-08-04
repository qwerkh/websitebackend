import {Meteor} from 'meteor/meteor';
import {Web_AboutReact} from "../../imports/collections/about";

if (Meteor.isServer) {
    Meteor.publish('web_aboutReact', function () {
        return Web_AboutReact.find({});
    });

}