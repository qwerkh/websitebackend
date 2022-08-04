import {Meteor} from 'meteor/meteor';
import {Web_TrainingProgramReact} from "../../imports/collections/trainingProgram";

if (Meteor.isServer) {
    Meteor.publish('web_trainingProgramReact', function () {
        return Web_TrainingProgramReact.find({});
    });

}