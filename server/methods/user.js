import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../imports/libs/globalFn"
import _ from 'lodash'

import {UserReact, UserAudit} from "../../imports/collections/user"

const secret = Meteor.settings.private.secret;
Meteor.methods({
    base_fetchUser({q, filter, sort, options = {limit: 10, skip: 0}, userId}) {
        let data = {
            content: [],
            countContent: 0,
        };
        let selector = {};
        let sortObj = {};
        if (sort.sortBy !== "") {
            //sortObj = sortBy.sort;
            let nameSort = sort.sortBy;
            sortObj[nameSort] = sort.sortDesc === true ? 1 : -1;
            //sortObj["createdAt"] = -1;
        } else {
            sortObj = {createdAt: -1};
        }
        if (!!q) {
            let reg = new RegExp(q);
            if (!!filter) {
                selector[filter] = {$regex: reg, $options: 'mi'}
            } else {
                selector.$or = [{username: {$regex: reg, $options: 'mi'}}, {desc: {$regex: reg, $options: 'mi'}}];
            }
        }

        selector.username = {$ne: "super"};
        if (Meteor.user() && Meteor.user().username !== "super") {
            selector.defaultBranch = Meteor.user().defaultBranch;
        } else {
            let currentUser = Meteor.users.findOne({_id: userId});
            if (currentUser) {
                selector.defaultBranch = currentUser.defaultBranch;
            }
        }
        data.content = Meteor.users.aggregate([
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
        data.countContent = Meteor.users.find(selector).count();
        return data;
    },
    base_insertUser(doc) {
        try {
            let id = Accounts.createUser({
                username: doc.username,
                email: doc.email,
                agentId: doc.agentId,
                password: doc.password,
                profile: doc.profile,
                roles: doc.roles || {},
                branch: doc.branch || [],
                defaultBranch: doc.defaultBranch || "",
                module: doc.module || []
            });

            if (id) {
                GlobalFn.collectionReact(UserReact, id);
            }
            return id;
        } catch (e) {
            throw new Meteor.Error(e.message);
        }

    },
    base_updateUser(id, doc) {
        let changePassword = doc.changePassword;
        delete doc.changePassword;
        delete doc.password;
        delete doc.confirmChangePassword;
        let oldDoc = Meteor.users.findOne({_id: id});
        doc.emails = oldDoc.emails.map((obj) => {
            obj.address = doc.email;
            return obj;
        })
        delete doc.email;
        delete doc._id;

        let newProfile = oldDoc.profile;
        newProfile.fullName = doc.profile.fullName;
        newProfile.url = doc.profile.url;
        newProfile.approved = doc.profile.approved;
        newProfile.workDayMorning = doc.profile.workDayMorning;
        newProfile.workDayAfternoon = doc.profile.workDayAfternoon;
        newProfile.workTimeMorningStart = doc.profile.workTimeMorningStart;
        newProfile.workTimeMorningEnd = doc.profile.workTimeMorningEnd;
        newProfile.workTimeAfternoonStart = doc.profile.workTimeAfternoonStart;
        newProfile.workTimeAfternoonEnd = doc.profile.workTimeAfternoonEnd;
        newProfile.maxUserLogin = doc.profile.maxUserLogin;

        doc.profile = newProfile;

        let isUpdated = Meteor.users.update({_id: id}, {$set: doc});
        if (isUpdated) {
            !!changePassword ? Accounts.setPassword(id, changePassword) : null;
            GlobalFn.collectionReact(UserReact, id, UserAudit, oldDoc, "Update");
        }
        return isUpdated;
    },
    base_finUserById() {
        if (Meteor.userId()) {
            return Meteor.users.findOne({_id: Meteor.userId()}, {
                fields: {
                    _id: 1,
                    branch: 1,
                    defaultBranch: 1,
                    profile: 1,
                    username: 1,
                    roles: 1,
                    module: 1,
                    agentId: 1
                }
            });
        }
    },
    base_updateProfile(id, doc) {
        let oldDoc = Meteor.users.findOne({_id: id});
        doc.emails = oldDoc.emails.map((obj) => {
            obj.address = doc.email;
            return obj;
        })
        delete doc.email;
        delete doc._id;

        let isUpdated = Meteor.users.update({_id: id}, {
            $set: {
                "profile.fullName": doc.profile.fullName,
                emails: doc.emails
            }
        });
        if (isUpdated) {
            GlobalFn.collectionReact(UserReact, id, UserAudit, oldDoc, "Update");
        }
        return isUpdated;
    },
    base_updateLayout(id, layout) {
        let isUpdated = Meteor.users.update({_id: id}, {
            $set: {
                "profile.isDark": layout.isDark,
                "profile.sideColorFilter": layout.sideColorFilter,
                "profile.imgBackground": layout.imgBackground,
                "profile.isSideBarImage": layout.isSideBarImage,
                "profile.language": layout.language,
                "profile.dense": layout.dense,
            }
        });
        if (isUpdated) {
            GlobalFn.collectionReact(UserReact, id);
        }
        return isUpdated;
    },
    base_removeUser(doc) {
        let isRemoved = Meteor.users.remove({_id: doc._id});

        if (isRemoved) {
            GlobalFn.collectionReact(UserReact, doc._id, UserAudit, doc, "Remove");
        }
        return isRemoved;
    },

    baseCheckUserLogin({username, password, accessToken}) {
        if (accessToken === secret) {
            if (!!username) {
                let user = Meteor.users.findOne({username});
                if (!!user) {
                    const validateLogin = GlobalFn.checkLogin(user, password);
                    if (!!validateLogin.error) {
                        throw new Meteor.Error(validateLogin.error.reason);
                    }
                    user.loginTokens = user && user.services && user.services.resume && user.services.resume.loginTokens || "";
                    user.smsCode = user.smsCode + "";
                    return user;
                }
                throw new Meteor.Error("ឈ្មោះអ្នកប្រើប្រាស់មិនត្រមឹត្រូវ");
            }
        }
    },
})