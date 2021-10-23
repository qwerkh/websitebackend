import {Mongo} from "meteor/mongo";

export const Web_Home = new Mongo.Collection("web_home");
Web_Home.schema = new SimpleSchema({
    intro: {
        type: Object,
        optional: true,
        blackbox: true
    },
    messageFromChairman: {
        type: Object,
        optional: true,
        blackbox: true
    },
    preface1: {
        type: Object,
        optional: true,
        blackbox: true
    },
    preface1ImgList: {
        type: [String],
        optional:true,
        defaultValue:[]
    },
    preface2: {
        type: Object,
        optional: true,
        blackbox: true
    },

    preface2ImgList: {
        type: [String],
        optional:true,
        defaultValue:[]
    },
    preface3: {
        type: Object,
        optional: true,
        blackbox: true
    },

    preface3ImgList: {
        type: [String],
        optional:true,
        defaultValue:[]
    },
    preface4: {
        type: Object,
        optional: true,
        blackbox: true
    },

    preface4ImgList: {
        type: [String],
        optional:true,
        defaultValue:[]
    },
    branchId: {
        type: String
    },
    createdAt: {
        type: Date,
        optional: true,

        autoValue() {
            if (this.isInsert) {
                return moment().toDate();
            }
        }
    },
    updatedAt: {
        type: Date,
        optional: true,

        autoValue() {
            if (this.isUpdate) {
                return moment().toDate();
            }
        }
    },
    createdUser: {
        type: String,
        optional: true,

        autoValue() {
            if (this.isInsert) {
                return Meteor.userId();
            }
        }
    },
    updatedUser: {
        type: String,
        optional: true,
        autoValue() {
            if (this.isUpdate) {
                return Meteor.userId();
            }
        }
    }
});
Web_Home.attachSchema(Web_Home.schema);


export const Web_HomeReact = new Mongo.Collection('web_homeReact');
Web_HomeReact.schema = new SimpleSchema({
    createdAt: {
        type: Date,
        optional: true,
        autoValue() {
            if (this.isInsert) {
                return moment().toDate();
            }
        }
    },
    updatedAt: {
        type: Date,
        optional: true,

        autoValue() {
            if (this.isUpdate) {
                return moment().toDate();
            }
        }
    },
    createdUser: {
        type: String,
        optional: true,

        autoValue() {
            if (this.isInsert) {
                return Meteor.userId();
            }
        }
    },
    updatedUser: {
        type: String,
        optional: true,

        autoValue() {
            if (this.isUpdate) {
                return Meteor.userId();
            }
        }
    },
    id: {
        type: String
    }
});

Web_HomeReact.attachSchema(Web_HomeReact.schema);

export const Web_HomeAudit = new Mongo.Collection('web_homeAudit');
Web_HomeAudit.schema = new SimpleSchema({
    createdAt: {
        type: Date,
        optional: true,

        autoValue() {
            if (this.isInsert) {
                return moment().toDate();
            }
        }
    },
    updatedAt: {
        type: Date,
        optional: true,

        autoValue() {
            if (this.isUpdate) {
                return moment().toDate();
            }
        }
    },
    createdUser: {
        type: String,
        optional: true,

        autoValue() {
            if (this.isInsert) {
                return Meteor.userId();
            }
        }
    },
    updatedUser: {
        type: String,
        optional: true,

        autoValue() {
            if (this.isUpdate) {
                return Meteor.userId();
            }
        }
    },
    type: {
        type: String,
        optional: true,
    },
    data: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

Web_HomeAudit.attachSchema(Web_HomeAudit.schema);