import {Mongo} from "meteor/mongo";

export const Web_ProductionLine = new Mongo.Collection("web_productionLine");
Web_ProductionLine.schema = new SimpleSchema({

    body: {
        type: Object,
        optional: true,
        blackbox: true
    },
    order: {
        type: Number,
        defaultValue: 1
    },
    url: {
        type: [String],
        optional: true
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
Web_ProductionLine.attachSchema(Web_ProductionLine.schema);


export const Web_ProductionLineReact = new Mongo.Collection('web_productionLineReact');
Web_ProductionLineReact.schema = new SimpleSchema({
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

Web_ProductionLineReact.attachSchema(Web_ProductionLineReact.schema);

export const Web_ProductionLineAudit = new Mongo.Collection('web_productionLineAudit');
Web_ProductionLineAudit.schema = new SimpleSchema({
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

Web_ProductionLineAudit.attachSchema(Web_ProductionLineAudit.schema);