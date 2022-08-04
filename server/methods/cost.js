import {Meteor} from 'meteor/meteor';
import GlobalFn from "../../imports/libs/globalFn"
import {
    Web_Cost,
    Web_CostReact,
    Web_CostAudit
} from "../../imports/collections/cost"

let secret = Meteor.settings.private.secret;
Meteor.methods({
    web_fetchCost({q, filter, sort, options = {limit: 10, skip: 0}, branchId, accessToken, userId,majorId}) {
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
                    selector.$or = [{title: {$regex: reg, $options: 'mi'}}, {
                        phoneNumber: {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }, {
                        address: {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }];
                }
            }

            selector.branchId = branchId;
            selector.majorId = majorId;

            data.content = Web_Cost.aggregate([
                    {
                        $match: selector
                    }
                    ,
                    {
                        $sort: {
                            createdAt: -1
                        }
                    },

                    {
                        $limit: options.limit
                    },
                    {
                        $skip: options.skip
                    },
                ],
                {
                    allowDiskUse: true
                });
            data.countContent = Web_Cost.find(selector).count();
            return data;
        }
    },
    web_insertCost(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let id = Web_Cost.insert(doc);
                if (id) {
                    GlobalFn.collectionReact(Web_CostReact, id);
                }
                return id;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }

    },
    web_updateCost(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = Web_Cost.findOne({_id: id});
                let isUpdated = Web_Cost.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(Web_CostReact, id, Web_CostAudit, oldDoc, "Update");
                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_removeCost(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = Web_Cost.remove({_id: doc._id});

                if (isRemoved) {
                    GlobalFn.collectionReact(Web_CostReact, doc._id, Web_CostAudit, doc, "Remove");
                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_findCost(branchId,majorId, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};

                selector.branchId = branchId;
                selector.majorId = majorId;

                return Web_Cost.find(selector, {sort: {order:1,createdAt: 1}, limit: 100}).fetch();

            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    sb_fetchCostOption(q, accessToken, branchId) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};
                if (Array.isArray(branchId)) {
                    selector.branchId = {$in: branchId};
                } else {
                    selector.branchId = branchId;
                }


                if (q && q !== "" && q !== undefined && q !== null) {
                    q = q.replace(/[/\\]/g, '');
                    let reg = new RegExp(q, 'mi');

                    selector.$or = [
                        {'title.en': {$regex: reg}},
                        {'title.km': {$regex: reg}},
                        {'title.cn': {$regex: reg}},
                        {_id: q}
                    ];
                }

                return Web_Cost.find(selector, {limit: 300}).fetch().map(obj => ({
                    label: obj.title.en,
                    value: obj._id
                }));
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    }

})


//Unique

Web_Cost._ensureIndex({
    majorId: 1,
    title: 1,
    body: 1,
    order:1,
    branchId: 1
}, {unique: 1, name: "Web_CostUnique"});