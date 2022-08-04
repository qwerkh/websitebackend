import {Meteor} from 'meteor/meteor';
import {Web_StructureReact} from "../../imports/collections/structure";

if (Meteor.isServer) {
    Meteor.publish('web_structureReact', function () {
        return Web_StructureReact.find({});
    });

}