import {Mongo} from "meteor/mongo";

export const LT_Location = new Mongo.Collection("lt_location");
LT_Location.schema = new SimpleSchema({
    code: {
        type: String,
        optional: true,
        max: 200
    },
    name: {
        type: String,
        label: "Name",
        max: 200
    },
    date: {
        type: String,
    },
    offValue2D: {
        type: Number,
        decimal: true,
        label: 'Off value 2D (%)'
    },

    offValue3D: {
        type: Number,
        decimal: true,
        label: 'Off value 3D (%)'
    },
    offValueLer: {
        type: Number,
        decimal: true,
        optional: true,
        defaultValue: 0,
        label: 'Off value Ler (%)'
    },
    offValueTot: {
        type: Number,
        decimal: true,
        optional: true,
        defaultValue: 0,
        label: 'Off value Tot (%)'
    },
    win2D: {
        type: Number,
        decimal: true,
        label: 'Win 2D'
    }, win3D: {
        type: Number,
        decimal: true,
        label: 'Win 3D'
    }, winLer: {
        type: Number,
        optional: true,
        decimal: true,
        defaultValue: 0,
        label: 'Win Ler'
    }, winTot: {
        type: Number,
        optional: true,
        decimal: true,
        defaultValue: 0,
        label: 'Win Tot'
    }, add: {
        type: Number,
        label: "Add"
    }, share: {
        type: Number,
        label: "Share(%)"
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
LT_Location.attachSchema(LT_Location.schema);


export const LT_LocationReact = new Mongo.Collection('lt_locationReact');
LT_LocationReact.schema = new SimpleSchema({
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

LT_LocationReact.attachSchema(LT_LocationReact.schema);

export const LT_LocationAudit = new Mongo.Collection('lt_locationAudit');
LT_LocationAudit.schema = new SimpleSchema({
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

LT_LocationAudit.attachSchema(LT_LocationAudit.schema);
