import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../../imports/libs/globalFn"
import _ from 'lodash'
import {t} from "../../../imports/libs/constant";

import {LT_Bet} from "../../../imports/collections/lt_bet"
import {LT_Agent} from "../../../imports/collections/lt_agent"
import {LT_Result} from "../../../imports/collections/lt_result";
import {LT_BetDetail} from "../../../imports/collections/lt_betDetail";
import numeral from "numeral";
import moment from "moment";

let secret = Meteor.settings.private.secret;
Meteor.methods({
    base_fetchDailyByDayReport(params, accessToken, language) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let data = {};

            let dataHtml = "";
            let self = params;

            let selector = {};

            let userDoc = Meteor.user();
            if (params.branch !== "" && params.branch.length > 0) {
                selector.branchId = {$in: self.branch || []};
            } else {
                selector.branchId = {$in: userDoc.branch || []};
            }


            if (params.agentId && params.agentId !== "" && params.agentId !== null) {
                selector._id = self.agentId;
            }

            let agentList = [];

            let allAgent = LT_Agent.find(selector).fetch();
            allAgent.forEach(function (obj) {
                agentList.push(obj._id);
            })


            let fDate = self.dateRange[0];
            let tDate = self.dateRange[1];

            let result = [];

            let labelShareRiel = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px'>" + t[language].riel + "</th>" : "";
            let labelShareDollar = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px'>" + t[language].dollar + "</th>" : "";
            let labelShareBaht = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px'>" + t[language].baht + "</th>" : "";

            dataHtml += "<table class='table table-report'><tr><th style='border: solid 1px'>" + t[language].date + "</th>"

                + labelShareRiel
                + labelShareDollar
                + labelShareBaht;


            let totalRiel = 0;
            let totalDollar = 0;
            let totalBaht = 0;

            let shareRiel = 0;
            let shareDollar = 0;
            let shareBaht = 0;
            if (agentList.length > 0) {
                agentList.forEach(function (agentId) {
                    let selectorEN = {};
                    let selectorENK = {};
                    let selectorT = {};
                    let selectorVat = {};

                    if (params.branch !== "" && params.branch.length > 0) {
                        selectorEN.branchId = {$in: self.branch || []};
                        selectorENK.branchId = {$in: self.branch || []};
                        selectorT.branchId = {$in: self.branch || []};
                        selectorVat.branchId = {$in: self.branch || []};
                    } else {
                        selectorEN.branchId = {$in: userDoc.branch || []};
                        selectorENK.branchId = {$in: userDoc.branch || []};
                        selectorT.branchId = {$in: userDoc.branch || []};
                        selectorVat.branchId = {$in: userDoc.branch || []};
                    }


                    selectorEN.agentId = agentId;
                    selectorENK.agentId = agentId;
                    selectorT.agentId = agentId;
                    selectorVat.agentId = agentId;


                    let currencyLength = !_.isArray(self.currency) ? 1 : self.currency.length;

                    let agentInfo = LT_Agent.findOne({_id: agentId});
                    data.agentName = agentInfo.name;

                    if (params.agentId === "" || params.agentId === null || !params.agentId) {
                        data.agentName = t[language].allAgent;

                    }
                    selectorEN.lossDate = {$gte: fDate, $lte: tDate};
                    selectorENK.lossDate = {$gte: fDate, $lte: tDate};
                    selectorT.lossDate = {$gte: fDate, $lte: tDate};
                    selectorVat.lossDate = {$gte: fDate, $lte: tDate};

                    selectorEN.time = {$in: ["E", "N", "V13"]};
                    selectorENK.time = {$in: ["EK", "NK"]};
                    selectorT.time = "T";
                    selectorVat.time = "Vat";


                    let resultEN = Meteor.call('lt_betGroupByDay', selectorEN);
                    let resultENK = Meteor.call('lt_betGroupByDay', selectorENK);
                    let resultT = Meteor.call('lt_betGroupByDay', selectorT);
                    let resultVat = Meteor.call('lt_betGroupByDay', selectorVat);

                    let locationVNInfo = Meteor.call('lt_findLocationById', agentInfo.locationVN, accessToken);
                    let locationKHInfo = Meteor.call('lt_findLocationById', agentInfo.locationKH, accessToken);
                    let locationTHInfo = Meteor.call('lt_findLocationById', agentInfo.locationTH, accessToken);
                    let locationVatInfo = Meteor.call('lt_findLocationById', agentInfo.locationVat, accessToken);

                    if (resultEN.length !== 0) {
                        resultEN.forEach(function (obj) {
                            totalRiel = (obj.totalRiel2D * locationVNInfo.add * locationVNInfo.offValue2D / 100 + obj.totalRiel3D * locationVNInfo.add * locationVNInfo.offValue3D / 100) - (obj.lossRiel2D * locationVNInfo.add * locationVNInfo.win2D + obj.lossRiel3D * locationVNInfo.add * locationVNInfo.win3D);
                            totalDollar = (obj.totalDollar2D * locationVNInfo.offValue2D / 100 + obj.totalDollar3D * locationVNInfo.offValue3D / 100) - (obj.lossDollar2D * locationVNInfo.win2D + obj.lossDollar3D * locationVNInfo.win3D);
                            totalBaht = (obj.totalBaht2D * locationVNInfo.offValue2D / 100 + obj.totalBaht3D * locationVNInfo.offValue3D / 100) - (obj.lossBaht2D * locationVNInfo.win2D + obj.lossBaht3D * locationVNInfo.win3D);

                            shareRiel = totalRiel * locationVNInfo.share / 100;
                            shareDollar = totalDollar * locationVNInfo.share / 100;
                            shareBaht = totalBaht * locationVNInfo.share / 100;

                            result.push({
                                country: "A",
                                date: moment(obj._id.date).format("DD-MM-YYYY") + " " + t[language].vietnam,
                                totalRiel: totalRiel,
                                totalDollar: totalDollar,
                                totalBaht: totalBaht,
                                shareRiel: shareRiel,
                                shareDollar: shareDollar,
                                shareBaht: shareBaht
                            })
                        })
                    }

                    if (resultENK.length !== 0) {
                        resultENK.forEach(function (obj) {
                            totalRiel = (obj.totalRiel2D * locationKHInfo.add * locationKHInfo.offValue2D / 100 + obj.totalRiel3D * locationKHInfo.add * locationKHInfo.offValue3D / 100) - (obj.lossRiel2D * locationKHInfo.add * locationKHInfo.win2D + obj.lossRiel3D * locationKHInfo.add * locationKHInfo.win3D);
                            totalDollar = (obj.totalDollar2D * locationKHInfo.offValue2D / 100 + obj.totalDollar3D * locationKHInfo.offValue3D / 100) - (obj.lossDollar2D * locationKHInfo.win2D + obj.lossDollar3D * locationKHInfo.win3D);
                            totalBaht = (obj.totalBaht2D * locationKHInfo.offValue2D / 100 + obj.totalBaht3D * locationKHInfo.offValue3D / 100) - (obj.lossBaht2D * locationKHInfo.win2D + obj.lossBaht3D * locationKHInfo.win3D);

                            shareRiel = totalRiel * locationKHInfo.share / 100;
                            shareDollar = totalDollar * locationKHInfo.share / 100;
                            shareBaht = totalBaht * locationKHInfo.share / 100;

                            result.push({
                                country: "C",
                                date: moment(obj._id.date).format("DD-MM-YYYY") + " " + t[language].khmer,
                                totalRiel: totalRiel,
                                totalDollar: totalDollar,
                                totalBaht: totalBaht,
                                shareRiel: shareRiel,
                                shareDollar: shareDollar,
                                shareBaht: shareBaht
                            })
                        })
                    }


                    if (resultT.length !== 0) {
                        resultT.forEach(function (obj) {
                            totalRiel = (obj.totalRiel2D * locationTHInfo.add * locationTHInfo.offValue2D / 100 + obj.totalRiel3D * locationTHInfo.add * locationTHInfo.offValue3D / 100 + obj.totalRielLer * locationTHInfo.add * locationTHInfo.offValueLer / 100 + obj.totalRielTot * locationTHInfo.add * locationTHInfo.offValueTot / 100) - (obj.lossRiel2D * locationTHInfo.add * locationTHInfo.win2D + obj.lossRiel3D * locationTHInfo.add * locationTHInfo.win3D + obj.lossRielLer * locationTHInfo.add * locationTHInfo.winLer + obj.lossRielTot * locationTHInfo.add * locationTHInfo.winTot);
                            totalDollar = (obj.totalDollar2D * locationTHInfo.offValue2D / 100 + obj.totalDollar3D * locationTHInfo.offValue3D / 100 + obj.totalDollarLer * locationTHInfo.offValueLer / 100 + obj.totalDollarTot * locationTHInfo.offValueTot / 100) - (obj.lossDollar2D * locationTHInfo.win2D + obj.lossDollar3D * locationTHInfo.win3D + obj.lossDollarLer * locationTHInfo.winLer + obj.lossDollarTot * locationTHInfo.winTot);
                            totalBaht = (obj.totalBaht2D * locationTHInfo.offValue2D / 100 + obj.totalBaht3D * locationTHInfo.offValue3D / 100 + obj.totalBahtLer * locationTHInfo.offValueLer / 100 + obj.totalBahtTot * locationTHInfo.offValueTot / 100) - (obj.lossBaht2D * locationTHInfo.win2D + obj.lossBaht3D * locationTHInfo.win3D + obj.lossBahtLer * locationTHInfo.winLer + obj.lossBahtTot * locationTHInfo.winTot);

                            shareRiel = totalRiel * locationTHInfo.share / 100;
                            shareDollar = totalDollar * locationTHInfo.share / 100;
                            shareBaht = totalBaht * locationTHInfo.share / 100;

                            result.push({
                                country: "B",
                                date: moment(obj._id.date).format("DD-MM-YYYY") + " " + t[language].thai,
                                totalRiel: totalRiel,
                                totalDollar: totalDollar,
                                totalBaht: totalBaht,
                                shareRiel: shareRiel,
                                shareDollar: shareDollar,
                                shareBaht: shareBaht
                            })
                        })
                    }

                    if (resultVat.length !== 0) {
                        resultVat.forEach(function (obj) {
                            totalRiel = (obj.totalRiel2D * locationVatInfo.add * locationVatInfo.offValue2D / 100 + obj.totalRiel3D * locationVatInfo.add * locationVatInfo.offValue3D / 100) - (obj.lossRiel2D * locationVatInfo.add * locationVatInfo.win2D + obj.lossRiel3D * locationVatInfo.add * locationVatInfo.win3D);
                            totalDollar = (obj.totalDollar2D * locationVatInfo.offValue2D / 100 + obj.totalDollar3D * locationVatInfo.offValue3D / 100) - (obj.lossDollar2D * locationVatInfo.win2D + obj.lossDollar3D * locationVatInfo.win3D);
                            totalBaht = (obj.totalBaht2D * locationVatInfo.offValue2D / 100 + obj.totalBaht3D * locationVatInfo.offValue3D / 100) - (obj.lossBaht2D * locationVatInfo.win2D + obj.lossBaht3D * locationVatInfo.win3D);

                            shareRiel = totalRiel * locationVatInfo.share / 100;
                            shareDollar = totalDollar * locationVatInfo.share / 100;
                            shareBaht = totalBaht * locationVatInfo.share / 100;

                            result.push({
                                country: "D",
                                date: moment(obj._id.date).format("DD-MM-YYYY") + " " + t[language].vathu,
                                totalRiel: totalRiel,
                                totalDollar: totalDollar,
                                totalBaht: totalBaht,
                                shareRiel: shareRiel,
                                shareDollar: shareDollar,
                                shareBaht: shareBaht
                            })
                        })
                    }

                })
            }

            let grandTotalRiel = 0;
            let grandTotalDollar = 0;
            let grandTotalBaht = 0;

            let grandShareRiel = 0;
            let grandShareDollar = 0;
            let grandShareBaht = 0;


            result.sort(compare);
            let resultFinal = [];
            result.reduce(function (key, val) {
                if (!key[val.date + val.country]) {
                    key[val.date + val.country] = {
                        country: val.country,
                        date: val.date,
                        totalRiel: val.totalRiel,
                        totalDollar: val.totalDollar,
                        totalBaht: val.totalBaht,
                        shareRiel: val.shareRiel,
                        shareDollar: val.shareDollar,
                        shareBaht: val.shareBaht
                    };
                    resultFinal.push(key[val.date + val.country]);
                } else {
                    key[val.date + val.country].totalRiel += val.totalRiel;
                    key[val.date + val.country].totalDollar += val.totalDollar;
                    key[val.date + val.country].totalBaht += val.totalBaht;
                    key[val.date + val.country].shareRiel += val.shareRiel;
                    key[val.date + val.country].shareDollar += val.shareDollar;
                    key[val.date + val.country].shareBaht += val.shareBaht;
                }
                return key;
            }, {});


            if (resultFinal.length > 0) {
                resultFinal.forEach(function (obj) {

                    grandTotalRiel += obj.totalRiel;
                    grandTotalDollar += obj.totalDollar;
                    grandTotalBaht += obj.totalBaht;

                    grandShareRiel += obj.shareRiel;
                    grandShareDollar += obj.shareDollar;
                    grandShareBaht += obj.shareBaht;


                    let valueShareRiel = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + formatNumberToSeperate(obj.shareRiel) + "</td>" : "";
                    let valueShareDollar = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + formatNumberToSeperate(obj.shareDollar) + "</td>" : "";
                    let valueShareBaht = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + formatNumberToSeperate(obj.shareBaht) + "</td>" : "";

                    let dateInfo = obj.country === "A" ? obj.date : "<b><font color= 'red'>" + obj.date + "</font></b>";

                    dataHtml += "<tr><td style='border-left: solid 1px;border-right: solid 1px;'>" + dateInfo + "</td>"
                        + valueShareRiel
                        + valueShareDollar
                        + valueShareBaht
                        + "</tr>"

                })


                let footerShareRiel = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandShareRiel) + "</th>" : "";
                let footerShareDollar = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandShareDollar) + "</th>" : "";
                let footerShareBaht = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandShareBaht) + "</th>" : "";


                dataHtml += "<tr><th style='border: solid 1px'>" + t[language].total + "</th>"
                    + footerShareRiel
                    + footerShareDollar
                    + footerShareBaht;
                dataHtml += "</table><footer></footer>";
            }

            data.dataHtml = dataHtml;
            return data;
        }
    }
})


function formatNumberToSeperate(val) {
    let data = "";
    if (val >= 0) {
        data = numeral(val).format('(0,0)');
    } else {
        data = "<font color='red'>" + numeral(val).format('(0,0)') + "</font>";
    }
    return data;
};

function compare(a, b) {
    if (a.date === b.date) {
        return (a.country < b.country) ? -1 : (a.country > b.country) ? 1 : 0;
    } else {
        return (a.date < b.date) ? -1 : 1;
    }
};