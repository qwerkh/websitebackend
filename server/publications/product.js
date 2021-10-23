import {Meteor} from 'meteor/meteor';
import {Web_Product, Web_ProductReact} from "../../imports/collections/product";

if (Meteor.isServer) {
    Meteor.publish('web_productReact', function () {
        return Web_ProductReact.find({});
    });

}