import {Mongo} from "meteor/mongo";

export const Exchange = new Mongo.Collection("exchange");

let Rates = new SimpleSchema({
    USD: {
        type: Number,
        defaultValue: 1,
        decimal: true,
        min: 0
    },
    KHR: {
        type: Number,
        decimal: true,
        min: 100,
    },

    THB: {
        type: Number,
        decimal: true,
        min: 1,
    },

    CNY: {
        type: Number,
        decimal: true,
        min: 1,
    }
});

Exchange.schema = new SimpleSchema({

    exDate: {
        type: Date,
    },
    exDateName: {
        type: String,
        optional: true
    },
    base: {
        type: String,
        defaultValue: "USD"
    },
    rates: {
        type: Rates,
    },
    status: {
        type: Boolean,
        defaultValue: true
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
Exchange.attachSchema(Exchange.schema);


export const ExchangeReact = new Mongo.Collection('exchangeReact');
ExchangeReact.schema = new SimpleSchema({
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

ExchangeReact.attachSchema(ExchangeReact.schema);

export const ExchangeAudit = new Mongo.Collection('exchangeAudit');
ExchangeAudit.schema = new SimpleSchema({
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

ExchangeAudit.attachSchema(ExchangeAudit.schema);
