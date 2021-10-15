import {Mongo} from "meteor/mongo";

export const LT_BetDetail = new Mongo.Collection("lt_betDetail");
LT_BetDetail.schema = new SimpleSchema({
    betDetailDate: {
        type: Date
    },
    betId: {
        type: String
    },
    page: {
        type: Number,
        label: 'Page'
    },
    line: {
        type: Number,
        label: 'Line'
    },
    time: {
        type: String,
        label: 'Time'
    },
    currencyId: {
        type: String
    },
    post: {
        type: [String]
    },
    items: {
        type: [Object]
    },
    'items.$.number': {
        type: String
    },
    'items.$.amount': {
        type: Number,
        decimal: true
    },
    'items.$.totalPerNumber': {
        type: Number,
        decimal: true
    },
    total: {
        type: Number,
        decimal: true
    },
    agentId: {
        type: String,
        label: 'Agent'
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
LT_BetDetail.attachSchema(LT_BetDetail.schema);


export const LT_BetDetailReact = new Mongo.Collection('lt_betDetailReact');
LT_BetDetailReact.schema = new SimpleSchema({
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

LT_BetDetailReact.attachSchema(LT_BetDetailReact.schema);

export const LT_BetDetailAudit = new Mongo.Collection('lt_betDetailAudit');
LT_BetDetailAudit.schema = new SimpleSchema({
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

LT_BetDetailAudit.attachSchema(LT_BetDetailAudit.schema);
