import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../imports/libs/globalFn"
import _ from 'lodash'

import {Branch, BranchReact, BranchAudit} from "../../imports/collections/branch"

let secret = Meteor.settings.private.secret;
Meteor.methods({
    base_fetchBranch({q, filter, sort, options = {limit: 10, skip: 0}, accessToken}) {
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
            data.content = Branch.find(selector, {sort: sortObj, limit: options.limit, skip: options.skip}).fetch();
            data.countContent = Branch.find(selector).count();
            return data;
        }
    },
    base_insertBranch(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let id = Branch.insert(doc);

                if (id) {
                    GlobalFn.collectionReact(BranchReact, id);
                }
                return id;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }

    },
    base_updateBranch(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = Branch.findOne({_id: id});
                let isUpdated = Branch.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(BranchReact, id, BranchAudit, oldDoc, "Update");
                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    base_fetchBranchById(id, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                return Branch.findOne({_id: id});
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    base_removeBranch(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = Branch.remove({_id: doc._id});

                if (isRemoved) {
                    GlobalFn.collectionReact(BranchReact, doc._id, BranchAudit, doc, "Remove");
                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    base_fetchBranchOptionList(q, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};
                if (q && q !== "" && q !== undefined && q !== null) {
                    q = q.replace(/[/\\]/g, '');
                    let reg = new RegExp(q, 'mi');
                    selector.$or = [
                        {name: {$regex: reg}},
                        {_id: q}
                    ];
                }
                let userDoc = Meteor.user();
                if (userDoc && userDoc.username !== "super") {
                    selector._id = {$in: userDoc.branch};
                }

                return Branch.find(selector).fetch().map(obj => ({
                    label: (obj.name || ""),
                    value: obj._id
                }));
            } catch (e) {
                throw new Meteor.Error(e.message);
            }

        }
    },
    base_fetchBranchOptionListByListId(list, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};
                selector._id = {$in: list};
                return Branch.find(selector).fetch().map(obj => ({
                    label: (obj.name || ""),
                    value: obj._id
                }));
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    }
})

//Unique

Branch._ensureIndex({
    name: 1,
    phoneNumber: 1
}, {unique: 1, name: "BranchUnique"});