import {Mongo} from "meteor/mongo";

export const LT_Agent = new Mongo.Collection("lt_agent");
LT_Agent.schema = new SimpleSchema({
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
    gender: {
        type: String,
    },
    telephone: {
        type: String,
        label: "Telephone"
    },
    email: {
        type: String,
        optional: true
    },
    locationVN: {
        type: String,
        label: "Location"
    },
    locationKH: {
        type: String,
        label: "Location"
    },
    status: {
        type: Boolean,
        optional: true,
        defaultValue: true,
    },
    locationTH: {
        type: String,
        label: "Location"
    },
    locationVat: {
        type: String,
        label: "Location"
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
LT_Agent.attachSchema(LT_Agent.schema);


export const LT_AgentReact = new Mongo.Collection('lt_agentReact');
LT_AgentReact.schema = new SimpleSchema({
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

LT_AgentReact.attachSchema(LT_AgentReact.schema);

export const LT_AgentAudit = new Mongo.Collection('lt_agentAudit');
LT_AgentAudit.schema = new SimpleSchema({
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

LT_AgentAudit.attachSchema(LT_AgentAudit.schema);
