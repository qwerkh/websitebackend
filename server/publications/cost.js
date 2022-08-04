import {Meteor} from 'meteor/meteor';
import {Web_CostReact} from "../../imports/collections/cost";

if (Meteor.isServer) {
    Meteor.publish('web_costReact', function () {
        return Web_CostReact.find({});
    });

}