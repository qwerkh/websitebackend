import {Meteor} from 'meteor/meteor';

Tracker.autorun(() => {
    Meteor.subscribe('userLogin');
    Meteor.subscribe('exchangeActive');
});

Meteor.subscribe('company');



