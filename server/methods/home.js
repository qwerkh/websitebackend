import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../imports/libs/globalFn"
import _ from 'lodash'

import {Web_Home, Web_HomeAudit, Web_HomeReact} from "../../imports/collections/home"

let secret = Meteor.settings.private.secret;
Meteor.methods({
    base_insertHome(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let id = Web_Home.insert(doc);

            return id;
        }

    },
    base_updateHome(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let isUpdated = Web_Home.update({_id: id}, {$set: doc});
            return isUpdated;
        }
    },
    base_findHome(branchId,accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            return Web_Home.findOne({branchId: branchId});
        }
    }
})