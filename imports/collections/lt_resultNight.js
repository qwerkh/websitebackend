import {Mongo} from "meteor/mongo";

export const LT_ResultNight = new Mongo.Collection("lt_resultNight");
LT_ResultNight.schema = new SimpleSchema({
    resultDate: {
        type: String
    },
    time: {
        type: String,
        label: "Time"
    },
    A1: {
        type: String,
        label: "1/A",
        max: 2,
        min: 2
    },
    A2: {
        type: String,
        label: "2/A",
        max: 2,
        min: 2
    },
    A3: {
        type: String,
        label: "3/A",
        max: 2,
        min: 2
    },
    A4: {
        type: String,
        label: "4/A",
        max: 2,
        min: 2
    },
    A5: {
        type: String,
        label: "5/A",
        max: 3,
        min: 3
    },
    A6: {
        type: String,
        label: "6/A",
        max: 3,
        min: 3
    },
    A7: {
        type: String,
        label: "7/A",
        max: 3,
        min: 3
    },
    T8: {
        type: String,
        label: "8",
        max: 4,
        min: 4
    },
    T9: {
        type: String,
        label: "9",
        max: 4,
        min: 4
    },
    T10: {
        type: String,
        label: "10",
        max: 4,
        min: 4
    },
    T11: {
        type: String,
        label: "11",
        max: 4,
        min: 4
    },
    T12: {
        type: String,
        label: "12",
        max: 4,
        min: 4
    },
    T13: {
        type: String,
        label: "13",
        max: 4,
        min: 4
    },
    T14: {
        type: String,
        label: "14",
        max: 4,
        min: 4
    },
    T15: {
        type: String,
        label: "15",
        max: 4,
        min: 4
    },
    T16: {
        type: String,
        label: "16",
        max: 4,
        min: 4
    },
    T17: {
        type: String,
        label: "17",
        max: 4,
        min: 4
    },
    T18: {
        type: String,
        label: "18",
        max: 5,
        min: 5
    },
    T19: {
        type: String,
        label: "19",
        max: 5,
        min: 5
    },
    T20: {
        type: String,
        label: "20",
        max: 5,
        min: 5
    },
    T21: {
        type: String,
        label: "21",
        max: 5,
        min: 5
    },
    T22: {
        type: String,
        label: "22",
        max: 5,
        min: 5
    },
    T23: {
        type: String,
        label: "23",
        max: 5,
        min: 5
    },
    T24: {
        type: String,
        label: "24",
        max: 5,
        min: 5
    },
    T25: {
        type: String,
        label: "25",
        max: 5,
        min: 5
    },
    T26: {
        type: String,
        label: "26",
        max: 5,
        min: 5
    },
    B27: {
        type: String,
        label: "27/B",
        max: 5,
        min: 5
    },
    C: {
        type: String,
        label: "C",
        max: 5,
        min: 5
    },
    D: {
        type: String,
        label: "D",
        max: 5,
        min: 5
    },
    resultId: {
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
LT_ResultNight.attachSchema(LT_ResultNight.schema);


export const LT_ResultNightReact = new Mongo.Collection('lt_resultNightReact');
LT_ResultNightReact.schema = new SimpleSchema({
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

LT_ResultNightReact.attachSchema(LT_ResultNightReact.schema);

export const LT_ResultNightAudit = new Mongo.Collection('lt_resultNightAudit');
LT_ResultNightAudit.schema = new SimpleSchema({
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

LT_ResultNightAudit.attachSchema(LT_ResultNightAudit.schema);
