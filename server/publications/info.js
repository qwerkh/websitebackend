import {Meteor} from 'meteor/meteor';
import {Web_InfoReact} from "../../imports/collections/info";

if (Meteor.isServer) {
    Meteor.publish('web_infoReact', function () {
        return Web_InfoReact.find({});
    });

}