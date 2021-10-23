import {Meteor} from 'meteor/meteor';
import GlobalFn from "../../imports/libs/globalFn"
import {Web_Contact, Web_ContactReact, Web_ContactAudit} from "../../imports/collections/contact"

let secret = Meteor.settings.private.secret;
Meteor.methods({
    web_fetchContact({q, filter, sort, options = {limit: 10, skip: 0}, branchId, accessToken, userId}) {
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


            data.content = Web_Contact.aggregate([
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
            data.countContent = Web_Contact.find(selector).count();
            return data;
        }
    },
    web_insertContact(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                console.log(doc);
                let id = Web_Contact.insert(doc);
                if (id) {
                    GlobalFn.collectionReact(Web_ContactReact, id);
                }
                return id;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }

    },
    web_updateContact(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = Web_Contact.findOne({_id: id});
                let isUpdated = Web_Contact.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(Web_ContactReact, id, Web_ContactAudit, oldDoc, "Update");
                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_removeContact(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = Web_Contact.remove({_id: doc._id});

                if (isRemoved) {
                    GlobalFn.collectionReact(Web_ContactReact, doc._id, Web_ContactAudit, doc, "Remove");
                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_findContact(branchId, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};

                selector.branchId = branchId;
                return Web_Contact.find(selector, {sort: {order: 1}}).fetch();

            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },

})


//Unique

Web_Contact._ensureIndex({
    title: 1,
    phoneNumber: 1,
    branchId: 1
}, {unique: 1, name: "Web_ContactUnique"});