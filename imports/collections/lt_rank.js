import {Mongo} from "meteor/mongo";

export const LT_Rank = new Mongo.Collection("lt_rank");
LT_Rank.schema = new SimpleSchema({
    minKHR: {
        type: Number,
        label: 'Min KHR'
    },

    maxKHR: {
        type: Number,
        label: "Max KHR"
    }
    ,
    minUSD: {
        type: Number,
        label: 'Min USD'
    },

    maxUSD: {
        type: Number,
        label: "Max USD"
    },
    minTHB: {
        type: Number,
        label: 'Min THB'
    },

    maxTHB: {
        type: Number,
        label: "Max THB"
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
LT_Rank.attachSchema(LT_Rank.schema);


export const LT_RankReact = new Mongo.Collection('lt_rankReact');
LT_RankReact.schema = new SimpleSchema({
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

LT_RankReact.attachSchema(LT_RankReact.schema);

export const LT_RankAudit = new Mongo.Collection('lt_rankAudit');
LT_RankAudit.schema = new SimpleSchema({
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

LT_RankAudit.attachSchema(LT_RankAudit.schema);
