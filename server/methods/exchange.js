import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../imports/libs/globalFn"
import _ from 'lodash'

import {Exchange, ExchangeReact, ExchangeAudit} from "../../imports/collections/exchange"

let secret = Meteor.settings.private.secret;
Meteor.methods({
    base_fetchExchange({q, filter, sort, options = {limit: 10, skip: 0}, accessToken}) {
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
                    selector.$or = [{exDateName: {$regex: reg, $options: 'mi'}}];
                }
            }
            data.content = Exchange.aggregate([
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

            data.countContent = Exchange.find(selector).count();
            return data;
        }
    },
    base_insertExchange(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                if (doc.status == true) {
                    Exchange.update({status: true}, {
                        $set: {
                            status: false
                        }
                    }, {multi: true});
                }
                let id = Exchange.insert(doc);

                if (id) {
                    GlobalFn.collectionReact(ExchangeReact, id);
                }
                return id;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }

    },
    base_updateExchange(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = Exchange.findOne({_id: id});
                if (doc.status === true) {
                    Exchange.update({status: true}, {
                        $set: {
                            status: false
                        },
                        $multi: true
                    })
                }

                let isUpdated = Exchange.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(ExchangeReact, id, ExchangeAudit, oldDoc, "Update");
                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    base_removeExchange(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = Exchange.remove({_id: doc._id});

                if (isRemoved) {
                    GlobalFn.collectionReact(ExchangeReact, doc._id, ExchangeAudit, doc, "Remove");
                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    base_fetchExchangeOptionList(q, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};
                if (q && q !== "" && q !== undefined && q !== null) {
                    q = q.replace(/[/\\]/g, '');
                    let reg = new RegExp(q, 'mi');
                    selector.$or = [
                        {exDateName: {$regex: reg}},
                        {_id: q}
                    ];
                }


                return Exchange.find(selector, {sort: {createdAt: -1}, limit: 200}).fetch().map(obj => ({
                    label: (obj.exDateName || "") + " : " + JSON.stringify(obj.rates),
                    value: obj._id
                }));
            } catch (e) {
                throw new Meteor.Error(e.message);
            }

        }
    }
})
