import {Mongo} from "meteor/mongo";

export const Web_Product = new Mongo.Collection("web_product");
Web_Product.schema = new SimpleSchema({
    title: {
        type: Object,
        optional: true,
        blackbox: true
    },
    body: {
        type: Object,
        optional: true,
        blackbox: true
    },
    minPrice: {
        type: Number,
        decimal: true,
        optional: true
    },
    maxPrice: {
        type: Number,
        decimal: true,
        optional: true
    },
    currency: {
        type: String,
    },
    code: {
        type: String,
        optional:true
    },
    like: {
        type: Number,
        optional: true,
        defaultValue: 0
    },
    view: {
        type: Number,
        optional: true,
        defaultValue: 0
    },
    plantTypeId: {
        type: [String],
        optional: true
    },
    plantLifeStyleId: {
        type: [String],
        optional: true
    },
    plantGiftId: {
        type: [String],
        optional: true
    },
    plantRoomId: {
        type: [String],
        optional: true
    },
    size: {
        type: [String],
        optional: true
    },
    light: {
        type: [String],
        optional: true
    },
    care: {
        type: [String],
        optional: true
    },
    url: {
        type: String,
        optional: true
    },
    urlList: {
        type: [String],
        optional: true
    },

    viewDate: {
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
Web_Product.attachSchema(Web_Product.schema);


export const Web_ProductReact = new Mongo.Collection('web_productReact');
Web_ProductReact.schema = new SimpleSchema({
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

Web_ProductReact.attachSchema(Web_ProductReact.schema);

export const Web_ProductAudit = new Mongo.Collection('web_productAudit');
Web_ProductAudit.schema = new SimpleSchema({
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

Web_ProductAudit.attachSchema(Web_ProductAudit.schema);