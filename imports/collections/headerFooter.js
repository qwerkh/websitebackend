import {Mongo} from "meteor/mongo";

export const Web_HeaderFooter = new Mongo.Collection("web_headerFooter");
Web_HeaderFooter.schema = new SimpleSchema({
    aboutThisSite: {
        type: Object,
        optional: true,
        blackbox: true
    },
    addressFooter: {
        type: Object,
        optional: true,
        blackbox: true
    },
    phoneNumberHeader: {
        type: String,
        optional:true
    },
    emailHeader: {
        type: String,
        optional:true
    },
    phoneNumberFooter: {
        type: String,
        optional:true
    },
    emailFooter: {
        type: String,
        optional:true
    },
    facebookUrl:{
        type: String,
        optional:true
    },
    telegramUrl:{
        type: String,
        optional:true
    },
    linkInUrl:{
        type: String,
        optional:true
    },
    instagramUrl:{
        type: String,
        optional:true
    },
    twitterUrl:{
        type: String,
        optional:true
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
Web_HeaderFooter.attachSchema(Web_HeaderFooter.schema);


export const Web_HeaderFooterReact = new Mongo.Collection('web_headerFooterReact');
Web_HeaderFooterReact.schema = new SimpleSchema({
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

Web_HeaderFooterReact.attachSchema(Web_HeaderFooterReact.schema);

export const Web_HeaderFooterAudit = new Mongo.Collection('web_headerFooterAudit');
Web_HeaderFooterAudit.schema = new SimpleSchema({
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

Web_HeaderFooterAudit.attachSchema(Web_HeaderFooterAudit.schema);