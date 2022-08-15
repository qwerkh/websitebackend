import {Meteor} from 'meteor/meteor';
import {Web_PlantRoom, Web_PlantRoomReact} from "../../imports/collections/plantRoom";

if (Meteor.isServer) {
    Meteor.publish('web_plantRoomReact', function () {
        return Web_PlantRoomReact.find({});
    });

}