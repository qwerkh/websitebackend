import {Meteor} from 'meteor/meteor';
import {LT_RankReact} from "../../imports/collections/lt_rank";

if (Meteor.isServer) {
    Meteor.publish('lt_rankReact', function () {
        if (this.userId) {
            return LT_RankReact.find({});
        }
        return this.ready();

    });
}
