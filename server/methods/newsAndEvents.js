import {Meteor} from 'meteor/meteor';
import GlobalFn from "../../imports/libs/globalFn"
import {
    Web_NewsAndEvents,
    Web_NewsAndEventsReact,
    Web_NewsAndEventsAudit
} from "../../imports/collections/newsAndEvents"

let secret = Meteor.settings.private.secret;
Meteor.methods({
    web_fetchNewsAndEvents({q, filter, sort, options = {limit: 10, skip: 0}, branchId, accessToken, userId}) {
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

            data.content = Web_NewsAndEvents.aggregate([
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
            data.countContent = Web_NewsAndEvents.find(selector).count();
            return data;
        }
    },
    web_insertNewsAndEvents(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let id = Web_NewsAndEvents.insert(doc);
                if (id) {
                    GlobalFn.collectionReact(Web_NewsAndEventsReact, id);
                }
                return id;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }

    },
    web_updateNewsAndEvents(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = Web_NewsAndEvents.findOne({_id: id});
                let isUpdated = Web_NewsAndEvents.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(Web_NewsAndEventsReact, id, Web_NewsAndEventsAudit, oldDoc, "Update");
                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_removeNewsAndEvents(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = Web_NewsAndEvents.remove({_id: doc._id});

                if (isRemoved) {
                    GlobalFn.collectionReact(Web_NewsAndEventsReact, doc._id, Web_NewsAndEventsAudit, doc, "Remove");
                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_findNewsAndEvents(branchId, addToHome, accessToken, page,limit) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};

                selector.branchId = branchId;
                if (addToHome || addToHome === "true") {
                    selector.addToHome = true;
                }
                if (page) {
                    selector.page = {$elemMatch: {$eq: page}};
                }
                return  Web_NewsAndEvents.find(selector, {sort: {createdAt: -1}, limit: limit || 100}).fetch();

            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },

})


//Unique

Web_NewsAndEvents._ensureIndex({
    title: 1,
    body: 1,
    order: 1,
    branchId: 1
}, {unique: 1, name: "Web_NewsAndEventsUnique"});