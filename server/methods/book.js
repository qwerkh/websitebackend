import {Meteor} from 'meteor/meteor';
import GlobalFn from "../../imports/libs/globalFn"
import {Web_Book, Web_BookReact, Web_BookAudit} from "../../imports/collections/book"

let secret = Meteor.settings.private.secret;
Meteor.methods({
   async web_fetchBook({q, filter, sort, options = {limit: 10, skip: 0}, branchId, accessToken, category}) {
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
                    selector.$or = [
                        {title: {$regex: reg, $options: 'mi'}},
                        {titleEn: {$regex: reg, $options: 'mi'}},
                        {category: {$regex: reg, $options: 'mi'}},
                        {body: {$regex: reg, $options: 'mi'}},
                        {
                            author: {
                                $regex: reg,
                                $options: 'mi'
                            }
                        }];
                }
            }
            if (category) {
                selector.category = category;
            }
            if(branchId){
                selector.branchId = branchId;
            }
            data.content =await Web_Book.rawCollection().aggregate([
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
                }).toArray();
            data.countContent = Web_Book.find(selector).count();
            return data;
        }
    },
    web_insertBook(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let id = Web_Book.insert(doc);
                if (id) {
                    GlobalFn.collectionReact(Web_BookReact, id);
                }
                return id;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }

    },
    web_updateBook(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = Web_Book.findOne({_id: id});
                let isUpdated = Web_Book.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(Web_BookReact, id, Web_BookAudit, oldDoc, "Update");
                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_removeBook(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = Web_Book.remove({_id: doc._id});

                if (isRemoved) {
                    GlobalFn.collectionReact(Web_BookReact, doc._id, Web_BookAudit, doc, "Remove");
                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_findBook(branchId, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};

                selector.branchId = branchId;
                return Web_Book.find(selector, {sort: {createdAt: -1}, limit: 100}).fetch();

            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },

})


//Unique

Web_Book._ensureIndex({
    title: 1,
    titleEn: 1,
    body: 1,
    author: 1,
    category: 1,
    branchId: 1
}, {unique: 1, name: "Web_BookUnique"});