import {Meteor} from 'meteor/meteor';
import {Web_RectorWelcomReact} from "../../imports/collections/rectorWelcom";

if (Meteor.isServer) {
    Meteor.publish('web_rectorWelcomReact', function () {
        return Web_RectorWelcomReact.find({});
    });

}