import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../imports/libs/globalFn"
import _ from 'lodash'

import {Web_About, Web_AboutAudit, Web_AboutReact} from "../../imports/collections/about"

let secret = Meteor.settings.private.secret;
Meteor.methods({
    base_insertAbout(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let id = Web_About.insert(doc);
            return id;
        }

    },
    base_updateAbout(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let isUpdated = Web_About.update({_id: id}, {$set: doc});
            return isUpdated;
        }
    },
    base_findAbout(branchId,accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            return Web_About.findOne({branchId: branchId});
        }
    }
})