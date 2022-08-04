import {Meteor} from 'meteor/meteor';
import GlobalFn from "../../imports/libs/globalFn"
import {
    Web_Program,
    Web_ProgramReact,
    Web_ProgramAudit
} from "../../imports/collections/program"
import {Web_Major} from "../../imports/collections/major";

let secret = Meteor.settings.private.secret;
Meteor.methods({
    web_fetchProgram({q, filter, sort, options = {limit: 10, skip: 0}, branchId, accessToken, userId}) {
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

            data.content = Web_Program.aggregate([
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
            data.countContent = Web_Program.find(selector).count();
            return data;
        }
    },
    web_insertProgram(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let id = Web_Program.insert(doc);
                if (id) {
                    GlobalFn.collectionReact(Web_ProgramReact, id);
                }
                return id;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }

    },
    web_updateProgram(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = Web_Program.findOne({_id: id});
                let isUpdated = Web_Program.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(Web_ProgramReact, id, Web_ProgramAudit, oldDoc, "Update");
                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_removeProgram(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = Web_Program.remove({_id: doc._id});

                if (isRemoved) {
                    GlobalFn.collectionReact(Web_ProgramReact, doc._id, Web_ProgramAudit, doc, "Remove");
                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_findProgram(branchId, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};

                selector.branchId = branchId;
                return Web_Program.find(selector, {sort: {order: 1, createdAt: 1}, limit: 100}).fetch();

            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    sb_fetchProgramOption(q, accessToken, branchId) {
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

                return Web_Program.find(selector, {limit: 300}).fetch().map(obj => ({
                    label: obj.title.en,
                    value: obj._id
                }));
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    sb_fetchMajorOption(q, accessToken, branchId) {
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

                return Web_Major.find(selector, {limit: 300}).fetch().map(obj => ({
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

Web_Program._ensureIndex({
    title: 1,
    body: 1,
    branchId: 1
}, {unique: 1, name: "Web_ProgramUnique"});