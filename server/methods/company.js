import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../imports/libs/globalFn"
import _ from 'lodash'

import {Company, CompanyReact, CompanyAudit} from "../../imports/collections/company"

let secret = Meteor.settings.private.secret;
Meteor.methods({
    base_insertCompany(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let id = Company.insert(doc);

            return id;
        }

    },

    base_updateCompany(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let isUpdated = Company.update({_id: id}, {$set: doc});
            return isUpdated;
        }
    },
    base_findCompany() {
        return Company.findOne({});
    }
})