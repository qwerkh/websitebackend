import {Meteor} from 'meteor/meteor';
import GlobalFn from "../../imports/libs/globalFn"
import {
    Web_TrainingProgram,
    Web_TrainingProgramReact,
    Web_TrainingProgramAudit
} from "../../imports/collections/trainingProgram"

let secret = Meteor.settings.private.secret;
Meteor.methods({
    web_fetchTrainingProgram({q, filter, sort, options = {limit: 10, skip: 0}, branchId, accessToken, userId,majorId}) {
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
            selector.majorId = majorId;

            data.content = Web_TrainingProgram.aggregate([
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
            data.countContent = Web_TrainingProgram.find(selector).count();
            return data;
        }
    },
    web_insertTrainingProgram(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let id = Web_TrainingProgram.insert(doc);
                if (id) {
                    GlobalFn.collectionReact(Web_TrainingProgramReact, id);
                }
                return id;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }

    },
    web_updateTrainingProgram(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = Web_TrainingProgram.findOne({_id: id});
                let isUpdated = Web_TrainingProgram.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(Web_TrainingProgramReact, id, Web_TrainingProgramAudit, oldDoc, "Update");
                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_removeTrainingProgram(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = Web_TrainingProgram.remove({_id: doc._id});

                if (isRemoved) {
                    GlobalFn.collectionReact(Web_TrainingProgramReact, doc._id, Web_TrainingProgramAudit, doc, "Remove");
                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_findTrainingProgram(branchId,majorId, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};

                selector.branchId = branchId;
                selector.majorId = majorId;
                return Web_TrainingProgram.find(selector, {sort: {order:1,createdAt: 1}, limit: 100}).fetch();

            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    sb_fetchTrainingProgramOption(q, accessToken, branchId) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};
                if (Array.isArray(branchId)) {
                    selector.branchId = {$in: branchId};
                } else {
                    selector.branchId = branchId;
                }


                if (q && q !== "" && q !== undefined && q !== null) {
                    q = q.replace(/[/\\]/g, '');
                    let reg = new RegExp(q, 'mi');

                    selector.$or = [
                        {'title.en': {$regex: reg}},
                        {'title.km': {$regex: reg}},
                        {'title.cn': {$regex: reg}},
                        {_id: q}
                    ];
                }

                return Web_TrainingProgram.find(selector, {limit: 300}).fetch().map(obj => ({
                    label: obj.title.en,
                    value: obj._id
                }));
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    }

})


//Unique

Web_TrainingProgram._ensureIndex({
    majorId: 1,
    title: 1,
    body: 1,
    order:1,
    branchId: 1
}, {unique: 1, name: "Web_TrainingProgramUnique"});