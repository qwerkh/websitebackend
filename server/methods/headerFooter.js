import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../imports/libs/globalFn"
import _ from 'lodash'

import {Web_HeaderFooter, Web_HeaderFooterAudit, Web_HeaderFooterReact} from "../../imports/collections/headerFooter"

let secret = Meteor.settings.private.secret;
Meteor.methods({
    base_insertHeaderFooter(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let id = Web_HeaderFooter.insert(doc);
            return id;
        }

    },
    base_updateHeaderFooter(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let isUpdated = Web_HeaderFooter.update({_id: id}, {$set: doc});
            return isUpdated;
        }
    },
    base_findHeaderFooter(branchId,accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            return Web_HeaderFooter.findOne({branchId: branchId});
        }
    }
})