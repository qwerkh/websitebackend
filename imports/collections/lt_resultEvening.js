import {Mongo} from "meteor/mongo";

export const LT_ResultEvening = new Mongo.Collection("lt_resultEvening");
LT_ResultEvening.schema = new SimpleSchema({
    resultDate: {
        type:String
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
        max: 3,
        min: 3
    },
    T3:{
        type: String,
        label: "3",
        max: 4,
        min: 4
    },
    T4:{
        type: String,
        label: "4",
        max: 4,
        min: 4
    },
    T5:{
        type: String,
        label: "5",
        max: 4,
        min: 4
    },
    T6:{
        type: String,
        label: "6",
        max: 4,
        min: 4
    },
    T7:{
        type: String,
        label: "7",
        max: 5,
        min: 5
    },
    T8:{
        type: String,
        label: "8",
        max: 5,
        min: 5
    },
    T9:{
        type: String,
        label: "9",
        max: 5,
        min: 5
    },
    T10:{
        type: String,
        label: "10",
        max: 5,
        min: 5
    },
    T11:{
        type: String,
        label: "11",
        max: 5,
        min: 5
    },
    T12:{
        type: String,
        label: "12",
        max: 5,
        min: 5
    },
    T13:{
        type: String,
        label: "13",
        max: 5,
        min: 5
    },
    T14:{
        type: String,
        label: "14",
        max: 5,
        min: 5
    },
    T15:{
        type: String,
        label: "15",
        max: 5,
        min: 5
    },
    T16:{
        type: String,
        label: "16",
        max: 5,
        min: 5
    },
    T17:{
        type: String,
        label: "17",
        max: 5,
        min: 5
    },
    B18:{
        type: String,
        label: "18/B",
        max: 5,
        min: 5
    },
    C:{
        type: String,
        label: "C",
        max: 5,
        min: 5
    },
    D:{
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
LT_ResultEvening.attachSchema(LT_ResultEvening.schema);


export const LT_ResultEveningReact = new Mongo.Collection('lt_resultEveningReact');
LT_ResultEveningReact.schema = new SimpleSchema({
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

LT_ResultEveningReact.attachSchema(LT_ResultEveningReact.schema);

export const LT_ResultEveningAudit = new Mongo.Collection('lt_resultEveningAudit');
LT_ResultEveningAudit.schema = new SimpleSchema({
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

LT_ResultEveningAudit.attachSchema(LT_ResultEveningAudit.schema);
