import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../imports/libs/globalFn"
import _ from 'lodash'

import {LT_Result, LT_ResultReact, LT_ResultAudit} from "../../imports/collections/lt_result"
import {LT_BetDetail} from "../../imports/collections/lt_betDetail";

let secret = Meteor.settings.private.secret;
Meteor.methods({
    lt_fetchResult({q, filter, sort, options = {limit: 10, skip: 0}, branchId, accessToken}) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let data = {
                content: [],
                countContent: 0,
            };
            let selector = {};
            let sortObj = {};
            if (sort.sortBy !== "") {
                let nameSort = sort.sortBy;
                sortObj[nameSort] = sort.sortDesc === true ? 1 : -1;
            } else {
                sortObj = {createdAt: -1};
            }
            if (!!q) {
                let reg = new RegExp(q);
                if (!!filter) {
                    selector[filter] = {$regex: reg, $options: 'mi'}
                } else {
                    selector.$or = [{resultDate: {$regex: reg, $options: 'mi'}}, {
                        time: {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }];
                }
            }
            selector.branchId = branchId;
            data.content = LT_Result.aggregate([
                    {
                        $match: selector
                    }
                    ,
                    {
                        $sort: sortObj
                    },

                    {
                        $limit: options.limit
                    },
                    {
                        $skip: options.skip
                    }
                ],
                {
                    allowDiskUse: true
                });

            data.countContent = LT_Result.find(selector).count();
            return data;
        }
    },
    lt_insertResult(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let id = LT_Result.insert(doc);

                if (id) {
                    GlobalFn.collectionReact(LT_ResultReact, id);
                }
                return id;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }

        }

    },
    lt_updateResult(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = LT_Result.findOne({_id: id});
                let isUpdated = LT_Result.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(LT_ResultReact, id, LT_ResultAudit, oldDoc, "Update");
                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    lt_removeResult(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = LT_Result.remove({_id: doc._id});

                if (isRemoved) {
                    GlobalFn.collectionReact(LT_ResultReact, doc._id, LT_ResultAudit, doc, "Remove");
                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    lt_findResultById(id, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                return LT_Result.findOne({_id: id});
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    }
})

//Unique

LT_Result._ensureIndex({
    resultDate: 1,
    time: 1,
    branchId: 1
}, {unique: 1, name: "LT_ResultUnique"});


LT_Result.rawCollection().createIndex({
    resultDate: -1,
});

LT_Result.rawCollection().createIndex({
    time: -1,
});

