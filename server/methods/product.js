import {Meteor} from 'meteor/meteor';
import GlobalFn from "../../imports/libs/globalFn"
import {Web_Product, Web_ProductReact, Web_ProductAudit} from "../../imports/collections/product"

let secret = Meteor.settings.private.secret;
Meteor.methods({
    web_fetchProduct({q, filter, sort, options = {limit: 10, skip: 0}, branchId, accessToken, userId}) {
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


            data.content = Web_Product.aggregate([
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
            data.countContent = Web_Product.find(selector).count();
            return data;
        }
    },
    web_insertProduct(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let id = Web_Product.insert(doc);
                if (id) {
                    GlobalFn.collectionReact(Web_ProductReact, id);
                }
                return id;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }

    },
    web_updateProduct(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = Web_Product.findOne({_id: id});
                let isUpdated = Web_Product.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(Web_ProductReact, id, Web_ProductAudit, oldDoc, "Update");
                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_removeProduct(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = Web_Product.remove({_id: doc._id});

                if (isRemoved) {
                    GlobalFn.collectionReact(Web_ProductReact, doc._id, Web_ProductAudit, doc, "Remove");
                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_findProduct(branchId, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};

                selector.branchId = branchId;
                return Web_Product.find(selector, {sort: {order: 1}}).fetch();

            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },

})


//Unique

Web_Product._ensureIndex({
    title: 1,
    body: 1,
    order: 1,
    branchId: 1
}, {unique: 1, name: "Web_ProductUnique"});