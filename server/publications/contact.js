import {Meteor} from 'meteor/meteor';
import {Web_Contact, Web_ContactReact} from "../../imports/collections/contact";

if (Meteor.isServer) {
    Meteor.publish('web_contactReact', function () {
        return Web_ContactReact.find({});
    });

}