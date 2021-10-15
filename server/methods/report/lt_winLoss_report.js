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

let secret = Meteor.settings.private.secret;
Meteor.methods({
    base_fetchWinLossReport(params, accessToken, language) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
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

            let firstRow = (currencyLength * 4) + 1;
            let firstRowThai = (currencyLength * 8) + 1;
            let secondRow = currencyLength * 2;
            let secondRowThai = currencyLength * 4;
            let thirdRow = currencyLength;


            let labelStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px'>" + `${t[language].riel}` + "</th>" : "";
            let labelStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px' >" + `${t[language].dollar}` + "</th>" : "";
            let labelStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px' >" + `${t[language].baht}` + "</th>" : "";
            let labelStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px' >" + `${t[language].riel}` + "</th>" : "";
            let labelStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px' >" + `${t[language].dollar}` + "</th>" : "";
            let labelStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px'>" + `${t[language].baht}` + "</th>" : "";
            let labelStakeRielLer = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px' >" + `${t[language].riel}` + "</th>" : "";
            let labelStakeDollarLer = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px' >" + `${t[language].dollar}` + "</th>" : "";
            let labelStakeBahtLer = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px'>" + `${t[language].baht}` + "</th>" : "";
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
            let labelLossBahtLer = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px' >" + `${t[language].baht}` + "</th>" : "";
            let labelLossRielTot = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px'>" + `${t[language].riel}` + "</th>" : "";
            let labelLossDollarTot = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px'>" + `${t[language].dollar}` + "</th>" : "";
            let labelLossBahtTot = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px' >" + `${t[language].baht}` + "</th>" : "";

            let userDoc = Meteor.user();

            if (params.branch !== "" && params.branch.length > 0) {
                selectorE.branchId = {$in: self.branch || []};
                selectorEK.branchId = {$in: self.branch || []};
                selectorN.branchId = {$in: self.branch || []};
                selectorNK.branchId = {$in: self.branch || []};
                selectorV13.branchId = {$in: self.branch || []};
                selectorT.branchId = {$in: self.branch || []};
                selectorVat.branchId = {$in: self.branch || []};
            } else {
                selectorE.branchId = {$in: userDoc.branch || []};
                selectorEK.branchId = {$in: userDoc.branch || []};
                selectorN.branchId = {$in: userDoc.branch || []};
                selectorNK.branchId = {$in: userDoc.branch || []};
                selectorV13.branchId = {$in: userDoc.branch || []};
                selectorT.branchId = {$in: userDoc.branch || []};
                selectorVat.branchId = {$in: userDoc.branch || []};
            }
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
                    selectorE.lossDate = self.date;
                    selectorEK.lossDate = self.date;
                    selectorN.lossDate = self.date;
                    selectorNK.lossDate = self.date;
                    selectorV13.lossDate = self.date;
                    selectorT.lossDate = self.date;
                    selectorVat.lossDate = self.date;

                    selectorE.time = "E";
                    selectorEK.time = "EK";
                    selectorN.time = "N";
                    selectorNK.time = "NK";
                    selectorV13.time = "V13";
                    selectorT.time = "T";
                    selectorVat.time = "Vat";

                    let resultE = [];
                    let resultEK = [];
                    let resultN = [];
                    let resultNK = [];
                    let resultV13 = [];
                    let resultT = [];
                    let resultVat = [];
                    let resultLer = [];
                    let resultTot = [];


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
                        resultE = Meteor.call('lt_betGroupByPage', selectorE);
                        resultN = Meteor.call('lt_betGroupByPage', selectorN);
                        resultV13 = Meteor.call('lt_betGroupByPage', selectorV13);
                    }
                    if (self.type === "KH") {
                        resultEK = Meteor.call('lt_betGroupByPage', selectorEK);
                        resultNK = Meteor.call('lt_betGroupByPage', selectorNK);
                    } else if (self.type === "T") {
                        resultT = Meteor.call('lt_betGroupByPage', selectorT);
                    } else if (self.type === "Vat") {
                        resultVat = Meteor.call('lt_betGroupByPage', selectorVat);
                    }
                    //====================================================================
                    //Vietnam Evening
                    if (resultE && resultE.length !== 0) {
                        dataHtml += "<table class='table table-reportWinLoseMain'><tr><td>";
                    }

                    let updateCountFinal = 0;

                    if (resultE && resultE.length !== 0) {
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
                            "<table class='table table-report table-reportWinLose' style='border-collapse: collapse !important;'>" +
                            "<tr><th style='border: solid 1px'  colspan='" + firstRow + "' align='center'><b>" + agentName + "(" + `${t[language].eveningVietnam}` + ")-" + moment(self.date).format('DD/MM/YYYY') + "</b></th></tr>" +
                            "<tr><th rowspan='3' style='border: solid 1px' align='center'>No.</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'>" + `${t[language].turnover}` + "</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'>" + `${t[language].loss}` + "</th></tr>" +
                            "<tr><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th></tr>" +

                            "<tr>" +

                            labelStakeRiel2D +
                            labelStakeDollar2D +
                            labelStakeBaht2D +
                            labelStakeRiel3D +
                            labelStakeDollar3D +
                            labelStakeBaht3D +
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

                            updateCountFinal += reE.updateCount;
                            if (reE.updateCount > 0) {
                                dataHtml += "<tr class='updateColor'>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +
                                    valueLossRiel2D +
                                    valueLossDollar2D +
                                    valueLossBaht2D +
                                    valueLossRiel3D +
                                    valueLossDollar3D +
                                    valueLossBaht3D +

                                    "</tr>";
                            } else {
                                dataHtml += "<tr>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +
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
                        let footerStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRiel2D + "</font></th>" : "";
                        let footerStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollar2D + "</font></th>" : "";
                        let footerStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBaht2D + "</font></th>" : "";
                        let footerStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRiel3D + "</font></th>" : "";
                        let footerStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollar3D + "</font></th>" : "";
                        let footerStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBaht3D + "</font></th>" : "";
                        let footerLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red'>" + lossPerAgentRiel2D + "</font></th>" : "";
                        let footerLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollar2D + "</font></th>" : "";
                        let footerLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBaht2D + "</font></th>" : "";
                        let footerLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentRiel3D + "</font></th>" : "";
                        let footerLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollar3D + "</font></th>" : "";
                        let footerLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBaht3D + "</font></th>" : "";

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
                        dataHtml += "</td><td>";
                    } else if (resultV13 && resultV13.length !== 0 && resultE && resultE.length === 0) {
                        dataHtml += "<table class='table' ><tr><td>";

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
                            "<tr><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th></tr>" +

                            "<tr>" +

                            labelStakeRiel2D +
                            labelStakeDollar2D +
                            labelStakeBaht2D +
                            labelStakeRiel3D +
                            labelStakeDollar3D +
                            labelStakeBaht3D +
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

                            updateCountFinal += reV13.updateCount;
                            if (reV13.updateCount > 0) {
                                dataHtml += "<tr class='updateColor'>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reV13._id.page + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +
                                    valueLossRiel2D +
                                    valueLossDollar2D +
                                    valueLossBaht2D +
                                    valueLossRiel3D +
                                    valueLossDollar3D +
                                    valueLossBaht3D +

                                    "</tr>";
                            } else {
                                dataHtml += "<tr>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reV13._id.page + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +
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
                        let footerStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRiel2D + "</font></th>" : "";
                        let footerStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollar2D + "</font></th>" : "";
                        let footerStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBaht2D + "</font></th>" : "";
                        let footerStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRiel3D + "</font></th>" : "";
                        let footerStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollar3D + "</font></th>" : "";
                        let footerStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBaht3D + "</font></th>" : "";
                        let footerLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red'>" + lossPerAgentRiel2D + "</font></th>" : "";
                        let footerLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollar2D + "</font></th>" : "";
                        let footerLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBaht2D + "</font></th>" : "";
                        let footerLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentRiel3D + "</font></th>" : "";
                        let footerLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollar3D + "</font></th>" : "";
                        let footerLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBaht3D + "</font></th>" : "";

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
                            footerLossRiel2D +
                            footerLossDollar2D +
                            footerLossBaht2D +
                            footerLossRiel3D +
                            footerLossDollar3D +
                            footerLossBaht3D +
                            "</tr>" + "</table>";

                    }


                    //Vietname Night
                    if (resultN && resultN.length !== 0 && resultV13 && resultV13.length !== 0) {
                        dataHtml += "</td><td>";
                    } else if (resultN && resultN.length !== 0 && resultV13 && resultV13.length === 0) {
                        dataHtml += "<table class='table' ><tr><td>";

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

                        dataHtml += "<td>" +
                            "<table class='table  table-report table-reportWinLose' style='border-collapse: collapse !important;'>" +
                            "<tr><th style='border: solid 1px'  colspan='" + firstRow + "' align='center'><b>" + agentName + "(" + `${t[language].nightVietnam}` + ")-" + moment(self.date).format('DD/MM/YYYY') + "</b></th></tr>" +
                            "<tr><th rowspan='3' style='border: solid 1px' align='center'>No.</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'>" + `${t[language].turnover}` + "</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'> " + `${t[language].loss}` + "</th></tr>" +
                            "<tr><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th></tr>" +
                            "<tr>" +

                            labelStakeRiel2D +
                            labelStakeDollar2D +
                            labelStakeBaht2D +
                            labelStakeRiel3D +
                            labelStakeDollar3D +
                            labelStakeBaht3D +
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


                            updateCountFinal += reE.updateCount;
                            if (reE.updateCount > 0) {
                                dataHtml += "<tr class='updateColor'>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +
                                    valueLossRiel2D +
                                    valueLossDollar2D +
                                    valueLossBaht2D +
                                    valueLossRiel3D +
                                    valueLossDollar3D +
                                    valueLossBaht3D +

                                    "</tr>";
                            } else {
                                dataHtml += "<tr>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +
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

                        let footerStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRiel2D + "</font></th>" : "";
                        let footerStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollar2D + "</font></th>" : "";
                        let footerStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBaht2D + "</font></th>" : "";
                        let footerStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRiel3D + "</font></th>" : "";
                        let footerStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollar3D + "</font></th>" : "";
                        let footerStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBaht3D + "</font></th>" : "";
                        let footerLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red'>" + lossPerAgentRiel2D + "</font></th>" : "";
                        let footerLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollar2D + "</font></th>" : "";
                        let footerLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBaht2D + "</font></th>" : "";
                        let footerLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentRiel3D + "</font></th>" : "";
                        let footerLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollar3D + "</font></th>" : "";
                        let footerLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBaht3D + "</font></th>" : "";


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
                            footerLossRiel2D +
                            footerLossDollar2D +
                            footerLossBaht2D +
                            footerLossRiel3D +
                            footerLossDollar3D +
                            footerLossBaht3D +
                            "</tr>" + "</table>";
                    }

                    if (resultN && resultN.length !== 0) {
                        dataHtml += "</td>";
                    }
                    //================================Khmer===================================

                    //Khmer Evening
                    if (resultEK && resultEK.length !== 0) {
                        dataHtml += "<table class='table table-reportWinLoseMain'><tr><td>";
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
                            "<tr><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th></tr>" +

                            "<tr>" +

                            labelStakeRiel2D +
                            labelStakeDollar2D +
                            labelStakeBaht2D +
                            labelStakeRiel3D +
                            labelStakeDollar3D +
                            labelStakeBaht3D +
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

                            updateCountFinal += reE.updateCount;
                            if (reE.updateCount > 0) {
                                dataHtml += "<tr class='updateColor'>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +
                                    valueLossRiel2D +
                                    valueLossDollar2D +
                                    valueLossBaht2D +
                                    valueLossRiel3D +
                                    valueLossDollar3D +
                                    valueLossBaht3D +

                                    "</tr>";
                            } else {
                                dataHtml += "<tr>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +
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
                        let footerStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRiel2D + "</font></th>" : "";
                        let footerStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollar2D + "</font></th>" : "";
                        let footerStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBaht2D + "</font></th>" : "";
                        let footerStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRiel3D + "</font></th>" : "";
                        let footerStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollar3D + "</font></th>" : "";
                        let footerStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBaht3D + "</font></th>" : "";
                        let footerLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red'>" + lossPerAgentRiel2D + "</font></th>" : "";
                        let footerLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollar2D + "</font></th>" : "";
                        let footerLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBaht2D + "</font></th>" : "";
                        let footerLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentRiel3D + "</font></th>" : "";
                        let footerLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollar3D + "</font></th>" : "";
                        let footerLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBaht3D + "</font></th>" : "";

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
                        dataHtml += "</td><td>";
                    } else if (resultNK && resultNK.length !== 0 && resultEK && resultEK.length === 0) {
                        dataHtml += "<table class='table' ><tr><td>";

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

                        dataHtml += "<td>" +
                            "<table class='table  table-report table-reportWinLose' style='border-collapse: collapse !important;'>" +
                            "<tr><th style='border: solid 1px'  colspan='" + firstRow + "' align='center'><b>" + agentName + "(" + `${t[language].nightKhmer}` + ")-" + moment(self.date).format('DD/MM/YYYY') + "</b></th></tr>" +
                            "<tr><th rowspan='3' style='border: solid 1px' align='center'>No.</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'>" + `${t[language].turnover}` + "</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'> " + `${t[language].loss}` + "</th></tr>" +
                            "<tr><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th></tr>" +
                            "<tr>" +

                            labelStakeRiel2D +
                            labelStakeDollar2D +
                            labelStakeBaht2D +
                            labelStakeRiel3D +
                            labelStakeDollar3D +
                            labelStakeBaht3D +
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


                            updateCountFinal += reE.updateCount;
                            if (reE.updateCount > 0) {
                                dataHtml += "<tr class='updateColor'>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +
                                    valueLossRiel2D +
                                    valueLossDollar2D +
                                    valueLossBaht2D +
                                    valueLossRiel3D +
                                    valueLossDollar3D +
                                    valueLossBaht3D +

                                    "</tr>";
                            } else {
                                dataHtml += "<tr>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +
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

                        let footerStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRiel2D + "</font></th>" : "";
                        let footerStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollar2D + "</font></th>" : "";
                        let footerStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBaht2D + "</font></th>" : "";
                        let footerStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRiel3D + "</font></th>" : "";
                        let footerStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollar3D + "</font></th>" : "";
                        let footerStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBaht3D + "</font></th>" : "";
                        let footerLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red'>" + lossPerAgentRiel2D + "</font></th>" : "";
                        let footerLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollar2D + "</font></th>" : "";
                        let footerLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBaht2D + "</font></th>" : "";
                        let footerLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentRiel3D + "</font></th>" : "";
                        let footerLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollar3D + "</font></th>" : "";
                        let footerLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBaht3D + "</font></th>" : "";


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
                            footerLossRiel2D +
                            footerLossDollar2D +
                            footerLossBaht2D +
                            footerLossRiel3D +
                            footerLossDollar3D +
                            footerLossBaht3D +
                            "</tr>" + "</table>";
                    }

                    if (resultNK && resultNK.length !== 0) {
                        dataHtml += "</td>";
                    }

                    //================================Thai====================================
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
                            "<tr><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>លើ</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>តូត</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>លើ</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>តូត</th></tr>" +
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


                            updateCountFinal += reE.updateCount;
                            if (reE.updateCount > 0) {
                                dataHtml += "<tr class='updateColor'>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + "</td>" +

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
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + "</td>" +

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


                        let footerStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRiel2D + "</font></th>" : "";
                        let footerStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollar2D + "</font></th>" : "";
                        let footerStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBaht2D + "</font></th>" : "";
                        let footerStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRiel3D + "</font></th>" : "";
                        let footerStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollar3D + "</font></th>" : "";
                        let footerStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBaht3D + "</font></th>" : "";
                        let footerStakeRielLer = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRielLer + "</font></th>" : "";
                        let footerStakeDollarLer = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollarLer + "</font></th>" : "";
                        let footerStakeBahtLer = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBahtLer + "</font></th>" : "";
                        let footerStakeRielTot = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRielTot + "</font></th>" : "";
                        let footerStakeDollarTot = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollarTot + "</font></th>" : "";
                        let footerStakeBahtTot = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBahtTot + "</font></th>" : "";
                        let footerLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red'>" + lossPerAgentRiel2D + "</font></th>" : "";
                        let footerLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollar2D + "</font></th>" : "";
                        let footerLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBaht2D + "</font></th>" : "";
                        let footerLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentRiel3D + "</font></th>" : "";
                        let footerLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollar3D + "</font></th>" : "";
                        let footerLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBaht3D + "</font></th>" : "";
                        let footerLossRielLer = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentRielLer + "</font></th>" : "";
                        let footerLossDollarLer = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollarLer + "</font></th>" : "";
                        let footerLossBahtLer = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBahtLer + "</font></th>" : "";
                        let footerLossRielTot = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentRielTot + "</font></th>" : "";
                        let footerLossDollarTot = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollarTot + "</font></th>" : "";
                        let footerLossBahtTot = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBahtTot + "</font></th>" : "";


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


                    //================================Vathu====================================
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
                            "<tr><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th></tr>" +
                            "<tr>" +

                            labelStakeRiel2D +
                            labelStakeDollar2D +
                            labelStakeBaht2D +
                            labelStakeRiel3D +
                            labelStakeDollar3D +
                            labelStakeBaht3D +
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


                            updateCountFinal += reE.updateCount;
                            if (reE.updateCount > 0) {
                                dataHtml += "<tr class='updateColor'>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +
                                    valueLossRiel2D +
                                    valueLossDollar2D +
                                    valueLossBaht2D +
                                    valueLossRiel3D +
                                    valueLossDollar3D +
                                    valueLossBaht3D +

                                    "</tr>";
                            } else {
                                dataHtml += "<tr>" +
                                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + "</td>" +

                                    valueStakeRiel2D +
                                    valueStakeDollar2D +
                                    valueStakeBaht2D +
                                    valueStakeRiel3D +
                                    valueStakeDollar3D +
                                    valueStakeBaht3D +
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


                        let footerStakeRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRiel2D + "</font></th>" : "";
                        let footerStakeDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollar2D + "</font></th>" : "";
                        let footerStakeBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBaht2D + "</font></th>" : "";
                        let footerStakeRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRiel3D + "</font></th>" : "";
                        let footerStakeDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollar3D + "</font></th>" : "";
                        let footerStakeBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBaht3D + "</font></th>" : "";
                        let footerLossRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red'>" + lossPerAgentRiel2D + "</font></th>" : "";
                        let footerLossDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollar2D + "</font></th>" : "";
                        let footerLossBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBaht2D + "</font></th>" : "";
                        let footerLossRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentRiel3D + "</font></th>" : "";
                        let footerLossDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollar3D + "</font></th>" : "";
                        let footerLossBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBaht3D + "</font></th>" : "";


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
                            footerLossRiel2D +
                            footerLossDollar2D +
                            footerLossBaht2D +
                            footerLossRiel3D +
                            footerLossDollar3D +
                            footerLossBaht3D;
                    }

                    dataHtml += "</tr></table>"


                    if ((resultE && resultE.length !== 0) || (resultN && resultN.length !== 0) || (resultT && resultT.length !== 0) || (resultVat && resultVat.length !== 0) || (resultEK && resultEK.length !== 0) || (resultNK && resultNK.length !== 0) || (resultV13 && resultV13.length !== 0)) {
                        let locationId = params.type === "V" ? agentInfo.locationVN : params.type === "T" ? agentInfo.locationTH : params.type === "Vat" ? agentInfo.locationVat : agentInfo.locationKH;
                        let location = Meteor.call('lt_findLocationById', locationId, accessToken);

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


                        if (self.currency.indexOf("1:KHR") > -1) {
                            let winLoss = grandProfitRiel >= 0 ? `${t[language].winRiel}` : `${t[language].lossRiel}`;

                            calculateRiel += "<table class='table table-report' style='border-collapse: collapse !important;'>" +
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


                            calculateRiel += "<tr><td><b></b></td><td></td><td></td></tr><tr><th>" + winLoss + "</th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" + formatNumberToSeperate(grandProfitRiel) + "</font></b></th></tr>" +
                                "<tr><th><b>" + location.share + "%<b></th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" + formatNumberToSeperate(netProfitRiel) + "</font></b></th></tr>" +

                                "</table>";
                        }

                        if (self.currency.indexOf("2:USD") > -1) {
                            let winLoss = grandProfitDollar >= 0 ? `${t[language].winDollar}` : `${t[language].lossDollar}`;
                            calculateDollar += "<table class='table table-report' style='border-collapse: collapse !important;'>" +
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


                            calculateDollar += "<tr><td><b></b></td><td></td><td></td></tr><tr><th>" + winLoss + "</th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" + formatNumberToSeperate(grandProfitDollar) + "</font></b></th></tr>" +
                                "<tr><th><b>" + location.share + "%<b></th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" + formatNumberToSeperate(netProfitDollar) + "</font></b></th></tr>" +

                                "</table>";
                        }

                        if (self.currency.indexOf("3:THB") > -1) {
                            let winLoss = grandProfitBaht >= 0 ? `${t[language].winBaht}` : `${t[language].lossBaht}`;

                            calculateBaht += "<table class='table table-report' style='border-collapse: collapse !important;'>" +
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


                            calculateBaht += "<tr><td><b></b></td><td></td><td></td></tr><tr><th>" + winLoss + "</th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" + formatNumberToSeperate(grandProfitBaht) + "</font></b></th></tr>" +
                                "<tr><th><b>" + location.share + "%<b></th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" + formatNumberToSeperate(netProfitBaht) + "</font></b></th></tr>" +

                                "</table>";
                        }

                        let updateCountFinalLabel = updateCountFinal == 0 ? "" : "Updated :";

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
