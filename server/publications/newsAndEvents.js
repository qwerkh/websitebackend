import {Meteor} from 'meteor/meteor';
import {Web_NewsAndEvents, Web_NewsAndEventsReact} from "../../imports/collections/newsAndEvents";

if (Meteor.isServer) {
    Meteor.publish('web_newsAndEventsReact', function () {
        return Web_NewsAndEventsReact.find({});
    });

}