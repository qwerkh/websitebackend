import {Meteor} from 'meteor/meteor';
import {Web_PlantLifeStyle, Web_PlantLifeStyleReact} from "../../imports/collections/plantLifeStyle";

if (Meteor.isServer) {
    Meteor.publish('web_plantLifeStyleReact', function () {
        return Web_PlantLifeStyleReact.find({});
    });

}