import {Meteor} from 'meteor/meteor';
import {Web_OverviewReact} from "../../imports/collections/overview";

if (Meteor.isServer) {
    Meteor.publish('web_overviewReact', function () {
        return Web_OverviewReact.find({});
    });

}