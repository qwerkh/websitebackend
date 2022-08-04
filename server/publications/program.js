import {Meteor} from 'meteor/meteor';
import {Web_ProgramReact} from "../../imports/collections/program";

if (Meteor.isServer) {
    Meteor.publish('web_programReact', function () {
        return Web_ProgramReact.find({});
    });

}