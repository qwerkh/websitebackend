import {Meteor} from 'meteor/meteor';
import GlobalFn from "../../imports/libs/globalFn"
import {
    Web_PlantType,
    Web_PlantTypeReact,
    Web_PlantTypeAudit
} from "../../imports/collections/plantType"

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
                    },{
                        "title.cn": {
                            $regex: reg,
                            $options: 'mi'
                        }
                    },{
                        "body.en": {
                            $regex: reg,
                            $options: 'mi'
                        }
                    },{
                        "body.km": {
                            $regex: reg,
                            $options: 'mi'
                        }
                    },{
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
    web_findPlantType(branchId, addToHome, accessToken, page,limit) {
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
                return  Web_PlantType.find(selector, {sort: {createdAt: -1}, limit: limit || 100}).fetch();

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