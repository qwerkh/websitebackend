import {Mongo} from "meteor/mongo";

export const Web_RectorWelcom = new Mongo.Collection("web_rectorWelcom");
Web_RectorWelcom.schema = new SimpleSchema({
    title: {
        type: Object,
        optional: true,
        blackbox: true
    },
    body: {
        type: Object,
        optional: true,
        blackbox: true
    },
    url: {
        type: String,
        optional: true
    },
    branchId: {
        type: String
    },
    order: {
        type: Number
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
Web_RectorWelcom.attachSchema(Web_RectorWelcom.schema);


export const Web_RectorWelcomReact = new Mongo.Collection('web_rectorWelcomReact');
Web_RectorWelcomReact.schema = new SimpleSchema({
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

Web_RectorWelcomReact.attachSchema(Web_RectorWelcomReact.schema);

export const Web_RectorWelcomAudit = new Mongo.Collection('web_rectorWelcomAudit');
Web_RectorWelcomAudit.schema = new SimpleSchema({
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

Web_RectorWelcomAudit.attachSchema(Web_RectorWelcomAudit.schema);