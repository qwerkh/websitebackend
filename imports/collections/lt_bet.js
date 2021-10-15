import {Mongo} from "meteor/mongo";

export const LT_Bet = new Mongo.Collection("lt_bet");
LT_Bet.schema = new SimpleSchema({
    betDate: {
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
    'items.$.currencyId': {
        type: String
    },
    'items.$.post': {
        type: [String]
    },
    'items.$.postTitle': {
        type: [String],
        optional: true,
        defaultValue: []
    },
    'items.$.betDetailId': {
        type: String,
        optional: true
    },
    totalRiel2D: {
        type: Number,
        decimal: true
    },
    totalRiel3D: {
        type: Number,
        decimal: true
    },

    totalRielLer: {
        type: Number,
        optional: true,
        defaultValue: 0,
        decimal: true
    },
    totalRielTot: {
        type: Number,
        optional: true,
        defaultValue: 0,
        decimal: true
    },

    totalDollar2D: {
        type: Number,
        decimal: true
    },
    totalDollar3D: {
        type: Number,
        decimal: true
    },

    totalDollarLer: {
        type: Number,
        optional: true,
        defaultValue: 0,
        decimal: true
    },
    totalDollarTot: {
        type: Number,
        optional: true,
        defaultValue: 0,
        decimal: true
    },
    totalBaht2D: {
        type: Number,
        decimal: true
    }, totalBaht3D: {
        type: Number,
        decimal: true
    },

    totalBahtLer: {
        type: Number,
        optional: true,
        defaultValue: 0,
        decimal: true
    },
    totalBahtTot: {
        type: Number,
        optional: true,
        defaultValue: 0,
        decimal: true
    },
    agentId: {
        type: String,
        label: 'Agent'
    },

    updateCount: {
        type: Number,
        optional: true,
        defaultValue: 0
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
LT_Bet.attachSchema(LT_Bet.schema);


export const LT_BetReact = new Mongo.Collection('lt_betReact');
LT_BetReact.schema = new SimpleSchema({
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

LT_BetReact.attachSchema(LT_BetReact.schema);

export const LT_BetAudit = new Mongo.Collection('lt_betAudit');
LT_BetAudit.schema = new SimpleSchema({
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

LT_BetAudit.attachSchema(LT_BetAudit.schema);
