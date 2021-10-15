import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../../imports/libs/globalFn"
import _ from 'lodash'
import {Constants, t} from "../../../imports/libs/constant";

import {LT_Bet} from "../../../imports/collections/lt_bet"
import {LT_Agent} from "../../../imports/collections/lt_agent"
import {LT_Result} from "../../../imports/collections/lt_result";
import {LT_BetDetail} from "../../../imports/collections/lt_betDetail";
import numeral from "numeral";
import {LT_Clear} from "../../../imports/collections/lt_clear";
import {Company} from "../../../imports/collections/company";

let secret = Meteor.settings.private.secret;
Meteor.methods({
    base_fetchQuickWinLossReport(params, accessToken, language, isOneColumn) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let companyDoc = Company.findOne();
            let data = {};
            let dataHtml = "";
            let self = params;
            let selectorE = {};
            let selectorEK = {};
            let selectorN = {};
            let selectorNK = {};
            let selectorV13 = {};
            let selectorT = {};
            let selectorVat = {};
            let currencyLength = !_.isArray(self.currency) ? 1 : self.currency.length;

            let labelStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px'>" + `${t[language].riel}` + "</th>" : "";
            let labelStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px' >" + `${t[language].dollar}` + "</th>" : "";
            let labelStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px' >" + `${t[language].baht}` + "</th>" : "";
            let labelStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px' >" + `${t[language].riel}` + "</th>" : "";
            let labelStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px' >" + `${t[language].dollar}` + "</th>" : "";
            let labelStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px'>" + `${t[language].baht}` + "</th>" : "";


            let labelStakeRielLer = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px'>" + `${t[language].riel}` + "</th>" : "";
            let labelStakeDollarLer = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px' >" + `${t[language].dollar}` + "</th>" : "";
            let labelStakeBahtLer = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px' >" + `${t[language].baht}` + "</th>" : "";
            let labelStakeRielTot = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px' >" + `${t[language].riel}` + "</th>" : "";
            let labelStakeDollarTot = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px' >" + `${t[language].dollar}` + "</th>" : "";
            let labelStakeBahtTot = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px'>" + `${t[language].baht}` + "</th>" : "";

            let labelLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px'>" + `${t[language].riel}` + "</th>" : "";
            let labelLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px'>" + `${t[language].dollar}` + "</th>" : "";
            let labelLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px'>" + `${t[language].baht}` + "</th>" : "";
            let labelLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px'>" + `${t[language].riel}` + "</th>" : "";
            let labelLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px'>" + `${t[language].dollar}` + "</th>" : "";
            let labelLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px' >" + `${t[language].baht}` + "</th>" : "";


            let labelLossRielLer = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px'>" + `${t[language].riel}` + "</th>" : "";
            let labelLossDollarLer = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px'>" + `${t[language].dollar}` + "</th>" : "";
            let labelLossBahtLer = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px'>" + `${t[language].baht}` + "</th>" : "";
            let labelLossRielTot = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px'>" + `${t[language].riel}` + "</th>" : "";
            let labelLossDollarTot = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px'>" + `${t[language].dollar}` + "</th>" : "";
            let labelLossBahtTot = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px' >" + `${t[language].baht}` + "</th>" : "";

            let labelStakeRielTotal = "";
            let labelStakeDollarTotal = "";
            let labelStakeBahtTotal = "";


            let labelTotal = "";

            if (companyDoc.sum23) {
                labelStakeRielTotal = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px' >" + `${t[language].riel}` + "</th>" : "";
                labelStakeDollarTotal = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px' >" + `${t[language].dollar}` + "</th>" : "";
                labelStakeBahtTotal = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px'>" + `${t[language].baht}` + "</th>" : "";

            }


            let userDoc = Meteor.user();

            selectorE.branch = self.branch;
            selectorEK.branch = self.branch;
            selectorN.branch = self.branch;
            selectorNK.branch = self.branch;
            selectorV13.branch = self.branch;
            selectorT.branch = self.branch;
            selectorVat.branch = self.branch;

            let agentName = "";

            let agentList = [];
            if (self.agentId === "") {
                let allAgent = LT_Agent.find().fetch();
                allAgent.forEach(function (obj) {
                    agentList.push(obj._id);
                })
            } else {
                if (!_.isArray(self.agentId)) {
                    agentList.push(self.agentId);

                } else {
                    self.agentId.forEach(function (obj) {
                        agentList.push(obj);
                    })
                }
            }
            let result = [];
            agentList.forEach(function (obj) {
                if (obj) {
                    selectorE.agentId = obj;
                    selectorEK.agentId = obj;
                    selectorN.agentId = obj;
                    selectorNK.agentId = obj;
                    selectorV13.agentId = obj;
                    selectorT.agentId = obj;
                    selectorVat.agentId = obj;

                    let agentInfo = LT_Agent.findOne({_id: obj});

                    agentName = agentInfo && agentInfo.name || "";
                    selectorE.date = self.date;
                    selectorEK.date = self.date;
                    selectorN.date = self.date;
                    selectorNK.date = self.date;
                    selectorV13.date = self.date;
                    selectorT.date = self.date;
                    selectorVat.date = self.date;

                    selectorE.time = "E";
                    selectorEK.time = "EK";
                    selectorN.time = "N";
                    selectorNK.time = "NK";
                    selectorV13.time = "V13";
                    selectorT.time = "T";
                    selectorVat.time = "Vat";

                    selectorE.page = "";
                    selectorEK.page = "";
                    selectorN.page = "";
                    selectorNK.page = "";
                    selectorV13.page = "";
                    selectorT.page = "";
                    selectorVat.page = "";

                    let resultE = [];
                    let resultEK = [];
                    let resultN = [];
                    let resultNK = [];
                    let resultV13 = [];
                    let resultT = [];
                    let resultVat = [];


                    let grandTotalRiel2D = 0;
                    let grandTotalRiel3D = 0;
                    let grandTotalRielLer = 0;
                    let grandTotalRielTot = 0;

                    let grandTotalDollar2D = 0;
                    let grandTotalDollar3D = 0;
                    let grandTotalDollarLer = 0;
                    let grandTotalDollarTot = 0;

                    let grandTotalBaht2D = 0;
                    let grandTotalBaht3D = 0;
                    let grandTotalBahtLer = 0;
                    let grandTotalBahtTot = 0;


                    //Win
                    let grandTotalWinRiel2D = 0;
                    let grandTotalWinRiel3D = 0;
                    let grandTotalWinRielLer = 0;
                    let grandTotalWinRielTot = 0;

                    let grandTotalWinDollar2D = 0;
                    let grandTotalWinDollar3D = 0;
                    let grandTotalWinDollarLer = 0;
                    let grandTotalWinDollarTot = 0;

                    let grandTotalWinBaht2D = 0;
                    let grandTotalWinBaht3D = 0;
                    let grandTotalWinBahtLer = 0;
                    let grandTotalWinBahtTot = 0;

                    if (self.type === "V") {
                        resultE = Meteor.call('base_fetchBetWithWinLossReport', selectorE, secret);
                        resultN = Meteor.call('base_fetchBetWithWinLossReport', selectorN, secret);
                        resultV13 = Meteor.call('base_fetchBetWithWinLossReport', selectorV13, secret);
                    }
                    if (self.type === "KH") {
                        resultEK = Meteor.call('base_fetchBetWithWinLossReport', selectorEK, secret);
                        resultNK = Meteor.call('base_fetchBetWithWinLossReport', selectorNK, secret);
                    }
                    if (self.type === "T") {
                        resultT = Meteor.call('base_fetchBetWithWinLossReport', selectorT, secret);
                    }
                    if (self.type === "Vat") {
                        resultVat = Meteor.call('base_fetchBetWithWinLossReport', selectorVat, secret);
                    }


                    let locationId = params.type === "V" ? agentInfo.locationVN : params.type === "T" ? agentInfo.locationTH : params.type === "Vat" ? agentInfo.locationVat : agentInfo.locationKH;
                    let location = Meteor.call('lt_findLocationById', locationId, accessToken);


                    let firstRow = ((currencyLength + (companyDoc.sum23 ? currencyLength : 0)) * 4) + 1;
                    let firstRowThai = (location.offValue2D === location.offValueLer ? (((currencyLength + (companyDoc.sum23 ? currencyLength : 0)) * 4) + 1) : (((currencyLength + (companyDoc.sum23 ? currencyLength : 0)) * 8) + 1));
                    let secondRow = (currencyLength * 2) + (companyDoc.sum23 ? currencyLength : 0);
                    let secondRowThai = (location.offValue2D === location.offValueLer ? currencyLength * 2 : currencyLength * 4) + (companyDoc.sum23 ? currencyLength : 0);
                    let thirdRow = currencyLength;

                    if (companyDoc.sum23) {
                        labelTotal = "<th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>" + t[language].total + "</th>";
                    }
                    //====================================================================
                    //Vietnam Evening
                    if (resultE && resultE.length !== 0) {
                        if (isOneColumn !== true) {
                            dataHtml += "<table class='table table-reportWinLoseMain'><tr><td>";
                        }
                    }

                    let updateCountFinal = 0;

                    if (resultE && resultE.length !== 0) {
                        let totalPerAgentRiel2D = 0;
                        let totalPerAgentDollar2D = 0;
                        let totalPerAgentBaht2D = 0;
                        let totalPerAgentRiel3D = 0;
                        let totalPerAgentDollar3D = 0;
                        let totalPerAgentBaht3D = 0;

                        let lossPerAgentRiel2D = 0;
                        let lossPerAgentDollar2D = 0;
                        let lossPerAgentBaht2D = 0;
                        let lossPerAgentRiel3D = 0;
                        let lossPerAgentDollar3D = 0;
                        let lossPerAgentBaht3D = 0;

                        dataHtml +=
                            "<table class='table table-report table-reportWinLose' style='border-collapse: collapse !important;'>" +
                            "<tr><th style='border: solid 1px'  colspan='" + firstRow + "' align='center'><b>" + agentName + "(" + `${t[language].eveningVietnam}` + ")-" + moment(self.date).format('DD/MM/YYYY') + "</b></th></tr>" +
                            "<tr><th rowspan='3' style='border: solid 1px' align='center'>No.</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'>" + `${t[language].turnover}` + "</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'>" + `${t[language].loss}` + "</th></tr>" +
                            "<tr><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th>" + labelTotal + "<th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th></tr>" +

                            "<tr>" +

                            labelStakeRiel2D +
                            labelStakeDollar2D +
                            labelStakeBaht2D +
                            labelStakeRiel3D +
                            labelStakeDollar3D +
                            labelStakeBaht3D +

                            labelStakeRielTotal +
                            labelStakeDollarTotal +
                            labelStakeBahtTotal +


                            labelLossRiel2D +
                            labelLossDollar2D +
                            labelLossBaht2D +
                            labelLossRiel3D +
                            labelLossDollar3D +
                            labelLossBaht3D +


                            "</tr>";
                        resultE.forEach(function (reE) {

                            let valueStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalRiel2D + "</b></font></td>" : "";
                            let valueStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalDollar2D + "</b></font></td>" : "";
                            let valueStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalBaht2D + "</b></font></td>" : "";
                            let valueStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalRiel3D + "</b></font></td>" : "";
                            let valueStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalDollar3D + "</b></font></td>" : "";
                            let valueStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalBaht3D + "</b></font></td>" : "";
                            let valueLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossRiel2D + "</font></td>" : "";
                            let valueLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossDollar2D + "</font></td>" : "";
                            let valueLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossBaht2D + "</font></td>" : "";
                            let valueLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossRiel3D + "</font></td>" : "";
                            let valueLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossDollar3D + "</font></td>" : "";
                            let valueLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossBaht3D + "</font></td>" : "";

                            let valueStakeRielTotal = "";
                            let valueStakeDollarTotal = "";
                            let valueStakeBahtTotal = "";
                                if (companyDoc.sum23) {
                                valueStakeRielTotal = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalRiel2D + reE.totalRiel3D) + "</b></font></td>" : "";
                                valueStakeDollarTotal = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalDollar2D + reE.totalDollar3D) + "</b></font></td>" : "";
                                valueStakeBahtTotal = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalBaht2D + reE.totalBaht3D) + "</b></font></td>" : "";

                                }


                            updateCountFinal += reE.updateCount;
                            if (reE.updateCount > 0) {
                                dataHtml += "<tr class='updateColor'>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + " [" + reE._id.headerPage + "]" +
                                    "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +

                                    valueStakeRielTotal +
                                    valueStakeDollarTotal +
                                    valueStakeBahtTotal +

                                    valueLossRiel2D +
                                    valueLossDollar2D +
                                    valueLossBaht2D +
                                    valueLossRiel3D +
                                    valueLossDollar3D +
                                    valueLossBaht3D +


                                    "</tr>";
                            } else {
                                dataHtml += "<tr>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + " [" + reE._id.headerPage + "]" + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +

                                    valueStakeRielTotal +
                                    valueStakeDollarTotal +
                                    valueStakeBahtTotal +

                                    valueLossRiel2D +
                                    valueLossDollar2D +
                                    valueLossBaht2D +
                                    valueLossRiel3D +
                                    valueLossDollar3D +
                                    valueLossBaht3D +


                                    "</tr>";
                            }
                            totalPerAgentRiel2D = totalPerAgentRiel2D + reE.totalRiel2D;
                            totalPerAgentDollar2D = totalPerAgentDollar2D + reE.totalDollar2D;
                            totalPerAgentBaht2D = totalPerAgentBaht2D + reE.totalBaht2D;
                            totalPerAgentRiel3D = totalPerAgentRiel3D + reE.totalRiel3D;
                            totalPerAgentDollar3D = totalPerAgentDollar3D + reE.totalDollar3D;
                            totalPerAgentBaht3D = totalPerAgentBaht3D + reE.totalBaht3D;

                            lossPerAgentRiel2D = lossPerAgentRiel2D + reE.lossRiel2D;
                            lossPerAgentDollar2D = lossPerAgentDollar2D + reE.lossDollar2D;
                            lossPerAgentBaht2D = lossPerAgentBaht2D + reE.lossBaht2D;
                            lossPerAgentRiel3D = lossPerAgentRiel3D + reE.lossRiel3D;
                            lossPerAgentDollar3D = lossPerAgentDollar3D + reE.lossDollar3D;
                            lossPerAgentBaht3D = lossPerAgentBaht3D + reE.lossBaht3D;

                        })
                        let footerStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel2D) + "</font></th>" : "";
                        let footerStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar2D) + "</font></th>" : "";
                        let footerStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht2D) + "</font></th>" : "";
                        let footerStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel3D) + "</font></th>" : "";
                        let footerStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar3D) + "</font></th>" : "";
                        let footerStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht3D) + "</font></th>" : "";
                        let footerLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red'>" + formatNumberToSeperate(lossPerAgentRiel2D) + "</font></th>" : "";
                        let footerLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentDollar2D) + "</font></th>" : "";
                        let footerLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentBaht2D) + "</font></th>" : "";
                        let footerLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentRiel3D) + "</font></th>" : "";
                        let footerLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentDollar3D) + "</font></th>" : "";
                        let footerLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentBaht3D) + "</font></th>" : "";

                        let footerStakeRielTotal = "";
                        let footerStakeDollarTotal = "";
                        let footerStakeBahtTotal = "";

                        if (companyDoc.sum23) {
                            footerStakeRielTotal = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel3D + totalPerAgentRiel2D) + "</font></th>" : "";
                            footerStakeDollarTotal = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar3D + totalPerAgentDollar2D) + "</font></th>" : "";
                            footerStakeBahtTotal = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht3D + totalPerAgentBaht2D) + "</font></th>" : "";

                             }

                        grandTotalRiel2D += totalPerAgentRiel2D;
                        grandTotalRiel3D += totalPerAgentRiel3D;

                        grandTotalDollar2D += totalPerAgentDollar2D;
                        grandTotalDollar3D += totalPerAgentDollar3D;

                        grandTotalBaht2D += totalPerAgentBaht2D;
                        grandTotalBaht3D += totalPerAgentBaht3D;


                        //Win
                        grandTotalWinRiel2D += lossPerAgentRiel2D;
                        grandTotalWinRiel3D += lossPerAgentRiel3D;

                        grandTotalWinDollar2D += lossPerAgentDollar2D;
                        grandTotalWinDollar3D += lossPerAgentDollar3D;

                        grandTotalWinBaht2D += lossPerAgentBaht2D;
                        grandTotalWinBaht3D += lossPerAgentBaht3D;

                        dataHtml += "<tr class='sumFooter'>" +
                            "<th style='border: solid 1px;' align='center';><font size='1'>TTL</font></th>" +
                            footerStakeRiel2D +
                            footerStakeDollar2D +
                            footerStakeBaht2D +
                            footerStakeRiel3D +
                            footerStakeDollar3D +
                            footerStakeBaht3D +

                            footerStakeRielTotal +
                            footerStakeDollarTotal +
                            footerStakeBahtTotal +

                            footerLossRiel2D +
                            footerLossDollar2D +
                            footerLossBaht2D +
                            footerLossRiel3D +
                            footerLossDollar3D +
                            footerLossBaht3D +

                                  "</tr>" + "</table>";

                    }


                    //Vietnam 13:00
                    if (resultV13 && resultV13.length !== 0 && resultE && resultE.length !== 0) {
                        if (isOneColumn !== true) {
                            dataHtml += "</td><td>";
                        }
                    } else if (resultV13 && resultV13.length !== 0 && resultE && resultE.length === 0) {
                        if (isOneColumn !== true) {
                            dataHtml += "<table class='table' ><tr><td>";
                        }
                    }


                    if (resultV13 && resultV13.length !== 0) {
                        let totalPerAgentRiel2D = 0;
                        let totalPerAgentDollar2D = 0;
                        let totalPerAgentBaht2D = 0;
                        let totalPerAgentRiel3D = 0;
                        let totalPerAgentDollar3D = 0;
                        let totalPerAgentBaht3D = 0;

                        let lossPerAgentRiel2D = 0;
                        let lossPerAgentDollar2D = 0;
                        let lossPerAgentBaht2D = 0;
                        let lossPerAgentRiel3D = 0;
                        let lossPerAgentDollar3D = 0;
                        let lossPerAgentBaht3D = 0;

                        dataHtml +=
                            "<table class='table table-report table-reportWinLose' style='border-collapse: collapse !important;'>" +
                            "<tr><th style='border: solid 1px'  colspan='" + firstRow + "' align='center'><b>" + agentName + "(" + `${t[language].V13}` + ")-" + moment(self.date).format('DD/MM/YYYY') + "</b></th></tr>" +
                            "<tr><th rowspan='3' style='border: solid 1px' align='center'>No.</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'>" + `${t[language].turnover}` + "</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'>" + `${t[language].loss}` + "</th></tr>" +
                            "<tr><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th>" + labelTotal + "<th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th></tr>" +

                            "<tr>" +

                            labelStakeRiel2D +
                            labelStakeDollar2D +
                            labelStakeBaht2D +
                            labelStakeRiel3D +
                            labelStakeDollar3D +
                            labelStakeBaht3D +

                            labelStakeRielTotal +
                            labelStakeDollarTotal +
                            labelStakeBahtTotal +

                            labelLossRiel2D +
                            labelLossDollar2D +
                            labelLossBaht2D +
                            labelLossRiel3D +
                            labelLossDollar3D +
                            labelLossBaht3D +


                            "</tr>";
                        resultV13.forEach(function (reV13) {

                            let valueStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reV13.totalRiel2D + "</b></font></td>" : "";
                            let valueStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reV13.totalDollar2D + "</b></font></td>" : "";
                            let valueStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reV13.totalBaht2D + "</b></font></td>" : "";
                            let valueStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reV13.totalRiel3D + "</b></font></td>" : "";
                            let valueStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reV13.totalDollar3D + "</b></font></td>" : "";
                            let valueStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reV13.totalBaht3D + "</b></font></td>" : "";
                            let valueLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reV13.lossRiel2D + "</font></td>" : "";
                            let valueLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reV13.lossDollar2D + "</font></td>" : "";
                            let valueLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reV13.lossBaht2D + "</font></td>" : "";
                            let valueLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reV13.lossRiel3D + "</font></td>" : "";
                            let valueLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reV13.lossDollar3D + "</font></td>" : "";
                            let valueLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reV13.lossBaht3D + "</font></td>" : "";

                            let valueStakeRielTotal = "";
                            let valueStakeDollarTotal = "";
                            let valueStakeBahtTotal = "";

                            if (companyDoc.sum23) {
                                valueStakeRielTotal = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reV13.totalRiel3D + reV13.totalRiel2D) + "</b></font></td>" : "";
                                valueStakeDollarTotal = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reV13.totalDollar3D + reV13.totalDollar2D) + "</b></font></td>" : "";
                                valueStakeBahtTotal = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reV13.totalBaht3D + reV13.totalBaht2D) + "</b></font></td>" : "";



                            }
                            updateCountFinal += reV13.updateCount;
                            if (reV13.updateCount > 0) {
                                dataHtml += "<tr class='updateColor'>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reV13._id.page + " [" + reE._id.headerPage + "]" + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +

                                    valueStakeRielTotal +
                                    valueStakeDollarTotal +
                                    valueStakeBahtTotal +

                                    valueLossRiel2D +
                                    valueLossDollar2D +
                                    valueLossBaht2D +
                                    valueLossRiel3D +
                                    valueLossDollar3D +
                                    valueLossBaht3D +



                                    "</tr>";
                            } else {
                                dataHtml += "<tr>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reV13._id.page + " [" + reV13._id.headerPage + "]" + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +

                                    valueStakeRielTotal +
                                    valueStakeDollarTotal +
                                    valueStakeBahtTotal +

                                    valueLossRiel2D +
                                    valueLossDollar2D +
                                    valueLossBaht2D +
                                    valueLossRiel3D +
                                    valueLossDollar3D +
                                    valueLossBaht3D +



                                    "</tr>";
                            }
                            totalPerAgentRiel2D = totalPerAgentRiel2D + reV13.totalRiel2D;
                            totalPerAgentDollar2D = totalPerAgentDollar2D + reV13.totalDollar2D;
                            totalPerAgentBaht2D = totalPerAgentBaht2D + reV13.totalBaht2D;
                            totalPerAgentRiel3D = totalPerAgentRiel3D + reV13.totalRiel3D;
                            totalPerAgentDollar3D = totalPerAgentDollar3D + reV13.totalDollar3D;
                            totalPerAgentBaht3D = totalPerAgentBaht3D + reV13.totalBaht3D;

                            lossPerAgentRiel2D = lossPerAgentRiel2D + reV13.lossRiel2D;
                            lossPerAgentDollar2D = lossPerAgentDollar2D + reV13.lossDollar2D;
                            lossPerAgentBaht2D = lossPerAgentBaht2D + reV13.lossBaht2D;
                            lossPerAgentRiel3D = lossPerAgentRiel3D + reV13.lossRiel3D;
                            lossPerAgentDollar3D = lossPerAgentDollar3D + reV13.lossDollar3D;
                            lossPerAgentBaht3D = lossPerAgentBaht3D + reV13.lossBaht3D;

                        })
                        let footerStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel2D) + "</font></th>" : "";
                        let footerStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar2D) + "</font></th>" : "";
                        let footerStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht2D) + "</font></th>" : "";
                        let footerStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel3D) + "</font></th>" : "";
                        let footerStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar3D) + "</font></th>" : "";
                        let footerStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht3D) + "</font></th>" : "";
                        let footerLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red'>" + formatNumberToSeperate(lossPerAgentRiel2D) + "</font></th>" : "";
                        let footerLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentDollar2D) + "</font></th>" : "";
                        let footerLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentBaht2D) + "</font></th>" : "";
                        let footerLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentRiel3D) + "</font></th>" : "";
                        let footerLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentDollar3D) + "</font></th>" : "";
                        let footerLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentBaht3D) + "</font></th>" : "";

                        let footerStakeRielTotal = "";
                        let footerStakeDollarTotal = "";
                        let footerStakeBahtTotal = "";

                        if (companyDoc.sum23) {
                            footerStakeRielTotal = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel3D + totalPerAgentRiel2D) + "</font></th>" : "";
                            footerStakeDollarTotal = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar3D + totalPerAgentDollar2D) + "</font></th>" : "";
                            footerStakeBahtTotal = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht3D + totalPerAgentBaht2D) + "</font></th>" : "";


                        }

                        grandTotalRiel2D += totalPerAgentRiel2D;
                        grandTotalRiel3D += totalPerAgentRiel3D;

                        grandTotalDollar2D += totalPerAgentDollar2D;
                        grandTotalDollar3D += totalPerAgentDollar3D;

                        grandTotalBaht2D += totalPerAgentBaht2D;
                        grandTotalBaht3D += totalPerAgentBaht3D;


                        //Win
                        grandTotalWinRiel2D += lossPerAgentRiel2D;
                        grandTotalWinRiel3D += lossPerAgentRiel3D;

                        grandTotalWinDollar2D += lossPerAgentDollar2D;
                        grandTotalWinDollar3D += lossPerAgentDollar3D;

                        grandTotalWinBaht2D += lossPerAgentBaht2D;
                        grandTotalWinBaht3D += lossPerAgentBaht3D;

                        dataHtml += "<tr class='sumFooter'>" +
                            "<th style='border: solid 1px;' align='center';><font size='1'>TTL</font></th>" +
                            footerStakeRiel2D +
                            footerStakeDollar2D +
                            footerStakeBaht2D +
                            footerStakeRiel3D +
                            footerStakeDollar3D +
                            footerStakeBaht3D +

                            footerStakeRielTotal +
                            footerStakeDollarTotal +
                            footerStakeBahtTotal +

                            footerLossRiel2D +
                            footerLossDollar2D +
                            footerLossBaht2D +
                            footerLossRiel3D +
                            footerLossDollar3D +
                            footerLossBaht3D +


                            "</tr>" + "</table>";

                    }


                    //Vietname Night
                    if (resultN && resultN.length !== 0 && (resultV13 && resultV13.length !== 0 || resultE.length !== 0)) {
                        if (isOneColumn !== true) {
                            dataHtml += "</td><td>";
                        }
                    } else if (resultN && resultN.length !== 0 && resultV13 && resultV13.length === 0) {
                        if (isOneColumn !== true) {
                            dataHtml += "<table class='table' ><tr><td>";
                        }
                    }


                    if (resultN && resultN.length !== 0) {
                        let totalPerAgentRiel2D = 0;
                        let totalPerAgentDollar2D = 0;
                        let totalPerAgentBaht2D = 0;
                        let totalPerAgentRiel3D = 0;
                        let totalPerAgentDollar3D = 0;
                        let totalPerAgentBaht3D = 0;

                        let lossPerAgentRiel2D = 0;
                        let lossPerAgentDollar2D = 0;
                        let lossPerAgentBaht2D = 0;
                        let lossPerAgentRiel3D = 0;
                        let lossPerAgentDollar3D = 0;
                        let lossPerAgentBaht3D = 0;

                        dataHtml += "<table class='table  table-report table-reportWinLose' style='border-collapse: collapse !important;'>" +
                            "<tr><th style='border: solid 1px'  colspan='" + firstRow + "' align='center'><b>" + agentName + "(" + `${t[language].nightVietnam}` + ")-" + moment(self.date).format('DD/MM/YYYY') + "</b></th></tr>" +
                            "<tr><th rowspan='3' style='border: solid 1px' align='center'>No.</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'>" + `${t[language].turnover}` + "</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'> " + `${t[language].loss}` + "</th></tr>" +
                            "<tr><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th>" + labelTotal + "<th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th></tr>" +
                            "<tr>" +

                            labelStakeRiel2D +
                            labelStakeDollar2D +
                            labelStakeBaht2D +
                            labelStakeRiel3D +
                            labelStakeDollar3D +
                            labelStakeBaht3D +

                            labelStakeRielTotal +
                            labelStakeDollarTotal +
                            labelStakeBahtTotal +

                            labelLossRiel2D +
                            labelLossDollar2D +
                            labelLossBaht2D +
                            labelLossRiel3D +
                            labelLossDollar3D +
                            labelLossBaht3D +
     "</tr>";


                        resultN.forEach(function (reE) {
                            let valueStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalRiel2D + "</b></font></td>" : "";
                            let valueStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalDollar2D + "</b></font></td>" : "";
                            let valueStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalBaht2D + "</b></font></td>" : "";
                            let valueStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalRiel3D + "</b></font></td>" : "";
                            let valueStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalDollar3D + "</b></font></td>" : "";
                            let valueStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalBaht3D + "</b></font></td>" : "";
                            let valueLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossRiel2D + "</font></td>" : "";
                            let valueLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossDollar2D + "</font></td>" : "";
                            let valueLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossBaht2D + "</font></td>" : "";
                            let valueLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossRiel3D + "</font></td>" : "";
                            let valueLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossDollar3D + "</font></td>" : "";
                            let valueLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossBaht3D + "</font></td>" : "";

                            let valueStakeRielTotal = "";
                            let valueStakeDollarTotal = "";
                            let valueStakeBahtTotal = "";


                            if (companyDoc.sum23) {
                                valueStakeRielTotal = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalRiel3D + reE.totalRiel2D) + "</b></font></td>" : "";
                                valueStakeDollarTotal = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalDollar3D + reE.totalDollar2D) + "</b></font></td>" : "";
                                valueStakeBahtTotal = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalBaht3D + reE.totalBaht2D) + "</b></font></td>" : "";


                            }
                            updateCountFinal += reE.updateCount;
                            if (reE.updateCount > 0) {
                                dataHtml += "<tr class='updateColor'>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + " [" + reE._id.headerPage + "]" + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +

                                    valueStakeRielTotal +
                                    valueStakeDollarTotal +
                                    valueStakeBahtTotal +

                                    valueLossRiel2D +
                                    valueLossDollar2D +
                                    valueLossBaht2D +
                                    valueLossRiel3D +
                                    valueLossDollar3D +
                                    valueLossBaht3D +



                                    "</tr>";
                            } else {
                                dataHtml += "<tr>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + " [" + reE._id.headerPage + "]" + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +

                                    valueStakeRielTotal +
                                    valueStakeDollarTotal +
                                    valueStakeBahtTotal +

                                    valueLossRiel2D +
                                    valueLossDollar2D +
                                    valueLossBaht2D +
                                    valueLossRiel3D +
                                    valueLossDollar3D +
                                    valueLossBaht3D +


                                    "</tr>";
                            }
                            totalPerAgentRiel2D = totalPerAgentRiel2D + reE.totalRiel2D;
                            totalPerAgentDollar2D = totalPerAgentDollar2D + reE.totalDollar2D;
                            totalPerAgentBaht2D = totalPerAgentBaht2D + reE.totalBaht2D;
                            totalPerAgentRiel3D = totalPerAgentRiel3D + reE.totalRiel3D;
                            totalPerAgentDollar3D = totalPerAgentDollar3D + reE.totalDollar3D;
                            totalPerAgentBaht3D = totalPerAgentBaht3D + reE.totalBaht3D;

                            lossPerAgentRiel2D = lossPerAgentRiel2D + reE.lossRiel2D;
                            lossPerAgentDollar2D = lossPerAgentDollar2D + reE.lossDollar2D;
                            lossPerAgentBaht2D = lossPerAgentBaht2D + reE.lossBaht2D;
                            lossPerAgentRiel3D = lossPerAgentRiel3D + reE.lossRiel3D;
                            lossPerAgentDollar3D = lossPerAgentDollar3D + reE.lossDollar3D;
                            lossPerAgentBaht3D = lossPerAgentBaht3D + reE.lossBaht3D;

                        })

                        let footerStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel2D) + "</font></th>" : "";
                        let footerStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar2D) + "</font></th>" : "";
                        let footerStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht2D) + "</font></th>" : "";
                        let footerStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel3D) + "</font></th>" : "";
                        let footerStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar3D) + "</font></th>" : "";
                        let footerStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht3D) + "</font></th>" : "";
                        let footerLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red'>" + formatNumberToSeperate(lossPerAgentRiel2D) + "</font></th>" : "";
                        let footerLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentDollar2D) + "</font></th>" : "";
                        let footerLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentBaht2D) + "</font></th>" : "";
                        let footerLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentRiel3D) + "</font></th>" : "";
                        let footerLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentDollar3D) + "</font></th>" : "";
                        let footerLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentBaht3D) + "</font></th>" : "";

                        let footerStakeRielTotal = "";
                        let footerStakeDollarTotal = "";
                        let footerStakeBahtTotal = "";


                        if (companyDoc.sum23) {
                            footerStakeRielTotal = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel3D + totalPerAgentRiel2D) + "</font></th>" : "";
                            footerStakeDollarTotal = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar3D + totalPerAgentDollar2D) + "</font></th>" : "";
                            footerStakeBahtTotal = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht3D + totalPerAgentBaht2D) + "</font></th>" : "";


                        }
                        grandTotalRiel2D += totalPerAgentRiel2D;
                        grandTotalRiel3D += totalPerAgentRiel3D;

                        grandTotalDollar2D += totalPerAgentDollar2D;
                        grandTotalDollar3D += totalPerAgentDollar3D;

                        grandTotalBaht2D += totalPerAgentBaht2D;
                        grandTotalBaht3D += totalPerAgentBaht3D;


                        //Win
                        grandTotalWinRiel2D += lossPerAgentRiel2D;
                        grandTotalWinRiel3D += lossPerAgentRiel3D;

                        grandTotalWinDollar2D += lossPerAgentDollar2D;
                        grandTotalWinDollar3D += lossPerAgentDollar3D;

                        grandTotalWinBaht2D += lossPerAgentBaht2D;
                        grandTotalWinBaht3D += lossPerAgentBaht3D;


                        dataHtml += "<tr class='sumFooter'>" +
                            "<th style='border: solid 1px;' align='center';><font size='1'>TTL</font></th>" +
                            footerStakeRiel2D +
                            footerStakeDollar2D +
                            footerStakeBaht2D +
                            footerStakeRiel3D +
                            footerStakeDollar3D +
                            footerStakeBaht3D +

                            footerStakeRielTotal +
                            footerStakeDollarTotal +
                            footerStakeBahtTotal +

                            footerLossRiel2D +
                            footerLossDollar2D +
                            footerLossBaht2D +
                            footerLossRiel3D +
                            footerLossDollar3D +
                            footerLossBaht3D +

                            "</tr>" + "</table>";
                    }

                    if (resultN && resultN.length !== 0) {
                        if (isOneColumn !== true) {
                            dataHtml += "</td>";
                        }
                    }
                    //================================Khmer===================================

                    //Khmer Evening
                    if (resultEK && resultEK.length !== 0) {
                        if (isOneColumn !== true) {
                            dataHtml += "<table class='table table-reportWinLoseMain'><tr><td>";
                        }
                    }

                    if (resultEK && resultEK.length !== 0) {
                        let totalPerAgentRiel2D = 0;
                        let totalPerAgentDollar2D = 0;
                        let totalPerAgentBaht2D = 0;
                        let totalPerAgentRiel3D = 0;
                        let totalPerAgentDollar3D = 0;
                        let totalPerAgentBaht3D = 0;

                        let lossPerAgentRiel2D = 0;
                        let lossPerAgentDollar2D = 0;
                        let lossPerAgentBaht2D = 0;
                        let lossPerAgentRiel3D = 0;
                        let lossPerAgentDollar3D = 0;
                        let lossPerAgentBaht3D = 0;

                        dataHtml +=
                            "<table class='table table-report table-reportWinLose' style='border-collapse: collapse !important;'>" +
                            "<tr><th style='border: solid 1px'  colspan='" + firstRow + "' align='center'><b>" + agentName + "(" + `${t[language].eveningKhmer}` + ")-" + moment(self.date).format('DD/MM/YYYY') + "</b></th></tr>" +
                            "<tr><th rowspan='3' style='border: solid 1px' align='center'>No.</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'>" + `${t[language].turnover}` + "</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'>" + `${t[language].loss}` + "</th></tr>" +
                            "<tr><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th>" + labelTotal + "<th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th></tr>" +

                            "<tr>" +

                            labelStakeRiel2D +
                            labelStakeDollar2D +
                            labelStakeBaht2D +
                            labelStakeRiel3D +
                            labelStakeDollar3D +
                            labelStakeBaht3D +

                            labelStakeRielTotal +
                            labelStakeDollarTotal +
                            labelStakeBahtTotal +

                            labelLossRiel2D +
                            labelLossDollar2D +
                            labelLossBaht2D +
                            labelLossRiel3D +
                            labelLossDollar3D +
                            labelLossBaht3D +


                            "</tr>";
                        resultEK.forEach(function (reE) {

                            let valueStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalRiel2D + "</b></font></td>" : "";
                            let valueStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalDollar2D + "</b></font></td>" : "";
                            let valueStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalBaht2D + "</b></font></td>" : "";
                            let valueStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalRiel3D + "</b></font></td>" : "";
                            let valueStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalDollar3D + "</b></font></td>" : "";
                            let valueStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalBaht3D + "</b></font></td>" : "";
                            let valueLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossRiel2D + "</font></td>" : "";
                            let valueLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossDollar2D + "</font></td>" : "";
                            let valueLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossBaht2D + "</font></td>" : "";
                            let valueLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossRiel3D + "</font></td>" : "";
                            let valueLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossDollar3D + "</font></td>" : "";
                            let valueLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossBaht3D + "</font></td>" : "";

                            let valueStakeRielTotal = "";
                            let valueStakeDollarTotal = "";
                            let valueStakeBahtTotal = "";


                            if (companyDoc.sum23) {
                                valueStakeRielTotal = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalRiel3D + reE.totalRiel2D) + "</b></font></td>" : "";
                                valueStakeDollarTotal = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalDollar3D + reE.totalDollar2D) + "</b></font></td>" : "";
                                valueStakeBahtTotal = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalBaht3D + reE.totalBaht2D) + "</b></font></td>" : "";


                            }

                            updateCountFinal += reE.updateCount;
                            if (reE.updateCount > 0) {
                                dataHtml += "<tr class='updateColor'>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + " [" + reE._id.headerPage + "]" + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +

                                    valueStakeRielTotal +
                                    valueStakeDollarTotal +
                                    valueStakeBahtTotal +

                                    valueLossRiel2D +
                                    valueLossDollar2D +
                                    valueLossBaht2D +
                                    valueLossRiel3D +
                                    valueLossDollar3D +
                                    valueLossBaht3D +



                                    "</tr>";
                            } else {
                                dataHtml += "<tr>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + " [" + reE._id.headerPage + "]" + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +

                                    valueStakeRielTotal +
                                    valueStakeDollarTotal +
                                    valueStakeBahtTotal +

                                    valueLossRiel2D +
                                    valueLossDollar2D +
                                    valueLossBaht2D +
                                    valueLossRiel3D +
                                    valueLossDollar3D +
                                    valueLossBaht3D +



                                    "</tr>";
                            }
                            totalPerAgentRiel2D = totalPerAgentRiel2D + reE.totalRiel2D;
                            totalPerAgentDollar2D = totalPerAgentDollar2D + reE.totalDollar2D;
                            totalPerAgentBaht2D = totalPerAgentBaht2D + reE.totalBaht2D;
                            totalPerAgentRiel3D = totalPerAgentRiel3D + reE.totalRiel3D;
                            totalPerAgentDollar3D = totalPerAgentDollar3D + reE.totalDollar3D;
                            totalPerAgentBaht3D = totalPerAgentBaht3D + reE.totalBaht3D;

                            lossPerAgentRiel2D = lossPerAgentRiel2D + reE.lossRiel2D;
                            lossPerAgentDollar2D = lossPerAgentDollar2D + reE.lossDollar2D;
                            lossPerAgentBaht2D = lossPerAgentBaht2D + reE.lossBaht2D;
                            lossPerAgentRiel3D = lossPerAgentRiel3D + reE.lossRiel3D;
                            lossPerAgentDollar3D = lossPerAgentDollar3D + reE.lossDollar3D;
                            lossPerAgentBaht3D = lossPerAgentBaht3D + reE.lossBaht3D;

                        })
                        let footerStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel2D) + "</font></th>" : "";
                        let footerStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar2D) + "</font></th>" : "";
                        let footerStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht2D) + "</font></th>" : "";
                        let footerStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel3D) + "</font></th>" : "";
                        let footerStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar3D) + "</font></th>" : "";
                        let footerStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht3D) + "</font></th>" : "";
                        let footerLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red'>" + formatNumberToSeperate(lossPerAgentRiel2D) + "</font></th>" : "";
                        let footerLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentDollar2D) + "</font></th>" : "";
                        let footerLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentBaht2D) + "</font></th>" : "";
                        let footerLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentRiel3D) + "</font></th>" : "";
                        let footerLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentDollar3D) + "</font></th>" : "";
                        let footerLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentBaht3D) + "</font></th>" : "";


                        let footerStakeRielTotal = "";
                        let footerStakeDollarTotal = "";
                        let footerStakeBahtTotal = "";


                        if (companyDoc.sum23) {
                            footerStakeRielTotal = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel3D + totalPerAgentRiel2D) + "</font></th>" : "";
                            footerStakeDollarTotal = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar3D + totalPerAgentDollar2D) + "</font></th>" : "";
                            footerStakeBahtTotal = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht3D + totalPerAgentBaht2D) + "</font></th>" : "";

                        }

                        grandTotalRiel2D += totalPerAgentRiel2D;
                        grandTotalRiel3D += totalPerAgentRiel3D;

                        grandTotalDollar2D += totalPerAgentDollar2D;
                        grandTotalDollar3D += totalPerAgentDollar3D;

                        grandTotalBaht2D += totalPerAgentBaht2D;
                        grandTotalBaht3D += totalPerAgentBaht3D;


                        //Win
                        grandTotalWinRiel2D += lossPerAgentRiel2D;
                        grandTotalWinRiel3D += lossPerAgentRiel3D;

                        grandTotalWinDollar2D += lossPerAgentDollar2D;
                        grandTotalWinDollar3D += lossPerAgentDollar3D;

                        grandTotalWinBaht2D += lossPerAgentBaht2D;
                        grandTotalWinBaht3D += lossPerAgentBaht3D;

                        dataHtml += "<tr class='sumFooter'>" +
                            "<th style='border: solid 1px;' align='center';><font size='1'>TTL</font></th>" +
                            footerStakeRiel2D +
                            footerStakeDollar2D +
                            footerStakeBaht2D +
                            footerStakeRiel3D +
                            footerStakeDollar3D +
                            footerStakeBaht3D +

                            footerStakeRielTotal +
                            footerStakeDollarTotal +
                            footerStakeBahtTotal +

                            footerLossRiel2D +
                            footerLossDollar2D +
                            footerLossBaht2D +
                            footerLossRiel3D +
                            footerLossDollar3D +
                            footerLossBaht3D +

                            "</tr>" + "</table>";

                    }


                    //Khmer Night
                    if (resultNK && resultNK.length !== 0 && resultEK && resultEK.length !== 0) {
                        if (isOneColumn !== true) {
                            dataHtml += "</td><td>";
                        }
                    } else if (resultNK && resultNK.length !== 0 && resultEK && resultEK.length === 0) {
                        if (isOneColumn !== true) {
                            dataHtml += "<table class='table' ><tr><td>";
                        }
                    }


                    if (resultNK && resultNK.length !== 0) {
                        let totalPerAgentRiel2D = 0;
                        let totalPerAgentDollar2D = 0;
                        let totalPerAgentBaht2D = 0;
                        let totalPerAgentRiel3D = 0;
                        let totalPerAgentDollar3D = 0;
                        let totalPerAgentBaht3D = 0;

                        let lossPerAgentRiel2D = 0;
                        let lossPerAgentDollar2D = 0;
                        let lossPerAgentBaht2D = 0;
                        let lossPerAgentRiel3D = 0;
                        let lossPerAgentDollar3D = 0;
                        let lossPerAgentBaht3D = 0;

                        dataHtml += "<table class='table  table-report table-reportWinLose' style='border-collapse: collapse !important;'>" +
                            "<tr><th style='border: solid 1px'  colspan='" + firstRow + "' align='center'><b>" + agentName + "(" + `${t[language].nightKhmer}` + ")-" + moment(self.date).format('DD/MM/YYYY') + "</b></th></tr>" +
                            "<tr><th rowspan='3' style='border: solid 1px' align='center'>No.</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'>" + `${t[language].turnover}` + "</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'> " + `${t[language].loss}` + "</th></tr>" +
                            "<tr><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th>" + labelTotal + "<th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th></tr>" +
                            "<tr>" +

                            labelStakeRiel2D +
                            labelStakeDollar2D +
                            labelStakeBaht2D +
                            labelStakeRiel3D +
                            labelStakeDollar3D +
                            labelStakeBaht3D +

                            labelStakeRielTotal +
                            labelStakeDollarTotal +
                            labelStakeBahtTotal +

                            labelLossRiel2D +
                            labelLossDollar2D +
                            labelLossBaht2D +
                            labelLossRiel3D +
                            labelLossDollar3D +
                            labelLossBaht3D +


                            "</tr>";


                        resultNK.forEach(function (reE) {
                            let valueStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalRiel2D + "</b></font></td>" : "";
                            let valueStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalDollar2D + "</b></font></td>" : "";
                            let valueStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalBaht2D + "</b></font></td>" : "";
                            let valueStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalRiel3D + "</b></font></td>" : "";
                            let valueStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalDollar3D + "</b></font></td>" : "";
                            let valueStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalBaht3D + "</b></font></td>" : "";
                            let valueLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossRiel2D + "</font></td>" : "";
                            let valueLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossDollar2D + "</font></td>" : "";
                            let valueLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossBaht2D + "</font></td>" : "";
                            let valueLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossRiel3D + "</font></td>" : "";
                            let valueLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossDollar3D + "</font></td>" : "";
                            let valueLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossBaht3D + "</font></td>" : "";

                            let valueStakeRielTotal = "";
                            let valueStakeDollarTotal = "";
                            let valueStakeBahtTotal = "";

                            if (companyDoc.sum23) {
                                valueStakeRielTotal = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalRiel3D + reE.totalRiel2D) + "</b></font></td>" : "";
                                valueStakeDollarTotal = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalDollar3D + reE.totalDollar2D) + "</b></font></td>" : "";
                                valueStakeBahtTotal = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalBaht3D + reE.totalBaht2D) + "</b></font></td>" : "";


                            }

                            updateCountFinal += reE.updateCount;
                            if (reE.updateCount > 0) {
                                dataHtml += "<tr class='updateColor'>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + " [" + reE._id.headerPage + "]" + "</td>" +
                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +

                                    valueStakeRielTotal +
                                    valueStakeDollarTotal +
                                    valueStakeBahtTotal +

                                    valueLossRiel2D +
                                    valueLossDollar2D +
                                    valueLossBaht2D +
                                    valueLossRiel3D +
                                    valueLossDollar3D +
                                    valueLossBaht3D +



                                    "</tr>";
                            } else {
                                dataHtml += "<tr>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + " [" + reE._id.headerPage + "]" + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +

                                    valueStakeRielTotal +
                                    valueStakeDollarTotal +
                                    valueStakeBahtTotal +

                                    valueLossRiel2D +
                                    valueLossDollar2D +
                                    valueLossBaht2D +
                                    valueLossRiel3D +
                                    valueLossDollar3D +
                                    valueLossBaht3D +


                                    "</tr>";
                            }
                            totalPerAgentRiel2D = totalPerAgentRiel2D + reE.totalRiel2D;
                            totalPerAgentDollar2D = totalPerAgentDollar2D + reE.totalDollar2D;
                            totalPerAgentBaht2D = totalPerAgentBaht2D + reE.totalBaht2D;
                            totalPerAgentRiel3D = totalPerAgentRiel3D + reE.totalRiel3D;
                            totalPerAgentDollar3D = totalPerAgentDollar3D + reE.totalDollar3D;
                            totalPerAgentBaht3D = totalPerAgentBaht3D + reE.totalBaht3D;

                            lossPerAgentRiel2D = lossPerAgentRiel2D + reE.lossRiel2D;
                            lossPerAgentDollar2D = lossPerAgentDollar2D + reE.lossDollar2D;
                            lossPerAgentBaht2D = lossPerAgentBaht2D + reE.lossBaht2D;
                            lossPerAgentRiel3D = lossPerAgentRiel3D + reE.lossRiel3D;
                            lossPerAgentDollar3D = lossPerAgentDollar3D + reE.lossDollar3D;
                            lossPerAgentBaht3D = lossPerAgentBaht3D + reE.lossBaht3D;

                        })

                        let footerStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel2D) + "</font></th>" : "";
                        let footerStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar2D) + "</font></th>" : "";
                        let footerStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht2D) + "</font></th>" : "";
                        let footerStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel3D) + "</font></th>" : "";
                        let footerStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar3D) + "</font></th>" : "";
                        let footerStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht3D) + "</font></th>" : "";
                        let footerLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red'>" + formatNumberToSeperate(lossPerAgentRiel2D) + "</font></th>" : "";
                        let footerLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentDollar2D) + "</font></th>" : "";
                        let footerLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentBaht2D) + "</font></th>" : "";
                        let footerLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentRiel3D) + "</font></th>" : "";
                        let footerLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentDollar3D) + "</font></th>" : "";
                        let footerLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentBaht3D) + "</font></th>" : "";

                        let footerStakeRielTotal = "";
                        let footerStakeDollarTotal = "";
                        let footerStakeBahtTotal = "";


                        if (companyDoc.sum23) {
                            footerStakeRielTotal = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel3D + totalPerAgentRiel2D) + "</font></th>" : "";
                            footerStakeDollarTotal = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar3D + totalPerAgentDollar2D) + "</font></th>" : "";
                            footerStakeBahtTotal = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht3D + totalPerAgentBaht2D) + "</font></th>" : "";

                        }

                        grandTotalRiel2D += totalPerAgentRiel2D;
                        grandTotalRiel3D += totalPerAgentRiel3D;

                        grandTotalDollar2D += totalPerAgentDollar2D;
                        grandTotalDollar3D += totalPerAgentDollar3D;

                        grandTotalBaht2D += totalPerAgentBaht2D;
                        grandTotalBaht3D += totalPerAgentBaht3D;


                        //Win
                        grandTotalWinRiel2D += lossPerAgentRiel2D;
                        grandTotalWinRiel3D += lossPerAgentRiel3D;

                        grandTotalWinDollar2D += lossPerAgentDollar2D;
                        grandTotalWinDollar3D += lossPerAgentDollar3D;

                        grandTotalWinBaht2D += lossPerAgentBaht2D;
                        grandTotalWinBaht3D += lossPerAgentBaht3D;


                        dataHtml += "<tr class='sumFooter'>" +
                            "<th style='border: solid 1px;' align='center';><font size='1'>TTL</font></th>" +
                            footerStakeRiel2D +
                            footerStakeDollar2D +
                            footerStakeBaht2D +
                            footerStakeRiel3D +
                            footerStakeDollar3D +
                            footerStakeBaht3D +

                            footerStakeRielTotal +
                            footerStakeDollarTotal +
                            footerStakeBahtTotal +

                            footerLossRiel2D +
                            footerLossDollar2D +
                            footerLossBaht2D +
                            footerLossRiel3D +
                            footerLossDollar3D +
                            footerLossBaht3D +


                            "</tr>" + "</table>";
                    }

                    if (resultNK && resultNK.length !== 0) {
                        if (isOneColumn !== true) {
                            dataHtml += "</td>";
                        }
                    }

                    //================================Thai====================================

                    if (location.offValue2D === location.offValueLer) {
                        if (resultT && resultT.length !== 0) {
                            let totalPerAgentRiel2D = 0;
                            let totalPerAgentDollar2D = 0;
                            let totalPerAgentBaht2D = 0;
                            let totalPerAgentRiel3D = 0;
                            let totalPerAgentDollar3D = 0;
                            let totalPerAgentBaht3D = 0;

                            let totalPerAgentRielLer = 0;
                            let totalPerAgentDollarLer = 0;
                            let totalPerAgentBahtLer = 0;
                            let totalPerAgentRielTot = 0;
                            let totalPerAgentDollarTot = 0;
                            let totalPerAgentBahtTot = 0;

                            let lossPerAgentRiel2D = 0;
                            let lossPerAgentDollar2D = 0;
                            let lossPerAgentBaht2D = 0;
                            let lossPerAgentRiel3D = 0;
                            let lossPerAgentDollar3D = 0;
                            let lossPerAgentBaht3D = 0;

                            let lossPerAgentRielLer = 0;
                            let lossPerAgentDollarLer = 0;
                            let lossPerAgentBahtLer = 0;
                            let lossPerAgentRielTot = 0;
                            let lossPerAgentDollarTot = 0;
                            let lossPerAgentBahtTot = 0;


                            dataHtml +=
                                "<table class='table table-report' style='border-collapse: collapse !important;'>" +
                                "<tr><th style='border: solid 1px'  colspan='" + firstRowThai + "' align='center'><b>" + agentName + "(" + `${t[language].thai}` + ")-" + moment(self.date).format('DD/MM/YYYY') + "</b></th></tr>" +
                                "<tr><th rowspan='3' style='border: solid 1px' align='center'>No.</th><th style='border: solid 1px' colspan='" + secondRowThai + "' align='center'>" + `${t[language].turnover}` + "</th><th style='border: solid 1px' colspan='" + secondRowThai + "' align='center'> " + `${t[language].loss}` + "</th></tr>" +
                                "<tr><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th>" + labelTotal + "<th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th></tr>" +
                                "<tr>" +

                                labelStakeRiel2D +
                                labelStakeDollar2D +
                                labelStakeBaht2D +
                                labelStakeRiel3D +
                                labelStakeDollar3D +
                                labelStakeBaht3D +

                                labelStakeRielTotal +
                                labelStakeDollarTotal +
                                labelStakeBahtTotal +

                                labelLossRiel2D +
                                labelLossDollar2D +
                                labelLossBaht2D +
                                labelLossRiel3D +
                                labelLossDollar3D +
                                labelLossBaht3D +




                                "</tr>";


                            resultT.forEach(function (reE) {
                                let valueStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalRiel2D + reE.totalRielLer) + "</b></font></td>" : "";
                                let valueStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalDollar2D + reE.totalDollarLer) + "</b></font></td>" : "";
                                let valueStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalBaht2D + reE.totalBahtLer) + "</b></font></td>" : "";
                                let valueStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalRiel3D + reE.totalRielTot) + "</b></font></td>" : "";
                                let valueStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalDollar3D + reE.totalDollarTot) + "</b></font></td>" : "";
                                let valueStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalBaht3D + reE.totalBahtTot) + "</b></font></td>" : "";


                                let valueLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + (reE.lossRiel2D + reE.lossRielLer) + "</font></td>" : "";
                                let valueLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + (reE.lossDollar2D + reE.lossDollarLer) + "</font></td>" : "";
                                let valueLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + (reE.lossBaht2D + reE.lossBahtLer) + "</font></td>" : "";
                                let valueLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + (reE.lossRiel3D + reE.lossRielTot) + "</font></td>" : "";
                                let valueLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + (reE.lossDollar3D + reE.lossDollarTot) + "</font></td>" : "";
                                let valueLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + (reE.lossBaht3D + reE.lossBahtTot) + "</font></td>" : "";

                                let valueStakeRielTotal = "";
                                let valueStakeDollarTotal = "";
                                let valueStakeBahtTotal = "";


                                if (companyDoc.sum23) {

                                    valueStakeRielTotal = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalRiel3D + reE.totalRiel2D + reE.totalRielTot + reE.totalRielLer) + "</b></font></td>" : "";
                                    valueStakeDollarTotal = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalDollar3D + reE.totalDollar2D + reE.totalDollarTot + reE.totalDollarLer) + "</b></font></td>" : "";
                                    valueStakeBahtTotal = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalBaht3D + reE.totalBaht3D + reE.totalBahtTot + reE.totalBahtLer) + "</b></font></td>" : "";


                                }

                                updateCountFinal += reE.updateCount;
                                if (reE.updateCount > 0) {
                                    dataHtml += "<tr class='updateColor'>" +
                                        "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + " [" + reE._id.headerPage + "]" + "</td>" +

                                        valueStakeRiel2D +
                                        valueStakeDollar2D +
                                        valueStakeBaht2D +
                                        valueStakeRiel3D +
                                        valueStakeDollar3D +
                                        valueStakeBaht3D +

                                        valueStakeRielTotal +
                                        valueStakeDollarTotal +
                                        valueStakeBahtTotal +


                                        valueLossRiel2D +
                                        valueLossDollar2D +
                                        valueLossBaht2D +
                                        valueLossRiel3D +
                                        valueLossDollar3D +
                                        valueLossBaht3D +



                                        "</tr>";
                                } else {
                                    dataHtml += "<tr>" +
                                        "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + " [" + reE._id.headerPage + "]" + "</td>" +

                                        valueStakeRiel2D +
                                        valueStakeDollar2D +
                                        valueStakeBaht2D +
                                        valueStakeRiel3D +
                                        valueStakeDollar3D +
                                        valueStakeBaht3D +

                                        valueStakeRielTotal +
                                        valueStakeDollarTotal +
                                        valueStakeBahtTotal +

                                        valueLossRiel2D +
                                        valueLossDollar2D +
                                        valueLossBaht2D +
                                        valueLossRiel3D +
                                        valueLossDollar3D +
                                        valueLossBaht3D +



                                        "</tr>";
                                }

                                totalPerAgentRiel2D = totalPerAgentRiel2D + reE.totalRiel2D;
                                totalPerAgentDollar2D = totalPerAgentDollar2D + reE.totalDollar2D;
                                totalPerAgentBaht2D = totalPerAgentBaht2D + reE.totalBaht2D;
                                totalPerAgentRiel3D = totalPerAgentRiel3D + reE.totalRiel3D;
                                totalPerAgentDollar3D = totalPerAgentDollar3D + reE.totalDollar3D;
                                totalPerAgentBaht3D = totalPerAgentBaht3D + reE.totalBaht3D;

                                totalPerAgentRielLer = totalPerAgentRielLer + reE.totalRielLer;
                                totalPerAgentDollarLer = totalPerAgentDollarLer + reE.totalDollarLer;
                                totalPerAgentBahtLer = totalPerAgentBahtLer + reE.totalBahtLer;
                                totalPerAgentRielTot = totalPerAgentRielTot + reE.totalRielTot;
                                totalPerAgentDollarTot = totalPerAgentDollarTot + reE.totalDollarTot;
                                totalPerAgentBahtTot = totalPerAgentBahtTot + reE.totalBahtTot;

                                lossPerAgentRiel2D = lossPerAgentRiel2D + reE.lossRiel2D;
                                lossPerAgentDollar2D = lossPerAgentDollar2D + reE.lossDollar2D;
                                lossPerAgentBaht2D = lossPerAgentBaht2D + reE.lossBaht2D;
                                lossPerAgentRiel3D = lossPerAgentRiel3D + reE.lossRiel3D;
                                lossPerAgentDollar3D = lossPerAgentDollar3D + reE.lossDollar3D;
                                lossPerAgentBaht3D = lossPerAgentBaht3D + reE.lossBaht3D;

                                lossPerAgentRielLer = lossPerAgentRielLer + reE.lossRielLer;
                                lossPerAgentDollarLer = lossPerAgentDollarLer + reE.lossDollarLer;
                                lossPerAgentBahtLer = lossPerAgentBahtLer + reE.lossBahtLer;
                                lossPerAgentRielTot = lossPerAgentRielTot + reE.lossRielTot;
                                lossPerAgentDollarTot = lossPerAgentDollarTot + reE.lossDollarTot;
                                lossPerAgentBahtTot = lossPerAgentBahtTot + reE.lossBahtTot;

                            })


                            let footerStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel2D + totalPerAgentRielLer) + "</font></th>" : "";
                            let footerStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar2D + totalPerAgentDollarLer) + "</font></th>" : "";
                            let footerStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht2D + totalPerAgentBahtLer) + "</font></th>" : "";
                            let footerStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel3D + totalPerAgentRielTot) + "</font></th>" : "";
                            let footerStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar3D + totalPerAgentDollarTot) + "</font></th>" : "";
                            let footerStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht3D + totalPerAgentBahtTot) + "</font></th>" : "";


                            let footerLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red'>" + formatNumberToSeperate(lossPerAgentRiel2D + lossPerAgentRielLer) + "</font></th>" : "";
                            let footerLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentDollar2D + lossPerAgentDollarLer) + "</font></th>" : "";
                            let footerLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentBaht2D + lossPerAgentBahtLer) + "</font></th>" : "";
                            let footerLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentRiel3D + lossPerAgentRielTot) + "</font></th>" : "";
                            let footerLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentDollar3D + lossPerAgentDollarTot) + "</font></th>" : "";
                            let footerLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentBaht3D + lossPerAgentBahtTot) + "</font></th>" : "";

                            let footerStakeRielTotal = "";
                            let footerStakeDollarTotal = "";
                            let footerStakeBahtTotal = "";



                            if (companyDoc.sum23) {
                                footerStakeRielTotal = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel3D + totalPerAgentRiel2D + totalPerAgentRielTot + totalPerAgentRielLer) + "</font></th>" : "";
                                footerStakeDollarTotal = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar3D + totalPerAgentDollar2D + totalPerAgentDollarTot + totalPerAgentDollarLer) + "</font></th>" : "";
                                footerStakeBahtTotal = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht3D + totalPerAgentBaht2D + totalPerAgentBahtTot + totalPerAgentBahtLer) + "</font></th>" : "";


                            }

                            grandTotalRiel2D += totalPerAgentRiel2D;
                            grandTotalRiel3D += totalPerAgentRiel3D;
                            grandTotalRielLer += totalPerAgentRielLer;
                            grandTotalRielTot += totalPerAgentRielTot;

                            grandTotalDollar2D += totalPerAgentDollar2D;
                            grandTotalDollar3D += totalPerAgentDollar3D;
                            grandTotalDollarLer += totalPerAgentDollarLer;
                            grandTotalDollarTot += totalPerAgentDollarTot;

                            grandTotalBaht2D += totalPerAgentBaht2D;
                            grandTotalBaht3D += totalPerAgentBaht3D;
                            grandTotalBahtLer += totalPerAgentBahtLer;
                            grandTotalBahtTot += totalPerAgentBahtTot;

                            //Win
                            grandTotalWinRiel2D += lossPerAgentRiel2D;
                            grandTotalWinRiel3D += lossPerAgentRiel3D;
                            grandTotalWinRielLer += lossPerAgentRielLer;
                            grandTotalWinRielTot += lossPerAgentRielTot;

                            grandTotalWinDollar2D += lossPerAgentDollar2D;
                            grandTotalWinDollar3D += lossPerAgentDollar3D;
                            grandTotalWinDollarLer += lossPerAgentDollarLer;
                            grandTotalWinDollarTot += lossPerAgentDollarTot;

                            grandTotalWinBaht2D += lossPerAgentBaht2D;
                            grandTotalWinBaht3D += lossPerAgentBaht3D;
                            grandTotalWinBahtLer += lossPerAgentBahtLer;
                            grandTotalWinBahtTot += lossPerAgentBahtTot;

                            dataHtml += "<tr class='sumFooter'>" +
                                "<th style='border: solid 1px;' align='center'; ><font size='1'>TTL</font></th>" +
                                footerStakeRiel2D +
                                footerStakeDollar2D +
                                footerStakeBaht2D +
                                footerStakeRiel3D +
                                footerStakeDollar3D +
                                footerStakeBaht3D +

                                footerStakeRielTotal +
                                footerStakeDollarTotal +
                                footerStakeBahtTotal +


                                footerLossRiel2D +
                                footerLossDollar2D +
                                footerLossBaht2D +
                                footerLossRiel3D +
                                footerLossDollar3D +
                                footerLossBaht3D;
                        }
                    } else {
                        if (resultT && resultT.length !== 0) {
                            let totalPerAgentRiel2D = 0;
                            let totalPerAgentDollar2D = 0;
                            let totalPerAgentBaht2D = 0;
                            let totalPerAgentRiel3D = 0;
                            let totalPerAgentDollar3D = 0;
                            let totalPerAgentBaht3D = 0;

                            let totalPerAgentRielLer = 0;
                            let totalPerAgentDollarLer = 0;
                            let totalPerAgentBahtLer = 0;
                            let totalPerAgentRielTot = 0;
                            let totalPerAgentDollarTot = 0;
                            let totalPerAgentBahtTot = 0;

                            let lossPerAgentRiel2D = 0;
                            let lossPerAgentDollar2D = 0;
                            let lossPerAgentBaht2D = 0;
                            let lossPerAgentRiel3D = 0;
                            let lossPerAgentDollar3D = 0;
                            let lossPerAgentBaht3D = 0;

                            let lossPerAgentRielLer = 0;
                            let lossPerAgentDollarLer = 0;
                            let lossPerAgentBahtLer = 0;
                            let lossPerAgentRielTot = 0;
                            let lossPerAgentDollarTot = 0;
                            let lossPerAgentBahtTot = 0;


                            dataHtml +=
                                "<table class='table table-report' style='border-collapse: collapse !important;'>" +
                                "<tr><th style='border: solid 1px'  colspan='" + firstRowThai + "' align='center'><b>" + agentName + "(" + `${t[language].thai}` + ")-" + moment(self.date).format('DD/MM/YYYY') + "</b></th></tr>" +
                                "<tr><th rowspan='3' style='border: solid 1px' align='center'>No.</th><th style='border: solid 1px' colspan='" + secondRowThai + "' align='center'>" + `${t[language].turnover}` + "</th><th style='border: solid 1px' colspan='" + secondRowThai + "' align='center'> " + `${t[language].loss}` + "</th></tr>" +
                                "<tr><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>លើ</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>តូត</th>" + labelTotal + "<th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>លើ</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>តូត</th></tr>" +
                                "<tr>" +

                                labelStakeRiel2D +
                                labelStakeDollar2D +
                                labelStakeBaht2D +
                                labelStakeRiel3D +
                                labelStakeDollar3D +
                                labelStakeBaht3D +

                                labelStakeRielLer +
                                labelStakeDollarLer +
                                labelStakeBahtLer +
                                labelStakeRielTot +
                                labelStakeDollarTot +
                                labelStakeBahtTot +

                                labelStakeRielTotal +
                                labelStakeDollarTotal +
                                labelStakeBahtTotal +

                                labelLossRiel2D +
                                labelLossDollar2D +
                                labelLossBaht2D +
                                labelLossRiel3D +
                                labelLossDollar3D +
                                labelLossBaht3D +

                                labelLossRielLer +
                                labelLossDollarLer +
                                labelLossBahtLer +
                                labelLossRielTot +
                                labelLossDollarTot +
                                labelLossBahtTot +



                                "</tr>";


                            resultT.forEach(function (reE) {
                                let valueStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalRiel2D + "</b></font></td>" : "";
                                let valueStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalDollar2D + "</b></font></td>" : "";
                                let valueStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalBaht2D + "</b></font></td>" : "";
                                let valueStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalRiel3D + "</b></font></td>" : "";
                                let valueStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalDollar3D + "</b></font></td>" : "";
                                let valueStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalBaht3D + "</b></font></td>" : "";

                                let valueStakeRielLer = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalRielLer + "</b></font></td>" : "";
                                let valueStakeDollarLer = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalDollarLer + "</b></font></td>" : "";
                                let valueStakeBahtLer = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalBahtLer + "</b></font></td>" : "";
                                let valueStakeRielTot = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalRielTot + "</b></font></td>" : "";
                                let valueStakeDollarTot = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalDollarTot + "</b></font></td>" : "";
                                let valueStakeBahtTot = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalBahtTot + "</b></font></td>" : "";

                                let valueLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossRiel2D + "</font></td>" : "";
                                let valueLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossDollar2D + "</font></td>" : "";
                                let valueLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossBaht2D + "</font></td>" : "";
                                let valueLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossRiel3D + "</font></td>" : "";
                                let valueLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossDollar3D + "</font></td>" : "";
                                let valueLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossBaht3D + "</font></td>" : "";


                                let valueLossRielLer = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossRielLer + "</font></td>" : "";
                                let valueLossDollarLer = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossDollarLer + "</font></td>" : "";
                                let valueLossBahtLer = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossBahtLer + "</font></td>" : "";
                                let valueLossRielTot = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossRielTot + "</font></td>" : "";
                                let valueLossDollarTot = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossDollarTot + "</font></td>" : "";
                                let valueLossBahtTot = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossBahtTot + "</font></td>" : "";

                                let valueStakeRielTotal = "";
                                let valueStakeDollarTotal = "";
                                let valueStakeBahtTotal = "";

                                if (companyDoc.sum23) {
                                    valueStakeRielTotal = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalRiel3D + reE.totalRiel2D + reE.totalRielTot + reE.totalRielLer) + "</b></font></td>" : "";
                                    valueStakeDollarTotal = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalDollar3D + reE.totalDollar2D + reE.totalDollarTot + reE.totalDollarLer) + "</b></font></td>" : "";
                                    valueStakeBahtTotal = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalBaht3D + reE.totalBaht2D + reE.totalBahtTot + reE.totalBahtLer) + "</b></font></td>" : "";


                                }

                                updateCountFinal += reE.updateCount;
                                if (reE.updateCount > 0) {
                                    dataHtml += "<tr class='updateColor'>" +
                                        "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + " [" + reE._id.headerPage + "]" + "</td>" +

                                        valueStakeRiel2D +
                                        valueStakeDollar2D +
                                        valueStakeBaht2D +
                                        valueStakeRiel3D +
                                        valueStakeDollar3D +
                                        valueStakeBaht3D +

                                        valueStakeRielLer +
                                        valueStakeDollarLer +
                                        valueStakeBahtLer +
                                        valueStakeRielTot +
                                        valueStakeDollarTot +
                                        valueStakeBahtTot +

                                        valueStakeRielTotal +
                                        valueStakeDollarTotal +
                                        valueStakeBahtTotal +

                                        valueLossRiel2D +
                                        valueLossDollar2D +
                                        valueLossBaht2D +
                                        valueLossRiel3D +
                                        valueLossDollar3D +
                                        valueLossBaht3D +

                                        valueLossRielLer +
                                        valueLossDollarLer +
                                        valueLossBahtLer +
                                        valueLossRielTot +
                                        valueLossDollarTot +
                                        valueLossBahtTot +



                                        "</tr>";
                                } else {
                                    dataHtml += "<tr>" +
                                        "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + " [" + reE._id.headerPage + "]" + "</td>" +

                                        valueStakeRiel2D +
                                        valueStakeDollar2D +
                                        valueStakeBaht2D +
                                        valueStakeRiel3D +
                                        valueStakeDollar3D +
                                        valueStakeBaht3D +

                                        valueStakeRielLer +
                                        valueStakeDollarLer +
                                        valueStakeBahtLer +
                                        valueStakeRielTot +
                                        valueStakeDollarTot +
                                        valueStakeBahtTot +

                                        valueStakeRielTotal +
                                        valueStakeDollarTotal +
                                        valueStakeBahtTotal +

                                        valueLossRiel2D +
                                        valueLossDollar2D +
                                        valueLossBaht2D +
                                        valueLossRiel3D +
                                        valueLossDollar3D +
                                        valueLossBaht3D +

                                        valueLossRielLer +
                                        valueLossDollarLer +
                                        valueLossBahtLer +
                                        valueLossRielTot +
                                        valueLossDollarTot +
                                        valueLossBahtTot +


                                        "</tr>";
                                }

                                totalPerAgentRiel2D = totalPerAgentRiel2D + reE.totalRiel2D;
                                totalPerAgentDollar2D = totalPerAgentDollar2D + reE.totalDollar2D;
                                totalPerAgentBaht2D = totalPerAgentBaht2D + reE.totalBaht2D;
                                totalPerAgentRiel3D = totalPerAgentRiel3D + reE.totalRiel3D;
                                totalPerAgentDollar3D = totalPerAgentDollar3D + reE.totalDollar3D;
                                totalPerAgentBaht3D = totalPerAgentBaht3D + reE.totalBaht3D;

                                totalPerAgentRielLer = totalPerAgentRielLer + reE.totalRielLer;
                                totalPerAgentDollarLer = totalPerAgentDollarLer + reE.totalDollarLer;
                                totalPerAgentBahtLer = totalPerAgentBahtLer + reE.totalBahtLer;
                                totalPerAgentRielTot = totalPerAgentRielTot + reE.totalRielTot;
                                totalPerAgentDollarTot = totalPerAgentDollarTot + reE.totalDollarTot;
                                totalPerAgentBahtTot = totalPerAgentBahtTot + reE.totalBahtTot;

                                lossPerAgentRiel2D = lossPerAgentRiel2D + reE.lossRiel2D;
                                lossPerAgentDollar2D = lossPerAgentDollar2D + reE.lossDollar2D;
                                lossPerAgentBaht2D = lossPerAgentBaht2D + reE.lossBaht2D;
                                lossPerAgentRiel3D = lossPerAgentRiel3D + reE.lossRiel3D;
                                lossPerAgentDollar3D = lossPerAgentDollar3D + reE.lossDollar3D;
                                lossPerAgentBaht3D = lossPerAgentBaht3D + reE.lossBaht3D;

                                lossPerAgentRielLer = lossPerAgentRielLer + reE.lossRielLer;
                                lossPerAgentDollarLer = lossPerAgentDollarLer + reE.lossDollarLer;
                                lossPerAgentBahtLer = lossPerAgentBahtLer + reE.lossBahtLer;
                                lossPerAgentRielTot = lossPerAgentRielTot + reE.lossRielTot;
                                lossPerAgentDollarTot = lossPerAgentDollarTot + reE.lossDollarTot;
                                lossPerAgentBahtTot = lossPerAgentBahtTot + reE.lossBahtTot;

                            })


                            let footerStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel2D) + "</font></th>" : "";
                            let footerStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar2D) + "</font></th>" : "";
                            let footerStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht2D) + "</font></th>" : "";
                            let footerStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel3D) + "</font></th>" : "";
                            let footerStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar3D) + "</font></th>" : "";
                            let footerStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht3D) + "</font></th>" : "";


                            let footerStakeRielLer = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRielLer) + "</font></th>" : "";
                            let footerStakeDollarLer = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollarLer) + "</font></th>" : "";
                            let footerStakeBahtLer = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBahtLer) + "</font></th>" : "";
                            let footerStakeRielTot = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRielTot) + "</font></th>" : "";
                            let footerStakeDollarTot = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollarTot) + "</font></th>" : "";
                            let footerStakeBahtTot = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBahtTot) + "</font></th>" : "";


                            let footerLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red'>" + formatNumberToSeperate(lossPerAgentRiel2D) + "</font></th>" : "";
                            let footerLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentDollar2D) + "</font></th>" : "";
                            let footerLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentBaht2D) + "</font></th>" : "";
                            let footerLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentRiel3D) + "</font></th>" : "";
                            let footerLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentDollar3D) + "</font></th>" : "";
                            let footerLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentBaht3D) + "</font></th>" : "";


                            let footerLossRielLer = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red'>" + formatNumberToSeperate(lossPerAgentRielLer) + "</font></th>" : "";
                            let footerLossDollarLer = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentDollarLer) + "</font></th>" : "";
                            let footerLossBahtLer = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentBahtLer) + "</font></th>" : "";
                            let footerLossRielTot = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentRielTot) + "</font></th>" : "";
                            let footerLossDollarTot = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentDollarTot) + "</font></th>" : "";
                            let footerLossBahtTot = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentBahtTot) + "</font></th>" : "";


                            let footerStakeRielTotal = "";
                            let footerStakeDollarTotal = "";
                            let footerStakeBahtTotal = "";


                            if (companyDoc.sum23) {
                                footerStakeRielTotal = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel3D + totalPerAgentRiel2D + totalPerAgentRielLer + totalPerAgentRielTot) + "</font></th>" : "";
                                footerStakeDollarTotal = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar3D + totalPerAgentDollar2D + totalPerAgentDollarTot + totalPerAgentDollarLer) + "</font></th>" : "";
                                footerStakeBahtTotal = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht3D + totalPerAgentBaht2D + totalPerAgentBahtTot + totalPerAgentBahtLer) + "</font></th>" : "";


                            }

                            grandTotalRiel2D += totalPerAgentRiel2D;
                            grandTotalRiel3D += totalPerAgentRiel3D;
                            grandTotalRielLer += totalPerAgentRielLer;
                            grandTotalRielTot += totalPerAgentRielTot;

                            grandTotalDollar2D += totalPerAgentDollar2D;
                            grandTotalDollar3D += totalPerAgentDollar3D;
                            grandTotalDollarLer += totalPerAgentDollarLer;
                            grandTotalDollarTot += totalPerAgentDollarTot;

                            grandTotalBaht2D += totalPerAgentBaht2D;
                            grandTotalBaht3D += totalPerAgentBaht3D;
                            grandTotalBahtLer += totalPerAgentBahtLer;
                            grandTotalBahtTot += totalPerAgentBahtTot;

                            //Win
                            grandTotalWinRiel2D += lossPerAgentRiel2D;
                            grandTotalWinRiel3D += lossPerAgentRiel3D;
                            grandTotalWinRielLer += lossPerAgentRielLer;
                            grandTotalWinRielTot += lossPerAgentRielTot;

                            grandTotalWinDollar2D += lossPerAgentDollar2D;
                            grandTotalWinDollar3D += lossPerAgentDollar3D;
                            grandTotalWinDollarLer += lossPerAgentDollarLer;
                            grandTotalWinDollarTot += lossPerAgentDollarTot;

                            grandTotalWinBaht2D += lossPerAgentBaht2D;
                            grandTotalWinBaht3D += lossPerAgentBaht3D;
                            grandTotalWinBahtLer += lossPerAgentBahtLer;
                            grandTotalWinBahtTot += lossPerAgentBahtTot;

                            dataHtml += "<tr class='sumFooter'>" +
                                "<th style='border: solid 1px;' align='center'; ><font size='1'>TTL</font></th>" +
                                footerStakeRiel2D +
                                footerStakeDollar2D +
                                footerStakeBaht2D +
                                footerStakeRiel3D +
                                footerStakeDollar3D +
                                footerStakeBaht3D +

                                footerStakeRielLer +
                                footerStakeDollarLer +
                                footerStakeBahtLer +
                                footerStakeRielTot +
                                footerStakeDollarTot +
                                footerStakeBahtTot +


                                footerStakeRielTotal +
                                footerStakeDollarTotal +
                                footerStakeBahtTotal +


                                footerLossRiel2D +
                                footerLossDollar2D +
                                footerLossBaht2D +
                                footerLossRiel3D +
                                footerLossDollar3D +
                                footerLossBaht3D +

                                footerLossRielLer +
                                footerLossDollarLer +
                                footerLossBahtLer +
                                footerLossRielTot +
                                footerLossDollarTot +
                                footerLossBahtTot;
                        }
                    }

                    //================================Vat====================================
                    if (resultVat && resultVat.length !== 0) {
                        let totalPerAgentRiel2D = 0;
                        let totalPerAgentDollar2D = 0;
                        let totalPerAgentBaht2D = 0;
                        let totalPerAgentRiel3D = 0;
                        let totalPerAgentDollar3D = 0;
                        let totalPerAgentBaht3D = 0;

                        let lossPerAgentRiel2D = 0;
                        let lossPerAgentDollar2D = 0;
                        let lossPerAgentBaht2D = 0;
                        let lossPerAgentRiel3D = 0;
                        let lossPerAgentDollar3D = 0;
                        let lossPerAgentBaht3D = 0;


                        dataHtml +=
                            "<table class='table table-report' style='border-collapse: collapse !important;'>" +
                            "<tr><th style='border: solid 1px'  colspan='" + firstRow + "' align='center'><b>" + agentName + "(" + `${t[language].vathu}` + ")-" + moment(self.date).format('DD/MM/YYYY') + "</b></th></tr>" +
                            "<tr><th rowspan='3' style='border: solid 1px' align='center'>No.</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'>" + `${t[language].turnover}` + "</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'> " + `${t[language].loss}` + "</th></tr>" +
                            "<tr><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th>" + labelTotal + "<th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th></tr>" +
                            "<tr>" +

                            labelStakeRiel2D +
                            labelStakeDollar2D +
                            labelStakeBaht2D +
                            labelStakeRiel3D +
                            labelStakeDollar3D +
                            labelStakeBaht3D +

                            labelStakeRielTotal +
                            labelStakeDollarTotal +
                            labelStakeBahtTotal +

                            labelLossRiel2D +
                            labelLossDollar2D +
                            labelLossBaht2D +
                            labelLossRiel3D +
                            labelLossDollar3D +
                            labelLossBaht3D +

                            "</tr>";


                        resultVat.forEach(function (reE) {
                            let valueStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalRiel2D + "</b></font></td>" : "";
                            let valueStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalDollar2D + "</b></font></td>" : "";
                            let valueStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalBaht2D + "</b></font></td>" : "";
                            let valueStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalRiel3D + "</b></font></td>" : "";
                            let valueStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalDollar3D + "</b></font></td>" : "";
                            let valueStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalBaht3D + "</b></font></td>" : "";
                            let valueLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossRiel2D + "</font></td>" : "";
                            let valueLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossDollar2D + "</font></td>" : "";
                            let valueLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossBaht2D + "</font></td>" : "";
                            let valueLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossRiel3D + "</font></td>" : "";
                            let valueLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossDollar3D + "</font></td>" : "";
                            let valueLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossBaht3D + "</font></td>" : "";

                            let valueStakeRielTotal = "";
                            let valueStakeDollarTotal = "";
                            let valueStakeBahtTotal = "";


                            if (companyDoc.sum23) {
                                valueStakeRielTotal = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalRiel3D + reE.totalRiel2D) + "</b></font></td>" : "";
                                valueStakeDollarTotal = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalDollar3D + reE.totalDollar2D) + "</b></font></td>" : "";
                                valueStakeBahtTotal = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + (reE.totalBaht3D + reE.totalBaht2D) + "</b></font></td>" : "";


                            }
                            updateCountFinal += reE.updateCount;
                            if (reE.updateCount > 0) {
                                dataHtml += "<tr class='updateColor'>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + " [" + reE._id.headerPage + "]" + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +

                                    valueStakeRielTotal +
                                    valueStakeDollarTotal +
                                    valueStakeBahtTotal +

                                    valueLossRiel2D +
                                    valueLossDollar2D +
                                    valueLossBaht2D +
                                    valueLossRiel3D +
                                    valueLossDollar3D +
                                    valueLossBaht3D +


                                    "</tr>";
                            } else {
                                dataHtml += "<tr>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + " [" + reE._id.headerPage + "]" + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +

                                    valueStakeRielTotal +
                                    valueStakeDollarTotal +
                                    valueStakeBahtTotal +

                                    valueLossRiel2D +
                                    valueLossDollar2D +
                                    valueLossBaht2D +
                                    valueLossRiel3D +
                                    valueLossDollar3D +
                                    valueLossBaht3D +



                                    "</tr>";
                            }

                            totalPerAgentRiel2D = totalPerAgentRiel2D + reE.totalRiel2D;
                            totalPerAgentDollar2D = totalPerAgentDollar2D + reE.totalDollar2D;
                            totalPerAgentBaht2D = totalPerAgentBaht2D + reE.totalBaht2D;
                            totalPerAgentRiel3D = totalPerAgentRiel3D + reE.totalRiel3D;
                            totalPerAgentDollar3D = totalPerAgentDollar3D + reE.totalDollar3D;
                            totalPerAgentBaht3D = totalPerAgentBaht3D + reE.totalBaht3D;

                            lossPerAgentRiel2D = lossPerAgentRiel2D + reE.lossRiel2D;
                            lossPerAgentDollar2D = lossPerAgentDollar2D + reE.lossDollar2D;
                            lossPerAgentBaht2D = lossPerAgentBaht2D + reE.lossBaht2D;
                            lossPerAgentRiel3D = lossPerAgentRiel3D + reE.lossRiel3D;
                            lossPerAgentDollar3D = lossPerAgentDollar3D + reE.lossDollar3D;
                            lossPerAgentBaht3D = lossPerAgentBaht3D + reE.lossBaht3D;

                        })


                        let footerStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel2D) + "</font></th>" : "";
                        let footerStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar2D) + "</font></th>" : "";
                        let footerStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht2D) + "</font></th>" : "";
                        let footerStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel3D) + "</font></th>" : "";
                        let footerStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar3D) + "</font></th>" : "";
                        let footerStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht3D) + "</font></th>" : "";
                        let footerLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red'>" + formatNumberToSeperate(lossPerAgentRiel2D) + "</font></th>" : "";
                        let footerLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentDollar2D) + "</font></th>" : "";
                        let footerLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentBaht2D) + "</font></th>" : "";
                        let footerLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentRiel3D) + "</font></th>" : "";
                        let footerLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentDollar3D) + "</font></th>" : "";
                        let footerLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + formatNumberToSeperate(lossPerAgentBaht3D) + "</font></th>" : "";

                        let footerStakeRielTotal = "";
                        let footerStakeDollarTotal = "";
                        let footerStakeBahtTotal = "";

                        if (companyDoc.sum23) {
                            footerStakeRielTotal = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentRiel3D+totalPerAgentRiel2D) + "</font></th>" : "";
                            footerStakeDollarTotal = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentDollar3D+totalPerAgentDollar2D) + "</font></th>" : "";
                            footerStakeBahtTotal = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + formatNumberToSeperate(totalPerAgentBaht3D+totalPerAgentBaht2D) + "</font></th>" : "";


                        }

                        grandTotalRiel2D += totalPerAgentRiel2D;
                        grandTotalRiel3D += totalPerAgentRiel3D;

                        grandTotalDollar2D += totalPerAgentDollar2D;
                        grandTotalDollar3D += totalPerAgentDollar3D;

                        grandTotalBaht2D += totalPerAgentBaht2D;
                        grandTotalBaht3D += totalPerAgentBaht3D;

                        //Win
                        grandTotalWinRiel2D += lossPerAgentRiel2D;
                        grandTotalWinRiel3D += lossPerAgentRiel3D;

                        grandTotalWinDollar2D += lossPerAgentDollar2D;
                        grandTotalWinDollar3D += lossPerAgentDollar3D;

                        grandTotalWinBaht2D += lossPerAgentBaht2D;
                        grandTotalWinBaht3D += lossPerAgentBaht3D;

                        dataHtml += "<tr class='sumFooter'>" +
                            "<th style='border: solid 1px;' align='center'; ><font size='1'>TTL</font></th>" +
                            footerStakeRiel2D +
                            footerStakeDollar2D +
                            footerStakeBaht2D +
                            footerStakeRiel3D +
                            footerStakeDollar3D +
                            footerStakeBaht3D +

                            footerStakeRielTotal +
                            footerStakeDollarTotal +
                            footerStakeBahtTotal +

                            footerLossRiel2D +
                            footerLossDollar2D +
                            footerLossBaht2D +
                            footerLossRiel3D +
                            footerLossDollar3D +
                            footerLossBaht3D;
                    }

                    dataHtml += "</tr></table>"


                    if ((resultE && resultE.length !== 0) || (resultN && resultN.length !== 0) || (resultT && resultT.length !== 0) || (resultVat && resultVat.length !== 0) || (resultEK && resultEK.length !== 0) || (resultNK && resultNK.length !== 0) || (resultV13 && resultV13.length !== 0)) {

                        let netTotalRiel2D = grandTotalRiel2D * location.add * location.offValue2D / 100;
                        let netTotalRiel3D = grandTotalRiel3D * location.add * location.offValue3D / 100;
                        let netTotalRielLer = grandTotalRielLer * location.add * location.offValueLer / 100;
                        let netTotalRielTot = grandTotalRielTot * location.add * location.offValueTot / 100;

                        let netTotalDollar2D = grandTotalDollar2D * location.offValue2D / 100;
                        let netTotalDollar3D = grandTotalDollar3D * location.offValue3D / 100;
                        let netTotalDollarLer = grandTotalDollarLer * location.offValueLer / 100;
                        let netTotalDollarTot = grandTotalDollarTot * location.offValueTot / 100;

                        let netTotalBaht2D = grandTotalBaht2D * location.offValue2D / 100;
                        let netTotalBaht3D = grandTotalBaht3D * location.offValue3D / 100;
                        let netTotalBahtLer = grandTotalBahtLer * location.offValueLer / 100;
                        let netTotalBahtTot = grandTotalBahtTot * location.offValueTot / 100;

                        //Win

                        let netTotalWinRiel2D = grandTotalWinRiel2D * location.win2D * location.add;
                        let netTotalWinRiel3D = grandTotalWinRiel3D * location.win3D * location.add;
                        let netTotalWinRielLer = grandTotalWinRielLer * location.winLer * location.add;
                        let netTotalWinRielTot = grandTotalWinRielTot * location.winTot * location.add;

                        let netTotalWinDollar2D = grandTotalWinDollar2D * location.win2D;
                        let netTotalWinDollar3D = grandTotalWinDollar3D * location.win3D;
                        let netTotalWinDollarLer = grandTotalWinDollarLer * location.winLer;
                        let netTotalWinDollarTot = grandTotalWinDollarTot * location.winTot;

                        let netTotalWinBaht2D = grandTotalWinBaht2D * location.win2D;
                        let netTotalWinBaht3D = grandTotalWinBaht3D * location.win3D;
                        let netTotalWinBahtLer = grandTotalWinBahtLer * location.winLer;
                        let netTotalWinBahtTot = grandTotalWinBahtTot * location.winTot;

                        //Profit
                        let grandProfitRiel = netTotalRiel2D + netTotalRiel3D + (netTotalRielLer || 0) + (netTotalRielTot || 0) - netTotalWinRiel2D - netTotalWinRiel3D - (netTotalWinRielLer || 0) - (netTotalWinRielTot || 0);
                        let netProfitRiel = grandProfitRiel * location.share / 100;

                        let grandProfitDollar = netTotalDollar2D + netTotalDollar3D + (netTotalDollarLer || 0) + (netTotalDollarTot || 0) - netTotalWinDollar2D - netTotalWinDollar3D - (netTotalWinDollarLer || 0) - (netTotalWinDollarTot || 0);
                        let netProfitDollar = grandProfitDollar * location.share / 100;

                        let grandProfitBaht = netTotalBaht2D + netTotalBaht3D + (netTotalBahtLer || 0) + (netTotalBahtTot || 0) - netTotalWinBaht2D - netTotalWinBaht3D - (netTotalWinBahtLer || 0) - (netTotalWinBahtTot || 0);
                        let netProfitBaht = grandProfitBaht * location.share / 100;

                        let calculateRiel = "";
                        let calculateDollar = "";
                        let calculateBaht = "";


                        let unpaidBeforeKHR = 0;
                        let reviewKHR = 0;
                        let paidKHR = 0;
                        let balanceKHR = 0;

                        let unpaidBeforeUSD = 0;
                        let reviewUSD = 0;
                        let paidUSD = 0;
                        let balanceUSD = 0;

                        let unpaidBeforeTHB = 0;
                        let reviewTHB = 0;
                        let paidTHB = 0;
                        let balanceTHB = 0;

                        let clearDoc = LT_Clear.findOne({
                            agentId: params.agentId,
                            date: params.date,
                            type: params.type
                        });
                        if (clearDoc) {
                            unpaidBeforeKHR = clearDoc.unpaidBeforeKHR || 0;
                            reviewKHR = clearDoc.reviewKHR || 0;
                            paidKHR = clearDoc.paidKHR || 0;
                            balanceKHR = clearDoc.balanceKHR || 0;

                            unpaidBeforeUSD = clearDoc.unpaidBeforeUSD || 0;
                            reviewUSD = clearDoc.reviewUSD || 0;
                            paidUSD = clearDoc.paidUSD || 0;
                            balanceUSD = clearDoc.balanceUSD || 0;

                            unpaidBeforeTHB = clearDoc.unpaidBeforeTHB || 0;
                            reviewTHB = clearDoc.reviewTHB || 0;
                            paidTHB = clearDoc.paidTHB || 0;
                            balanceTHB = clearDoc.balanceTHB || 0;
                        }

                        if (self.currency.indexOf("1:KHR") > -1) {
                            let winLoss = grandProfitRiel >= 0 ? `${t[language].winRiel}` : `${t[language].lossRiel}`;

                            if (location.offValue2D === location.offValueLer) {
                                calculateRiel += "<table class='table table-report' style='border-collapse: collapse !important;'>" +
                                    "<tr><th>" + `${t[language].totalRiel}` + "</th><th>" + formatNumberToSeperate((grandTotalRiel2D * location.add) + (grandTotalRielLer * location.add) + (grandTotalRiel3D * location.add) + (grandTotalRielTot * location.add)) + "</th></tr>" +
                                    "<tr><th>2D " + `${t[language].riel}` + "</th><th><font size='2'>" + formatNumberToSeperate((grandTotalRiel2D * location.add) + (grandTotalRielLer * location.add)) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalRiel2D + netTotalRielLer) + "</font></th></tr>" +
                                    "<tr><th>3D " + `${t[language].riel}` + "</th><th><font size='2'>" + formatNumberToSeperate((grandTotalRiel3D * location.add) + (grandTotalRielTot * location.add)) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalRiel3D + netTotalRielTot) + "</font></th></tr>";


                                calculateRiel += "<tr><th>2D " + `${t[language].pay}` + "</th><td><font color='red' size='2'>" + formatNumberToSeperate((grandTotalWinRiel2D * location.add) + (grandTotalWinRielLer * location.add)) + "</font></td><td><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinRiel2D + netTotalWinRielLer) + "</font></td></tr>" +
                                    "<tr><th  style='border-bottom: solid 1px'>3D " + `${t[language].pay}` + "</b></th><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate((grandTotalWinRiel3D * location.add) + (grandTotalWinRielTot * location.add)) + "</font></td><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinRiel3D + netTotalWinRielTot) + "</font></td></tr>";


                            } else {

                                calculateRiel += "<table class='table table-report' style='border-collapse: collapse !important;'>" +
                                    "<tr><th>" + `${t[language].totalRiel}` + "</th><th>" + formatNumberToSeperate((grandTotalRiel2D * location.add) + (grandTotalRielLer * location.add) + (grandTotalRiel3D * location.add) + (grandTotalRielTot * location.add)) + "</th></tr>" +
                                    "<tr><th>2D " + `${t[language].riel}` + "</th><th><font size='2'>" + formatNumberToSeperate(grandTotalRiel2D * location.add) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalRiel2D) + "</font></th></tr>" +
                                    "<tr><th>3D " + `${t[language].riel}` + "</th><th><font size='2'>" + formatNumberToSeperate(grandTotalRiel3D * location.add) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalRiel3D) + "</font></th></tr>";

                                if (self.type === "T") {
                                    calculateRiel += "<tr><th>លើ " + `${t[language].riel}` + "</th><th><font size='2'>" + formatNumberToSeperate(grandTotalRielLer * location.add) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalRielLer) + "</font></th></tr>" +
                                        "<tr><th>តូត " + `${t[language].riel}` + "</th><th><font size='2'>" + formatNumberToSeperate(grandTotalRielTot * location.add) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalRielTot) + "</font></th></tr>";
                                }

                                if (self.type === "T") {
                                    calculateRiel += "<tr><th>2D " + `${t[language].pay}` + "</th><td><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinRiel2D * location.add) + "</font></td><td><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinRiel2D) + "</font></td></tr>" +
                                        "<tr><th>3D " + `${t[language].pay}` + "</b></th><td><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinRiel3D * location.add) + "</font></td><td><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinRiel3D) + "</font></td></tr>";

                                    calculateRiel += "<tr><th>លើ " + `${t[language].pay}` + "</th><td><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinRielLer * location.add) + "</font></td><td><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinRielLer) + "</font></td></tr>" +
                                        "<tr><th  style='border-bottom: solid 1px'>តូត " + `${t[language].pay}` + "</b></th><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinRielTot * location.add) + "</font></td><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinRielTot) + "</font></td></tr>";

                                } else {
                                    calculateRiel += "<tr><th>2D " + `${t[language].pay}` + "</th><td><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinRiel2D * location.add) + "</font></td><td><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinRiel2D) + "</font></td></tr>" +
                                        "<tr><th  style='border-bottom: solid 1px'>3D " + `${t[language].pay}` + "</b></th><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinRiel3D * location.add) + "</font></td><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinRiel3D) + "</font></td></tr>";

                                }
                            }


                            calculateRiel += "<tr><td><b></b></td><td></td><td></td></tr><tr><th>" + winLoss + "</th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" + formatNumberToSeperate(grandProfitRiel) + "</font></b></th></tr>" +
                                "<tr><th><b>" + location.share + "%<b></th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" + formatNumberToSeperate(netProfitRiel) + `<input type='number' id='netProfitRiel' value='${netProfitRiel}' hidden='true'></input>` + "</font></b></th></tr>" +
                                "<tr><th><b>" + `${t[language].oldBalance}` + "<b></th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" + `<input type='number' class='form-control' id='oldBalanceRiel' value='${unpaidBeforeKHR}'></input>` + "</font></b></th></tr>" +
                                "<tr><th><b>" + `${t[language].review}` + "<b></th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" +
                                `<input type='number' class='form-control' id='reviewAmountKHR' value='${reviewKHR}'></input>` + "</font></b></th></tr>" +
                                "<tr><th><b>" + `${t[language].paid}` + "<b></th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" +
                                `<input type='number' class='form-control' id='paidAmountKHR' value='${paidKHR}'></input>` + "</font></b></th></tr>" +
                                "<tr><th><b>" + `${t[language].balance}` + "<b></th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" +
                                `<input type='number' class='form-control' id='balanceEndRiel' value='${balanceKHR}' disabled></input>` + "</font></b></th></tr>" +
                                "</table>";
                        }

                        if (self.currency.indexOf("2:USD") > -1) {
                            let winLoss = grandProfitDollar >= 0 ? `${t[language].winDollar}` : `${t[language].lossDollar}`;
                            if (location.offValue2D === location.offValueLer) {
                                calculateDollar += "<table class='table table-report' style='border-collapse: collapse !important;'>" +
                                    "<tr><th>" + `${t[language].totalDollar}` + "</th><th>" + formatNumberToSeperate((grandTotalDollar2D * location.add) + (grandTotalDollarLer * location.add) + (grandTotalDollar3D * location.add) + (grandTotalDollarTot * location.add)) + "</th></tr>" +
                                    "<tr><th>2D " + `${t[language].dollar}` + "</th><th><font size='2'>" + formatNumberToSeperate((grandTotalDollar2D * location.add) + (grandTotalDollarLer * location.add)) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalDollar2D + netTotalDollarLer) + "</font></th></tr>" +
                                    "<tr><th>3D " + `${t[language].dollar}` + "</th><th><font size='2'>" + formatNumberToSeperate((grandTotalDollar3D * location.add) + (grandTotalDollarTot * location.add)) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalDollar3D + netTotalDollarTot) + "</font></th></tr>";


                                calculateDollar += "<tr><th>2D " + `${t[language].pay}` + "</th><td><font color='red' size='2'>" + formatNumberToSeperate((grandTotalWinDollar2D * location.add) + (grandTotalWinDollarLer * location.add)) + "</font></td><td><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinDollar2D + netTotalWinDollarLer) + "</font></td></tr>" +
                                    "<tr><th  style='border-bottom: solid 1px'>3D " + `${t[language].pay}` + "</b></th><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate((grandTotalWinDollar3D * location.add) + (grandTotalWinDollarTot * location.add)) + "</font></td><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinDollar3D + netTotalWinDollarTot) + "</font></td></tr>";


                            } else {

                                calculateDollar += "<table class='table table-report' style='border-collapse: collapse !important;'>" +
                                    "<tr><th>" + `${t[language].totalDollar}` + "</th><th>" + formatNumberToSeperate((grandTotalDollar2D * location.add) + (grandTotalDollarLer * location.add) + (grandTotalDollar3D * location.add) + (grandTotalDollarTot * location.add)) + "</th></tr>" +

                                    "<tr><th>2D " + `${t[language].dollar}` + "</th><th><font size='2'>" + formatNumberToSeperate(grandTotalDollar2D * location.add) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalDollar2D) + "</font></th></tr>" +
                                    "<tr><th>3D " + `${t[language].dollar}` + "</th><th><font size='2'>" + formatNumberToSeperate(grandTotalDollar3D * location.add) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalDollar3D) + "</font></th></tr>";

                                if (self.type === "T") {
                                    calculateDollar += "<tr><th>លើ " + `${t[language].dollar}` + "</th><th><font size='2'>" + formatNumberToSeperate(grandTotalDollarLer * location.add) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalDollarLer) + "</font></th></tr>" +
                                        "<tr><th>តូត " + `${t[language].dollar}` + "</th><th><font size='2'>" + formatNumberToSeperate(grandTotalDollarTot * location.add) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalDollarTot) + "</font></th></tr>";
                                }

                                if (self.type === "T") {
                                    calculateDollar += "<tr><th>2D " + `${t[language].pay}` + "</th><td><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinDollar2D * location.add) + "</font></td><td><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinDollar2D) + "</font></td></tr>" +
                                        "<tr><th>3D " + `${t[language].pay}` + "</b></th><td><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinDollar3D * location.add) + "</font></td><td><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinDollar3D) + "</font></td></tr>";

                                    calculateDollar += "<tr><th>លើ " + `${t[language].pay}` + "</th><td><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinDollarLer * location.add) + "</font></td><td><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinDollarLer) + "</font></td></tr>" +
                                        "<tr><th  style='border-bottom: solid 1px'>តូត " + `${t[language].pay}` + "</b></th><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinDollarTot * location.add) + "</font></td><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinDollarTot) + "</font></td></tr>";

                                } else {
                                    calculateDollar += "<tr><th>2D " + `${t[language].pay}` + "</th><td><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinDollar2D * location.add) + "</font></td><td><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinDollar2D) + "</font></td></tr>" +
                                        "<tr><th  style='border-bottom: solid 1px'>3D " + `${t[language].pay}` + "</b></th><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinDollar3D * location.add) + "</font></td><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinDollar3D) + "</font></td></tr>";

                                }

                            }


                            calculateDollar += "<tr><td><b></b></td><td></td><td></td></tr><tr><th>" + winLoss + "</th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" + formatNumberToSeperate(grandProfitDollar) + "</font></b></th></tr>" +
                                "<tr><th><b>" + location.share + "%<b></th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" + formatNumberToSeperate(netProfitDollar) + `<input type='number' id='netProfitDollar' value='${netProfitDollar}' hidden='true'></input>` + "</font></b></th></tr>" +
                                "<tr><th><b>" + `${t[language].oldBalance}` + "<b></th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" + `<input type='number' class='form-control' id='oldBalanceDollar' value='${unpaidBeforeUSD}'></input>` + "</font></b></th></tr>" +
                                "<tr><th><b>" + `${t[language].review}` + "<b></th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" +
                                `<input type='number' class='form-control' id='reviewAmountUSD' value='${reviewUSD}'></input>` + "</font></b></th></tr>" +
                                "<tr><th><b>" + `${t[language].paid}` + "<b></th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" +
                                `<input type='number' class='form-control' id='paidAmountUSD' value='${paidUSD}'></input>` + "</font></b></th></tr>" +
                                "<tr><th><b>" + `${t[language].balance}` + "<b></th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" +
                                `<input type='number' class='form-control' id='balanceEndDollar' value='${balanceUSD}' disabled></input>` + "</font></b></th></tr>" +
                                "</table>";
                        }

                        if (self.currency.indexOf("3:THB") > -1) {
                            let winLoss = grandProfitBaht >= 0 ? `${t[language].winBaht}` : `${t[language].lossBaht}`;
                            if (location.offValue2D === location.offValueLer) {
                                calculateBaht += "<table class='table table-report' style='border-collapse: collapse !important;'>" +
                                    "<tr><th>" + `${t[language].totalBaht}` + "</th><th>" + formatNumberToSeperate((grandTotalBaht2D * location.add) + (grandTotalBahtLer * location.add) + (grandTotalBaht3D * location.add) + (grandTotalBahtTot * location.add)) + "</th></tr>" +
                                    "<tr><th>2D " + `${t[language].baht}` + "</th><th><font size='2'>" + formatNumberToSeperate((grandTotalBaht2D * location.add) + (grandTotalBahtLer * location.add)) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalBaht2D + netTotalBahtLer) + "</font></th></tr>" +
                                    "<tr><th>3D " + `${t[language].baht}` + "</th><th><font size='2'>" + formatNumberToSeperate((grandTotalBaht3D * location.add) + (grandTotalBahtTot * location.add)) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalBaht3D + netTotalBahtTot) + "</font></th></tr>";


                                calculateBaht += "<tr><th>2D " + `${t[language].pay}` + "</th><td><font color='red' size='2'>" + formatNumberToSeperate((grandTotalWinBaht2D * location.add) + (grandTotalWinBahtLer * location.add)) + "</font></td><td><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinBaht2D + netTotalWinBahtLer) + "</font></td></tr>" +
                                    "<tr><th  style='border-bottom: solid 1px'>3D " + `${t[language].pay}` + "</b></th><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate((grandTotalWinBaht3D * location.add) + (grandTotalWinBahtTot * location.add)) + "</font></td><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinBaht3D + netTotalWinBahtTot) + "</font></td></tr>";

                            } else {
                                calculateBaht += "<table class='table table-report' style='border-collapse: collapse !important;'>" +
                                    "<tr><th>" + `${t[language].totalBaht}` + "</th><th>" + formatNumberToSeperate((grandTotalBaht2D * location.add) + (grandTotalBahtLer * location.add) + (grandTotalBaht3D * location.add) + (grandTotalBahtTot * location.add)) + "</th></tr>" +
                                    "<tr><th>2D " + `${t[language].baht}` + "</th><th><font size='2'>" + formatNumberToSeperate(grandTotalBaht2D * location.add) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalBaht2D) + "</font></th></tr>" +
                                    "<tr><th>3D " + `${t[language].baht}` + "</th><th><font size='2'>" + formatNumberToSeperate(grandTotalBaht3D * location.add) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalBaht3D) + "</font></th></tr>";

                                if (self.type === "T") {
                                    calculateBaht += "<tr><th>លើ " + `${t[language].baht}` + "</th><th><font size='2'>" + formatNumberToSeperate(grandTotalBahtLer * location.add) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalBahtLer) + "</font></th></tr>" +
                                        "<tr><th>តូត " + `${t[language].baht}` + "</th><th><font size='2'>" + formatNumberToSeperate(grandTotalBahtTot * location.add) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalBahtTot) + "</font></th></tr>";
                                }

                                if (self.type === "T") {
                                    calculateBaht += "<tr><th>2D " + `${t[language].pay}` + "</th><td><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinBaht2D * location.add) + "</font></td><td><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinBaht2D) + "</font></td></tr>" +
                                        "<tr><th>3D " + `${t[language].pay}` + "</b></th><td><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinBaht3D * location.add) + "</font></td><td><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinBaht3D) + "</font></td></tr>";

                                    calculateBaht += "<tr><th>លើ " + `${t[language].pay}` + "</th><td><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinBahtLer * location.add) + "</font></td><td><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinBahtLer) + "</font></td></tr>" +
                                        "<tr><th  style='border-bottom: solid 1px'>តូត " + `${t[language].pay}` + "</b></th><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinBahtTot * location.add) + "</font></td><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinBahtTot) + "</font></td></tr>";

                                } else {
                                    calculateBaht += "<tr><th>2D " + `${t[language].pay}` + "</th><td><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinBaht2D * location.add) + "</font></td><td><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinBaht2D) + "</font></td></tr>" +
                                        "<tr><th  style='border-bottom: solid 1px'>3D " + `${t[language].pay}` + "</b></th><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinBaht3D * location.add) + "</font></td><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinBaht3D) + "</font></td></tr>";

                                }

                            }


                            calculateBaht += "<tr><td><b></b></td><td></td><td></td></tr><tr><th>" + winLoss + "</th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" + formatNumberToSeperate(grandProfitBaht) + "</font></b></th></tr>" +
                                "<tr><th><b>" + location.share + "%<b></th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" + formatNumberToSeperate(netProfitBaht) + `<input type='number' id='netProfitBaht' value='${netProfitBaht}' hidden='true'></input>` + "</font></b></th></tr>" +
                                "<tr><th><b>" + `${t[language].oldBalance}` + "<b></th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" + `<input type='number' class='form-control' id='oldBalanceBaht' value='${unpaidBeforeTHB}'></input>` + "</font></b></th></tr>" +
                                "<tr><th><b>" + `${t[language].review}` + "<b></th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" +
                                `<input type='number' class='form-control' id='reviewAmountTHB' value='${reviewTHB}'></input>` + "</font></b></th></tr>" +
                                "<tr><th><b>" + `${t[language].paid}` + "<b></th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" +
                                `<input type='number' class='form-control' id='paidAmountTHB' value='${paidTHB}'></input>` + "</font></b></th></tr>" +
                                "<tr><th><b>" + `${t[language].balance}` + "<b></th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" +
                                `<input type='number' class='form-control' id='balanceEndBaht' value='${balanceTHB}' disabled></input>` + "</font></b></th></tr>" +
                                "</table>";
                        }

                        let updateCountFinalLabel = updateCountFinal === 0 ? "" : "Updated :";

                        dataHtml += "<div class='col-md-12'>" +
                            "<table class='table table-report' style='border: 0px'><tr><td>" +
                            "<table class='table' style='border-collapse: collapse !important;'>" +
                            "<tr><th colspan='3'><font size='2'>" + updateCountFinalLabel + "  " + moment(self.date).format('DD/MM/YYYY') + "</font></th></tr>" +

                            "<tr><th style='border: solid 1px'  rowspan='2' class='sumFooterYellow'>2D</th><th style='border: solid 1px'  class='sumFooterYellow'>" + `${t[language].offValue2D}` + " </th><th style='border: solid 1px' align='center'>" + location.offValue2D + "</th></tr>" +
                            "<tr><th style='border: solid 1px'  class='sumFooterYellow'>" + `${t[language].win}` + "(*1)</th><th style='border: solid 1px' align='center'>" + location.win2D + "</th></tr>" +

                            "<tr><th style='border: solid 1px'  rowspan='2'  class='sumFooter'>3D</th><th style='border: solid 1px'  class='sumFooter'>" + `${t[language].offValue3D}` + " </th><th style='border: solid 1px' align='center'>" + location.offValue3D + "</th></tr>" +
                            "<tr><th style='border: solid 1px'  class='sumFooter'>" + `${t[language].win}` + "(*1)</th><th style='border: solid 1px' align='center'>" + location.win3D + "</th></tr>";
                        if (params.type === "T") {
                            dataHtml += "<tr><th style='border: solid 1px'  rowspan='2' class='sumFooterYellow'>លើ</th><th style='border: solid 1px'  class='sumFooterYellow'>" + `${t[language].offValueLer}` + " </th><th style='border: solid 1px' align='center'>" + location.offValueLer + "</th></tr>" +
                                "<tr><th style='border: solid 1px'  class='sumFooterYellow'>" + `${t[language].win}` + "(*1)</th><th style='border: solid 1px' align='center'>" + location.winLer + "</th></tr>" +

                                "<tr><th style='border: solid 1px'  rowspan='2'  class='sumFooter'>តូត</th><th style='border: solid 1px'  class='sumFooter'>" + `${t[language].offValueTot}` + " </th><th style='border: solid 1px' align='center'>" + location.offValueTot + "</th></tr>" +
                                "<tr><th style='border: solid 1px'  class='sumFooter'>" + `${t[language].win}` + "(*1)</th><th style='border: solid 1px' align='center'>" + location.winTot + "</th></tr>";

                        }


                        dataHtml += "<tr><th style='border: solid 1px'  class='sumFooter' >" + `${t[language].addDigit}` + "</th><th style='border: solid 1px' align='center'>00=</th><th style='border: solid 1px' align='center'>" + location.add + "</th></tr>" +
                            "</table></td>" +
                            "<td>" + calculateRiel + "</td><td>" + calculateDollar + "</td><td>" + calculateBaht + "</td></tr></table></div><footer></footer>";
                    }
                }

            })


            data.agentName = agentName;
            data.dataHtml = dataHtml;
            Meteor.defer(function () {
                Meteor.call("lt_clearDataLast2Month", moment().format("YYYY-MM-DD"));
            })
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
