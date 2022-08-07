import {Meteor} from 'meteor/meteor';
import {Web_PlantType, Web_PlantTypeReact} from "../../imports/collections/plantType";

if (Meteor.isServer) {
    Meteor.publish('web_plantTypeReact', function () {
        return Web_PlantTypeReact.find({});
    });

}