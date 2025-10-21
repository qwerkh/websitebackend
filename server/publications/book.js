import {Meteor} from 'meteor/meteor';
import {Web_Book, Web_BookReact} from "../../imports/collections/book";

if (Meteor.isServer) {
    Meteor.publish('web_bookReact', function () {
        return Web_BookReact.find({});
    });

}