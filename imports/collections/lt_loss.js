import {Mongo} from "meteor/mongo";

export const LT_Loss = new Mongo.Collection("lt_loss");
LT_Loss.schema = new SimpleSchema({
    lossDate: {
        type: String
    }
    ,
    time: {
        type: String,
        label: 'Time'
    },
    agentId: {
        type: String,
        label: 'Agent'
    },
    endPerDayId: {
        type: String
    }
    ,
    detail: {
        type: [Object]
    },
    'detail.$.page': {
        type: Number,
        label: 'Page'
    },
    'detail.$.totalRiel2D': {
        type: Number,
        decimal: true
    },
    'detail.$.totalRiel3D': {
        type: Number,
        decimal: true
    },
    'detail.$.totalRielLer': {
        type: Number,
        optional: true,
        defaultValue: 0,
        decimal: true
    },
    'detail.$.totalRielTot': {
        type: Number,
        optional: true,
        defaultValue: 0,
        decimal: true
    },
    'detail.$.totalDollar2D': {
        type: Number,
        decimal: true
    }, 'detail.$.totalDollar3D': {
        type: Number,
        decimal: true
    },

    'detail.$.totalDollarLer': {
        type: Number,
        optional: true,
        defaultValue: 0,
        decimal: true
    },
    'detail.$.totalDollarTot': {
        type: Number,
        optional: true,
        defaultValue: 0,
        decimal: true
    },
    'detail.$.totalBaht2D': {
        type: Number,
        decimal: true
    }, 'detail.$.totalBaht3D': {
        type: Number,
        decimal: true
    },
    'detail.$.totalBahtLer': {
        type: Number,
        optional: true,
        defaultValue: 0,
        decimal: true
    }
    ,
    'detail.$.totalBahtTot': {
        type: Number,
        optional: true,
        defaultValue: 0,
        decimal: true
    }

    ,
    'detail.$.lossRiel2D': {
        type: Number,
        decimal: true
    },
    'detail.$.lossRiel3D': {
        type: Number,
        decimal: true
    },
    'detail.$.lossRielLer': {
        type: Number,
        optional: true,
        defaultValue: 0,
        decimal: true
    },
    'detail.$.lossRielTot': {
        type: Number,
        optional: true,
        defaultValue: 0,
        decimal: true
    },
    'detail.$.lossDollar2D': {
        type: Number,
        decimal: true
    }, 'detail.$.lossDollar3D': {
        type: Number,
        decimal: true
    }, 'detail.$.lossDollarLer': {
        type: Number,
        optional: true,
        defaultValue: 0,
        decimal: true
    }, 'detail.$.lossDollarTot': {
        type: Number,
        optional: true,
        defaultValue: 0,
        decimal: true
    }, 'detail.$.lossBaht2D': {
        type: Number,
        decimal: true
    }, 'detail.$.lossBaht3D': {
        type: Number,
        decimal: true
    }, 'detail.$.lossBahtLer': {
        type: Number,
        optional: true,
        defaultValue: 0,
        decimal: true
    }, 'detail.$.lossBahtTot': {
        type: Number,
        optional: true,
        defaultValue: 0,
        decimal: true
    },
    'detail.$.updateCount': {
        type: Number,
        decimal: true
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
LT_Loss.attachSchema(LT_Loss.schema);


export const LT_LossReact = new Mongo.Collection('lt_lossReact');
LT_LossReact.schema = new SimpleSchema({
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

LT_LossReact.attachSchema(LT_LossReact.schema);

export const LT_LossAudit = new Mongo.Collection('lt_lossAudit');
LT_LossAudit.schema = new SimpleSchema({
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

LT_LossAudit.attachSchema(LT_LossAudit.schema);
