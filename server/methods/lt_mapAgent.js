import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../imports/libs/globalFn"
import _ from 'lodash'

import {LT_MapAgent, LT_MapAgentReact, LT_MapAgentAudit} from "../../imports/collections/lt_mapAgent"

let secret = Meteor.settings.private.secret;
Meteor.methods({
    lt_fetchMapAgent({q, filter, sort, options = {limit: 10, skip: 0}, branchId, accessToken}) {
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
                    selector.$or = [{mainAgent: {$regex: reg, $options: 'mi'}}];
                }
            }
            selector.branchId = branchId;
            data.content = LT_MapAgent.aggregate([
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
                        $unwind: {
                            path: "$agentList",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $lookup: {
                            from: "lt_agent",
                            localField: "agentList",
                            foreignField: "_id",
                            as: "agentDoc"
                        }
                    },
                    {
                        $unwind: {
                            path: "$agentDoc",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $group: {
                            _id: {
                                _id: "$_id",
                                mainAgent: "$mainAgent"
                            },
                            agentList: {
                                $addToSet: "$$ROOT"
                            }

                        }

                    }
                ],
                {
                    allowDiskUse: true
                });


            data.countContent = LT_MapAgent.find(selector).count();
            return data;
        }
    },
    lt_insertMapAgent(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let id = LT_MapAgent.insert(doc);

                if (id) {
                    GlobalFn.collectionReact(LT_MapAgentReact, id);
                }
                return id;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }

        }

    },
    lt_updateMapAgent(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = LT_MapAgent.findOne({_id: id});
                let isUpdated = LT_MapAgent.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(LT_MapAgentReact, id, LT_MapAgentAudit, oldDoc, "Update");
                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    lt_removeMapAgent(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = LT_MapAgent.remove({_id: doc._id._id});
                if (isRemoved) {
                    GlobalFn.collectionReact(LT_MapAgentReact, doc._id._id);
                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    lt_findMapAgentById(id, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                return LT_MapAgent.findOne({_id: id});
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    }
})

//Unique

LT_MapAgent._ensureIndex({
    mainAgent: 1,
    branchId: 1
}, {unique: 1, name: "LT_MapAgentUnique"});
