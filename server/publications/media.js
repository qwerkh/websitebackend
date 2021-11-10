import {Meteor} from 'meteor/meteor';
import {Web_Media, Web_MediaReact} from "../../imports/collections/media";

if (Meteor.isServer) {
    Meteor.publish('web_mediaReact', function () {
        return Web_MediaReact.find({});
    });

}