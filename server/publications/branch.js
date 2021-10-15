import {Meteor} from 'meteor/meteor';
import {BranchReact} from "../../imports/collections/branch";

if (Meteor.isServer) {
    Meteor.publish('branchReact', function () {
        if (this.userId) {
            return BranchReact.find({});
        }
        return this.ready();

    });
}
