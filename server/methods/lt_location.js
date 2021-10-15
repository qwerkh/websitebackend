import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../imports/libs/globalFn"
import _ from 'lodash'

import {LT_Location, LT_LocationReact, LT_LocationAudit} from "../../imports/collections/lt_location"

let secret = Meteor.settings.private.secret;
Meteor.methods({
    lt_fetchLocation({q, filter, sort, options = {limit: 10, skip: 0}, branchId, accessToken}) {
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
                    }];
                }
            }
            selector.branchId = branchId;
            data.content = LT_Location.aggregate([
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
                    }
                ],
                {
                    allowDiskUse: true
                });
            data.countContent = LT_Location.find(selector).count();
            return data;
        }
    },
    lt_insertLocation(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let id = LT_Location.insert(doc);

                if (id) {
                    GlobalFn.collectionReact(LT_LocationReact, id);
                }
                return id;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }

        }

    },
    lt_updateLocation(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = LT_Location.findOne({_id: id});
                let isUpdated = LT_Location.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(LT_LocationReact, id, LT_LocationAudit, oldDoc, "Update");
                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    lt_removeLocation(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = LT_Location.remove({_id: doc._id});

                if (isRemoved) {
                    GlobalFn.collectionReact(LT_LocationReact, doc._id, LT_LocationAudit, doc, "Remove");
                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    lt_findLocationById(id, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                return LT_Location.findOne({_id: id});
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    lt_fetchLocationOption(accessToken, branchId) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};
                selector.branchId = branchId;
                return LT_Location.find(selector).fetch().map(obj => ({
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

LT_Location._ensureIndex({
    name: 1,
    branchId: 1
}, {unique: 1, name: "LT_LocationUnique"});
