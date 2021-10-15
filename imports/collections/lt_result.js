import {Mongo} from "meteor/mongo";

export const LT_Result = new Mongo.Collection("lt_result");
LT_Result.schema = new SimpleSchema({
    resultDate: {
        type: String
    },
    time: {
        type: String,
        label: "Time"
    },
    postA: {
        type: Object
    },
    'postA.result2D': {
        type: [String],
        label: '2D Result'
    },
    postA1: {
        type: Object
    },
    'postA1.result2D': {
        type: String,
        label: '2D Result',
        max: 2,
        min: 2,
        optional: true
    },
    postA2: {
        type: Object
    },
    'postA2.result2D': {
        type: String,
        label: '2D Result',
        max: 2,
        min: 2,
        optional: true
    },
    postA3: {
        type: Object
    },
    'postA3.result2D': {
        type: String,
        label: '2D Result',
        max: 2,
        min: 2,
        optional: true
    },
    postA4: {
        type: Object
    },
    'postA4.result2D': {
        type: String,
        label: '2D Result',
        max: 2,
        min: 2,
        optional: true
    },
    'postA.result3D': {
        type: [String],
        label: '3D Result'
    },
    'postA1.result3D': {
        type: String,
        label: '3D Result',
        max: 3,
        min: 3,
        optional: true
    },
    'postA2.result3D': {
        type: String,
        label: '3D Result',
        max: 3,
        min: 3,
        optional: true
    },
    'postA3.result3D': {
        type: String,
        label: '3D Result',
        max: 3,
        min: 3,
        optional: true
    },
    postB: {
        type: Object
    },
    'postB.result2D': {
        type: String,
        label: '2D Result',
        max: 2,
        min: 2,
        optional: true
    },
    'postB.result3D': {
        type: String,
        label: '3D Result',
        max: 3,
        min: 3,
        optional: true
    },
    postC: {
        type: Object,
        optional: true
    },
    'postC.result2D': {
        type: String,
        label: '2D Result',
        max: 2,
        min: 2,
        optional: true
    },
    'postC.result3D': {
        type: String,
        label: '3D Result',
        max: 3,
        min: 3,
        optional: true
    },
    postD: {
        type: Object,
        optional: true
    },
    'postD.result2D': {
        type: String,
        label: '2D Result',
        max: 2,
        min: 2,
        optional: true
    },
    'postD.result3D': {
        type: String,
        label: '3D Result',
        max: 3,
        min: 3,
        optional: true
    },

    postT: {
        type: Object,
        optional: true
    },
    'postT.result2D': {
        type: String,
        label: '2D Result',
        max: 2,
        min: 2,
        optional: true
    },
    'postT.result3D': {
        type: String,
        label: '3D Result',
        max: 3,
        min: 3,
        optional: true
    },
    postVat: {
        type: Object,
        optional: true
    },
    'postVat.result2D': {
        type: String,
        label: '2D Result',
        max: 2,
        min: 2,
        optional: true
    },
    'postVat.result3D': {
        type: String,
        label: '3D Result',
        max: 3,
        min: 3,
        optional: true
    },
    postF: {
        type: Object,
        optional: true
    },
    'postF.result2D': {
        type: String,
        label: '2D Result',
        max: 2,
        min: 2,
        optional: true
    },
    'postF.result3D': {
        type: String,
        label: '3D Result',
        max: 3,
        min: 3,
        optional: true
    },
    postI: {
        type: Object,
        optional: true
    },
    'postI.result2D': {
        type: String,
        label: '2D Result',
        max: 2,
        min: 2,
        optional: true
    },
    'postI.result3D': {
        type: String,
        label: '3D Result',
        max: 3,
        min: 3,
        optional: true
    },
    postK: {
        type: Object,
        optional: true
    },
    'postK.result2D': {
        type: String,
        label: '2D Result',
        max: 2,
        min: 2,
        optional: true
    },
    'postK.result3D': {
        type: String,
        label: '3D Result',
        max: 3,
        min: 3,
        optional: true
    },
    postL: {
        type: Object,
        optional: true
    },
    'postL.result2D': {
        type: String,
        label: '2D Result',
        max: 2,
        min: 2,
        optional: true
    },
    'postL.result3D': {
        type: String,
        label: '3D Result',
        max: 3,
        min: 3,
        optional: true
    },
    postN: {
        type: Object,
        optional: true
    },
    'postN.result2D': {
        type: String,
        label: '2D Result',
        max: 2,
        min: 2,
        optional: true
    },
    'postN.result3D': {
        type: String,
        label: '3D Result',
        max: 3,
        min: 3,
        optional: true
    },
    postO: {
        type: Object,
        optional: true
    },
    'postO.result2D': {
        type: String,
        label: '2D Result',
        max: 2,
        min: 2,
        optional: true
    },
    'postO.result3D': {
        type: String,
        label: '3D Result',
        max: 3,
        min: 3,
        optional: true
    },
    postLo: {
        type: Object,
        optional: true
    },
    'postLo.result2D': {
        type: [String],
        label: '2D Result',
        optional: true
    },
    'postLo.result3D': {
        type: [String],
        label: '3D Result',
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
LT_Result.attachSchema(LT_Result.schema);


export const LT_ResultReact = new Mongo.Collection('lt_resultReact');
LT_ResultReact.schema = new SimpleSchema({
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

LT_ResultReact.attachSchema(LT_ResultReact.schema);

export const LT_ResultAudit = new Mongo.Collection('lt_resultAudit');
LT_ResultAudit.schema = new SimpleSchema({
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

LT_ResultAudit.attachSchema(LT_ResultAudit.schema);
