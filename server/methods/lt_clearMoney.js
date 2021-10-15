import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../imports/libs/globalFn"
import _ from 'lodash'

import {LT_Clear, LT_ClearReact, LT_ClearAudit} from "../../imports/collections/lt_clear"

let secret = Meteor.settings.private.secret;
Meteor.methods({
    lt_insertClearMoney(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = LT_Clear.findOne({agentId: doc.agentId, date: doc.date, type: doc.type});
                if (oldDoc) {
                    let isUpdate = LT_Clear.update({_id: oldDoc._id}, {$set: doc});
                    if (isUpdate) {
                        GlobalFn.collectionReact(LT_ClearReact, oldDoc._id, LT_ClearAudit, oldDoc, "Update");
                    }
                    return isUpdate;
                } else {
                    let id = LT_Clear.insert(doc);
                    if (id) {
                        GlobalFn.collectionReact(LT_ClearReact, id);
                    }
                    return id;
                }

            } catch (e) {
                throw new Meteor.Error(e.message);
            }

        }

    },
})

//Unique

LT_Clear._ensureIndex({
    type: 1,
    date: 1,
    agentId: 1
}, {unique: 1, name: "LT_ClearUnique"});

