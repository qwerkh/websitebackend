import {Meteor} from 'meteor/meteor';
import GlobalFn from "../../imports/libs/globalFn"
import {
    Web_PlantRoom,
    Web_PlantRoomReact,
    Web_PlantRoomAudit
} from "../../imports/collections/plantRoom"
import {Web_PlantType} from "../../imports/collections/plantType";

let secret = Meteor.settings.private.secret;
Meteor.methods({
    web_fetchPlantRoom({q, filter, sort, options = {limit: 10, skip: 0}, branchId, accessToken, userId}) {
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

            data.content = Web_PlantRoom.aggregate([
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
            data.countContent = Web_PlantRoom.find(selector).count();
            return data;
        }
    },
    web_insertPlantRoom(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let id = Web_PlantRoom.insert(doc);
                if (id) {
                    GlobalFn.collectionReact(Web_PlantRoomReact, id);
                }
                return id;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }

    },
    web_updatePlantRoom(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = Web_PlantRoom.findOne({_id: id});
                let isUpdated = Web_PlantRoom.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(Web_PlantRoomReact, id, Web_PlantRoomAudit, oldDoc, "Update");
                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_removePlantRoom(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = Web_PlantRoom.remove({_id: doc._id});

                if (isRemoved) {
                    GlobalFn.collectionReact(Web_PlantRoomReact, doc._id, Web_PlantRoomAudit, doc, "Remove");
                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_findPlantRoom(branchId, addToHome, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};

                selector.branchId = branchId;
                if (addToHome || addToHome === "true") {
                    selector.addToHome = true;
                }
                return  Web_PlantRoom.find(selector, {sort: {createdAt: -1}}).fetch();

            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_findPlantRoomOpt(branchId, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};

                selector.branchId = branchId;

                return Web_PlantRoom.find(selector, {sort: {createdAt: 1}}).fetch().map(o => ({
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

Web_PlantRoom._ensureIndex({
    title: 1,
    body: 1,
    branchId: 1
}, {unique: 1, name: "Web_PlantRoomUnique"});