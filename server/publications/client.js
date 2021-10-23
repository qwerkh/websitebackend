import {Meteor} from 'meteor/meteor';
import {Web_Client, Web_ClientReact} from "../../imports/collections/client";

if (Meteor.isServer) {
    Meteor.publish('web_clientReact', function () {
        return Web_ClientReact.find({});
    });

}