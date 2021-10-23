import {Meteor} from 'meteor/meteor';
import GlobalFn from "../../imports/libs/globalFn"
import {Web_ProductionLine, Web_ProductionLineReact, Web_ProductionLineAudit} from "../../imports/collections/productionLine"

let secret = Meteor.settings.private.secret;
Meteor.methods({
    web_fetchProductionLine({q, filter, sort, options = {limit: 10, skip: 0}, branchId, accessToken, userId}) {
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


            data.content = Web_ProductionLine.aggregate([
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
            data.countContent = Web_ProductionLine.find(selector).count();
            return data;
        }
    },
    web_insertProductionLine(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                console.log(doc);
                let id = Web_ProductionLine.insert(doc);
                if (id) {
                    GlobalFn.collectionReact(Web_ProductionLineReact, id);
                }
                return id;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }

    },
    web_updateProductionLine(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = Web_ProductionLine.findOne({_id: id});
                let isUpdated = Web_ProductionLine.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(Web_ProductionLineReact, id, Web_ProductionLineAudit, oldDoc, "Update");
                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_removeProductionLine(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = Web_ProductionLine.remove({_id: doc._id});

                if (isRemoved) {
                    GlobalFn.collectionReact(Web_ProductionLineReact, doc._id, Web_ProductionLineAudit, doc, "Remove");
                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_findProductionLine(branchId, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};

                selector.branchId = branchId;
                return Web_ProductionLine.find(selector, {sort: {createdAt: -1},limit: 100}).fetch();

            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },

})


//Unique

Web_ProductionLine._ensureIndex({
    body: 1,
    order: 1,
    branchId: 1
}, {unique: 1, name: "Web_ProductionLineUnique"});