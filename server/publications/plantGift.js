import {Meteor} from 'meteor/meteor';
import {Web_PlantGift, Web_PlantGiftReact} from "../../imports/collections/plantGift";

if (Meteor.isServer) {
    Meteor.publish('web_plantGiftReact', function () {
        return Web_PlantGiftReact.find({});
    });

}