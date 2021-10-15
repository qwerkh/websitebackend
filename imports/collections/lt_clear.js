import {Mongo} from "meteor/mongo";

export const LT_Clear = new Mongo.Collection("lt_clear");
LT_Clear.schema = new SimpleSchema({
    date: {
        type: String,
        optional: true,
    },
    agentId: {
        type: String,
    },
    type: {
        type: String,
    },
    amountNowKHR: {
        type: Number,
        optional: true,
        decimal: true,
        defaultValue: 0
    },
    unpaidBeforeKHR: {
        type: Number,
        optional: true,
        decimal: true,
        defaultValue: 0
    },
    paidKHR: {
        type: Number,
        optional: true,
        decimal: true,
        defaultValue: 0
    },
    reviewKHR: {
        type: Number,
        optional: true,
        decimal: true,
        defaultValue: 0
    },
    balanceKHR: {
        type: Number,
        optional: true,
        decimal: true,
        defaultValue: 0
    },


    amountNowUSD: {
        type: Number,
        optional: true,
        decimal: true,
        defaultValue: 0
    },
    unpaidBeforeUSD: {
        type: Number,
        optional: true,
        decimal: true,
        defaultValue: 0
    },
    paidUSD: {
        type: Number,
        optional: true,
        decimal: true,
        defaultValue: 0
    },
    reviewUSD: {
        type: Number,
        optional: true,
        decimal: true,
        defaultValue: 0
    },
    balanceUSD: {
        type: Number,
        optional: true,
        decimal: true,
        defaultValue: 0
    },



    amountNowTHB: {
        type: Number,
        optional: true,
        decimal: true,
        defaultValue: 0
    },
    unpaidBeforeTHB: {
        type: Number,
        optional: true,
        decimal: true,
        defaultValue: 0
    },
    paidTHB: {
        type: Number,
        optional: true,
        decimal: true,
        defaultValue: 0
    },
    reviewTHB: {
        type: Number,
        optional: true,
        decimal: true,
        defaultValue: 0
    },
    balanceTHB: {
        type: Number,
        optional: true,
        decimal: true,
        defaultValue: 0
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
LT_Clear.attachSchema(LT_Clear.schema);


export const LT_ClearReact = new Mongo.Collection('lt_clearReact');
LT_ClearReact.schema = new SimpleSchema({
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

LT_ClearReact.attachSchema(LT_ClearReact.schema);

export const LT_ClearAudit = new Mongo.Collection('lt_clearAudit');
LT_ClearAudit.schema = new SimpleSchema({
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

LT_ClearAudit.attachSchema(LT_ClearAudit.schema);
