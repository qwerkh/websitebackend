import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../imports/libs/globalFn"
import _ from 'lodash'

import {LT_Agent, LT_AgentReact, LT_AgentAudit} from "../../imports/collections/lt_agent"

let secret = Meteor.settings.private.secret;
Meteor.methods({
    lt_fetchAgent({q, filter, sort, options = {limit: 10, skip: 0}, branchId, accessToken}) {
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
                    selector.$or = [{name: {$regex: reg, $options: 'mi'}}, {
                        code: {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }, {
                        description: {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }];
                }
            }
            selector.branchId = branchId;
            data.content = LT_Agent.aggregate([
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
                            from: "lt_location",
                            localField: "locationVN",
                            foreignField: "_id",
                            as: "locationVNDoc"
                        }
                    },
                    {
                        $unwind: {
                            path: "$locationVNDoc",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $lookup: {
                            from: "lt_location",
                            localField: "locationKH",
                            foreignField: "_id",
                            as: "locationKHDoc"
                        }
                    },
                    {
                        $unwind: {
                            path: "$locationKHDoc",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $lookup: {
                            from: "lt_location",
                            localField: "locationTH",
                            foreignField: "_id",
                            as: "locationTHDoc"
                        }
                    },
                    {
                        $unwind: {
                            path: "$locationTHDoc",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $lookup: {
                            from: "lt_location",
                            localField: "locationVat",
                            foreignField: "_id",
                            as: "locationVatDoc"
                        }
                    },
                    {
                        $unwind: {
                            path: "$locationVatDoc",
                            preserveNullAndEmptyArrays: true
                        }
                    },

                ],
                {
                    allowDiskUse: true
                });


            data.countContent = LT_Agent.find(selector).count();
            return data;
        }
    },
    lt_insertAgent(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let id = LT_Agent.insert(doc);

                if (id) {
                    GlobalFn.collectionReact(LT_AgentReact, id);
                }
                return id;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }

        }

    },
    lt_updateAgent(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = LT_Agent.findOne({_id: id});
                let isUpdated = LT_Agent.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(LT_AgentReact, id, LT_AgentAudit, oldDoc, "Update");
                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    lt_removeAgent(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = LT_Agent.remove({_id: doc._id});

                if (isRemoved) {
                    GlobalFn.collectionReact(LT_AgentReact, doc._id, LT_AgentAudit, doc, "Remove");
                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    lt_findAgentById(id, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                return LT_Agent.findOne({_id: id});
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    lt_fetchAgentOption(q, accessToken, branchId) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {

                let selector = {};
                if (q && q !== "" && q !== undefined && q !== null) {
                    q = q.replace(/[/\\]/g, '');
                    let reg = new RegExp(q, 'mi');
                    selector.$or = [
                        {code: {$regex: reg}},
                        {name: {$regex: reg}},
                        {_id: q}
                    ];
                }

                selector.branchId = branchId;

                return LT_Agent.find(selector, {sort: {createdAt: -1}, limit: 200}).fetch().map(obj => ({
                    label: obj.code + " : " + (obj.name || ""),
                    value: obj._id
                }));

            } catch (e) {
                throw new Meteor.Error(e.message);
            }

        }
    }
})

//Unique

LT_Agent._ensureIndex({
    name: 1,
    branchId: 1
}, {unique: 1, name: "LT_AgentUnique"});
