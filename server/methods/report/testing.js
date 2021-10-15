import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../../imports/libs/globalFn"
import _ from 'lodash'

import {Testing, TestingReact, TestingAudit} from "../../../imports/collections/testing"

let secret = Meteor.settings.private.secret;
Meteor.methods({
    base_fetchTestingReport(params, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let selector = {};
            let data = {};

            if (params.branch !== "" && params.branch.length > 0) {
                selector.branchId = {$in: params.branch || []};
            } else {
                let userDoc = Meteor.user();
                selector.branchId = {$in: userDoc.branch || []};
            }
            let dataList = Testing.find(selector).fetch();
            let dataHtml = "";
            dataList.forEach((obj, ind) => {
                dataHtml += `
                    <tr>
                        <td>${ind + 1}</td>
                        <td>${obj.name || ""}</td>
                        <td>${obj.phoneNumber || ""}</td>
                        <td>${obj.email || ""}</td>
                        <td>${obj.address || ""}</td>
                        <td>${obj.description || ""}</td>
                    </tr>
                `;
            })

            data.dataHtml = dataHtml;
            return data;
        }
    }
})
