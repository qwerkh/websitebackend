import {Meteor} from 'meteor/meteor';
import GlobalFn from "../../imports/libs/globalFn"
import {
    Web_PlantType,
    Web_PlantTypeReact,
    Web_PlantTypeAudit
} from "../../imports/collections/plantType"
import {Web_PlantGift} from "../../imports/collections/plantGift";
import {Web_PlantRoom} from "../../imports/collections/plantRoom";
import {Web_PlantLifeStyle} from "../../imports/collections/plantLifeStyle";

let secret = Meteor.settings.private.secret;
Meteor.methods({
    web_fetchPlantType({q, filter, sort, options = {limit: 10, skip: 0}, branchId, accessToken, userId}) {
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
                        "title.en": {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }, {
                        "title.km": {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }, {
                        "title.cn": {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }, {
                        "body.en": {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }, {
                        "body.km": {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }, {
                        "body.cn": {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }];
                }
            }

            selector.branchId = branchId;

            data.content = Web_PlantType.aggregate([
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
            data.countContent = Web_PlantType.find(selector).count();
            return data;
        }
    },
    web_insertPlantType(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let id = Web_PlantType.insert(doc);
                if (id) {
                    GlobalFn.collectionReact(Web_PlantTypeReact, id);
                }
                return id;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }

    },
    web_updatePlantType(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = Web_PlantType.findOne({_id: id});
                let isUpdated = Web_PlantType.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(Web_PlantTypeReact, id, Web_PlantTypeAudit, oldDoc, "Update");
                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_removePlantType(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = Web_PlantType.remove({_id: doc._id});

                if (isRemoved) {
                    GlobalFn.collectionReact(Web_PlantTypeReact, doc._id, Web_PlantTypeAudit, doc, "Remove");
                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_findPlantType(branchId, addToHome, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};

                selector.branchId = branchId;
                if (addToHome || addToHome === "true") {
                    selector.addToHome = true;
                }

                return Web_PlantType.find(selector, {sort: {createdAt: -1}}).fetch();

            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_findPlantTypeById(id, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};
                selector._id = id;
                return Web_PlantType.findOne(selector);

            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_findTab(branchId, addToHome, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};

                selector.branchId = branchId;
                if (addToHome || addToHome === "true") {
                    selector.addToHome = true;
                }
                let tab = {};
                let plantType = Web_PlantType.find(selector, {sort: {createdAt: -1}}).fetch();
                let plantGift = Web_PlantGift.find(selector, {sort: {createdAt: -1}}).fetch();
                let plantRoom = Web_PlantRoom.find(selector, {sort: {createdAt: -1}}).fetch();
                let plantLifeStyle = Web_PlantLifeStyle.find(selector, {sort: {createdAt: -1}}).fetch();
                tab.plantType = plantType;
                tab.plantGift = plantGift;
                tab.plantRoom = plantRoom;
                tab.plantLifeStyle = plantLifeStyle;
                return tab;

            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_findPlantTypeOpt(branchId, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};

                selector.branchId = branchId;

                return Web_PlantType.find(selector, {sort: {createdAt: 1}}).fetch().map(o => ({
                    label: o.title.en,
                    value: o._id
                }));

            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },

})


//Unique

Web_PlantType._ensureIndex({
    title: 1,
    body: 1,
    branchId: 1
}, {unique: 1, name: "Web_PlantTypeUnique"});