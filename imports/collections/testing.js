import {Mongo} from "meteor/mongo";

export const Testing = new Mongo.Collection("testing");
Testing.schema = new SimpleSchema({

    name: {
        type: String
    },
    description: {
        type: String,
        optional: true
    },
    phoneNumber: {
        type: String,
        optional: true
    },
    email: {
        type: String,
        optional: true
    },
    provinceId: {
        type: String
    },
    districtId: {
        type: String
    },
    communeId: {
        type: String
    },
    villageId: {
        type: String
    },
    provinceName: {
        type: String,
        optional: true
    },
    districtName: {
        type: String,
        optional: true
    },
    communeName: {
        type: String,
        optional: true
    },
    villageName: {
        type: String,
        optional: true
    },
    homeStreetGroupNo: {
        type: String,
        optional: true
    },
    address: {
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
Testing.attachSchema(Testing.schema);


export const TestingReact = new Mongo.Collection('testingReact');
TestingReact.schema = new SimpleSchema({
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

TestingReact.attachSchema(TestingReact.schema);

export const TestingAudit = new Mongo.Collection('testingAudit');
TestingAudit.schema = new SimpleSchema({
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

TestingAudit.attachSchema(TestingAudit.schema);
