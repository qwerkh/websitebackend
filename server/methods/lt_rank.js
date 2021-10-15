import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../imports/libs/globalFn"
import _ from 'lodash'

import {LT_Rank, LT_RankReact, LT_RankAudit} from "../../imports/collections/lt_rank"

let secret = Meteor.settings.private.secret;
Meteor.methods({
    lt_fetchRank({q, filter, sort, options = {limit: 10, skip: 0}, branchId, accessToken}) {
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
                    selector.$or = [{minKHR: {$regex: reg, $options: 'mi'}}, {
                        minUSD: {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }, {
                        minTHB: {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }, {maxKHR: {$regex: reg, $options: 'mi'}}, {
                        maxUSD: {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }, {
                        maxTHB: {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }];
                }
            }
            selector.branchId = branchId;
            data.content = LT_Rank.aggregate([
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
            data.countContent = LT_Rank.find(selector).count();
            return data;
        }
    },
    lt_insertRank(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let id = LT_Rank.insert(doc);

                if (id) {
                    GlobalFn.collectionReact(LT_RankReact, id);
                }
                return id;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }

        }

    },
    lt_updateRank(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = LT_Rank.findOne({_id: id});
                let isUpdated = LT_Rank.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(LT_RankReact, id, LT_RankAudit, oldDoc, "Update");
                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    lt_removeRank(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = LT_Rank.remove({_id: doc._id});

                if (isRemoved) {
                    GlobalFn.collectionReact(LT_RankReact, doc._id, LT_RankAudit, doc, "Remove");
                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    lt_fetchRankOption(q, accessToken, branchId) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};
                selector.branchId = branchId;
                return LT_Rank.find(selector).fetch().map(obj => ({
                    label: "KHR : (" + obj.minKHR + " - " + obj.maxKHR + ") , USD : (" + obj.minUSD + " - " + obj.maxUSD + ") , THB : (" + obj.minTHB + " - " + obj.maxTHB + ")",
                    value: obj._id
                }));
            } catch (e) {
                throw new Meteor.Error(e.message);
            }

        }
    }
})

//Unique

LT_Rank._ensureIndex({
    minKHR: 1,
    maxKHR: 1,
    minUSD: 1,
    maxUSD: 1,
    minTHB: 1,
    maxTHB: 1,
    branchId: 1
}, {unique: 1, name: "LT_RankUnique"});
