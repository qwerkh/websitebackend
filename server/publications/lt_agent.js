import {Meteor} from 'meteor/meteor';
import {LT_AgentReact} from "../../imports/collections/lt_agent";

if (Meteor.isServer) {
    Meteor.publish('lt_agentReact', function () {
        if (this.userId) {
            return LT_AgentReact.find({});
        }
        return this.ready();

    });
}
