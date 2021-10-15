import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base"
import momentTz from 'moment-timezone';
import "./methods/_index";
import "./methods/report/_index";
import "./api/index";
import "./publications/_index";

import "./account";
import "./startup";

momentTz.tz.setDefault("Asia/Bangkok");
import {JsonRoutes} from 'meteor/simple:json-routes';

const connectHandler = WebApp.connectHandlers;
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";

Meteor.startup(() => {
    // code to run on server at startup
    //Add User
    if (Meteor.users.find({}).count() === 0) {
        let users = JSON.parse(Assets.getText('user-account.json'));
        users.forEach((obj) => {
            let doc = {
                "username": obj.username,
                "email": obj.email,
                "password": obj.password,
                "profile": obj.profile,
                "roles": obj.roles
            }
            let userId = Accounts.createUser(doc);
        })
    }

    connectHandler.use(function (req, res, next) {
        // add allow origin
        res.setHeader('Access-Control-Allow-Origin', '*');

        // add headers
        res.setHeader('Access-Control-Allow-Headers', [
            'Accept',
            'Accept-Charset',
            'Accept-Encoding',
            'Accept-Language',
            'Accept-Datetime',
            'Authorization',
            'Cache-Control',
            'Connection',
            'Cookie',
            'Content-Length',
            'Content-MD5',
            'Content-Type',
            'Date',
            'User-Agent',
            'X-Requested-With',
            'token',
            'Origin'
        ].join(', '));
        return next();
    });

    const LISTS_METHODS = [
        'fetchUser',
        'insertUser',
        'fetchBranch',
        'insertBranch'
    ];

    DDPRateLimiter.addRule({
        name(name) {
            return LISTS_METHODS.includes(name);
        },
        // Rate limit per connection ID
        connectionId() {
            return true;
        }
    }, 10, 1000);

});
