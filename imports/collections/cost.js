import {Mongo} from "meteor/mongo";

export const Web_Cost = new Mongo.Collection("web_cost");
Web_Cost.schema = new SimpleSchema({
    majorId: {
        type: String

    },
    order: {
        type: Number
    },
    cost: {
        type: String
    },
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
Web_Cost.attachSchema(Web_Cost.schema);


export const Web_CostReact = new Mongo.Collection('web_costReact');
Web_CostReact.schema = new SimpleSchema({
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

Web_CostReact.attachSchema(Web_CostReact.schema);

export const Web_CostAudit = new Mongo.Collection('web_costAudit');
Web_CostAudit.schema = new SimpleSchema({
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

Web_CostAudit.attachSchema(Web_CostAudit.schema);