import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../imports/libs/globalFn"
import _ from 'lodash'

import {LT_EndPerDay, LT_EndPerDayReact, LT_EndPerDayAudit} from "../../imports/collections/lt_endPerDay"
import {LT_Agent} from "../../imports/collections/lt_agent"

let secret = Meteor.settings.private.secret;
Meteor.methods({
    lt_fetchEndPerDay({q, filter, sort, options = {limit: 10, skip: 0}, branchId, accessToken}) {
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
                    let agentList = LT_Agent.find({
                            $or: [
                                {
                                    name: {
                                        $regex: reg,
                                        $options: 'mi'
                                    }
                                }, {

                                    code: {
                                        $regex: reg,
                                        $options: 'mi'
                                    }
                                }
                            ]

                        }, {_id: true},
                        {
                            $limit: options.limit
                        },
                        {
                            $skip: options.skip
                        }).fetch().map((obj) => {
                        return obj._id;
                    });

                    selector.$or = [
                        {
                            closeDate: {
                                $regex: reg,
                                $options: 'mi'
                            }
                        }, {
                            time: {
                                $regex: reg,
                                $options: 'mi'
                            }
                        }, {
                            agentId: {$in: agentList}
                        }];
                }
            }
            selector.branchId = branchId;
            data.content = LT_EndPerDay.aggregate([
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
                            from: "lt_agent",
                            localField: "agentId",
                            foreignField: "_id",
                            as: "agentDoc"
                        }
                    },
                    {
                        $unwind: {
                            path: "$agentDoc",
                            preserveNullAndEmptyArrays: true
                        }
                    }
                ],
                {
                    allowDiskUse: true
                });


            data.countContent = LT_EndPerDay.find(selector).count();
            return data;
        }
    },
    lt_insertEndPerDay(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let id = LT_EndPerDay.insert(doc);
                if (id) {
                    GlobalFn.collectionReact(LT_EndPerDayReact, id);
                    doc._id = id;
                    let agetList = LT_Agent.find().fetch();
                    Meteor.call("lt_calculateLoss", doc, accessToken, (err, result) => {
                        if (err) {
                            throw new Meteor.Error(err.message);
                        }
                    })
                }
                return id;

            } catch (e) {
                throw new Meteor.Error(e.message);
            }

        }

    },
    lt_updateEndPerDay(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = LT_EndPerDay.findOne({_id: id});
                let isUpdated = LT_EndPerDay.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(LT_EndPerDayReact, id, LT_EndPerDayAudit, oldDoc, "Update");
                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    lt_removeEndPerDay(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = LT_EndPerDay.remove({_id: doc._id});

                if (isRemoved) {
                    GlobalFn.collectionReact(LT_EndPerDayReact, doc._id, LT_EndPerDayAudit, doc, "Remove");
                    Meteor.call("lt_removeLossByEndId", doc._id, accessToken, (err, result) => {
                        if (err) {
                            throw new Meteor.Error(err.message);
                        }
                    })
                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    lt_findEndPerDayById(id, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                return LT_EndPerDay.findOne({_id: id});
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    lt_findEndPerDayByAgentId(agentId, time, date, branchId, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                return LT_EndPerDay.findOne({agentId: agentId, time: time, closeDate: date, branchId: branchId});
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    lt_findEndPerDayByDate(time, date, branchId, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                return LT_EndPerDay.findOne({time: time, closeDate: date, branchId: branchId});
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    }
})

//Unique

LT_EndPerDay._ensureIndex({
    closeDate: 1,
    time: 1,
    agentId: 1,
    branchId: 1
}, {unique: 1, name: "LT_EndPerDayUnique"});
