import {Mongo} from "meteor/mongo";

export const Company = new Mongo.Collection("company");
Company.schema = new SimpleSchema({

    name: {
        type: String
    },
    latinName: {
        type: String
    },
    shortName: {
        type: String
    },
    isPostTitle: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isPostTop: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    sum23: {
        type: Boolean,
        optional: true,
        defaultValue: false
    },
    parentName: {
        type: String,
        optional: true
    },
    latinParentName: {
        type: String,
        optional: true
    },
    directorName: {
        type: String,
        optional: true
    }
});
Company.attachSchema(Company.schema);

