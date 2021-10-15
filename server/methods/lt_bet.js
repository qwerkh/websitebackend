import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../imports/libs/globalFn"
import _ from 'lodash'

import {LT_Bet, LT_BetReact, LT_BetAudit} from "../../imports/collections/lt_bet"
import {LT_BetDetail} from "../../imports/collections/lt_betDetail";

let secret = Meteor.settings.private.secret;
Meteor.methods({
    lt_fetchBet({q, filter, sort, options = {limit: 10, skip: 0}, branchId, betDate, agentId, accessToken}) {
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
                    selector.$or = [{betDate: {$regex: reg, $options: 'mi'}}, {
                        time: {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }, {
                        page: {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }, {
                        line: {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }];
                }
            }
            selector.branchId = branchId;
            selector.betDate = betDate;
            selector.agentId = agentId;
            //selector.createdUser = this.userId;
            if (!GlobalFn.CheckRoles({userId: this.userId, roles: "Admin"})) {
                selector.createdUser = this.userId;
            }
            data.content = LT_Bet.aggregate([
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
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "createdUser",
                            foreignField: "_id",
                            as: "userDoc"
                        }
                    },
                    {
                        $unwind: {
                            path: "$userDoc",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "updatedUser",
                            foreignField: "_id",
                            as: "userUpdateDoc"
                        }
                    },
                    {
                        $unwind: {
                            path: "$userUpdateDoc",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                ],
                {
                    allowDiskUse: true
                });
            data.countContent = LT_Bet.find(selector).count();
            return data;
        }
    },
    lt_insertBet(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let id = LT_Bet.insert(doc);

                if (id) {
                    GlobalFn.collectionReact(LT_BetReact, id);

                    Meteor.defer(function () {
                        Meteor.call("lt_insertBetDetail", doc, id, accessToken, (err, result) => {
                            if (err) {
                                throw new Meteor.Error(err.message);
                            }
                        })
                    })
                }
                return id;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }

        }

    },
    lt_updateBet(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = LT_Bet.findOne({_id: id});
                let isUpdated = LT_Bet.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(LT_BetReact, id, LT_BetAudit, oldDoc, "Update");

                    LT_BetDetail.direct.remove({betId: id});
                    Meteor.defer(function () {
                        Meteor.call("lt_insertBetDetail", doc, id, accessToken, (err, result) => {
                            if (err) {
                                throw new Meteor.Error(err.message);
                            }
                        })
                    })

                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    lt_findBetById(id, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {

                return LT_Bet.findOne({_id: id});

            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    lt_findBetByAgentId(agentId, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {

                return LT_Bet.findOne({agentId: agentId});

            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    lt_removeBet(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = LT_Bet.remove({_id: doc._id});

                if (isRemoved) {
                    GlobalFn.collectionReact(LT_BetReact, doc._id, LT_BetAudit, doc, "Remove");
                    LT_BetDetail.direct.remove({betId: doc._id});
                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    lt_getLastPage: function (selector, accessToken, branchId) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            selector.branchId = branchId;
            let betDoc = LT_Bet.findOne(selector, {fields: {page: 1}, sort: {page: -1}});
            if (betDoc != null) {
                return betDoc.page;
            } else {
                return 1;
            }
        }
    }
    ,
    lt_getLastLine: function (selector, accessToken, branchId) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            selector.branchId = branchId;
            let betDoc = LT_Bet.findOne(selector, {fields: {line: 1}, sort: {line: -1}});
            if (betDoc != null) {
                return betDoc.line + 1;
            } else {
                return 1;
            }
        }
    },
    lt_findBet(doc, agentId, accessToken, branchId, val) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let selector = {};
            selector.branchId = branchId;
            selector.agentId = agentId;
            selector.betDate = doc.betDate;
            selector.time = doc.time;
            let betList = LT_Bet.find(selector, {fields: {items: 1}, sort: {createdAt: -1}}).fetch();
            let newBetList = [];
            let oldPost = "";
            betList.forEach((obj) => {
                obj.items.forEach((o) => {
                    o._id = obj._id;
                    o.agentId = obj.agentId;
                    o.time = obj.time;
                    o.betDate = obj.betDate;
                    o.isSamePost = o.post.toString() === oldPost;
                    oldPost = o.post.toString();
                    if (val === o.number || !val) {
                        newBetList.push(o);
                    }
                })
            })
            return newBetList;
        }
    },
    lt_clearDataLast2Month(date) {
        let newDate = moment(moment(date).add("-2", "month").toDate()).format("YYYY-MM-DD")
        LT_BetDetail.remove({betDetailDate: {$lte: newDate}});
        LT_Bet.remove({betDate: {$lte: newDate}});
    }
})

//Unique

LT_Bet._ensureIndex({
    betDate: 1,
    page: 1,
    line: 1,
    time: 1,
    agentId: 1,
    branchId: 1,
    "items.betDetailId": 1
}, {unique: 1, name: "LT_BetUnique"});

LT_Bet.rawCollection().createIndex({betDate: -1});
LT_Bet.rawCollection().createIndex({time: 1});
LT_Bet.rawCollection().createIndex({agentId: -1});
LT_Bet.rawCollection().createIndex({branchId: -1});
