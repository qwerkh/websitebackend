import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../imports/libs/globalFn"
import _ from 'lodash'

import {Web_Organization, Web_OrganizationAudit, Web_OrganizationReact} from "../../imports/collections/organization"

let secret = Meteor.settings.private.secret;
Meteor.methods({
    base_insertOrganization(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let id = Web_Organization.insert(doc);
            return id;
        }

    },
    base_updateOrganization(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let isUpdated = Web_Organization.update({_id: id}, {$set: doc});
            return isUpdated;
        }
    },
    base_findOrganization(branchId,accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            return Web_Organization.findOne({branchId: branchId});
        }
    }
})