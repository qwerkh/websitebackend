import {Meteor} from 'meteor/meteor';
import {Web_ProductionLine, Web_ProductionLineReact} from "../../imports/collections/productionLine";

if (Meteor.isServer) {
    Meteor.publish('web_productionLineReact', function () {
        return Web_ProductionLineReact.find({});
    });

}