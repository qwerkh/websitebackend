import {Meteor} from 'meteor/meteor';
import {UserReact} from "../../imports/collections/user";

if (Meteor.isServer) {
    Meteor.publish('userReact', function () {
        if (this.userId) {
            return UserReact.find({});
        }
        return this.ready();

    });

    Meteor.publish('userLogin', function () {
        if (this.userId) {
            return Meteor.users.find(this.userId, {
                fields: {
                    _id: 1,
                    branch: 1,
                    defaultBranch: 1,
                    profile: 1,
                    username: 1,
                    roles: 1,
                    module: 1,
                    agentId: 1
                }
            });
        }
        return this.ready();

    });
}
