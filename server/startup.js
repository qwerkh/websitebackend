import {Company} from "../imports/collections/company"
import {Meteor} from "meteor/meteor";

Meteor.startup(function () {
    if (Company.find().count() === 0) {
        Company.insert({name: "កូដរិដតិចណូឡូជី", latinName: "CodeRed Technology", shortName: "CRT"});
    }
})

