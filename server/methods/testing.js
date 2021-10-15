import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../imports/libs/globalFn"
import _ from 'lodash'

import {Testing, TestingReact, TestingAudit} from "../../imports/collections/testing"

let secret = Meteor.settings.private.secret;
Meteor.methods({
    base_fetchTesting({q, filter, sort, options = {limit: 10, skip: 0}, branchId, accessToken}) {
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
                        email: {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }, {
                        address: {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }, {
                        phoneNumber: {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }, {
                        homeStreetGroupNo: {
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
            data.content = Testing.find(selector, {sort: sortObj, limit: options.limit, skip: options.skip}).fetch();
            data.countContent = Testing.find(selector).count();
            return data;
        }
    },
    base_insertTesting(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let id = Testing.insert(doc);

            if (id) {
                GlobalFn.collectionReact(TestingReact, id);
            }
            return id;
        }

    },
    base_updateTesting(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let oldDoc = Testing.findOne({_id: id});
            let isUpdated = Testing.update({_id: id}, {$set: doc});
            if (isUpdated) {
                GlobalFn.collectionReact(TestingReact, id, TestingAudit, oldDoc, "Update");
            }
            return isUpdated;
        }
    },
    base_removeTesting(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let isRemoved = Testing.remove({_id: doc._id});

            if (isRemoved) {
                GlobalFn.collectionReact(TestingReact, doc._id, TestingAudit, doc, "Remove");
            }
            return isRemoved;
        }
    },
    base_fetchTestingOptionList(q, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let selector = {};
            if (q && q !== "" && q !== undefined && q !== null) {
                q = q.replace(/[/\\]/g, '');
                let reg = new RegExp(q, 'mi');
                selector.$or = [
                    {name: {$regex: reg}},
                    {_id: q}
                ];
            }
            /* else {
                            if (list.length > 0) {
                                selector._id = {$in: list};
                            }
                        }*/

            return Testing.find(selector).fetch().map(obj => ({
                label: (obj.name || ""),
                value: obj._id
            }));
            /*return Testing.find(selector, {limit: 300}).fetch().map(obj => ({
                label: (obj.name || ""),
                value: obj._id
            }));*/

        }
    },
    base_fetchTestingOptionListByListId(list, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let selector = {};
            selector._id = {$in: list};
            return Testing.find(selector).fetch().map(obj => ({
                label: (obj.name || ""),
                value: obj._id
            }));
        }
    }
})