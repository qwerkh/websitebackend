import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../../imports/libs/globalFn"
import _ from 'lodash'
import {t} from "../../../imports/libs/constant";

import {LT_Bet} from "../../../imports/collections/lt_bet"
import {LT_Agent} from "../../../imports/collections/lt_agent"
import {LT_Result} from "../../../imports/collections/lt_result";
import {LT_BetDetail} from "../../../imports/collections/lt_betDetail";
import {LT_Rank} from "../../../imports/collections/lt_rank";
import numeral from "numeral";

let secret = Meteor.settings.private.secret;
Meteor.methods({
    base_fetchBetNumberReviewReport(params, accessToken, language) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let data = {};

            let dataHtml = "";
            let self = params;

            let rankInfo = LT_Rank.findOne({_id: self.rankId});

            let result2D = [];
            let result3D = [];

            let selectorARiel = {};
            let selectorADollar = {};
            let selectorABaht = {};

            let selectorA1Riel = {};
            let selectorA1Dollar = {};
            let selectorA1Baht = {};

            let selectorA2Riel = {};
            let selectorA2Dollar = {};
            let selectorA2Baht = {};

            let selectorA3Riel = {};
            let selectorA3Dollar = {};
            let selectorA3Baht = {};

            let selectorA4Riel = {};
            let selectorA4Dollar = {};
            let selectorA4Baht = {};

            let selectorTRiel = {};
            let selectorTDollar = {};
            let selectorTBaht = {};

            let selectorVatRiel = {};
            let selectorVatDollar = {};
            let selectorVatBaht = {};

            let selectorLerRiel = {};
            let selectorLerDollar = {};
            let selectorLerBaht = {};

            let selectorTotRiel = {};
            let selectorTotDollar = {};
            let selectorTotBaht = {};

            let selectorBRiel = {};
            let selectorBDollar = {};
            let selectorBBaht = {};

            let selectorCRiel = {};
            let selectorCDollar = {};
            let selectorCBaht = {};

            let selectorDRiel = {};
            let selectorDDollar = {};
            let selectorDBaht = {};


            let selectorFRiel = {};
            let selectorFDollar = {};
            let selectorFBaht = {};


            let selectorIRiel = {};
            let selectorIDollar = {};
            let selectorIBaht = {};


            let selectorKRiel = {};
            let selectorKDollar = {};
            let selectorKBaht = {};


            let selectorLRiel = {};
            let selectorLDollar = {};
            let selectorLBaht = {};


            let selectorNRiel = {};
            let selectorNDollar = {};
            let selectorNBaht = {};


            let selectorORiel = {};
            let selectorODollar = {};
            let selectorOBaht = {};

            let selectorLoRiel = {};
            let selectorLoDollar = {};
            let selectorLoBaht = {};

            //Param

            // Post
            selectorARiel = {$or: [{post: {$elemMatch: {$eq: "0A"}}}, {post: {$elemMatch: {$eq: "4P"}}}]};
            selectorADollar = {$or: [{post: {$elemMatch: {$eq: "0A"}}}, {post: {$elemMatch: {$eq: "4P"}}}]};
            selectorABaht = {$or: [{post: {$elemMatch: {$eq: "0A"}}}, {post: {$elemMatch: {$eq: "4P"}}}]};

            selectorBRiel = {$or: [{post: {$elemMatch: {$eq: "1B"}}}, {post: {$elemMatch: {$eq: "4P"}}}]};
            selectorBDollar = {$or: [{post: {$elemMatch: {$eq: "1B"}}}, {post: {$elemMatch: {$eq: "4P"}}}]};
            selectorBBaht = {$or: [{post: {$elemMatch: {$eq: "1B"}}}, {post: {$elemMatch: {$eq: "4P"}}}]};

            selectorCRiel = {$or: [{post: {$elemMatch: {$eq: "2C"}}}, {post: {$elemMatch: {$eq: "4P"}}}]};
            selectorCDollar = {$or: [{post: {$elemMatch: {$eq: "2C"}}}, {post: {$elemMatch: {$eq: "4P"}}}]};
            selectorCBaht = {$or: [{post: {$elemMatch: {$eq: "2C"}}}, {post: {$elemMatch: {$eq: "4P"}}}]};

            selectorDRiel = {$or: [{post: {$elemMatch: {$eq: "3D"}}}, {post: {$elemMatch: {$eq: "4P"}}}]};
            selectorDDollar = {$or: [{post: {$elemMatch: {$eq: "3D"}}}, {post: {$elemMatch: {$eq: "4P"}}}]};
            selectorDBaht = {$or: [{post: {$elemMatch: {$eq: "3D"}}}, {post: {$elemMatch: {$eq: "4P"}}}]};

            selectorA1Riel.post = {$elemMatch: {$eq: "A1"}};
            selectorA1Dollar.post = {$elemMatch: {$eq: "A1"}};
            selectorA1Baht.post = {$elemMatch: {$eq: "A1"}};

            selectorA2Riel.post = {$elemMatch: {$eq: "A2"}};
            selectorA2Dollar.post = {$elemMatch: {$eq: "A2"}};
            selectorA2Baht.post = {$elemMatch: {$eq: "A2"}};

            selectorA3Riel.post = {$elemMatch: {$eq: "A3"}};
            selectorA3Dollar.post = {$elemMatch: {$eq: "A3"}};
            selectorA3Baht.post = {$elemMatch: {$eq: "A3"}};

            selectorA4Riel.post = {$elemMatch: {$eq: "A4"}};
            selectorA4Dollar.post = {$elemMatch: {$eq: "A4"}};
            selectorA4Baht.post = {$elemMatch: {$eq: "A4"}};

            selectorTRiel.post = {$elemMatch: {$eq: "T"}};
            selectorTDollar.post = {$elemMatch: {$eq: "T"}};
            selectorTBaht.post = {$elemMatch: {$eq: "T"}};

            selectorVatRiel.post = {$elemMatch: {$eq: "Vat"}};
            selectorVatDollar.post = {$elemMatch: {$eq: "Vat"}};
            selectorVatBaht.post = {$elemMatch: {$eq: "Vat"}};

            selectorLerRiel.post = {$elemMatch: {$eq: "Ler"}};
            selectorLerDollar.post = {$elemMatch: {$eq: "Ler"}};
            selectorLerBaht.post = {$elemMatch: {$eq: "Ler"}};

            selectorTotRiel.post = {$elemMatch: {$eq: "Tot"}};
            selectorTotDollar.post = {$elemMatch: {$eq: "Tot"}};
            selectorTotBaht.post = {$elemMatch: {$eq: "Tot"}};

            selectorFRiel.post = {$elemMatch: {$eq: "F"}};
            selectorFDollar.post = {$elemMatch: {$eq: "F"}};
            selectorFBaht.post = {$elemMatch: {$eq: "F"}};

            selectorIRiel.post = {$elemMatch: {$eq: "I"}};
            selectorIDollar.post = {$elemMatch: {$eq: "I"}};
            selectorIBaht.post = {$elemMatch: {$eq: "I"}};

            selectorKRiel.post = {$elemMatch: {$eq: "K"}};
            selectorKDollar.post = {$elemMatch: {$eq: "K"}};
            selectorKBaht.post = {$elemMatch: {$eq: "K"}};

            selectorLRiel.post = {$elemMatch: {$eq: "L"}};
            selectorLDollar.post = {$elemMatch: {$eq: "L"}};
            selectorLBaht.post = {$elemMatch: {$eq: "L"}};

            selectorNRiel.post = {$elemMatch: {$eq: "N"}};
            selectorNDollar.post = {$elemMatch: {$eq: "N"}};
            selectorNBaht.post = {$elemMatch: {$eq: "N"}};

            selectorORiel.post = {$elemMatch: {$eq: "O"}};
            selectorODollar.post = {$elemMatch: {$eq: "O"}};
            selectorOBaht.post = {$elemMatch: {$eq: "O"}};


            selectorLoRiel.post = {$elemMatch: {$eq: "5Lo"}};
            selectorLoDollar.post = {$elemMatch: {$eq: "5Lo"}};
            selectorLoBaht.post = {$elemMatch: {$eq: "5Lo"}};

            let userDoc = Meteor.user();
            if (params.branch !== "" && params.branch.length > 0) {

                selectorARiel.branchId = {$in: self.branch || []};
                selectorADollar.branchId = {$in: self.branch || []};
                selectorABaht.branchId = {$in: self.branch || []};


                selectorA1Riel.branchId = {$in: self.branch || []};
                selectorA1Dollar.branchId = {$in: self.branch || []};
                selectorA1Baht.branchId = {$in: self.branch || []};


                selectorA2Riel.branchId = {$in: self.branch || []};
                selectorA2Dollar.branchId = {$in: self.branch || []};
                selectorA2Baht.branchId = {$in: self.branch || []};


                selectorA3Riel.branchId = {$in: self.branch || []};
                selectorA3Dollar.branchId = {$in: self.branch || []};
                selectorA3Baht.branchId = {$in: self.branch || []};


                selectorA4Riel.branchId = {$in: self.branch || []};
                selectorA4Dollar.branchId = {$in: self.branch || []};
                selectorA4Baht.branchId = {$in: self.branch || []};


                selectorTRiel.branchId = {$in: self.branch || []};
                selectorTDollar.branchId = {$in: self.branch || []};
                selectorTBaht.branchId = {$in: self.branch || []};

                selectorVatRiel.branchId = {$in: self.branch || []};
                selectorVatDollar.branchId = {$in: self.branch || []};
                selectorVatBaht.branchId = {$in: self.branch || []};

                selectorLerRiel.branchId = {$in: self.branch || []};
                selectorLerDollar.branchId = {$in: self.branch || []};
                selectorLerBaht.branchId = {$in: self.branch || []};

                selectorTotRiel.branchId = {$in: self.branch || []};
                selectorTotDollar.branchId = {$in: self.branch || []};
                selectorTotBaht.branchId = {$in: self.branch || []};

                selectorBRiel.branchId = {$in: self.branch || []};
                selectorBDollar.branchId = {$in: self.branch || []};
                selectorBBaht.branchId = {$in: self.branch || []};

                selectorCRiel.branchId = {$in: self.branch || []};
                selectorCDollar.branchId = {$in: self.branch || []};
                selectorCBaht.branchId = {$in: self.branch || []};

                selectorDRiel.branchId = {$in: self.branch || []};
                selectorDDollar.branchId = {$in: self.branch || []};
                selectorDBaht.branchId = {$in: self.branch || []};

                selectorFRiel.branchId = {$in: self.branch || []};
                selectorFDollar.branchId = {$in: self.branch || []};
                selectorFBaht.branchId = {$in: self.branch || []};

                selectorIRiel.branchId = {$in: self.branch || []};
                selectorIDollar.branchId = {$in: self.branch || []};
                selectorIBaht.branchId = {$in: self.branch || []};

                selectorKRiel.branchId = {$in: self.branch || []};
                selectorKDollar.branchId = {$in: self.branch || []};
                selectorKBaht.branchId = {$in: self.branch || []};

                selectorLRiel.branchId = {$in: self.branch || []};
                selectorLDollar.branchId = {$in: self.branch || []};
                selectorLBaht.branchId = {$in: self.branch || []};

                selectorNRiel.branchId = {$in: self.branch || []};
                selectorNDollar.branchId = {$in: self.branch || []};
                selectorNBaht.branchId = {$in: self.branch || []};

                selectorORiel.branchId = {$in: self.branch || []};
                selectorODollar.branchId = {$in: self.branch || []};
                selectorOBaht.branchId = {$in: self.branch || []};

                selectorLoRiel.branchId = {$in: self.branch || []};
                selectorLoDollar.branchId = {$in: self.branch || []};
                selectorLoBaht.branchId = {$in: self.branch || []};
            } else {
                selector.branchId = {$in: userDoc.branch || []};

                selectorARiel.branchId = {$in: userDoc.branch || []};
                selectorADollar.branchId = {$in: userDoc.branch || []};
                selectorABaht.branchId = {$in: userDoc.branch || []};

                selectorA1Riel.branchId = {$in: userDoc.branch || []};
                selectorA1Dollar.branchId = {$in: userDoc.branch || []};
                selectorA1Baht.branchId = {$in: userDoc.branch || []};

                selectorA2Riel.branchId = {$in: userDoc.branch || []};
                selectorA2Dollar.branchId = {$in: userDoc.branch || []};
                selectorA2Baht.branchId = {$in: userDoc.branch || []};

                selectorA3Riel.branchId = {$in: userDoc.branch || []};
                selectorA3Dollar.branchId = {$in: userDoc.branch || []};
                selectorA3Baht.branchId = {$in: userDoc.branch || []};

                selectorA4Riel.branchId = {$in: userDoc.branch || []};
                selectorA4Dollar.branchId = {$in: userDoc.branch || []};
                selectorA4Baht.branchId = {$in: userDoc.branch || []};

                selectorTRiel.branchId = {$in: userDoc.branch || []};
                selectorTDollar.branchId = {$in: userDoc.branch || []};
                selectorTBaht.branchId = {$in: userDoc.branch || []};

                selectorVatRiel.branchId = {$in: userDoc.branch || []};
                selectorVatDollar.branchId = {$in: userDoc.branch || []};
                selectorVatBaht.branchId = {$in: userDoc.branch || []};

                selectorLerRiel.branchId = {$in: userDoc.branch || []};
                selectorLerDollar.branchId = {$in: userDoc.branch || []};
                selectorLerBaht.branchId = {$in: userDoc.branch || []};

                selectorTotRiel.branchId = {$in: userDoc.branch || []};
                selectorTotDollar.branchId = {$in: userDoc.branch || []};
                selectorTotBaht.branchId = {$in: userDoc.branch || []};

                selectorBRiel.branchId = {$in: userDoc.branch || []};
                selectorBDollar.branchId = {$in: userDoc.branch || []};
                selectorBBaht.branchId = {$in: userDoc.branch || []};

                selectorCRiel.branchId = {$in: userDoc.branch || []};
                selectorCDollar.branchId = {$in: userDoc.branch || []};
                selectorCBaht.branchId = {$in: userDoc.branch || []};

                selectorDRiel.branchId = {$in: userDoc.branch || []};
                selectorDDollar.branchId = {$in: userDoc.branch || []};
                selectorDBaht.branchId = {$in: userDoc.branch || []};

                selectorFRiel.branchId = {$in: userDoc.branch || []};
                selectorFDollar.branchId = {$in: userDoc.branch || []};
                selectorFBaht.branchId = {$in: userDoc.branch || []};

                selectorIRiel.branchId = {$in: userDoc.branch || []};
                selectorIDollar.branchId = {$in: userDoc.branch || []};
                selectorIBaht.branchId = {$in: userDoc.branch || []};

                selectorKRiel.branchId = {$in: userDoc.branch || []};
                selectorKDollar.branchId = {$in: userDoc.branch || []};
                selectorKBaht.branchId = {$in: userDoc.branch || []};

                selectorLRiel.branchId = {$in: userDoc.branch || []};
                selectorLDollar.branchId = {$in: userDoc.branch || []};
                selectorLBaht.branchId = {$in: userDoc.branch || []};

                selectorNRiel.branchId = {$in: userDoc.branch || []};
                selectorNDollar.branchId = {$in: userDoc.branch || []};
                selectorNBaht.branchId = {$in: userDoc.branch || []};

                selectorORiel.branchId = {$in: userDoc.branch || []};
                selectorODollar.branchId = {$in: userDoc.branch || []};
                selectorOBaht.branchId = {$in: userDoc.branch || []};

                selectorLoRiel.branchId = {$in: userDoc.branch || []};
                selectorLoDollar.branchId = {$in: userDoc.branch || []};
                selectorLoBaht.branchId = {$in: userDoc.branch || []};
            }


            //Date
            selectorARiel.betDetailDate = self.date;
            selectorADollar.betDetailDate = self.date;
            selectorABaht.betDetailDate = self.date;

            selectorA1Riel.betDetailDate = self.date;
            selectorA1Dollar.betDetailDate = self.date;
            selectorA1Baht.betDetailDate = self.date;

            selectorA2Riel.betDetailDate = self.date;
            selectorA2Dollar.betDetailDate = self.date;
            selectorA2Baht.betDetailDate = self.date;

            selectorA3Riel.betDetailDate = self.date;
            selectorA3Dollar.betDetailDate = self.date;
            selectorA3Baht.betDetailDate = self.date;

            selectorA4Riel.betDetailDate = self.date;
            selectorA4Dollar.betDetailDate = self.date;
            selectorA4Baht.betDetailDate = self.date;

            selectorTRiel.betDetailDate = self.date;
            selectorTDollar.betDetailDate = self.date;
            selectorTBaht.betDetailDate = self.date;


            selectorVatRiel.betDetailDate = self.date;
            selectorVatDollar.betDetailDate = self.date;
            selectorVatBaht.betDetailDate = self.date;


            selectorLerRiel.betDetailDate = self.date;
            selectorLerDollar.betDetailDate = self.date;
            selectorLerBaht.betDetailDate = self.date;


            selectorTotRiel.betDetailDate = self.date;
            selectorTotDollar.betDetailDate = self.date;
            selectorTotBaht.betDetailDate = self.date;

            selectorBRiel.betDetailDate = self.date;
            selectorBDollar.betDetailDate = self.date;
            selectorBBaht.betDetailDate = self.date;

            selectorCRiel.betDetailDate = self.date;
            selectorCDollar.betDetailDate = self.date;
            selectorCBaht.betDetailDate = self.date;

            selectorDRiel.betDetailDate = self.date;
            selectorDDollar.betDetailDate = self.date;
            selectorDBaht.betDetailDate = self.date;

            selectorFRiel.betDetailDate = self.date;
            selectorFDollar.betDetailDate = self.date;
            selectorFBaht.betDetailDate = self.date;

            selectorIRiel.betDetailDate = self.date;
            selectorIDollar.betDetailDate = self.date;
            selectorIBaht.betDetailDate = self.date;

            selectorKRiel.betDetailDate = self.date;
            selectorKDollar.betDetailDate = self.date;
            selectorKBaht.betDetailDate = self.date;

            selectorLRiel.betDetailDate = self.date;
            selectorLDollar.betDetailDate = self.date;
            selectorLBaht.betDetailDate = self.date;

            selectorNRiel.betDetailDate = self.date;
            selectorNDollar.betDetailDate = self.date;
            selectorNBaht.betDetailDate = self.date;

            selectorORiel.betDetailDate = self.date;
            selectorODollar.betDetailDate = self.date;
            selectorOBaht.betDetailDate = self.date;

            selectorLoRiel.betDetailDate = self.date;
            selectorLoDollar.betDetailDate = self.date;
            selectorLoBaht.betDetailDate = self.date;


            data.agentName = t[language].allAgent;


            //    Agent
            if (self.agentId && self.agentId !== "" && self.agentId !== null) {
                selectorARiel.agentId = self.agentId;
                selectorADollar.agentId = self.agentId;
                selectorABaht.agentId = self.agentId;

                selectorA1Riel.agentId = self.agentId;
                selectorA1Dollar.agentId = self.agentId;
                selectorA1Baht.agentId = self.agentId;

                selectorA2Riel.agentId = self.agentId;
                selectorA2Dollar.agentId = self.agentId;
                selectorA2Baht.agentId = self.agentId;

                selectorA3Riel.agentId = self.agentId;
                selectorA3Dollar.agentId = self.agentId;
                selectorA3Baht.agentId = self.agentId;

                selectorA4Riel.agentId = self.agentId;
                selectorA4Dollar.agentId = self.agentId;
                selectorA4Baht.agentId = self.agentId;

                selectorTRiel.agentId = self.agentId;
                selectorTDollar.agentId = self.agentId;
                selectorTBaht.agentId = self.agentId;


                selectorVatRiel.agentId = self.agentId;
                selectorVatDollar.agentId = self.agentId;
                selectorVatBaht.agentId = self.agentId;


                selectorLerRiel.agentId = self.agentId;
                selectorLerDollar.agentId = self.agentId;
                selectorLerBaht.agentId = self.agentId;


                selectorTotRiel.agentId = self.agentId;
                selectorTotDollar.agentId = self.agentId;
                selectorTotBaht.agentId = self.agentId;

                selectorBRiel.agentId = self.agentId;
                selectorBDollar.agentId = self.agentId;
                selectorBBaht.agentId = self.agentId;

                selectorCRiel.agentId = self.agentId;
                selectorCDollar.agentId = self.agentId;
                selectorCBaht.agentId = self.agentId;

                selectorDRiel.agentId = self.agentId;
                selectorDDollar.agentId = self.agentId;
                selectorDBaht.agentId = self.agentId;


                selectorFRiel.agentId = self.agentId;
                selectorFDollar.agentId = self.agentId;
                selectorFBaht.agentId = self.agentId;


                selectorIRiel.agentId = self.agentId;
                selectorIDollar.agentId = self.agentId;
                selectorIBaht.agentId = self.agentId;


                selectorKRiel.agentId = self.agentId;
                selectorKDollar.agentId = self.agentId;
                selectorKBaht.agentId = self.agentId;


                selectorLRiel.agentId = self.agentId;
                selectorLDollar.agentId = self.agentId;
                selectorLBaht.agentId = self.agentId;


                selectorNRiel.agentId = self.agentId;
                selectorNDollar.agentId = self.agentId;
                selectorNBaht.agentId = self.agentId;


                selectorORiel.agentId = self.agentId;
                selectorODollar.agentId = self.agentId;
                selectorOBaht.agentId = self.agentId;

                selectorLoRiel.agentId = self.agentId;
                selectorLoDollar.agentId = self.agentId;
                selectorLoBaht.agentId = self.agentId;

                let agentInfo = LT_Agent.findOne({_id: self.agentId});
                data.agentName = agentInfo.name;
            }

            //    Currency
            selectorARiel.currencyId = "1:KHR";
            selectorADollar.currencyId = "2:USD";
            selectorABaht.currencyId = "3:THB";

            selectorA1Riel.currencyId = "1:KHR";
            selectorA1Dollar.currencyId = "2:USD";
            selectorA1Baht.currencyId = "3:THB";

            selectorA2Riel.currencyId = "1:KHR";
            selectorA2Dollar.currencyId = "2:USD";
            selectorA2Baht.currencyId = "3:THB";

            selectorA3Riel.currencyId = "1:KHR";
            selectorA3Dollar.currencyId = "2:USD";
            selectorA3Baht.currencyId = "3:THB";

            selectorA4Riel.currencyId = "1:KHR";
            selectorA4Dollar.currencyId = "2:USD";
            selectorA4Baht.currencyId = "3:THB";

            selectorTRiel.currencyId = "1:KHR";
            selectorTDollar.currencyId = "2:USD";
            selectorTBaht.currencyId = "3:THB";


            selectorVatRiel.currencyId = "1:KHR";
            selectorVatDollar.currencyId = "2:USD";
            selectorVatBaht.currencyId = "3:THB";


            selectorLerRiel.currencyId = "1:KHR";
            selectorLerDollar.currencyId = "2:USD";
            selectorLerBaht.currencyId = "3:THB";


            selectorTotRiel.currencyId = "1:KHR";
            selectorTotDollar.currencyId = "2:USD";
            selectorTotBaht.currencyId = "3:THB";

            selectorBRiel.currencyId = "1:KHR";
            selectorBDollar.currencyId = "2:USD";
            selectorBBaht.currencyId = "3:THB";

            selectorCRiel.currencyId = "1:KHR";
            selectorCDollar.currencyId = "2:USD";
            selectorCBaht.currencyId = "3:THB";

            selectorDRiel.currencyId = "1:KHR";
            selectorDDollar.currencyId = "2:USD";
            selectorDBaht.currencyId = "3:THB";

            selectorFRiel.currencyId = "1:KHR";
            selectorFDollar.currencyId = "2:USD";
            selectorFBaht.currencyId = "3:THB";

            selectorIRiel.currencyId = "1:KHR";
            selectorIDollar.currencyId = "2:USD";
            selectorIBaht.currencyId = "3:THB";

            selectorKRiel.currencyId = "1:KHR";
            selectorKDollar.currencyId = "2:USD";
            selectorKBaht.currencyId = "3:THB";

            selectorLRiel.currencyId = "1:KHR";
            selectorLDollar.currencyId = "2:USD";
            selectorLBaht.currencyId = "3:THB";

            selectorNRiel.currencyId = "1:KHR";
            selectorNDollar.currencyId = "2:USD";
            selectorNBaht.currencyId = "3:THB";

            selectorORiel.currencyId = "1:KHR";
            selectorODollar.currencyId = "2:USD";
            selectorOBaht.currencyId = "3:THB";

            selectorLoRiel.currencyId = "1:KHR";
            selectorLoDollar.currencyId = "2:USD";
            selectorLoBaht.currencyId = "3:THB";

            // TIme

            if (self.time != "") {
                selectorARiel.time = self.time;
                selectorADollar.time = self.time;
                selectorABaht.time = self.time;

                selectorA1Riel.time = self.time;
                selectorA1Dollar.time = self.time;
                selectorA1Baht.time = self.time;

                selectorA2Riel.time = self.time;
                selectorA2Dollar.time = self.time;
                selectorA2Baht.time = self.time;

                selectorA3Riel.time = self.time;
                selectorA3Dollar.time = self.time;
                selectorA3Baht.time = self.time;

                selectorA4Riel.time = self.time;
                selectorA4Dollar.time = self.time;
                selectorA4Baht.time = self.time;

                selectorTRiel.time = self.time;
                selectorTDollar.time = self.time;
                selectorTBaht.time = self.time;

                selectorVatRiel.time = self.time;
                selectorVatDollar.time = self.time;
                selectorVatBaht.time = self.time;

                selectorLerRiel.time = self.time;
                selectorLerDollar.time = self.time;
                selectorLerBaht.time = self.time;

                selectorTotRiel.time = self.time;
                selectorTotDollar.time = self.time;
                selectorTotBaht.time = self.time;

                selectorBRiel.time = self.time;
                selectorBDollar.time = self.time;
                selectorBBaht.time = self.time;

                selectorCRiel.time = self.time;
                selectorCDollar.time = self.time;
                selectorCBaht.time = self.time;

                selectorDRiel.time = self.time;
                selectorDDollar.time = self.time;
                selectorDBaht.time = self.time;


                selectorFRiel.time = self.time;
                selectorFDollar.time = self.time;
                selectorFBaht.time = self.time;


                selectorIRiel.time = self.time;
                selectorIDollar.time = self.time;
                selectorIBaht.time = self.time;


                selectorKRiel.time = self.time;
                selectorKDollar.time = self.time;
                selectorKBaht.time = self.time;


                selectorLRiel.time = self.time;
                selectorLDollar.time = self.time;
                selectorLBaht.time = self.time;


                selectorNRiel.time = self.time;
                selectorNDollar.time = self.time;
                selectorNBaht.time = self.time;


                selectorORiel.time = self.time;
                selectorODollar.time = self.time;
                selectorOBaht.time = self.time;

                selectorLoRiel.time = self.time;
                selectorLoDollar.time = self.time;
                selectorLoBaht.time = self.time;

            }


            // Call Method
            let dataARiel = Meteor.call('lottery_betDetailGroupByNumber', selectorARiel);
            let dataADollar = Meteor.call('lottery_betDetailGroupByNumber', selectorADollar);
            let dataABaht = Meteor.call('lottery_betDetailGroupByNumber', selectorABaht);

            let dataA1Riel = Meteor.call('lottery_betDetailGroupByNumber', selectorA1Riel);
            let dataA1Dollar = Meteor.call('lottery_betDetailGroupByNumber', selectorA1Dollar);
            let dataA1Baht = Meteor.call('lottery_betDetailGroupByNumber', selectorA1Baht);

            let dataA2Riel = Meteor.call('lottery_betDetailGroupByNumber', selectorA2Riel);
            let dataA2Dollar = Meteor.call('lottery_betDetailGroupByNumber', selectorA2Dollar);
            let dataA2Baht = Meteor.call('lottery_betDetailGroupByNumber', selectorA2Baht);

            let dataA3Riel = Meteor.call('lottery_betDetailGroupByNumber', selectorA3Riel);
            let dataA3Dollar = Meteor.call('lottery_betDetailGroupByNumber', selectorA3Dollar);
            let dataA3Baht = Meteor.call('lottery_betDetailGroupByNumber', selectorA3Baht);

            let dataA4Riel = Meteor.call('lottery_betDetailGroupByNumber', selectorA4Riel);
            let dataA4Dollar = Meteor.call('lottery_betDetailGroupByNumber', selectorA4Dollar);
            let dataA4Baht = Meteor.call('lottery_betDetailGroupByNumber', selectorA4Baht);

            let dataTRiel = Meteor.call('lottery_betDetailGroupByNumber', selectorTRiel);
            let dataTDollar = Meteor.call('lottery_betDetailGroupByNumber', selectorTDollar);
            let dataTBaht = Meteor.call('lottery_betDetailGroupByNumber', selectorTBaht);

            let dataVatRiel = Meteor.call('lottery_betDetailGroupByNumber', selectorVatRiel);
            let dataVatDollar = Meteor.call('lottery_betDetailGroupByNumber', selectorVatDollar);
            let dataVatBaht = Meteor.call('lottery_betDetailGroupByNumber', selectorVatBaht);

            let dataLerRiel = Meteor.call('lottery_betDetailGroupByNumber', selectorLerRiel);
            let dataLerDollar = Meteor.call('lottery_betDetailGroupByNumber', selectorLerDollar);
            let dataLerBaht = Meteor.call('lottery_betDetailGroupByNumber', selectorLerBaht);

            let dataTotRiel = Meteor.call('lottery_betDetailGroupByNumber', selectorTotRiel);
            let dataTotDollar = Meteor.call('lottery_betDetailGroupByNumber', selectorTotDollar);
            let dataTotBaht = Meteor.call('lottery_betDetailGroupByNumber', selectorTotBaht);

            let dataBRiel = Meteor.call('lottery_betDetailGroupByNumber', selectorBRiel);
            let dataBDollar = Meteor.call('lottery_betDetailGroupByNumber', selectorBDollar);
            let dataBBaht = Meteor.call('lottery_betDetailGroupByNumber', selectorBBaht);

            let dataCRiel = Meteor.call('lottery_betDetailGroupByNumber', selectorCRiel);
            let dataCDollar = Meteor.call('lottery_betDetailGroupByNumber', selectorCDollar);
            let dataCBaht = Meteor.call('lottery_betDetailGroupByNumber', selectorCBaht);

            let dataDRiel = Meteor.call('lottery_betDetailGroupByNumber', selectorDRiel);
            let dataDDollar = Meteor.call('lottery_betDetailGroupByNumber', selectorDDollar);
            let dataDBaht = Meteor.call('lottery_betDetailGroupByNumber', selectorDBaht);


            let dataFRiel = Meteor.call('lottery_betDetailGroupByNumber', selectorFRiel);
            let dataFDollar = Meteor.call('lottery_betDetailGroupByNumber', selectorFDollar);
            let dataFBaht = Meteor.call('lottery_betDetailGroupByNumber', selectorFBaht);


            let dataIRiel = Meteor.call('lottery_betDetailGroupByNumber', selectorIRiel);
            let dataIDollar = Meteor.call('lottery_betDetailGroupByNumber', selectorIDollar);
            let dataIBaht = Meteor.call('lottery_betDetailGroupByNumber', selectorIBaht);


            let dataKRiel = Meteor.call('lottery_betDetailGroupByNumber', selectorKRiel);
            let dataKDollar = Meteor.call('lottery_betDetailGroupByNumber', selectorKDollar);
            let dataKBaht = Meteor.call('lottery_betDetailGroupByNumber', selectorKBaht);


            let dataLRiel = Meteor.call('lottery_betDetailGroupByNumber', selectorLRiel);
            let dataLDollar = Meteor.call('lottery_betDetailGroupByNumber', selectorLDollar);
            let dataLBaht = Meteor.call('lottery_betDetailGroupByNumber', selectorLBaht);


            let dataNRiel = Meteor.call('lottery_betDetailGroupByNumber', selectorNRiel);
            let dataNDollar = Meteor.call('lottery_betDetailGroupByNumber', selectorNDollar);
            let dataNBaht = Meteor.call('lottery_betDetailGroupByNumber', selectorNBaht);


            let dataORiel = Meteor.call('lottery_betDetailGroupByNumber', selectorORiel);
            let dataODollar = Meteor.call('lottery_betDetailGroupByNumber', selectorODollar);
            let dataOBaht = Meteor.call('lottery_betDetailGroupByNumber', selectorOBaht);

            let dataLoRiel = Meteor.call('lottery_betDetailGroupByNumber', selectorLoRiel);
            let dataLoDollar = Meteor.call('lottery_betDetailGroupByNumber', selectorLoDollar);
            let dataLoBaht = Meteor.call('lottery_betDetailGroupByNumber', selectorLoBaht);

            dataARiel.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: '0A',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: '0A',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                }
            })

            dataADollar.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: '0A',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: '0A',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                }
            })

            dataABaht.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: '0A',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: '0A',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                }
            })


            dataBRiel.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: '1B',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: '1B',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                }
            })

            dataBDollar.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: '1B',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: '1B',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                }
            })

            dataBBaht.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: '1B',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: '1B',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                }
            })


            dataCRiel.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: '2C',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: '2C',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                }
            })

            dataCDollar.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: '2C',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: '2C',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                }
            })

            dataCBaht.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: '2C',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: '2C',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                }
            })

            dataDRiel.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: '3D',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: '3D',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                }
            })

            dataDDollar.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: '3D',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: '3D',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                }
            })

            dataDBaht.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: '3D',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: '3D',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                }
            })


            dataFRiel.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'F',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'F',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                }
            })

            dataFDollar.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'F',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'F',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                }
            })

            dataFBaht.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'F',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: '3D',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                }
            })


            dataIRiel.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'I',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'I',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                }
            })

            dataIDollar.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'I',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'I',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                }
            })

            dataIBaht.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'I',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'I',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                }
            })


            dataKRiel.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'K',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'K',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                }
            })

            dataKDollar.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'K',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'K',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                }
            })

            dataKBaht.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'K',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'K',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                }
            })


            dataLRiel.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'L',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'L',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                }
            })

            dataLDollar.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'L',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'L',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                }
            })

            dataLBaht.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'L',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'L',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                }
            })


            dataNRiel.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'N',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'N',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                }
            })

            dataNDollar.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'N',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'N',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                }
            })

            dataNBaht.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'N',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'N',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                }
            })


            dataORiel.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'O',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'O',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                }
            })

            dataODollar.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'O',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'O',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                }
            })

            dataOBaht.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'O',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'O',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                }
            })

            dataLoRiel.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: '5Lo',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: '5Lo',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                }
            })
            dataLoDollar.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: '5Lo',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: '5Lo',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                }
            })
            dataLoBaht.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: '5Lo',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: '5Lo',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                }
            })









            dataA1Riel.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'A1',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'A1',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                }
            })

            dataA1Dollar.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'A1',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'A1',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                }
            })

            dataA1Baht.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'A1',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'A1',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                }
            })










            dataA2Riel.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'A2',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'A2',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                }
            })

            dataA2Dollar.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'A2',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'A2',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                }
            })

            dataA2Baht.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'A2',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'A2',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                }
            })










            dataA3Riel.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'A3',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'A3',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                }
            })

            dataA3Dollar.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'A3',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'A3',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                }
            })

            dataA3Baht.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'A3',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'A3',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                }
            })










            dataA4Riel.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'A4',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'A4',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                }
            })

            dataA4Dollar.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'A4',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'A4',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                }
            })

            dataA4Baht.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'A4',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'A4',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                }
            })










            dataTRiel.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'T',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'T',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                }
            })

            dataTDollar.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'T',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'T',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                }
            })

            dataTBaht.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'T',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'T',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                }
            })







            dataVatRiel.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'Vat',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'Vat',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                }
            })

            dataVatDollar.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'Vat',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'Vat',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                }
            })

            dataVatBaht.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'Vat',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'Vat',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                }
            })



            dataTotRiel.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'Tot',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'Tot',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                }
            })

            dataTotDollar.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'Tot',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'Tot',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                }
            })

            dataTotBaht.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'Tot',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'Tot',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                }
            })







            dataLerRiel.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'Ler',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'Ler',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '1:KHR'
                    })
                }
            })

            dataLerDollar.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'Ler',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'Ler',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '2:USD'
                    })
                }
            })

            dataLerBaht.forEach(function (obj) {
                if (obj._id.betNumber.length === 2) {
                    result2D.push({
                        post: 'Ler',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                } else if (obj._id.betNumber.length === 3) {
                    result3D.push({
                        post: 'Ler',
                        number: obj._id.betNumber,
                        amount: obj.total,
                        currency: '3:THB'
                    })
                }
            })












            let result2DFinal = [];
            let result3DFinal = [];
            result2D.reduce(function (key, val) {

                let amountARielFinal = 0;
                let amountA1RielFinal = 0;
                let amountA2RielFinal = 0;
                let amountA3RielFinal = 0;
                let amountA4RielFinal = 0;
                let amountTRielFinal = 0;
                let amountVatRielFinal = 0;
                let amountLerRielFinal = 0;
                let amountTotRielFinal = 0;
                let amountBRielFinal = 0;
                let amountCRielFinal = 0;
                let amountDRielFinal = 0;
                let amountFRielFinal = 0;
                let amountIRielFinal = 0;
                let amountKRielFinal = 0;
                let amountLRielFinal = 0;
                let amountNRielFinal = 0;
                let amountORielFinal = 0;
                let amountLoRielFinal = 0;

                let amountADollarFinal = 0;
                let amountA1DollarFinal = 0;
                let amountA2DollarFinal = 0;
                let amountA3DollarFinal = 0;
                let amountA4DollarFinal = 0;
                let amountTDollarFinal = 0;
                let amountVatDollarFinal = 0;
                let amountLerDollarFinal = 0;
                let amountTotDollarFinal = 0;
                let amountBDollarFinal = 0;
                let amountCDollarFinal = 0;
                let amountDDollarFinal = 0;
                let amountFDollarFinal = 0;
                let amountIDollarFinal = 0;
                let amountKDollarFinal = 0;
                let amountLDollarFinal = 0;
                let amountNDollarFinal = 0;
                let amountODollarFinal = 0;
                let amountLoDollarFinal = 0;

                let amountABahtFinal = 0;
                let amountA1BahtFinal = 0;
                let amountA2BahtFinal = 0;
                let amountA3BahtFinal = 0;
                let amountA4BahtFinal = 0;
                let amountTBahtFinal = 0;
                let amountVatBahtFinal = 0;
                let amountLerBahtFinal = 0;
                let amountTotBahtFinal = 0;
                let amountBBahtFinal = 0;
                let amountCBahtFinal = 0;
                let amountDBahtFinal = 0;
                let amountFBahtFinal = 0;
                let amountIBahtFinal = 0;
                let amountKBahtFinal = 0;
                let amountLBahtFinal = 0;
                let amountNBahtFinal = 0;
                let amountOBahtFinal = 0;
                let amountLoBahtFinal = 0;

                if (val.currency === '1:KHR') {
                    if (val.post === '0A') {
                        amountARielFinal = val.amount;
                    } else if (val.post === '1B') {
                        amountBRielFinal = val.amount;
                    } else if (val.post === '2C') {
                        amountCRielFinal = val.amount;
                    } else if (val.post === '3D') {
                        amountDRielFinal = val.amount;
                    } else if (val.post === 'F') {
                        amountFRielFinal = val.amount;
                    } else if (val.post === 'I') {
                        amountIRielFinal = val.amount;
                    } else if (val.post === 'K') {
                        amountKRielFinal = val.amount;
                    } else if (val.post === 'L') {
                        amountLRielFinal = val.amount;
                    } else if (val.post === 'N') {
                        amountNRielFinal = val.amount;
                    } else if (val.post === 'O') {
                        amountORielFinal = val.amount;
                    } else if (val.post === 'A1') {
                        amountA1RielFinal = val.amount;
                    } else if (val.post === 'A2') {
                        amountA2RielFinal = val.amount;
                    } else if (val.post === 'A3') {
                        amountA3RielFinal = val.amount;
                    } else if (val.post === 'A4') {
                        amountA4RielFinal = val.amount;
                    } else if (val.post === 'T') {
                        amountTRielFinal = val.amount;
                    } else if (val.post === 'Vat') {
                        amountVatRielFinal = val.amount;
                    } else if (val.post === 'Ler') {
                        amountLerRielFinal = val.amount;
                    } else if (val.post === 'Tot') {
                        amountTotRielFinal = val.amount;
                    } else if (val.post === '5Lo') {
                        amountLoRielFinal = val.amount;
                    }
                } else if (val.currency === '2:USD') {
                    if (val.post === '0A') {
                        amountADollarFinal = val.amount;
                    } else if (val.post === '1B') {
                        amountBDollarFinal = val.amount;
                    } else if (val.post === '2C') {
                        amountCDollarFinal = val.amount;
                    } else if (val.post === '3D') {
                        amountDDollarFinal = val.amount;
                    }else if (val.post === 'F') {
                        amountFDollarFinal = val.amount;
                    } else if (val.post === 'I') {
                        amountIDollarFinal = val.amount;
                    } else if (val.post === 'K') {
                        amountKDollarFinal = val.amount;
                    } else if (val.post === 'L') {
                        amountLDollarFinal = val.amount;
                    } else if (val.post === 'N') {
                        amountNDollarFinal = val.amount;
                    } else if (val.post === 'O') {
                        amountODollarFinal = val.amount;
                    } else if (val.post === 'A1') {
                        amountA1DollarFinal = val.amount;
                    } else if (val.post === 'A2') {
                        amountA2DollarFinal = val.amount;
                    } else if (val.post === 'A3') {
                        amountA3DollarFinal = val.amount;
                    } else if (val.post === 'A4') {
                        amountA4DollarFinal = val.amount;
                    } else if (val.post === 'T') {
                        amountTDollarFinal = val.amount;
                    } else if (val.post === 'Vat') {
                        amountVatDollarFinal = val.amount;
                    } else if (val.post === 'Ler') {
                        amountLerDollarFinal = val.amount;
                    } else if (val.post === 'Tot') {
                        amountTotDollarFinal = val.amount;
                    }  else if (val.post === '5Lo') {
                        amountLoDollarFinal = val.amount;
                    }
                } else if (val.currency === '3:THB') {
                    if (val.post === '0A') {
                        amountABahtFinal = val.amount;
                    } else if (val.post === '1B') {
                        amountBBahtFinal = val.amount;
                    } else if (val.post === '2C') {
                        amountCBahtFinal = val.amount;
                    } else if (val.post === '3D') {
                        amountDBahtFinal = val.amount;
                    }else if (val.post === 'F') {
                        amountFBahtFinal = val.amount;
                    } else if (val.post === 'I') {
                        amountIBahtFinal = val.amount;
                    } else if (val.post === 'K') {
                        amountKBahtFinal = val.amount;
                    } else if (val.post === 'L') {
                        amountLBahtFinal = val.amount;
                    } else if (val.post === 'N') {
                        amountNBahtFinal = val.amount;
                    } else if (val.post === 'O') {
                        amountOBahtFinal = val.amount;
                    }else if (val.post === 'A1') {
                        amountA1BahtFinal = val.amount;
                    }else if (val.post === 'A2') {
                        amountA2BahtFinal = val.amount;
                    }else if (val.post === 'A3') {
                        amountA3BahtFinal = val.amount;
                    }else if (val.post === 'A4') {
                        amountA4BahtFinal = val.amount;
                    }else if (val.post === 'T') {
                        amountTBahtFinal = val.amount;
                    }else if (val.post === 'Vat') {
                        amountVatBahtFinal = val.amount;
                    }else if (val.post === 'Ler') {
                        amountLerBahtFinal = val.amount;
                    }else if (val.post === 'Tot') {
                        amountTotBahtFinal = val.amount;
                    }  else if (val.post === '5Lo') {
                        amountLoBahtFinal = val.amount;
                    }
                }


                if (!key[val.number]) {
                    key[val.number] = {
                        post: val.post,
                        number: val.number,
                        amountARiel: amountARielFinal,
                        amountBRiel: amountBRielFinal,
                        amountCRiel: amountCRielFinal,
                        amountDRiel: amountDRielFinal,
                        amountFRiel: amountFRielFinal,
                        amountIRiel: amountIRielFinal,
                        amountKRiel: amountKRielFinal,
                        amountLRiel: amountLRielFinal,
                        amountNRiel: amountNRielFinal,
                        amountORiel: amountORielFinal,
                        amountA1Riel: amountA1RielFinal,
                        amountA2Riel: amountA2RielFinal,
                        amountA3Riel: amountA3RielFinal,
                        amountA4Riel: amountA4RielFinal,
                        amountTRiel: amountTRielFinal,
                        amountVatRiel: amountVatRielFinal,
                        amountLerRiel: amountLerRielFinal,
                        amountTotRiel: amountTotRielFinal,
                        amountLoRiel: amountLoRielFinal,

                        amountADollar: amountADollarFinal,
                        amountBDollar: amountBDollarFinal,
                        amountCDollar: amountCDollarFinal,
                        amountDDollar: amountDDollarFinal,

                        amountFDollar: amountFDollarFinal,
                        amountIDollar: amountIDollarFinal,
                        amountKDollar: amountKDollarFinal,
                        amountLDollar: amountLDollarFinal,
                        amountNDollar: amountNDollarFinal,
                        amountODollar: amountODollarFinal,
                        amountA1Dollar: amountA1DollarFinal,
                        amountA2Dollar: amountA2DollarFinal,
                        amountA3Dollar: amountA3DollarFinal,
                        amountA4Dollar: amountA4DollarFinal,
                        amountTDollar: amountTDollarFinal,
                        amountVatDollar: amountVatDollarFinal,
                        amountLerDollar: amountLerDollarFinal,
                        amountTotDollar: amountTotDollarFinal,
                        amountLoDollar: amountLoDollarFinal,

                        amountABaht: amountABahtFinal,
                        amountBBaht: amountBBahtFinal,
                        amountCBaht: amountCBahtFinal,
                        amountDBaht: amountDBahtFinal,

                        amountFBaht: amountFBahtFinal,
                        amountIBaht: amountIBahtFinal,
                        amountKBaht: amountKBahtFinal,
                        amountLBaht: amountLBahtFinal,
                        amountNBaht: amountNBahtFinal,
                        amountOBaht: amountOBahtFinal,
                        amountA1Baht: amountA1BahtFinal,
                        amountA2Baht: amountA2BahtFinal,
                        amountA3Baht: amountA3BahtFinal,
                        amountA4Baht: amountA4BahtFinal,
                        amountTBaht: amountTBahtFinal,
                        amountVatBaht: amountVatBahtFinal,
                        amountLerBaht: amountLerBahtFinal,
                        amountTotBaht: amountTotBahtFinal,
                        amountLoBaht: amountLoBahtFinal

                    };
                    result2DFinal.push(key[val.number]);
                } else {
                    key[val.number].amountARiel += amountARielFinal;
                    key[val.number].amountBRiel += amountBRielFinal;
                    key[val.number].amountCRiel += amountCRielFinal;
                    key[val.number].amountDRiel += amountDRielFinal;
                    key[val.number].amountFRiel += amountFRielFinal;
                    key[val.number].amountIRiel += amountIRielFinal;
                    key[val.number].amountKRiel += amountKRielFinal;
                    key[val.number].amountLRiel += amountLRielFinal;
                    key[val.number].amountNRiel += amountNRielFinal;
                    key[val.number].amountORiel += amountORielFinal;
                    key[val.number].amountA1Riel += amountA1RielFinal;
                    key[val.number].amountA2Riel += amountA2RielFinal;
                    key[val.number].amountA3Riel += amountA3RielFinal;
                    key[val.number].amountA4Riel += amountA4RielFinal;
                    key[val.number].amountTRiel += amountTRielFinal;
                    key[val.number].amountVatRiel += amountVatRielFinal;
                    key[val.number].amountLerRiel += amountLerRielFinal;
                    key[val.number].amountTotRiel += amountTotRielFinal;
                    key[val.number].amountLoRiel += amountLoRielFinal;

                    key[val.number].amountADollar += amountADollarFinal;
                    key[val.number].amountBDollar += amountBDollarFinal;
                    key[val.number].amountCDollar += amountCDollarFinal;
                    key[val.number].amountDDollar += amountDDollarFinal;
                    key[val.number].amountFDollar += amountFDollarFinal;
                    key[val.number].amountIDollar += amountIDollarFinal;
                    key[val.number].amountKDollar += amountKDollarFinal;
                    key[val.number].amountLDollar += amountLDollarFinal;
                    key[val.number].amountNDollar += amountNDollarFinal;
                    key[val.number].amountODollar += amountODollarFinal;
                    key[val.number].amountA1Dollar += amountA1DollarFinal;
                    key[val.number].amountA2Dollar += amountA2DollarFinal;
                    key[val.number].amountA3Dollar += amountA3DollarFinal;
                    key[val.number].amountA4Dollar += amountA4DollarFinal;
                    key[val.number].amountTDollar += amountTDollarFinal;
                    key[val.number].amountVatDollar += amountVatDollarFinal;
                    key[val.number].amountLerDollar += amountLerDollarFinal;
                    key[val.number].amountTotDollar += amountTotDollarFinal;
                    key[val.number].amountLoDollar += amountLoDollarFinal;

                    key[val.number].amountABaht += amountABahtFinal;
                    key[val.number].amountBBaht += amountBBahtFinal;
                    key[val.number].amountCBaht += amountCBahtFinal;
                    key[val.number].amountDBaht += amountDBahtFinal;
                    key[val.number].amountFBaht += amountFBahtFinal;
                    key[val.number].amountIBaht += amountIBahtFinal;
                    key[val.number].amountKBaht += amountKBahtFinal;
                    key[val.number].amountLBaht += amountLBahtFinal;
                    key[val.number].amountNBaht += amountNBahtFinal;
                    key[val.number].amountOBaht += amountOBahtFinal;
                    key[val.number].amountA1Baht += amountA1BahtFinal;
                    key[val.number].amountA2Baht += amountA2BahtFinal;
                    key[val.number].amountA3Baht += amountA3BahtFinal;
                    key[val.number].amountA4Baht += amountA4BahtFinal;
                    key[val.number].amountTBaht += amountTBahtFinal;
                    key[val.number].amountVatBaht += amountVatBahtFinal;
                    key[val.number].amountLerBaht += amountLerBahtFinal;
                    key[val.number].amountTotBaht += amountTotBahtFinal;
                    key[val.number].amountLoBaht += amountLoBahtFinal;


                }
                return key;
            }, {});

            let maxARiel;
            let maxBRiel;
            let maxCRiel;
            let maxDRiel;
            let maxFRiel;
            let maxIRiel;
            let maxKRiel;
            let maxLRiel;
            let maxNRiel;
            let maxORiel;
            let maxA1Riel;
            let maxA2Riel;
            let maxA3Riel;
            let maxA4Riel;
            let maxTRiel;
            let maxVatRiel;
            let maxLerRiel;
            let maxTotRiel;
            let maxLoRiel;

            let maxADollar;
            let maxBDollar;
            let maxCDollar;
            let maxDDollar;
            let maxFDollar;
            let maxIDollar;
            let maxKDollar;
            let maxLDollar;
            let maxNDollar;
            let maxODollar;
            let maxA1Dollar;
            let maxA2Dollar;
            let maxA3Dollar;
            let maxA4Dollar;
            let maxTDollar;
            let maxVatDollar;
            let maxLerDollar;
            let maxTotDollar;
            let maxLoDollar;

            let maxABaht;
            let maxBBaht;
            let maxCBaht;
            let maxDBaht;
            let maxFBaht;
            let maxIBaht;
            let maxKBaht;
            let maxLBaht;
            let maxNBaht;
            let maxOBaht;
            let maxA1Baht;
            let maxA2Baht;
            let maxA3Baht;
            let maxA4Baht;
            let maxTBaht;
            let maxVatBaht;
            let maxLerBaht;
            let maxTotBaht;
            let maxLoBaht;


            if (result2DFinal.length !== 0) {
                maxARiel = finder(Math.max, result2DFinal, "amountARiel");
                maxBRiel = finder(Math.max, result2DFinal, "amountBRiel");
                maxCRiel = finder(Math.max, result2DFinal, "amountCRiel");
                maxDRiel = finder(Math.max, result2DFinal, "amountDRiel");
                maxFRiel = finder(Math.max, result2DFinal, "amountFRiel");
                maxIRiel = finder(Math.max, result2DFinal, "amountIRiel");
                maxKRiel = finder(Math.max, result2DFinal, "amountKRiel");
                maxLRiel = finder(Math.max, result2DFinal, "amountLRiel");
                maxNRiel = finder(Math.max, result2DFinal, "amountNRiel");
                maxORiel = finder(Math.max, result2DFinal, "amountORiel");
                maxA1Riel = finder(Math.max, result2DFinal, "amountA1Riel");
                maxA2Riel = finder(Math.max, result2DFinal, "amountA2Riel");
                maxA3Riel = finder(Math.max, result2DFinal, "amountA3Riel");
                maxA4Riel = finder(Math.max, result2DFinal, "amountA4Riel");
                maxTRiel = finder(Math.max, result2DFinal, "amountTRiel");
                maxVatRiel = finder(Math.max, result2DFinal, "amountVatRiel");
                maxLerRiel = finder(Math.max, result2DFinal, "amountLerRiel");
                maxTotRiel = finder(Math.max, result2DFinal, "amountTotRiel");
                maxLoRiel = finder(Math.max, result2DFinal, "amountLoRiel");

                maxADollar = finder(Math.max, result2DFinal, "amountADollar");
                maxBDollar = finder(Math.max, result2DFinal, "amountBDollar");
                maxCDollar = finder(Math.max, result2DFinal, "amountCDollar");
                maxDDollar = finder(Math.max, result2DFinal, "amountDDollar");
                maxFDollar = finder(Math.max, result2DFinal, "amountFDollar");
                maxIDollar = finder(Math.max, result2DFinal, "amountIDollar");
                maxKDollar = finder(Math.max, result2DFinal, "amountKDollar");
                maxLDollar = finder(Math.max, result2DFinal, "amountLDollar");
                maxNDollar = finder(Math.max, result2DFinal, "amountNDollar");
                maxODollar = finder(Math.max, result2DFinal, "amountODollar");
                maxA1Dollar = finder(Math.max, result2DFinal, "amountA1Dollar");
                maxA2Dollar = finder(Math.max, result2DFinal, "amountA2Dollar");
                maxA3Dollar = finder(Math.max, result2DFinal, "amountA3Dollar");
                maxA4Dollar = finder(Math.max, result2DFinal, "amountA4Dollar");
                maxTDollar = finder(Math.max, result2DFinal, "amountTDollar");
                maxVatDollar = finder(Math.max, result2DFinal, "amountVatDollar");
                maxLerDollar = finder(Math.max, result2DFinal, "amountLerDollar");
                maxTotDollar = finder(Math.max, result2DFinal, "amountTotDollar");
                maxLoDollar = finder(Math.max, result2DFinal, "amountLoDollar");

                maxABaht = finder(Math.max, result2DFinal, "amountABaht");
                maxBBaht = finder(Math.max, result2DFinal, "amountBBaht");
                maxCBaht = finder(Math.max, result2DFinal, "amountCBaht");
                maxDBaht = finder(Math.max, result2DFinal, "amountDBaht");
                maxFBaht = finder(Math.max, result2DFinal, "amountFBaht");
                maxIBaht = finder(Math.max, result2DFinal, "amountIBaht");
                maxKBaht = finder(Math.max, result2DFinal, "amountKBaht");
                maxLBaht = finder(Math.max, result2DFinal, "amountLBaht");
                maxNBaht = finder(Math.max, result2DFinal, "amountNBaht");
                maxOBaht = finder(Math.max, result2DFinal, "amountOBaht");
                maxA1Baht = finder(Math.max, result2DFinal, "amountA1Baht");
                maxA2Baht = finder(Math.max, result2DFinal, "amountA2Baht");
                maxA3Baht = finder(Math.max, result2DFinal, "amountA3Baht");
                maxA4Baht = finder(Math.max, result2DFinal, "amountA4Baht");
                maxTBaht = finder(Math.max, result2DFinal, "amountTBaht");
                maxVatBaht = finder(Math.max, result2DFinal, "amountVatBaht");
                maxLerBaht = finder(Math.max, result2DFinal, "amountLerBaht");
                maxTotBaht = finder(Math.max, result2DFinal, "amountTotBaht");
                maxLoBaht = finder(Math.max, result2DFinal, "amountLoBaht");
            }
            result3D.reduce(function (key, val) {

                let amountARielFinal = 0;
                let amountBRielFinal = 0;
                let amountCRielFinal = 0;
                let amountDRielFinal = 0;
                let amountFRielFinal = 0;
                let amountIRielFinal = 0;
                let amountKRielFinal = 0;
                let amountLRielFinal = 0;
                let amountNRielFinal = 0;
                let amountORielFinal = 0;
                let amountA1RielFinal = 0;
                let amountA2RielFinal = 0;
                let amountA3RielFinal = 0;
                let amountA4RielFinal = 0;
                let amountTRielFinal = 0;
                let amountVatRielFinal = 0;
                let amountLerRielFinal = 0;
                let amountTotRielFinal = 0;
                let amountLoRielFinal = 0;

                let amountADollarFinal = 0;
                let amountBDollarFinal = 0;
                let amountCDollarFinal = 0;
                let amountDDollarFinal = 0;
                let amountFDollarFinal = 0;
                let amountIDollarFinal = 0;
                let amountKDollarFinal = 0;
                let amountLDollarFinal = 0;
                let amountNDollarFinal = 0;
                let amountODollarFinal = 0;
                let amountA1DollarFinal = 0;
                let amountA2DollarFinal = 0;
                let amountA3DollarFinal = 0;
                let amountA4DollarFinal = 0;
                let amountTDollarFinal = 0;
                let amountVatDollarFinal = 0;
                let amountLerDollarFinal = 0;
                let amountTotDollarFinal = 0;
                let amountLoDollarFinal = 0;

                let amountABahtFinal = 0;
                let amountBBahtFinal = 0;
                let amountCBahtFinal = 0;
                let amountDBahtFinal = 0;
                let amountFBahtFinal = 0;
                let amountIBahtFinal = 0;
                let amountKBahtFinal = 0;
                let amountLBahtFinal = 0;
                let amountNBahtFinal = 0;
                let amountOBahtFinal = 0;
                let amountA1BahtFinal = 0;
                let amountA2BahtFinal = 0;
                let amountA3BahtFinal = 0;
                let amountA4BahtFinal = 0;
                let amountTBahtFinal = 0;
                let amountVatBahtFinal = 0;
                let amountLerBahtFinal = 0;
                let amountTotBahtFinal = 0;
                let amountLoBahtFinal = 0;

                if (val.currency === '1:KHR') {
                    if (val.post === '0A') {
                        amountARielFinal = val.amount;
                    } else if (val.post === '1B') {
                        amountBRielFinal = val.amount;
                    } else if (val.post === '2C') {
                        amountCRielFinal = val.amount;
                    } else if (val.post === '3D') {
                        amountDRielFinal = val.amount;
                    } else if (val.post === 'F') {
                        amountFRielFinal = val.amount;
                    } else if (val.post === 'I') {
                        amountIRielFinal = val.amount;
                    } else if (val.post === 'K') {
                        amountKRielFinal = val.amount;
                    } else if (val.post === 'L') {
                        amountLRielFinal = val.amount;
                    } else if (val.post === 'N') {
                        amountNRielFinal = val.amount;
                    } else if (val.post === 'O') {
                        amountORielFinal = val.amount;
                    }else if (val.post === 'A1') {
                        amountA1RielFinal = val.amount;
                    }else if (val.post === 'A2') {
                        amountA2RielFinal = val.amount;
                    }else if (val.post === 'A3') {
                        amountA3RielFinal = val.amount;
                    }else if (val.post === 'A4') {
                        amountA4RielFinal = val.amount;
                    }else if (val.post === 'T') {
                        amountTRielFinal = val.amount;
                    }else if (val.post === 'Vat') {
                        amountVatRielFinal = val.amount;
                    }else if (val.post === 'Ler') {
                        amountLerRielFinal = val.amount;
                    }else if (val.post === 'Tot') {
                        amountTotRielFinal = val.amount;
                    } else if (val.post === '5Lo') {
                        amountLoRielFinal = val.amount;
                    }
                } else if (val.currency === '2:USD') {
                    if (val.post === '0A') {
                        amountADollarFinal = val.amount;
                    } else if (val.post === '1B') {
                        amountBDollarFinal = val.amount;
                    } else if (val.post === '2C') {
                        amountCDollarFinal = val.amount;
                    } else if (val.post === '3D') {
                        amountDDollarFinal = val.amount;
                    }else if (val.post === 'F') {
                        amountFDollarFinal = val.amount;
                    } else if (val.post === 'I') {
                        amountIDollarFinal = val.amount;
                    } else if (val.post === 'K') {
                        amountKDollarFinal = val.amount;
                    } else if (val.post === 'L') {
                        amountLDollarFinal = val.amount;
                    } else if (val.post === 'N') {
                        amountNDollarFinal = val.amount;
                    } else if (val.post === 'O') {
                        amountODollarFinal = val.amount;
                    }else if (val.post === 'A1') {
                        amountA1DollarFinal = val.amount;
                    }else if (val.post === 'A2') {
                        amountA2DollarFinal = val.amount;
                    }else if (val.post === 'A3') {
                        amountA3DollarFinal = val.amount;
                    }else if (val.post === 'A4') {
                        amountA4DollarFinal = val.amount;
                    }else if (val.post === 'T') {
                        amountTDollarFinal = val.amount;
                    }else if (val.post === 'Vat') {
                        amountVatDollarFinal = val.amount;
                    }else if (val.post === 'Ler') {
                        amountLerDollarFinal = val.amount;
                    }else if (val.post === 'Tot') {
                        amountTotDollarFinal = val.amount;
                    }  else if (val.post === '5Lo') {
                        amountLoDollarFinal = val.amount;
                    }
                } else if (val.currency === '3:THB') {
                    if (val.post === '0A') {
                        amountABahtFinal = val.amount;
                    } else if (val.post === '1B') {
                        amountBBahtFinal = val.amount;
                    } else if (val.post === '2C') {
                        amountCBahtFinal = val.amount;
                    } else if (val.post === '3D') {
                        amountDBahtFinal = val.amount;
                    }else if (val.post === 'F') {
                        amountFBahtFinal = val.amount;
                    } else if (val.post === 'I') {
                        amountIBahtFinal = val.amount;
                    } else if (val.post === 'K') {
                        amountKBahtFinal = val.amount;
                    } else if (val.post === 'L') {
                        amountLBahtFinal = val.amount;
                    } else if (val.post === 'N') {
                        amountNBahtFinal = val.amount;
                    } else if (val.post === 'O') {
                        amountOBahtFinal = val.amount;
                    }else if (val.post === 'A1') {
                        amountA1BahtFinal = val.amount;
                    }else if (val.post === 'A2') {
                        amountA2BahtFinal = val.amount;
                    }else if (val.post === 'A3') {
                        amountA3BahtFinal = val.amount;
                    }else if (val.post === 'A4') {
                        amountA4BahtFinal = val.amount;
                    }else if (val.post === 'T') {
                        amountTBahtFinal = val.amount;
                    }else if (val.post === 'Vat') {
                        amountVatBahtFinal = val.amount;
                    }else if (val.post === 'Ler') {
                        amountLerBahtFinal = val.amount;
                    }else if (val.post === 'Tot') {
                        amountTotBahtFinal = val.amount;
                    }  else if (val.post === '5Lo') {
                        amountLoBahtFinal = val.amount;
                    }
                }


                if (!key[val.number]) {
                    key[val.number] = {
                        post: val.post,
                        number: val.number,
                        amountARiel: amountARielFinal,
                        amountBRiel: amountBRielFinal,
                        amountCRiel: amountCRielFinal,
                        amountDRiel: amountDRielFinal,
                        amountFRiel: amountFRielFinal,
                        amountIRiel: amountIRielFinal,
                        amountKRiel: amountKRielFinal,
                        amountLRiel: amountLRielFinal,
                        amountNRiel: amountNRielFinal,
                        amountORiel: amountORielFinal,
                        amountA1Riel: amountA1RielFinal,
                        amountA2Riel: amountA2RielFinal,
                        amountA3Riel: amountA3RielFinal,
                        amountA4Riel: amountA4RielFinal,
                        amountTRiel: amountTRielFinal,
                        amountVatRiel: amountVatRielFinal,
                        amountLerRiel: amountLerRielFinal,
                        amountTotRiel: amountTotRielFinal,
                        amountLoRiel: amountLoRielFinal,

                        amountADollar: amountADollarFinal,
                        amountBDollar: amountBDollarFinal,
                        amountCDollar: amountCDollarFinal,
                        amountDDollar: amountDDollarFinal,
                        amountFDollar: amountFDollarFinal,
                        amountIDollar: amountIDollarFinal,
                        amountKDollar: amountKDollarFinal,
                        amountLDollar: amountLDollarFinal,
                        amountNDollar: amountNDollarFinal,
                        amountODollar: amountODollarFinal,
                        amountA1Dollar: amountA1DollarFinal,
                        amountA2Dollar: amountA2DollarFinal,
                        amountA3Dollar: amountA3DollarFinal,
                        amountA4Dollar: amountA4DollarFinal,
                        amountTDollar: amountTDollarFinal,
                        amountVatDollar: amountVatDollarFinal,
                        amountLerDollar: amountLerDollarFinal,
                        amountTotDollar: amountTotDollarFinal,
                        amountLoDollar: amountLoDollarFinal,

                        amountABaht: amountABahtFinal,
                        amountBBaht: amountBBahtFinal,
                        amountCBaht: amountCBahtFinal,
                        amountDBaht: amountDBahtFinal,
                        amountFBaht: amountFBahtFinal,
                        amountIBaht: amountIBahtFinal,
                        amountKBaht: amountKBahtFinal,
                        amountLBaht: amountLBahtFinal,
                        amountNBaht: amountNBahtFinal,
                        amountOBaht: amountOBahtFinal,
                        amountA1Baht: amountA1BahtFinal,
                        amountA2Baht: amountA2BahtFinal,
                        amountA3Baht: amountA3BahtFinal,
                        amountA4Baht: amountA4BahtFinal,
                        amountTBaht: amountTBahtFinal,
                        amountVatBaht: amountVatBahtFinal,
                        amountLerBaht: amountLerBahtFinal,
                        amountTotBaht: amountTotBahtFinal,
                        amountLoBaht: amountLoBahtFinal

                    };
                    result3DFinal.push(key[val.number]);
                } else {
                    key[val.number].amountARiel += amountARielFinal;
                    key[val.number].amountBRiel += amountBRielFinal;
                    key[val.number].amountCRiel += amountCRielFinal;
                    key[val.number].amountDRiel += amountDRielFinal;
                    key[val.number].amountFRiel += amountFRielFinal;
                    key[val.number].amountIRiel += amountIRielFinal;
                    key[val.number].amountKRiel += amountKRielFinal;
                    key[val.number].amountLRiel += amountLRielFinal;
                    key[val.number].amountNRiel += amountNRielFinal;
                    key[val.number].amountORiel += amountORielFinal;
                    key[val.number].amountA1Riel += amountA1RielFinal;
                    key[val.number].amountA2Riel += amountA2RielFinal;
                    key[val.number].amountA3Riel += amountA3RielFinal;
                    key[val.number].amountA4Riel += amountA4RielFinal;
                    key[val.number].amountTRiel += amountTRielFinal;
                    key[val.number].amountVatRiel += amountVatRielFinal;
                    key[val.number].amountLerRiel += amountLerRielFinal;
                    key[val.number].amountTotRiel += amountTotRielFinal;
                    key[val.number].amountLoRiel += amountLoRielFinal;

                    key[val.number].amountADollar += amountADollarFinal;
                    key[val.number].amountBDollar += amountBDollarFinal;
                    key[val.number].amountCDollar += amountCDollarFinal;
                    key[val.number].amountDDollar += amountDDollarFinal;
                    key[val.number].amountFDollar += amountFDollarFinal;
                    key[val.number].amountIDollar += amountIDollarFinal;
                    key[val.number].amountKDollar += amountKDollarFinal;
                    key[val.number].amountLDollar += amountLDollarFinal;
                    key[val.number].amountNDollar += amountNDollarFinal;
                    key[val.number].amountODollar += amountODollarFinal;

                    key[val.number].amountA1Dollar += amountA1DollarFinal;
                    key[val.number].amountA2Dollar += amountA2DollarFinal;
                    key[val.number].amountA3Dollar += amountA3DollarFinal;
                    key[val.number].amountA4Dollar += amountA4DollarFinal;
                    key[val.number].amountTDollar += amountTDollarFinal;
                    key[val.number].amountVatDollar += amountVatDollarFinal;
                    key[val.number].amountLerDollar += amountLerDollarFinal;
                    key[val.number].amountTotDollar += amountTotDollarFinal;
                    key[val.number].amountLoDollar += amountLoDollarFinal;

                    key[val.number].amountABaht += amountABahtFinal;
                    key[val.number].amountBBaht += amountBBahtFinal;
                    key[val.number].amountCBaht += amountCBahtFinal;
                    key[val.number].amountDBaht += amountDBahtFinal;
                    key[val.number].amountFBaht += amountFBahtFinal;
                    key[val.number].amountIBaht += amountIBahtFinal;
                    key[val.number].amountKBaht += amountKBahtFinal;
                    key[val.number].amountLBaht += amountLBahtFinal;
                    key[val.number].amountNBaht += amountNBahtFinal;
                    key[val.number].amountOBaht += amountOBahtFinal;

                    key[val.number].amountA1Baht += amountA1BahtFinal;
                    key[val.number].amountA2Baht += amountA2BahtFinal;
                    key[val.number].amountA3Baht += amountA3BahtFinal;
                    key[val.number].amountA4Baht += amountA4BahtFinal;
                    key[val.number].amountTBaht += amountTBahtFinal;
                    key[val.number].amountVatBaht += amountVatBahtFinal;
                    key[val.number].amountLerBaht += amountLerBahtFinal;
                    key[val.number].amountTotBaht += amountTotBahtFinal;
                    key[val.number].amountLoBaht += amountLoBahtFinal;


                }
                return key;
            }, {});

            let max3DARiel;
            let max3DBRiel;
            let max3DCRiel;
            let max3DDRiel;
            let max3DFRiel;
            let max3DIRiel;
            let max3DKRiel;
            let max3DLRiel;
            let max3DNRiel;
            let max3DORiel;
            let max3DA1Riel;
            let max3DA2Riel;
            let max3DA3Riel;
            let max3DA4Riel;
            let max3DTRiel;
            let max3DVatRiel;
            let max3DLerRiel;
            let max3DTotRiel;
            let max3DLoRiel;

            let max3DADollar;
            let max3DBDollar;
            let max3DCDollar;
            let max3DDDollar;
            let max3DFDollar;
            let max3DIDollar;
            let max3DKDollar;
            let max3DLDollar;
            let max3DNDollar;
            let max3DODollar;
            let max3DA1Dollar;
            let max3DA2Dollar;
            let max3DA3Dollar;
            let max3DA4Dollar;
            let max3DTDollar;
            let max3DVatDollar;
            let max3DLerDollar;
            let max3DTotDollar;
            let max3DLoDollar;

            let max3DABaht;
            let max3DBBaht;
            let max3DCBaht;
            let max3DDBaht;
            let max3DFBaht;
            let max3DIBaht;
            let max3DKBaht;
            let max3DLBaht;
            let max3DNBaht;
            let max3DOBaht;
            let max3DA1Baht;
            let max3DA2Baht;
            let max3DA3Baht;
            let max3DA4Baht;
            let max3DTBaht;
            let max3DVatBaht;
            let max3DLerBaht;
            let max3DTotBaht;
            let max3DLoBaht;


            if (result3DFinal.length !== 0) {
                max3DARiel = finder(Math.max, result3DFinal, "amountARiel");
                max3DBRiel = finder(Math.max, result3DFinal, "amountBRiel");
                max3DCRiel = finder(Math.max, result3DFinal, "amountCRiel");
                max3DDRiel = finder(Math.max, result3DFinal, "amountDRiel");
                max3DFRiel = finder(Math.max, result3DFinal, "amountFRiel");
                max3DIRiel = finder(Math.max, result3DFinal, "amountIRiel");
                max3DKRiel = finder(Math.max, result3DFinal, "amountKRiel");
                max3DLRiel = finder(Math.max, result3DFinal, "amountLRiel");
                max3DNRiel = finder(Math.max, result3DFinal, "amountNRiel");
                max3DORiel = finder(Math.max, result3DFinal, "amountORiel");
                max3DA1Riel = finder(Math.max, result3DFinal, "amountA1Riel");
                max3DA2Riel = finder(Math.max, result3DFinal, "amountA2Riel");
                max3DA3Riel = finder(Math.max, result3DFinal, "amountA3Riel");
                max3DA4Riel = finder(Math.max, result3DFinal, "amountA4Riel");
                max3DTRiel = finder(Math.max, result3DFinal, "amountTRiel");
                max3DVatRiel = finder(Math.max, result3DFinal, "amountVatRiel");
                max3DLerRiel = finder(Math.max, result3DFinal, "amountLerRiel");
                max3DTotRiel = finder(Math.max, result3DFinal, "amountTotRiel");
                max3DLoRiel = finder(Math.max, result3DFinal, "amountLoRiel");

                max3DADollar = finder(Math.max, result3DFinal, "amountADollar");
                max3DBDollar = finder(Math.max, result3DFinal, "amountBDollar");
                max3DCDollar = finder(Math.max, result3DFinal, "amountCDollar");
                max3DDDollar = finder(Math.max, result3DFinal, "amountDDollar");
                max3DFDollar = finder(Math.max, result3DFinal, "amountFDollar");
                max3DIDollar = finder(Math.max, result3DFinal, "amountIDollar");
                max3DKDollar = finder(Math.max, result3DFinal, "amountKDollar");
                max3DLDollar = finder(Math.max, result3DFinal, "amountLDollar");
                max3DNDollar = finder(Math.max, result3DFinal, "amountNDollar");
                max3DODollar = finder(Math.max, result3DFinal, "amountODollar");
                max3DA1Dollar = finder(Math.max, result3DFinal, "amountA1Dollar");
                max3DA2Dollar = finder(Math.max, result3DFinal, "amountA2Dollar");
                max3DA3Dollar = finder(Math.max, result3DFinal, "amountA3Dollar");
                max3DA4Dollar = finder(Math.max, result3DFinal, "amountA4Dollar");
                max3DTDollar = finder(Math.max, result3DFinal, "amountTDollar");
                max3DVatDollar = finder(Math.max, result3DFinal, "amountVatDollar");
                max3DLerDollar = finder(Math.max, result3DFinal, "amountLerDollar");
                max3DTotDollar = finder(Math.max, result3DFinal, "amountTotDollar");
                max3DLoDollar = finder(Math.max, result3DFinal, "amountLoDollar");

                max3DABaht = finder(Math.max, result3DFinal, "amountABaht");
                max3DBBaht = finder(Math.max, result3DFinal, "amountBBaht");
                max3DCBaht = finder(Math.max, result3DFinal, "amountCBaht");
                max3DDBaht = finder(Math.max, result3DFinal, "amountDBaht");
                max3DFBaht = finder(Math.max, result3DFinal, "amountFBaht");
                max3DIBaht = finder(Math.max, result3DFinal, "amountIBaht");
                max3DKBaht = finder(Math.max, result3DFinal, "amountKBaht");
                max3DLBaht = finder(Math.max, result3DFinal, "amountLBaht");
                max3DNBaht = finder(Math.max, result3DFinal, "amountNBaht");
                max3DOBaht = finder(Math.max, result3DFinal, "amountOBaht");
                max3DA1Baht = finder(Math.max, result3DFinal, "amountA1Baht");
                max3DA2Baht = finder(Math.max, result3DFinal, "amountA2Baht");
                max3DA3Baht = finder(Math.max, result3DFinal, "amountA3Baht");
                max3DA4Baht = finder(Math.max, result3DFinal, "amountA4Baht");
                max3DTBaht = finder(Math.max, result3DFinal, "amountTBaht");
                max3DVatBaht = finder(Math.max, result3DFinal, "amountVatBaht");
                max3DLerBaht = finder(Math.max, result3DFinal, "amountLerBaht");
                max3DTotBaht = finder(Math.max, result3DFinal, "amountTotBaht");
                max3DLoBaht = finder(Math.max, result3DFinal, "amountLoBaht");
            }

            let labelRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px'>"+t[language].riel+"</th>" : "";
            let labelDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px' >"+t[language].dollar+"</th>" : "";
            let labelBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px' >"+t[language].baht+"</th>" : "";
            let labelRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px' >"+t[language].riel+"</th>" : "";
            let labelDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px' >"+t[language].dollar+"</th>" : "";
            let labelBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px'>"+t[language].baht+"</th>" : "";

            let currencyLength = !_.isArray(self.currency) ? 1 : self.currency.length;

            dataHtml +=
                "<table class='table table-report table-striped table-reportWinLoseMain' style='border-collapse: collapse !important;'>" +
                "<tr><th rowspan='2' style='border: solid 1px' align='center'>"+t[language].betIn2D+"</th><th style='border: solid 1px' colspan='" + currencyLength + "' align='center'>A</th><th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> B</th><th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> C</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> D</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> F</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> I</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> K</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> L</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> N</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> O</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> A1</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> A2</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> A3</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> A4</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> T</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> Vat</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> Ler</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> Tot</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'>Lo</th></tr>" +
                "<tr>" +
                labelRiel2D +
                labelDollar2D +
                labelBaht2D +

                labelRiel2D +
                labelDollar2D +
                labelBaht2D +

                labelRiel2D +
                labelDollar2D +
                labelBaht2D +

                labelRiel2D +
                labelDollar2D +
                labelBaht2D +

                labelRiel2D +
                labelDollar2D +
                labelBaht2D +

                labelRiel2D +
                labelDollar2D +
                labelBaht2D +

                labelRiel2D +
                labelDollar2D +
                labelBaht2D +

                labelRiel2D +
                labelDollar2D +
                labelBaht2D +

                labelRiel2D +
                labelDollar2D +
                labelBaht2D +

                labelRiel2D +
                labelDollar2D +
                labelBaht2D +
                labelRiel2D +
                labelDollar2D +
                labelBaht2D +
                labelRiel2D +
                labelDollar2D +
                labelBaht2D +
                labelRiel2D +
                labelDollar2D +
                labelBaht2D +
                labelRiel2D +
                labelDollar2D +
                labelBaht2D +
                labelRiel2D +
                labelDollar2D +
                labelBaht2D +
                labelRiel2D +
                labelDollar2D +
                labelBaht2D +
                labelRiel2D +
                labelDollar2D +
                labelBaht2D +
                labelRiel2D +
                labelDollar2D +
                labelBaht2D +

                labelRiel2D +
                labelDollar2D +
                labelBaht2D +
                "</tr>";

            let grandValueARiel2D = 0;
            let grandValueBRiel2D = 0;
            let grandValueCRiel2D = 0;
            let grandValueDRiel2D = 0;
            let grandValueFRiel2D = 0;
            let grandValueIRiel2D = 0;
            let grandValueKRiel2D = 0;
            let grandValueLRiel2D = 0;
            let grandValueNRiel2D = 0;
            let grandValueORiel2D = 0;
            let grandValueA1Riel2D = 0;
            let grandValueA2Riel2D = 0;
            let grandValueA3Riel2D = 0;
            let grandValueA4Riel2D = 0;
            let grandValueTRiel2D = 0;
            let grandValueVatRiel2D = 0;
            let grandValueLerRiel2D = 0;
            let grandValueTotRiel2D = 0;
            let grandValueLoRiel2D = 0;

            let grandValueADollar2D = 0;
            let grandValueBDollar2D = 0;
            let grandValueCDollar2D = 0;
            let grandValueDDollar2D = 0;
            let grandValueFDollar2D = 0;
            let grandValueIDollar2D = 0;
            let grandValueKDollar2D = 0;
            let grandValueLDollar2D = 0;
            let grandValueNDollar2D = 0;
            let grandValueODollar2D = 0;

            let grandValueA1Dollar2D = 0;
            let grandValueA2Dollar2D = 0;
            let grandValueA3Dollar2D = 0;
            let grandValueA4Dollar2D = 0;
            let grandValueTDollar2D = 0;
            let grandValueVatDollar2D = 0;
            let grandValueLerDollar2D = 0;
            let grandValueTotDollar2D = 0;
            let grandValueLoDollar2D = 0;

            let grandValueABaht2D = 0;
            let grandValueBBaht2D = 0;
            let grandValueCBaht2D = 0;
            let grandValueDBaht2D = 0;
            let grandValueFBaht2D = 0;
            let grandValueIBaht2D = 0;
            let grandValueKBaht2D = 0;
            let grandValueLBaht2D = 0;
            let grandValueNBaht2D = 0;
            let grandValueOBaht2D = 0;

            let grandValueA1Baht2D = 0;
            let grandValueA2Baht2D = 0;
            let grandValueA3Baht2D = 0;
            let grandValueA4Baht2D = 0;
            let grandValueTBaht2D = 0;
            let grandValueVatBaht2D = 0;
            let grandValueLerBaht2D = 0;
            let grandValueTotBaht2D = 0;
            let grandValueLoBaht2D = 0;


            result2DFinal.forEach(function (obj) {

                grandValueARiel2D += obj.amountARiel;
                grandValueBRiel2D += obj.amountBRiel;
                grandValueCRiel2D += obj.amountCRiel;
                grandValueDRiel2D += obj.amountDRiel;
                grandValueFRiel2D += obj.amountFRiel;
                grandValueIRiel2D += obj.amountIRiel;
                grandValueKRiel2D += obj.amountKRiel;
                grandValueLRiel2D += obj.amountLRiel;
                grandValueNRiel2D += obj.amountNRiel;
                grandValueORiel2D += obj.amountORiel;
                grandValueA1Riel2D += obj.amountA1Riel;
                grandValueA2Riel2D += obj.amountA2Riel;
                grandValueA3Riel2D += obj.amountA3Riel;
                grandValueA4Riel2D += obj.amountA4Riel;
                grandValueTRiel2D += obj.amountTRiel;
                grandValueVatRiel2D += obj.amountVatRiel;
                grandValueLerRiel2D += obj.amountLerRiel;
                grandValueTotRiel2D += obj.amountTotRiel;
                grandValueLoRiel2D += obj.amountLoRiel;

                grandValueADollar2D += obj.amountADollar;
                grandValueBDollar2D += obj.amountBDollar;
                grandValueCDollar2D += obj.amountCDollar;
                grandValueDDollar2D += obj.amountDDollar;
                grandValueFDollar2D += obj.amountFDollar;
                grandValueIDollar2D += obj.amountIDollar;
                grandValueKDollar2D += obj.amountKDollar;
                grandValueLDollar2D += obj.amountLDollar;
                grandValueNDollar2D += obj.amountNDollar;
                grandValueODollar2D += obj.amountODollar;

                grandValueA1Dollar2D += obj.amountA1Dollar;
                grandValueA2Dollar2D += obj.amountA2Dollar;
                grandValueA3Dollar2D += obj.amountA3Dollar;
                grandValueA4Dollar2D += obj.amountA4Dollar;
                grandValueTDollar2D += obj.amountTDollar;
                grandValueVatDollar2D += obj.amountVatDollar;
                grandValueLerDollar2D += obj.amountLerDollar;
                grandValueTotDollar2D += obj.amountTotDollar;
                grandValueLoDollar2D += obj.amountLoDollar;

                grandValueABaht2D += obj.amountABaht;
                grandValueBBaht2D += obj.amountBBaht;
                grandValueCBaht2D += obj.amountCBaht;
                grandValueDBaht2D += obj.amountDBaht;
                grandValueFBaht2D += obj.amountFBaht;
                grandValueIBaht2D += obj.amountIBaht;
                grandValueKBaht2D += obj.amountKBaht;
                grandValueLBaht2D += obj.amountLBaht;
                grandValueNBaht2D += obj.amountNBaht;
                grandValueOBaht2D += obj.amountOBaht;

                grandValueA1Baht2D += obj.amountA1Baht;
                grandValueA2Baht2D += obj.amountA2Baht;
                grandValueA3Baht2D += obj.amountA3Baht;
                grandValueA4Baht2D += obj.amountA4Baht;
                grandValueTBaht2D += obj.amountTBaht;
                grandValueVatBaht2D += obj.amountVatBaht;
                grandValueLerBaht2D += obj.amountLerBaht;
                grandValueTotBaht2D += obj.amountTotBaht;
                grandValueLoBaht2D += obj.amountLoBaht;

                let amountARiel;
                let amountBRiel;
                let amountCRiel;
                let amountDRiel;
                let amountFRiel;
                let amountIRiel;
                let amountKRiel;
                let amountLRiel;
                let amountNRiel;
                let amountORiel;
                let amountA1Riel;
                let amountA2Riel;
                let amountA3Riel;
                let amountA4Riel;
                let amountTRiel;
                let amountVatRiel;
                let amountLerRiel;
                let amountTotRiel;
                let amountLoRiel;


                let amountADollar;
                let amountBDollar;
                let amountCDollar;
                let amountDDollar;
                let amountFDollar;
                let amountIDollar;
                let amountKDollar;
                let amountLDollar;
                let amountNDollar;
                let amountODollar;

                let amountA1Dollar;
                let amountA2Dollar;
                let amountA3Dollar;
                let amountA4Dollar;
                let amountTDollar;
                let amountVatDollar;
                let amountLerDollar;
                let amountTotDollar;
                let amountLoDollar;


                let amountABaht;
                let amountBBaht;
                let amountCBaht;
                let amountDBaht;
                let amountFBaht;
                let amountIBaht;
                let amountKBaht;
                let amountLBaht;
                let amountNBaht;
                let amountOBaht;
                let amountA1Baht;
                let amountA2Baht;
                let amountA3Baht;
                let amountA4Baht;
                let amountTBaht;
                let amountVatBaht;
                let amountLerBaht;
                let amountTotBaht;
                let amountLoBaht;


                if (!(self.rankId && self.rankId !== "" && self.rankId !== null)) {
                    amountARiel = obj.amountARiel === maxARiel ? "<font color='red'>" + obj.amountARiel + "</font>" : obj.amountARiel;
                    amountBRiel = obj.amountBRiel === maxBRiel ? "<font color='red'>" + obj.amountBRiel + "</font>" : obj.amountBRiel;
                    amountCRiel = obj.amountCRiel === maxCRiel ? "<font color='red'>" + obj.amountCRiel + "</font>" : obj.amountCRiel;
                    amountDRiel = obj.amountDRiel === maxDRiel ? "<font color='red'>" + obj.amountDRiel + "</font>" : obj.amountDRiel;
                    amountFRiel = obj.amountFRiel === maxFRiel ? "<font color='red'>" + obj.amountFRiel + "</font>" : obj.amountFRiel;
                    amountIRiel = obj.amountIRiel === maxIRiel ? "<font color='red'>" + obj.amountIRiel + "</font>" : obj.amountIRiel;
                    amountKRiel = obj.amountKRiel === maxKRiel ? "<font color='red'>" + obj.amountKRiel + "</font>" : obj.amountKRiel;
                    amountLRiel = obj.amountLRiel === maxLRiel ? "<font color='red'>" + obj.amountLRiel + "</font>" : obj.amountLRiel;
                    amountNRiel = obj.amountNRiel === maxNRiel ? "<font color='red'>" + obj.amountNRiel + "</font>" : obj.amountNRiel;
                    amountORiel = obj.amountORiel === maxORiel ? "<font color='red'>" + obj.amountORiel + "</font>" : obj.amountORiel;
                    amountA1Riel = obj.amountA1Riel === maxA1Riel ? "<font color='red'>" + obj.amountA1Riel + "</font>" : obj.amountA1Riel;
                    amountA2Riel = obj.amountA2Riel === maxA2Riel ? "<font color='red'>" + obj.amountA2Riel + "</font>" : obj.amountA2Riel;
                    amountA3Riel = obj.amountA3Riel === maxA3Riel ? "<font color='red'>" + obj.amountA3Riel + "</font>" : obj.amountA3Riel;
                    amountA4Riel = obj.amountA4Riel === maxA4Riel ? "<font color='red'>" + obj.amountA4Riel + "</font>" : obj.amountA4Riel;
                    amountTRiel = obj.amountTRiel === maxTRiel ? "<font color='red'>" + obj.amountTRiel + "</font>" : obj.amountTRiel;
                    amountVatRiel = obj.amountVatRiel === maxVatRiel ? "<font color='red'>" + obj.amountVatRiel + "</font>" : obj.amountVatRiel;
                    amountLerRiel = obj.amountLerRiel === maxLerRiel ? "<font color='red'>" + obj.amountLerRiel + "</font>" : obj.amountLerRiel;
                    amountTotRiel = obj.amountTotRiel === maxTotRiel ? "<font color='red'>" + obj.amountTotRiel + "</font>" : obj.amountTotRiel;
                    amountLoRiel = obj.amountLoRiel === maxLoRiel ? "<font color='red'>" + obj.amountLoRiel + "</font>" : obj.amountLoRiel;

                    amountADollar = obj.amountADollar === maxADollar ? "<font color='red'>" + obj.amountADollar + "</font>" : obj.amountADollar;
                    amountBDollar = obj.amountBDollar === maxBDollar ? "<font color='red'>" + obj.amountBDollar + "</font>" : obj.amountBDollar;
                    amountCDollar = obj.amountCDollar === maxCDollar ? "<font color='red'>" + obj.amountCDollar + "</font>" : obj.amountCDollar;
                    amountDDollar = obj.amountDDollar === maxDDollar ? "<font color='red'>" + obj.amountDDollar + "</font>" : obj.amountDDollar;
                    amountFDollar = obj.amountFDollar === maxFDollar ? "<font color='red'>" + obj.amountFDollar + "</font>" : obj.amountFDollar;
                    amountIDollar = obj.amountIDollar === maxIDollar ? "<font color='red'>" + obj.amountIDollar + "</font>" : obj.amountIDollar;
                    amountKDollar = obj.amountKDollar === maxKDollar ? "<font color='red'>" + obj.amountKDollar + "</font>" : obj.amountKDollar;
                    amountLDollar = obj.amountLDollar === maxLDollar ? "<font color='red'>" + obj.amountLDollar + "</font>" : obj.amountLDollar;
                    amountNDollar = obj.amountNDollar === maxNDollar ? "<font color='red'>" + obj.amountNDollar + "</font>" : obj.amountNDollar;
                    amountODollar = obj.amountODollar === maxODollar ? "<font color='red'>" + obj.amountODollar + "</font>" : obj.amountODollar;
                    amountA1Dollar = obj.amountA1Dollar === maxA1Dollar ? "<font color='red'>" + obj.amountA1Dollar + "</font>" : obj.amountA1Dollar;
                    amountA2Dollar = obj.amountA2Dollar === maxA2Dollar ? "<font color='red'>" + obj.amountA2Dollar + "</font>" : obj.amountA2Dollar;
                    amountA3Dollar = obj.amountA3Dollar === maxA3Dollar ? "<font color='red'>" + obj.amountA3Dollar + "</font>" : obj.amountA3Dollar;
                    amountA4Dollar = obj.amountA4Dollar === maxA4Dollar ? "<font color='red'>" + obj.amountA4Dollar + "</font>" : obj.amountA4Dollar;
                    amountTDollar = obj.amountTDollar === maxTDollar ? "<font color='red'>" + obj.amountTDollar + "</font>" : obj.amountTDollar;
                    amountVatDollar = obj.amountVatDollar === maxVatDollar ? "<font color='red'>" + obj.amountVatDollar + "</font>" : obj.amountVatDollar;
                    amountLerDollar = obj.amountLerDollar === maxLerDollar ? "<font color='red'>" + obj.amountLerDollar + "</font>" : obj.amountLerDollar;
                    amountTotDollar = obj.amountTotDollar === maxTotDollar ? "<font color='red'>" + obj.amountTotDollar + "</font>" : obj.amountTotDollar;
                    amountLoDollar = obj.amountLoDollar === maxLoDollar ? "<font color='red'>" + obj.amountLoDollar + "</font>" : obj.amountLoDollar;

                    amountABaht = obj.amountABaht === maxABaht ? "<font color='red'>" + obj.amountABaht + "</font>" : obj.amountABaht;
                    amountBBaht = obj.amountBBaht === maxBBaht ? "<font color='red'>" + obj.amountBBaht + "</font>" : obj.amountBBaht;
                    amountCBaht = obj.amountCBaht === maxCBaht ? "<font color='red'>" + obj.amountCBaht + "</font>" : obj.amountCBaht;
                    amountDBaht = obj.amountDBaht === maxDBaht ? "<font color='red'>" + obj.amountDBaht + "</font>" : obj.amountDBaht;
                    amountFBaht = obj.amountFBaht === maxFBaht ? "<font color='red'>" + obj.amountFBaht + "</font>" : obj.amountFBaht;
                    amountIBaht = obj.amountIBaht === maxIBaht ? "<font color='red'>" + obj.amountIBaht + "</font>" : obj.amountIBaht;
                    amountKBaht = obj.amountKBaht === maxKBaht ? "<font color='red'>" + obj.amountKBaht + "</font>" : obj.amountKBaht;
                    amountLBaht = obj.amountLBaht === maxLBaht ? "<font color='red'>" + obj.amountLBaht + "</font>" : obj.amountLBaht;
                    amountNBaht = obj.amountNBaht === maxNBaht ? "<font color='red'>" + obj.amountNBaht + "</font>" : obj.amountNBaht;
                    amountOBaht = obj.amountOBaht === maxOBaht ? "<font color='red'>" + obj.amountOBaht + "</font>" : obj.amountOBaht;
                    amountA1Baht = obj.amountA1Baht === maxA1Baht ? "<font color='red'>" + obj.amountA1Baht + "</font>" : obj.amountA1Baht;
                    amountA2Baht = obj.amountA2Baht === maxA2Baht ? "<font color='red'>" + obj.amountA2Baht + "</font>" : obj.amountA2Baht;
                    amountA3Baht = obj.amountA3Baht === maxA3Baht ? "<font color='red'>" + obj.amountA3Baht + "</font>" : obj.amountA3Baht;
                    amountA4Baht = obj.amountA4Baht === maxA4Baht ? "<font color='red'>" + obj.amountA4Baht + "</font>" : obj.amountA4Baht;
                    amountTBaht = obj.amountTBaht === maxTBaht ? "<font color='red'>" + obj.amountTBaht + "</font>" : obj.amountTBaht;
                    amountVatBaht = obj.amountVatBaht === maxVatBaht ? "<font color='red'>" + obj.amountVatBaht + "</font>" : obj.amountVatBaht;
                    amountLerBaht = obj.amountLerBaht === maxLerBaht ? "<font color='red'>" + obj.amountLerBaht + "</font>" : obj.amountLerBaht;
                    amountTotBaht = obj.amountTotBaht === maxTotBaht ? "<font color='red'>" + obj.amountTotBaht + "</font>" : obj.amountTotBaht;
                    amountLoBaht = obj.amountLoBaht === maxLoBaht ? "<font color='red'>" + obj.amountLoBaht + "</font>" : obj.amountLoBaht;
                } else {
                    if (obj.amountARiel === maxARiel) {
                        amountARiel = "<font color='red'>" + obj.amountARiel + "</font>";
                    }
                    else if (obj.amountARiel >= rankInfo.maxKHR) {
                        amountARiel = "<font color='brown'>" + obj.amountARiel + "</font>";
                    } else {
                        amountARiel = obj.amountARiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountARiel + "</font>" : obj.amountARiel;
                    }


                    if (obj.amountBRiel === maxBRiel) {
                        amountBRiel = "<font color='red'>" + obj.amountBRiel + "</font>";
                    }
                    else if (obj.amountBRiel >= rankInfo.maxKHR) {
                        amountBRiel = "<font color='brown'>" + obj.amountBRiel + "</font>";
                    } else {
                        amountBRiel = obj.amountBRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountBRiel + "</font>" : obj.amountBRiel;

                    }


                    if (obj.amountCRiel === maxCRiel) {
                        amountCRiel = "<font color='red'>" + obj.amountCRiel + "</font>";
                    }
                    else if (obj.amountCRiel >= rankInfo.maxKHR) {
                        amountCRiel = "<font color='brown'>" + obj.amountCRiel + "</font>";

                    } else {
                        amountCRiel = obj.amountCRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountCRiel + "</font>" : obj.amountCRiel;
                    }



                    if (obj.amountDRiel === maxDRiel) {
                        amountDRiel = "<font color='red'>" + obj.amountDRiel + "</font>";
                    }
                    else if (obj.amountDRiel >= rankInfo.maxKHR) {
                        amountDRiel = "<font color='brown'>" + obj.amountDRiel + "</font>";
                    } else {
                        amountDRiel = obj.amountDRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountDRiel + "</font>" : obj.amountDRiel;
                    }



                    if (obj.amountFRiel === maxFRiel) {
                        amountFRiel = "<font color='red'>" + obj.amountFRiel + "</font>";
                    }
                    else if (obj.amountFRiel >= rankInfo.maxKHR) {
                        amountFRiel = "<font color='brown'>" + obj.amountFRiel + "</font>";
                    } else {
                        amountFRiel = obj.amountFRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountFRiel + "</font>" : obj.amountFRiel;
                    }



                    if (obj.amountIRiel === maxIRiel) {
                        amountIRiel = "<font color='red'>" + obj.amountIRiel + "</font>";
                    }
                    else if (obj.amountIRiel >= rankInfo.maxKHR) {
                        amountIRiel = "<font color='brown'>" + obj.amountIRiel + "</font>";
                    } else {
                        amountIRiel = obj.amountIRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountIRiel + "</font>" : obj.amountIRiel;
                    }



                    if (obj.amountKRiel === maxKRiel) {
                        amountKRiel = "<font color='red'>" + obj.amountKRiel + "</font>";
                    }
                    else if (obj.amountKRiel >= rankInfo.maxKHR) {
                        amountKRiel = "<font color='brown'>" + obj.amountKRiel + "</font>";
                    } else {
                        amountKRiel = obj.amountKRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountKRiel + "</font>" : obj.amountKRiel;
                    }



                    if (obj.amountLRiel === maxLRiel) {
                        amountLRiel = "<font color='red'>" + obj.amountLRiel + "</font>";
                    }
                    else if (obj.amountLRiel >= rankInfo.maxKHR) {
                        amountLRiel = "<font color='brown'>" + obj.amountLRiel + "</font>";
                    } else {
                        amountLRiel = obj.amountLRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountLRiel + "</font>" : obj.amountLRiel;
                    }



                    if (obj.amountNRiel === maxNRiel) {
                        amountNRiel = "<font color='red'>" + obj.amountNRiel + "</font>";
                    }
                    else if (obj.amountNRiel >= rankInfo.maxKHR) {
                        amountNRiel = "<font color='brown'>" + obj.amountNRiel + "</font>";
                    } else {
                        amountNRiel = obj.amountNRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountNRiel + "</font>" : obj.amountNRiel;
                    }



                    if (obj.amountORiel === maxORiel) {
                        amountORiel = "<font color='red'>" + obj.amountORiel + "</font>";
                    }
                    else if (obj.amountORiel >= rankInfo.maxKHR) {
                        amountORiel = "<font color='brown'>" + obj.amountORiel + "</font>";
                    } else {
                        amountORiel = obj.amountORiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountORiel + "</font>" : obj.amountORiel;
                    }




                    if (obj.amountA1Riel === maxA1Riel) {
                        amountA1Riel = "<font color='red'>" + obj.amountA1Riel + "</font>";
                    }
                    else if (obj.amountA1Riel >= rankInfo.maxKHR) {
                        amountA1Riel = "<font color='brown'>" + obj.amountA1Riel + "</font>";
                    } else {
                        amountA1Riel = obj.amountA1Riel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountA1Riel + "</font>" : obj.amountA1Riel;
                    }




                    if (obj.amountA2Riel === maxA2Riel) {
                        amountA2Riel = "<font color='red'>" + obj.amountA2Riel + "</font>";
                    }
                    else if (obj.amountA2Riel >= rankInfo.maxKHR) {
                        amountA2Riel = "<font color='brown'>" + obj.amountA2Riel + "</font>";
                    } else {
                        amountA2Riel = obj.amountA2Riel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountA2Riel + "</font>" : obj.amountA2Riel;
                    }




                    if (obj.amountA3Riel === maxA3Riel) {
                        amountA3Riel = "<font color='red'>" + obj.amountA3Riel + "</font>";
                    }
                    else if (obj.amountA3Riel >= rankInfo.maxKHR) {
                        amountA3Riel = "<font color='brown'>" + obj.amountA3Riel + "</font>";
                    } else {
                        amountA3Riel = obj.amountA3Riel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountA3Riel + "</font>" : obj.amountA3Riel;
                    }




                    if (obj.amountA4Riel === maxA4Riel) {
                        amountA4Riel = "<font color='red'>" + obj.amountA4Riel + "</font>";
                    }
                    else if (obj.amountA4Riel >= rankInfo.maxKHR) {
                        amountA4Riel = "<font color='brown'>" + obj.amountA4Riel + "</font>";
                    } else {
                        amountA4Riel = obj.amountA4Riel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountA4Riel + "</font>" : obj.amountA4Riel;
                    }




                    if (obj.amountTRiel === maxTRiel) {
                        amountTRiel = "<font color='red'>" + obj.amountTRiel + "</font>";
                    }
                    else if (obj.amountTRiel >= rankInfo.maxKHR) {
                        amountTRiel = "<font color='brown'>" + obj.amountTRiel + "</font>";
                    } else {
                        amountTRiel = obj.amountTRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountTRiel + "</font>" : obj.amountTRiel;
                    }



                    if (obj.amountVatRiel === maxVatRiel) {
                        amountVatRiel = "<font color='red'>" + obj.amountVatRiel + "</font>";
                    }
                    else if (obj.amountVatRiel >= rankInfo.maxKHR) {
                        amountVatRiel = "<font color='brown'>" + obj.amountVatRiel + "</font>";
                    } else {
                        amountVatRiel = obj.amountVatRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountVatRiel + "</font>" : obj.amountVatRiel;
                    }



                    if (obj.amountLerRiel === maxLerRiel) {
                        amountLerRiel = "<font color='red'>" + obj.amountLerRiel + "</font>";
                    }
                    else if (obj.amountLerRiel >= rankInfo.maxKHR) {
                        amountLerRiel = "<font color='brown'>" + obj.amountLerRiel + "</font>";
                    } else {
                        amountLerRiel = obj.amountLerRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountLerRiel + "</font>" : obj.amountLerRiel;
                    }



                    if (obj.amountTotRiel === maxTotRiel) {
                        amountTotRiel = "<font color='red'>" + obj.amountTotRiel + "</font>";
                    }
                    else if (obj.amountTotRiel >= rankInfo.maxKHR) {
                        amountTotRiel = "<font color='brown'>" + obj.amountTotRiel + "</font>";
                    } else {
                        amountTotRiel = obj.amountTotRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountTotRiel + "</font>" : obj.amountTotRiel;
                    }





                    if (obj.amountLoRiel === maxLoRiel) {
                        amountLoRiel = "<font color='red'>" + obj.amountLoRiel + "</font>";
                    }
                    else if (obj.amountLoRiel >= rankInfo.maxKHR) {
                        amountLoRiel = "<font color='brown'>" + obj.amountLoRiel + "</font>";
                    } else {
                        amountLoRiel = obj.amountLoRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountLoRiel + "</font>" : obj.amountLoRiel;
                    }





                    if (obj.amountADollar === maxADollar) {
                        amountADollar = "<font color='red'>" + obj.amountADollar + "</font>";
                    }
                    else if (obj.amountADollar >= rankInfo.maxUSD) {
                        amountADollar = "<font color='brown'>" + obj.amountADollar + "</font>";

                    } else {
                        amountADollar = obj.amountADollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountADollar + "</font>" : obj.amountADollar;

                    }

                    if (obj.amountBDollar === maxBDollar) {
                        amountBDollar = "<font color='red'>" + obj.amountBDollar + "</font>";
                    }
                    else if (obj.amountBDollar >= rankInfo.maxUSD) {
                        amountBDollar = "<font color='brown'>" + obj.amountBDollar + "</font>";
                    } else {
                        amountBDollar = obj.amountBDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountBDollar + "</font>" : obj.amountBDollar;
                    }

                    if (obj.amountCDollar === maxCDollar) {
                        amountCDollar = "<font color='red'>" + obj.amountCDollar + "</font>";
                    }
                    else if (obj.amountCDollar >= rankInfo.maxUSD) {
                        amountCDollar = "<font color='brown'>" + obj.amountCDollar + "</font>";
                    } else {
                        amountCDollar = obj.amountCDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountCDollar + "</font>" : obj.amountCDollar;
                    }

                    if (obj.amountDDollar === maxDDollar) {
                        amountDDollar = "<font color='red'>" + obj.amountDDollar + "</font>";
                    }
                    else if (obj.amountDDollar >= rankInfo.maxUSD) {
                        amountDDollar = "<font color='brown'>" + obj.amountDDollar + "</font>";
                    } else {
                        amountDDollar = obj.amountDDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountDDollar + "</font>" : obj.amountDDollar;
                    }







                    if (obj.amountFDollar === maxFDollar) {
                        amountFDollar = "<font color='red'>" + obj.amountFDollar + "</font>";
                    }
                    else if (obj.amountFDollar >= rankInfo.maxUSD) {
                        amountFDollar = "<font color='brown'>" + obj.amountFDollar + "</font>";
                    } else {
                        amountFDollar = obj.amountFDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountFDollar + "</font>" : obj.amountFDollar;
                    }



                    if (obj.amountIDollar === maxIDollar) {
                        amountIDollar = "<font color='red'>" + obj.amountIDollar + "</font>";
                    }
                    else if (obj.amountIDollar >= rankInfo.maxUSD) {
                        amountIDollar = "<font color='brown'>" + obj.amountIDollar + "</font>";
                    } else {
                        amountIDollar = obj.amountIDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountIDollar + "</font>" : obj.amountIDollar;
                    }



                    if (obj.amountKDollar === maxKDollar) {
                        amountKDollar = "<font color='red'>" + obj.amountKDollar + "</font>";
                    }
                    else if (obj.amountKDollar >= rankInfo.maxUSD) {
                        amountKDollar = "<font color='brown'>" + obj.amountKDollar + "</font>";
                    } else {
                        amountKDollar = obj.amountKDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountKDollar + "</font>" : obj.amountKDollar;
                    }



                    if (obj.amountLDollar === maxLDollar) {
                        amountLDollar = "<font color='red'>" + obj.amountLDollar + "</font>";
                    }
                    else if (obj.amountLDollar >= rankInfo.maxUSD) {
                        amountLDollar = "<font color='brown'>" + obj.amountLDollar + "</font>";
                    } else {
                        amountLDollar = obj.amountLDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountLDollar + "</font>" : obj.amountLDollar;
                    }



                    if (obj.amountNDollar === maxNDollar) {
                        amountNDollar = "<font color='red'>" + obj.amountNDollar + "</font>";
                    }
                    else if (obj.amountNDollar >= rankInfo.maxUSD) {
                        amountNDollar = "<font color='brown'>" + obj.amountNDollar + "</font>";
                    } else {
                        amountNDollar = obj.amountNDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountNDollar + "</font>" : obj.amountNDollar;
                    }



                    if (obj.amountODollar === maxODollar) {
                        amountODollar = "<font color='red'>" + obj.amountODollar + "</font>";
                    }
                    else if (obj.amountODollar >= rankInfo.maxUSD) {
                        amountODollar = "<font color='brown'>" + obj.amountODollar + "</font>";
                    } else {
                        amountODollar = obj.amountODollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountODollar + "</font>" : obj.amountODollar;
                    }




                    if (obj.amountA1Dollar === maxA1Dollar) {
                        amountA1Dollar = "<font color='red'>" + obj.amountA1Dollar + "</font>";
                    }
                    else if (obj.amountA1Dollar >= rankInfo.maxUSD) {
                        amountA1Dollar = "<font color='brown'>" + obj.amountA1Dollar + "</font>";
                    } else {
                        amountA1Dollar = obj.amountA1Dollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountA1Dollar + "</font>" : obj.amountA1Dollar;
                    }




                    if (obj.amountA2Dollar === maxA2Dollar) {
                        amountA2Dollar = "<font color='red'>" + obj.amountA2Dollar + "</font>";
                    }
                    else if (obj.amountA2Dollar >= rankInfo.maxUSD) {
                        amountA2Dollar = "<font color='brown'>" + obj.amountA2Dollar + "</font>";
                    } else {
                        amountA2Dollar = obj.amountA2Dollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountA2Dollar + "</font>" : obj.amountA2Dollar;
                    }




                    if (obj.amountA3Dollar === maxA3Dollar) {
                        amountA3Dollar = "<font color='red'>" + obj.amountA3Dollar + "</font>";
                    }
                    else if (obj.amountA3Dollar >= rankInfo.maxUSD) {
                        amountA3Dollar = "<font color='brown'>" + obj.amountA3Dollar + "</font>";
                    } else {
                        amountA3Dollar = obj.amountA3Dollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountA3Dollar + "</font>" : obj.amountA3Dollar;
                    }




                    if (obj.amountA4Dollar === maxA4Dollar) {
                        amountA4Dollar = "<font color='red'>" + obj.amountA4Dollar + "</font>";
                    }
                    else if (obj.amountA4Dollar >= rankInfo.maxUSD) {
                        amountA4Dollar = "<font color='brown'>" + obj.amountA4Dollar + "</font>";
                    } else {
                        amountA4Dollar = obj.amountA4Dollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountA4Dollar + "</font>" : obj.amountA4Dollar;
                    }




                    if (obj.amountTDollar === maxTDollar) {
                        amountTDollar = "<font color='red'>" + obj.amountTDollar + "</font>";
                    }
                    else if (obj.amountTDollar >= rankInfo.maxUSD) {
                        amountTDollar = "<font color='brown'>" + obj.amountTDollar + "</font>";
                    } else {
                        amountTDollar = obj.amountTDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountTDollar + "</font>" : obj.amountTDollar;
                    }



                    if (obj.amountVatDollar === maxVatDollar) {
                        amountVatDollar = "<font color='red'>" + obj.amountVatDollar + "</font>";
                    }
                    else if (obj.amountVatDollar >= rankInfo.maxUSD) {
                        amountVatDollar = "<font color='brown'>" + obj.amountVatDollar + "</font>";
                    } else {
                        amountVatDollar = obj.amountVatDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountVatDollar + "</font>" : obj.amountVatDollar;
                    }



                    if (obj.amountLerDollar === maxLerDollar) {
                        amountLerDollar = "<font color='red'>" + obj.amountLerDollar + "</font>";
                    }
                    else if (obj.amountLerDollar >= rankInfo.maxUSD) {
                        amountLerDollar = "<font color='brown'>" + obj.amountLerDollar + "</font>";
                    } else {
                        amountLerDollar = obj.amountLerDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountLerDollar + "</font>" : obj.amountLerDollar;
                    }



                    if (obj.amountTotDollar === maxTotDollar) {
                        amountTotDollar = "<font color='red'>" + obj.amountTotDollar + "</font>";
                    }
                    else if (obj.amountTotDollar >= rankInfo.maxUSD) {
                        amountTotDollar = "<font color='brown'>" + obj.amountTotDollar + "</font>";
                    } else {
                        amountTotDollar = obj.amountTotDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountTotDollar + "</font>" : obj.amountTotDollar;
                    }






                    if (obj.amountLoDollar === maxLoDollar) {
                        amountLoDollar = "<font color='red'>" + obj.amountLoDollar + "</font>";
                    }
                    else if (obj.amountLoDollar >= rankInfo.maxUSD) {
                        amountLoDollar = "<font color='brown'>" + obj.amountLoDollar + "</font>";
                    } else {
                        amountLoDollar = obj.amountLoDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountLoDollar + "</font>" : obj.amountLoDollar;
                    }


                    if (obj.amountABaht === maxABaht) {
                        amountABaht = "<font color='red'>" + obj.amountABaht + "</font>";
                    }
                    else if (obj.amountABaht >= rankInfo.maxTHB) {
                        amountABaht = "<font color='brown'>" + obj.amountABaht + "</font>";
                    } else {
                        amountABaht = obj.amountABaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountABaht + "</font>" : obj.amountABaht;
                    }

                    if (obj.amountBBaht === maxBBaht) {
                        amountBBaht = "<font color='red'>" + obj.amountBBaht + "</font>";
                    }
                    else if (obj.amountBBaht >= rankInfo.maxTHB) {
                        amountBBaht = "<font color='brown'>" + obj.amountBBaht + "</font>";
                    } else {
                        amountBBaht = obj.amountBBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountBBaht + "</font>" : obj.amountBBaht;
                    }


                    if (obj.amountCBaht === maxCBaht) {
                        amountCBaht = "<font color='red'>" + obj.amountCBaht + "</font>";
                    }
                    else if (obj.amountCBaht >= rankInfo.maxTHB) {
                        amountCBaht = "<font color='brown'>" + obj.amountCBaht + "</font>";
                    } else {
                        amountCBaht = obj.amountCBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountCBaht + "</font>" : obj.amountCBaht;
                    }

                    if (obj.amountDBaht === maxDBaht) {
                        amountDBaht = "<font color='red'>" + obj.amountDBaht + "</font>";
                    }
                    else if (obj.amountDBaht >= rankInfo.maxTHB) {
                        amountDBaht = "<font color='brown'>" + obj.amountDBaht + "</font>";
                    } else {
                        amountDBaht = obj.amountDBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountDBaht + "</font>" : obj.amountDBaht;
                    }







                    if (obj.amountFBaht === maxFBaht) {
                        amountFBaht = "<font color='red'>" + obj.amountFBaht + "</font>";
                    }
                    else if (obj.amountFBaht >= rankInfo.maxTHB) {
                        amountFBaht = "<font color='brown'>" + obj.amountFBaht + "</font>";
                    } else {
                        amountFBaht = obj.amountFBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountFBaht + "</font>" : obj.amountFBaht;
                    }



                    if (obj.amountIBaht === maxIBaht) {
                        amountIBaht = "<font color='red'>" + obj.amountIBaht + "</font>";
                    }
                    else if (obj.amountIBaht >= rankInfo.maxTHB) {
                        amountIBaht = "<font color='brown'>" + obj.amountIBaht + "</font>";
                    } else {
                        amountIBaht = obj.amountIBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountIBaht + "</font>" : obj.amountIBaht;
                    }



                    if (obj.amountKBaht === maxKBaht) {
                        amountKBaht = "<font color='red'>" + obj.amountKBaht + "</font>";
                    }
                    else if (obj.amountKBaht >= rankInfo.maxTHB) {
                        amountKBaht = "<font color='brown'>" + obj.amountKBaht + "</font>";
                    } else {
                        amountKBaht = obj.amountKBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountKBaht + "</font>" : obj.amountKBaht;
                    }



                    if (obj.amountLBaht === maxLBaht) {
                        amountLBaht = "<font color='red'>" + obj.amountLBaht + "</font>";
                    }
                    else if (obj.amountLBaht >= rankInfo.maxTHB) {
                        amountLBaht = "<font color='brown'>" + obj.amountLBaht + "</font>";
                    } else {
                        amountLBaht = obj.amountLBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountLBaht + "</font>" : obj.amountLBaht;
                    }



                    if (obj.amountNBaht === maxNBaht) {
                        amountNBaht = "<font color='red'>" + obj.amountNBaht + "</font>";
                    }
                    else if (obj.amountNBaht >= rankInfo.maxTHB) {
                        amountNBaht = "<font color='brown'>" + obj.amountNBaht + "</font>";
                    } else {
                        amountNBaht = obj.amountNBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountNBaht + "</font>" : obj.amountNBaht;
                    }



                    if (obj.amountOBaht === maxOBaht) {
                        amountOBaht = "<font color='red'>" + obj.amountOBaht + "</font>";
                    }
                    else if (obj.amountOBaht >= rankInfo.maxTHB) {
                        amountOBaht = "<font color='brown'>" + obj.amountOBaht + "</font>";
                    } else {
                        amountOBaht = obj.amountOBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountOBaht + "</font>" : obj.amountOBaht;
                    }



                    if (obj.amountA1Baht === maxA1Baht) {
                        amountA1Baht = "<font color='red'>" + obj.amountA1Baht + "</font>";
                    }
                    else if (obj.amountA1Baht >= rankInfo.maxTHB) {
                        amountA1Baht = "<font color='brown'>" + obj.amountA1Baht + "</font>";
                    } else {
                        amountA1Baht = obj.amountA1Baht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountA1Baht + "</font>" : obj.amountA1Baht;
                    }




                    if (obj.amountA2Baht === maxA2Baht) {
                        amountA2Baht = "<font color='red'>" + obj.amountA2Baht + "</font>";
                    }
                    else if (obj.amountA2Baht >= rankInfo.maxTHB) {
                        amountA2Baht = "<font color='brown'>" + obj.amountA2Baht + "</font>";
                    } else {
                        amountA2Baht = obj.amountA2Baht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountA2Baht + "</font>" : obj.amountA2Baht;
                    }




                    if (obj.amountA3Baht === maxA3Baht) {
                        amountA3Baht = "<font color='red'>" + obj.amountA3Baht + "</font>";
                    }
                    else if (obj.amountA3Baht >= rankInfo.maxTHB) {
                        amountA3Baht = "<font color='brown'>" + obj.amountA3Baht + "</font>";
                    } else {
                        amountA3Baht = obj.amountA3Baht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountA3Baht + "</font>" : obj.amountA3Baht;
                    }




                    if (obj.amountA4Baht === maxA4Baht) {
                        amountA4Baht = "<font color='red'>" + obj.amountA4Baht + "</font>";
                    }
                    else if (obj.amountA4Baht >= rankInfo.maxTHB) {
                        amountA4Baht = "<font color='brown'>" + obj.amountA4Baht + "</font>";
                    } else {
                        amountA4Baht = obj.amountA4Baht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountA4Baht + "</font>" : obj.amountA4Baht;
                    }




                    if (obj.amountTBaht === maxTBaht) {
                        amountTBaht = "<font color='red'>" + obj.amountTBaht + "</font>";
                    }
                    else if (obj.amountTBaht >= rankInfo.maxTHB) {
                        amountTBaht = "<font color='brown'>" + obj.amountTBaht + "</font>";
                    } else {
                        amountTBaht = obj.amountTBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountTBaht + "</font>" : obj.amountTBaht;
                    }


                    if (obj.amountVatBaht === maxVatBaht) {
                        amountVatBaht = "<font color='red'>" + obj.amountVatBaht + "</font>";
                    }
                    else if (obj.amountVatBaht >= rankInfo.maxTHB) {
                        amountVatBaht = "<font color='brown'>" + obj.amountVatBaht + "</font>";
                    } else {
                        amountVatBaht = obj.amountVatBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountVatBaht + "</font>" : obj.amountVatBaht;
                    }


                    if (obj.amountLerBaht === maxLerBaht) {
                        amountLerBaht = "<font color='red'>" + obj.amountLerBaht + "</font>";
                    }
                    else if (obj.amountLerBaht >= rankInfo.maxTHB) {
                        amountLerBaht = "<font color='brown'>" + obj.amountLerBaht + "</font>";
                    } else {
                        amountLerBaht = obj.amountLerBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountLerBaht + "</font>" : obj.amountLerBaht;
                    }


                    if (obj.amountTotBaht === maxTotBaht) {
                        amountTotBaht = "<font color='red'>" + obj.amountTotBaht + "</font>";
                    }
                    else if (obj.amountTotBaht >= rankInfo.maxTHB) {
                        amountTotBaht = "<font color='brown'>" + obj.amountTotBaht + "</font>";
                    } else {
                        amountTotBaht = obj.amountTotBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountTotBaht + "</font>" : obj.amountTotBaht;
                    }




                    if (obj.amountLoBaht === maxLoBaht) {
                        amountLoBaht = "<font color='red'>" + obj.amountLoBaht + "</font>";
                    }
                    else if (obj.amountLoBaht >= rankInfo.maxTHB) {
                        amountLoBaht = "<font color='brown'>" + obj.amountLoBaht + "</font>";
                    } else {
                        amountLoBaht = obj.amountLoBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountLoBaht + "</font>" : obj.amountLoBaht;
                    }
                }


                let valueARiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountARiel + "</b</td>" : "";
                let valueBRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountBRiel + "</b></td>" : "";
                let valueCRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountCRiel + "</b></td>" : "";
                let valueDRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountDRiel + "</b></td>" : "";
                let valueFRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountFRiel + "</b></td>" : "";
                let valueIRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountIRiel + "</b></td>" : "";
                let valueKRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountKRiel + "</b></td>" : "";
                let valueLRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountLRiel + "</b></td>" : "";
                let valueNRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountNRiel + "</b></td>" : "";
                let valueORiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountORiel + "</b></td>" : "";
                let valueA1Riel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountA1Riel + "</b></td>" : "";
                let valueA2Riel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountA2Riel + "</b></td>" : "";
                let valueA3Riel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountA3Riel + "</b></td>" : "";
                let valueA4Riel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountA4Riel + "</b></td>" : "";
                let valueTRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountTRiel + "</b></td>" : "";
                let valueVatRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountVatRiel + "</b></td>" : "";
                let valueLerRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountLerRiel + "</b></td>" : "";
                let valueTotRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountTotRiel + "</b></td>" : "";
                let valueLoRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountLoRiel + "</b></td>" : "";

                let valueADollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountADollar + "</b></td>" : "";
                let valueBDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountBDollar + "</b></td>" : "";
                let valueCDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountCDollar + "</b></td>" : "";
                let valueDDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountDDollar + "</b></td>" : "";
                let valueFDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountFDollar + "</b></td>" : "";
                let valueIDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountIDollar + "</b></td>" : "";
                let valueKDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountKDollar + "</b></td>" : "";
                let valueLDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountLDollar + "</b></td>" : "";
                let valueNDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountNDollar + "</b></td>" : "";
                let valueODollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountODollar + "</b></td>" : "";
                let valueA1Dollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountA1Dollar + "</b></td>" : "";
                let valueA2Dollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountA2Dollar + "</b></td>" : "";
                let valueA3Dollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountA3Dollar + "</b></td>" : "";
                let valueA4Dollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountA4Dollar + "</b></td>" : "";
                let valueTDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountTDollar + "</b></td>" : "";
                let valueVatDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountVatDollar + "</b></td>" : "";
                let valueLerDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountLerDollar + "</b></td>" : "";
                let valueTotDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountTotDollar + "</b></td>" : "";

                let valueLoDollar2D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountLoDollar + "</b></td>" : "";

                let valueABaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountABaht + "</b></td>" : "";
                let valueBBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountBBaht + "</b></td>" : "";
                let valueCBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountCBaht + "</b></td>" : "";
                let valueDBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountDBaht + "</b></td>" : "";
                let valueFBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountFBaht + "</b></td>" : "";
                let valueIBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountIBaht + "</b></td>" : "";
                let valueKBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountKBaht + "</b></td>" : "";
                let valueLBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountLBaht + "</b></td>" : "";
                let valueNBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountNBaht + "</b></td>" : "";
                let valueOBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountOBaht + "</b></td>" : "";
                let valueA1Baht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountA1Baht + "</b></td>" : "";
                let valueA2Baht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountA2Baht + "</b></td>" : "";
                let valueA3Baht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountA3Baht + "</b></td>" : "";
                let valueA4Baht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountA4Baht + "</b></td>" : "";
                let valueTBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountTBaht + "</b></td>" : "";
                let valueVatBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountVatBaht + "</b></td>" : "";
                let valueLerBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountLerBaht + "</b></td>" : "";
                let valueTotBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountTotBaht + "</b></td>" : "";

                let valueLoBaht2D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountLoBaht + "</b></td>" : "";

                dataHtml += "<tr>" +
                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + obj.number + "</td>" +
                    valueARiel2D +
                    valueADollar2D +
                    valueABaht2D +

                    valueBRiel2D +
                    valueBDollar2D +
                    valueBBaht2D +


                    valueCRiel2D +
                    valueCDollar2D +
                    valueCBaht2D +

                    valueDRiel2D +
                    valueDDollar2D +
                    valueDBaht2D +

                    valueFRiel2D +
                    valueFDollar2D +
                    valueFBaht2D +

                    valueIRiel2D +
                    valueIDollar2D +
                    valueIBaht2D +

                    valueKRiel2D +
                    valueKDollar2D +
                    valueKBaht2D +

                    valueLRiel2D +
                    valueLDollar2D +
                    valueLBaht2D +

                    valueNRiel2D +
                    valueNDollar2D +
                    valueNBaht2D +

                    valueORiel2D +
                    valueODollar2D +
                    valueOBaht2D +

                    valueA1Riel2D +
                    valueA1Dollar2D +
                    valueA1Baht2D +

                    valueA2Riel2D +
                    valueA2Dollar2D +
                    valueA2Baht2D +

                    valueA3Riel2D +
                    valueA3Dollar2D +
                    valueA3Baht2D +

                    valueA4Riel2D +
                    valueA4Dollar2D +
                    valueA4Baht2D +

                    valueTRiel2D +
                    valueTDollar2D +
                    valueTBaht2D +

                    valueVatRiel2D +
                    valueVatDollar2D +
                    valueVatBaht2D +


                    valueLerRiel2D +
                    valueLerDollar2D +
                    valueLerBaht2D +


                    valueTotRiel2D +
                    valueTotDollar2D +
                    valueTotBaht2D +

                    valueLoRiel2D +
                    valueLoDollar2D +
                    valueLoBaht2D +
                    "</tr>";

            })
            let footerARiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueARiel2D + "</b</th>" : "";
            let footerBRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueBRiel2D + "</b></th>" : "";
            let footerCRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueCRiel2D + "</b></th>" : "";
            let footerDRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueDRiel2D + "</b></th>" : "";
            let footerFRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueFRiel2D + "</b></th>" : "";
            let footerIRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueIRiel2D + "</b></th>" : "";
            let footerKRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueKRiel2D + "</b></th>" : "";
            let footerLRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLRiel2D + "</b></th>" : "";
            let footerNRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueNRiel2D + "</b></th>" : "";
            let footerORiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueORiel2D + "</b></th>" : "";
            let footerA1Riel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA1Riel2D + "</b></th>" : "";
            let footerA2Riel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA2Riel2D + "</b></th>" : "";
            let footerA3Riel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA3Riel2D + "</b></th>" : "";
            let footerA4Riel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA4Riel2D + "</b></th>" : "";
            let footerTRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueTRiel2D + "</b></th>" : "";
            let footerVatRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueVatRiel2D + "</b></th>" : "";
            let footerLerRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLerRiel2D + "</b></th>" : "";
            let footerTotRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueTotRiel2D + "</b></th>" : "";
            let footerLoRiel2D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLoRiel2D + "</b></th>" : "";

            let footerADollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueADollar2D + "</b></th>" : "";
            let footerBDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueBDollar2D + "</b></th>" : "";
            let footerCDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueCDollar2D + "</b></th>" : "";
            let footerDDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueDDollar2D + "</b></th>" : "";
            let footerFDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueFDollar2D + "</b></th>" : "";
            let footerIDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueIDollar2D + "</b></th>" : "";
            let footerKDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueKDollar2D + "</b></th>" : "";
            let footerLDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLDollar2D + "</b></th>" : "";
            let footerNDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueNDollar2D + "</b></th>" : "";
            let footerODollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueODollar2D + "</b></th>" : "";
            let footerA1Dollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA1Dollar2D + "</b></th>" : "";
            let footerA2Dollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA2Dollar2D + "</b></th>" : "";
            let footerA3Dollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA3Dollar2D + "</b></th>" : "";
            let footerA4Dollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA4Dollar2D + "</b></th>" : "";
            let footerTDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueTDollar2D + "</b></th>" : "";
            let footerVatDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueVatDollar2D + "</b></th>" : "";
            let footerLerDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLerDollar2D + "</b></th>" : "";
            let footerTotDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueTotDollar2D + "</b></th>" : "";

            let footerLoDollar2D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLoDollar2D + "</b></th>" : "";

            let footerABaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueABaht2D + "</b></th>" : "";
            let footerBBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueBBaht2D + "</b></th>" : "";
            let footerCBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueCBaht2D + "</b></th>" : "";
            let footerDBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueDBaht2D + "</b></th>" : "";
            let footerFBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueFBaht2D + "</b></th>" : "";
            let footerIBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueIBaht2D + "</b></th>" : "";
            let footerKBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueKBaht2D + "</b></th>" : "";
            let footerLBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLBaht2D + "</b></th>" : "";
            let footerNBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueNBaht2D + "</b></th>" : "";
            let footerOBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueOBaht2D + "</b></th>" : "";
            let footerA1Baht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA1Baht2D + "</b></th>" : "";
            let footerA2Baht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA2Baht2D + "</b></th>" : "";
            let footerA3Baht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA3Baht2D + "</b></th>" : "";
            let footerA4Baht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA4Baht2D + "</b></th>" : "";
            let footerTBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueTBaht2D + "</b></th>" : "";
            let footerVatBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueVatBaht2D + "</b></th>" : "";
            let footerLerBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLerBaht2D + "</b></th>" : "";
            let footerTotBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueTotBaht2D + "</b></th>" : "";

            let footerLoBaht2D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLoBaht2D + "</b></th>" : "";

            dataHtml += "<tr class='sumFooter'>" +
                "<th style='border: solid 1px;' align='center';><font size='1'>TTL</font></th>" +

                footerARiel2D +
                footerADollar2D +
                footerABaht2D +

                footerBRiel2D +
                footerBDollar2D +
                footerBBaht2D +

                footerCRiel2D +
                footerCDollar2D +
                footerCBaht2D +

                footerDRiel2D +
                footerDDollar2D +
                footerDBaht2D +

                footerFRiel2D +
                footerFDollar2D +
                footerFBaht2D +

                footerIRiel2D +
                footerIDollar2D +
                footerIBaht2D +

                footerKRiel2D +
                footerKDollar2D +
                footerKBaht2D +

                footerLRiel2D +
                footerLDollar2D +
                footerLBaht2D +

                footerNRiel2D +
                footerNDollar2D +
                footerNBaht2D +

                footerORiel2D +
                footerODollar2D +
                footerOBaht2D +

                footerA1Riel2D +
                footerA1Dollar2D +
                footerA1Baht2D +

                footerA2Riel2D +
                footerA2Dollar2D +
                footerA2Baht2D +

                footerA3Riel2D +
                footerA3Dollar2D +
                footerA3Baht2D +

                footerA4Riel2D +
                footerA4Dollar2D +
                footerA4Baht2D +

                footerTRiel2D +
                footerTDollar2D +
                footerTBaht2D +


                footerVatRiel2D +
                footerVatDollar2D +
                footerVatBaht2D +


                footerLerRiel2D +
                footerLerDollar2D +
                footerLerBaht2D +


                footerTotRiel2D +
                footerTotDollar2D +
                footerTotBaht2D +

                footerLoRiel2D +
                footerLoDollar2D +
                footerLoBaht2D +
                "</tr>" + "</table><footer></footer>";


            dataHtml +=
                "<table class='table table-report table-striped table-reportWinLoseMain' style='border-collapse: collapse !important;'>" +
                "<tr><th rowspan='2' style='border: solid 1px' align='center'>"+t[language].betIn3D+"</th><th style='border: solid 1px' colspan='" + currencyLength + "' align='center'>A</th><th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> B</th><th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> C</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> D</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> F</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> I</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> K</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> L</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> N</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> O</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> A1</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> A2</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> A3</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> A4</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> T</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> Vat</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> Ler</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> Tot</th>" +
                "<th style='border: solid 1px' colspan='" + currencyLength + "' align='center'>Lo</th></tr>" +
                "<tr>" +
                labelRiel2D +
                labelDollar2D +
                labelBaht2D +
                labelRiel3D +
                labelDollar3D +
                labelBaht3D +
                labelRiel3D +
                labelDollar3D +
                labelBaht3D +
                labelRiel3D +
                labelDollar3D +
                labelBaht3D +
                labelRiel3D +
                labelDollar3D +
                labelBaht3D +
                labelRiel3D +
                labelDollar3D +
                labelBaht3D +
                labelRiel3D +
                labelDollar3D +
                labelBaht3D +
                labelRiel3D +
                labelDollar3D +
                labelBaht3D +
                labelRiel3D +
                labelDollar3D +
                labelBaht3D +
                labelRiel3D +
                labelDollar3D +
                labelBaht3D +
                labelRiel3D +
                labelDollar3D +
                labelBaht3D +
                labelRiel3D +
                labelDollar3D +
                labelBaht3D +
                labelRiel3D +
                labelDollar3D +
                labelBaht3D +
                labelRiel3D +
                labelDollar3D +
                labelBaht3D +
                labelRiel3D +
                labelDollar3D +
                labelBaht3D +
                labelRiel3D +
                labelDollar3D +
                labelBaht3D +
                labelRiel3D +
                labelDollar3D +
                labelBaht3D +
                labelRiel3D +
                labelDollar3D +
                labelBaht3D +
                labelRiel3D +
                labelDollar3D +
                labelBaht3D +
                "</tr>";


            let grandValueARiel3D = 0;
            let grandValueBRiel3D = 0;
            let grandValueCRiel3D = 0;
            let grandValueDRiel3D = 0;
            let grandValueFRiel3D = 0;
            let grandValueIRiel3D = 0;
            let grandValueKRiel3D = 0;
            let grandValueLRiel3D = 0;
            let grandValueNRiel3D = 0;
            let grandValueORiel3D = 0;
            let grandValueA1Riel3D = 0;
            let grandValueA2Riel3D = 0;
            let grandValueA3Riel3D = 0;
            let grandValueA4Riel3D = 0;
            let grandValueTRiel3D = 0;
            let grandValueVatRiel3D = 0;
            let grandValueLerRiel3D = 0;
            let grandValueTotRiel3D = 0;
            let grandValueLoRiel3D = 0;

            let grandValueADollar3D = 0;
            let grandValueBDollar3D = 0;
            let grandValueCDollar3D = 0;
            let grandValueDDollar3D = 0;
            let grandValueFDollar3D = 0;
            let grandValueIDollar3D = 0;
            let grandValueKDollar3D = 0;
            let grandValueLDollar3D = 0;
            let grandValueNDollar3D = 0;
            let grandValueODollar3D = 0;
            let grandValueA1Dollar3D = 0;
            let grandValueA2Dollar3D = 0;
            let grandValueA3Dollar3D = 0;
            let grandValueA4Dollar3D = 0;
            let grandValueTDollar3D = 0;
            let grandValueVatDollar3D = 0;
            let grandValueLerDollar3D = 0;
            let grandValueTotDollar3D = 0;
            let grandValueLoDollar3D = 0;

            let grandValueABaht3D = 0;
            let grandValueBBaht3D = 0;
            let grandValueCBaht3D = 0;
            let grandValueDBaht3D = 0;
            let grandValueFBaht3D = 0;
            let grandValueIBaht3D = 0;
            let grandValueKBaht3D = 0;
            let grandValueLBaht3D = 0;
            let grandValueNBaht3D = 0;
            let grandValueOBaht3D = 0;
            let grandValueA1Baht3D = 0;
            let grandValueA2Baht3D = 0;
            let grandValueA3Baht3D = 0;
            let grandValueA4Baht3D = 0;
            let grandValueTBaht3D = 0;
            let grandValueVatBaht3D = 0;
            let grandValueLerBaht3D = 0;
            let grandValueTotBaht3D = 0;
            let grandValueLoBaht3D = 0;


            result3DFinal.forEach(function (obj) {

                grandValueARiel3D += obj.amountARiel;
                grandValueBRiel3D += obj.amountBRiel;
                grandValueCRiel3D += obj.amountCRiel;
                grandValueDRiel3D += obj.amountDRiel;
                grandValueFRiel3D += obj.amountFRiel;
                grandValueIRiel3D += obj.amountIRiel;
                grandValueKRiel3D += obj.amountKRiel;
                grandValueLRiel3D += obj.amountLRiel;
                grandValueNRiel3D += obj.amountNRiel;
                grandValueORiel3D += obj.amountORiel;
                grandValueA1Riel3D += obj.amountA1Riel;
                grandValueA2Riel3D += obj.amountA2Riel;
                grandValueA3Riel3D += obj.amountA3Riel;
                grandValueA4Riel3D += obj.amountA4Riel;
                grandValueTRiel3D += obj.amountTRiel;
                grandValueVatRiel3D += obj.amountVatRiel;
                grandValueLerRiel3D += obj.amountLerRiel;
                grandValueTotRiel3D += obj.amountTotRiel;
                grandValueLoRiel3D += obj.amountLoRiel;

                grandValueADollar3D += obj.amountADollar;
                grandValueBDollar3D += obj.amountBDollar;
                grandValueCDollar3D += obj.amountCDollar;
                grandValueDDollar3D += obj.amountDDollar;
                grandValueFDollar3D += obj.amountFDollar;
                grandValueIDollar3D += obj.amountIDollar;
                grandValueKDollar3D += obj.amountKDollar;
                grandValueLDollar3D += obj.amountLDollar;
                grandValueNDollar3D += obj.amountNDollar;
                grandValueODollar3D += obj.amountODollar;

                grandValueA1Dollar3D += obj.amountA1Dollar;
                grandValueA2Dollar3D += obj.amountA2Dollar;
                grandValueA3Dollar3D += obj.amountA3Dollar;
                grandValueA4Dollar3D += obj.amountA4Dollar;
                grandValueTDollar3D += obj.amountTDollar;
                grandValueVatDollar3D += obj.amountVatDollar;
                grandValueLerDollar3D += obj.amountLerDollar;
                grandValueTotDollar3D += obj.amountTotDollar;
                grandValueLoDollar3D += obj.amountLoDollar;

                grandValueABaht3D += obj.amountABaht;
                grandValueBBaht3D += obj.amountBBaht;
                grandValueCBaht3D += obj.amountCBaht;
                grandValueDBaht3D += obj.amountDBaht;
                grandValueFBaht3D += obj.amountFBaht;
                grandValueIBaht3D += obj.amountIBaht;
                grandValueKBaht3D += obj.amountKBaht;
                grandValueLBaht3D += obj.amountLBaht;
                grandValueNBaht3D += obj.amountNBaht;
                grandValueOBaht3D += obj.amountOBaht;

                grandValueA1Baht3D += obj.amountA1Baht;
                grandValueA2Baht3D += obj.amountA2Baht;
                grandValueA3Baht3D += obj.amountA3Baht;
                grandValueA4Baht3D += obj.amountA4Baht;
                grandValueTBaht3D += obj.amountTBaht;
                grandValueVatBaht3D += obj.amountVatBaht;
                grandValueLerBaht3D += obj.amountLerBaht;
                grandValueTotBaht3D += obj.amountTotBaht;
                grandValueLoBaht3D += obj.amountLoBaht;


                let amount3DARiel;
                let amount3DBRiel;
                let amount3DCRiel;
                let amount3DDRiel;
                let amount3DFRiel;
                let amount3DIRiel;
                let amount3DKRiel;
                let amount3DLRiel;
                let amount3DNRiel;
                let amount3DORiel;
                let amount3DA1Riel;
                let amount3DA2Riel;
                let amount3DA3Riel;
                let amount3DA4Riel;
                let amount3DTRiel;
                let amount3DVatRiel;
                let amount3DLerRiel;
                let amount3DTotRiel;
                let amount3DLoRiel;


                let amount3DADollar;
                let amount3DBDollar;
                let amount3DCDollar;
                let amount3DDDollar;
                let amount3DFDollar;
                let amount3DIDollar;
                let amount3DKDollar;
                let amount3DLDollar;
                let amount3DNDollar;
                let amount3DODollar;
                let amount3DA1Dollar;
                let amount3DA2Dollar;
                let amount3DA3Dollar;
                let amount3DA4Dollar;
                let amount3DTDollar;
                let amount3DVatDollar;
                let amount3DLerDollar;
                let amount3DTotDollar;
                let amount3DLoDollar;


                let amount3DABaht;
                let amount3DBBaht;
                let amount3DCBaht;
                let amount3DDBaht;
                let amount3DFBaht;
                let amount3DIBaht;
                let amount3DKBaht;
                let amount3DLBaht;
                let amount3DNBaht;
                let amount3DOBaht;

                let amount3DA1Baht;
                let amount3DA2Baht;
                let amount3DA3Baht;
                let amount3DA4Baht;
                let amount3DTBaht;
                let amount3DVatBaht;
                let amount3DLerBaht;
                let amount3DTotBaht;
                let amount3DLoBaht;


                if (!(self.rankId && self.rankId !== "" && self.rankId !== null)) {
                    amount3DARiel = obj.amountARiel === max3DARiel ? "<font color='red'>" + obj.amountARiel + "</font>" : obj.amountARiel;
                    amount3DBRiel = obj.amountBRiel === max3DBRiel ? "<font color='red'>" + obj.amountBRiel + "</font>" : obj.amountBRiel;
                    amount3DCRiel = obj.amountCRiel === max3DCRiel ? "<font color='red'>" + obj.amountCRiel + "</font>" : obj.amountCRiel;
                    amount3DDRiel = obj.amountDRiel === max3DDRiel ? "<font color='red'>" + obj.amountDRiel + "</font>" : obj.amountDRiel;
                    amount3DFRiel = obj.amountFRiel === max3DFRiel ? "<font color='red'>" + obj.amountFRiel + "</font>" : obj.amountFRiel;
                    amount3DIRiel = obj.amountIRiel === max3DIRiel ? "<font color='red'>" + obj.amountIRiel + "</font>" : obj.amountIRiel;
                    amount3DKRiel = obj.amountKRiel === max3DKRiel ? "<font color='red'>" + obj.amountKRiel + "</font>" : obj.amountKRiel;
                    amount3DLRiel = obj.amountLRiel === max3DLRiel ? "<font color='red'>" + obj.amountLRiel + "</font>" : obj.amountLRiel;
                    amount3DNRiel = obj.amountNRiel === max3DNRiel ? "<font color='red'>" + obj.amountNRiel + "</font>" : obj.amountNRiel;
                    amount3DORiel = obj.amountORiel === max3DORiel ? "<font color='red'>" + obj.amountORiel + "</font>" : obj.amountORiel;
                    amount3DA1Riel = obj.amountA1Riel === max3DA1Riel ? "<font color='red'>" + obj.amountA1Riel + "</font>" : obj.amountA1Riel;
                    amount3DA2Riel = obj.amountA2Riel === max3DA2Riel ? "<font color='red'>" + obj.amountA2Riel + "</font>" : obj.amountA2Riel;
                    amount3DA3Riel = obj.amountA3Riel === max3DA3Riel ? "<font color='red'>" + obj.amountA3Riel + "</font>" : obj.amountA3Riel;
                    amount3DA4Riel = obj.amountA4Riel === max3DA4Riel ? "<font color='red'>" + obj.amountA4Riel + "</font>" : obj.amountA4Riel;
                    amount3DTRiel = obj.amountTRiel === max3DTRiel ? "<font color='red'>" + obj.amountTRiel + "</font>" : obj.amountTRiel;
                    amount3DVatRiel = obj.amountVatRiel === max3DVatRiel ? "<font color='red'>" + obj.amountVatRiel + "</font>" : obj.amountVatRiel;
                    amount3DLerRiel = obj.amountLerRiel === max3DLerRiel ? "<font color='red'>" + obj.amountLerRiel + "</font>" : obj.amountLerRiel;
                    amount3DTotRiel = obj.amountTotRiel === max3DTotRiel ? "<font color='red'>" + obj.amountTotRiel + "</font>" : obj.amountTotRiel;
                    amount3DLoRiel = obj.amountLoRiel === max3DLoRiel ? "<font color='red'>" + obj.amountLoRiel + "</font>" : obj.amountLoRiel;

                    amount3DADollar = obj.amountADollar === max3DADollar ? "<font color='red'>" + obj.amountADollar + "</font>" : obj.amountADollar;
                    amount3DBDollar = obj.amountBDollar === max3DBDollar ? "<font color='red'>" + obj.amountBDollar + "</font>" : obj.amountBDollar;
                    amount3DCDollar = obj.amountCDollar === max3DCDollar ? "<font color='red'>" + obj.amountCDollar + "</font>" : obj.amountCDollar;
                    amount3DDDollar = obj.amountDDollar === max3DDDollar ? "<font color='red'>" + obj.amountDDollar + "</font>" : obj.amountDDollar;
                    amount3DFDollar = obj.amountFDollar === max3DFDollar ? "<font color='red'>" + obj.amountFDollar + "</font>" : obj.amountFDollar;
                    amount3DIDollar = obj.amountIDollar === max3DIDollar ? "<font color='red'>" + obj.amountIDollar + "</font>" : obj.amountIDollar;
                    amount3DKDollar = obj.amountKDollar === max3DKDollar ? "<font color='red'>" + obj.amountKDollar + "</font>" : obj.amountKDollar;
                    amount3DLDollar = obj.amountLDollar === max3DLDollar ? "<font color='red'>" + obj.amountLDollar + "</font>" : obj.amountLDollar;
                    amount3DNDollar = obj.amountNDollar === max3DNDollar ? "<font color='red'>" + obj.amountNDollar + "</font>" : obj.amountNDollar;
                    amount3DODollar = obj.amountODollar === max3DODollar ? "<font color='red'>" + obj.amountODollar + "</font>" : obj.amountODollar;
                    amount3DA1Dollar = obj.amountA1Dollar === max3DA1Dollar ? "<font color='red'>" + obj.amountA1Dollar + "</font>" : obj.amountA1Dollar;
                    amount3DA2Dollar = obj.amountA2Dollar === max3DA2Dollar ? "<font color='red'>" + obj.amountA2Dollar + "</font>" : obj.amountA2Dollar;
                    amount3DA3Dollar = obj.amountA3Dollar === max3DA3Dollar ? "<font color='red'>" + obj.amountA3Dollar + "</font>" : obj.amountA3Dollar;
                    amount3DA4Dollar = obj.amountA4Dollar === max3DA4Dollar ? "<font color='red'>" + obj.amountA4Dollar + "</font>" : obj.amountA4Dollar;
                    amount3DTDollar = obj.amountTDollar === max3DTDollar ? "<font color='red'>" + obj.amountTDollar + "</font>" : obj.amountTDollar;
                    amount3DVatDollar = obj.amountVatDollar === max3DVatDollar ? "<font color='red'>" + obj.amountVatDollar + "</font>" : obj.amountVatDollar;
                    amount3DLerDollar = obj.amountLerDollar === max3DLerDollar ? "<font color='red'>" + obj.amountLerDollar + "</font>" : obj.amountLerDollar;
                    amount3DTotDollar = obj.amountTotDollar === max3DTotDollar ? "<font color='red'>" + obj.amountTotDollar + "</font>" : obj.amountTotDollar;
                    amount3DLoDollar = obj.amountLoDollar === max3DLoDollar ? "<font color='red'>" + obj.amountLoDollar + "</font>" : obj.amountLoDollar;

                    amount3DABaht = obj.amountABaht === max3DABaht ? "<font color='red'>" + obj.amountABaht + "</font>" : obj.amountABaht;
                    amount3DBBaht = obj.amountBBaht === max3DBBaht ? "<font color='red'>" + obj.amountBBaht + "</font>" : obj.amountBBaht;
                    amount3DCBaht = obj.amountCBaht === max3DCBaht ? "<font color='red'>" + obj.amountCBaht + "</font>" : obj.amountCBaht;
                    amount3DDBaht = obj.amountDBaht === max3DDBaht ? "<font color='red'>" + obj.amountDBaht + "</font>" : obj.amountDBaht;
                    amount3DFBaht = obj.amountFBaht === max3DFBaht ? "<font color='red'>" + obj.amountFBaht + "</font>" : obj.amountFBaht;
                    amount3DIBaht = obj.amountIBaht === max3DIBaht ? "<font color='red'>" + obj.amountIBaht + "</font>" : obj.amountIBaht;
                    amount3DKBaht = obj.amountKBaht === max3DKBaht ? "<font color='red'>" + obj.amountKBaht + "</font>" : obj.amountKBaht;
                    amount3DLBaht = obj.amountLBaht === max3DLBaht ? "<font color='red'>" + obj.amountLBaht + "</font>" : obj.amountLBaht;
                    amount3DNBaht = obj.amountNBaht === max3DNBaht ? "<font color='red'>" + obj.amountNBaht + "</font>" : obj.amountNBaht;
                    amount3DOBaht = obj.amountOBaht === max3DOBaht ? "<font color='red'>" + obj.amountOBaht + "</font>" : obj.amountOBaht;
                    amount3DA1Baht = obj.amountA1Baht === max3DA1Baht ? "<font color='red'>" + obj.amountA1Baht + "</font>" : obj.amountA1Baht;
                    amount3DA2Baht = obj.amountA2Baht === max3DA2Baht ? "<font color='red'>" + obj.amountA2Baht + "</font>" : obj.amountA2Baht;
                    amount3DA3Baht = obj.amountA3Baht === max3DA3Baht ? "<font color='red'>" + obj.amountA3Baht + "</font>" : obj.amountA3Baht;
                    amount3DA4Baht = obj.amountA4Baht === max3DA4Baht ? "<font color='red'>" + obj.amountA4Baht + "</font>" : obj.amountA4Baht;
                    amount3DTBaht = obj.amountTBaht === max3DTBaht ? "<font color='red'>" + obj.amountTBaht + "</font>" : obj.amountTBaht;
                    amount3DVatBaht = obj.amountVatBaht === max3DVatBaht ? "<font color='red'>" + obj.amountVatBaht + "</font>" : obj.amountVatBaht;
                    amount3DLerBaht = obj.amountLerBaht === max3DLerBaht ? "<font color='red'>" + obj.amountLerBaht + "</font>" : obj.amountLerBaht;
                    amount3DTotBaht = obj.amountTotBaht === max3DTotBaht ? "<font color='red'>" + obj.amountTotBaht + "</font>" : obj.amountTotBaht;
                    amount3DLoBaht = obj.amountLoBaht === max3DLoBaht ? "<font color='red'>" + obj.amountLoBaht + "</font>" : obj.amountLoBaht;


                } else {

                    if (obj.amountARiel === max3DARiel) {
                        amount3DARiel = "<font color='red'>" + obj.amountARiel + "</font>";
                    }
                    else if (obj.amountARiel >= rankInfo.maxKHR) {
                        amount3DARiel = "<font color='brown'>" + obj.amountARiel + "</font>";
                    } else {
                        amount3DARiel = obj.amountARiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountARiel + "</font>" : obj.amountARiel;
                    }


                    if (obj.amountBRiel === max3DBRiel) {
                        amount3DBRiel = "<font color='red'>" + obj.amountBRiel + "</font>";
                    }
                    else if (obj.amountBRiel >= rankInfo.maxKHR) {
                        amount3DBRiel = "<font color='brown'>" + obj.amountBRiel + "</font>";
                    } else {
                        amount3DBRiel = obj.amountBRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountBRiel + "</font>" : obj.amountBRiel;

                    }


                    if (obj.amountCRiel === max3DCRiel) {
                        amount3DCRiel = "<font color='red'>" + obj.amountCRiel + "</font>";
                    }
                    else if (obj.amountCRiel >= rankInfo.maxKHR) {
                        amount3DCRiel = "<font color='brown'>" + obj.amountCRiel + "</font>";

                    } else {
                        amount3DCRiel = obj.amountCRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountCRiel + "</font>" : obj.amountCRiel;
                    }

                    if (obj.amountDRiel === max3DDRiel) {
                        amount3DDRiel = "<font color='red'>" + obj.amountDRiel + "</font>";
                    }
                    else if (obj.amountDRiel >= rankInfo.maxKHR) {
                        amount3DDRiel = "<font color='brown'>" + obj.amountDRiel + "</font>";
                    } else {
                        amount3DDRiel = obj.amountDRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountDRiel + "</font>" : obj.amountDRiel;
                    }

                    if (obj.amountFRiel === max3DFRiel) {
                        amount3DFRiel = "<font color='red'>" + obj.amountFRiel + "</font>";
                    }
                    else if (obj.amountFRiel >= rankInfo.maxKHR) {
                        amount3DFRiel = "<font color='brown'>" + obj.amountFRiel + "</font>";
                    } else {
                        amount3DFRiel = obj.amountFRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountFRiel + "</font>" : obj.amountFRiel;
                    }

                    if (obj.amountIRiel === max3DIRiel) {
                        amount3DIRiel = "<font color='red'>" + obj.amountIRiel + "</font>";
                    }
                    else if (obj.amountIRiel >= rankInfo.maxKHR) {
                        amount3DIRiel = "<font color='brown'>" + obj.amountIRiel + "</font>";
                    } else {
                        amount3DIRiel = obj.amountIRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountIRiel + "</font>" : obj.amountIRiel;
                    }

                    if (obj.amountKRiel === max3DKRiel) {
                        amount3DKRiel = "<font color='red'>" + obj.amountKRiel + "</font>";
                    }
                    else if (obj.amountKRiel >= rankInfo.maxKHR) {
                        amount3DKRiel = "<font color='brown'>" + obj.amountKRiel + "</font>";
                    } else {
                        amount3DKRiel = obj.amountKRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountKRiel + "</font>" : obj.amountKRiel;
                    }

                    if (obj.amountLRiel === max3DLRiel) {
                        amount3DLRiel = "<font color='red'>" + obj.amountLRiel + "</font>";
                    }
                    else if (obj.amountLRiel >= rankInfo.maxKHR) {
                        amount3DLRiel = "<font color='brown'>" + obj.amountLRiel + "</font>";
                    } else {
                        amount3DLRiel = obj.amountLRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountLRiel + "</font>" : obj.amountLRiel;
                    }

                    if (obj.amountNRiel === max3DNRiel) {
                        amount3DNRiel = "<font color='red'>" + obj.amountNRiel + "</font>";
                    }
                    else if (obj.amountNRiel >= rankInfo.maxKHR) {
                        amount3DNRiel = "<font color='brown'>" + obj.amountNRiel + "</font>";
                    } else {
                        amount3DNRiel = obj.amountNRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountNRiel + "</font>" : obj.amountNRiel;
                    }

                    if (obj.amountORiel === max3DORiel) {
                        amount3DORiel = "<font color='red'>" + obj.amountORiel + "</font>";
                    }
                    else if (obj.amountORiel >= rankInfo.maxKHR) {
                        amount3DORiel = "<font color='brown'>" + obj.amountORiel + "</font>";
                    } else {
                        amount3DORiel = obj.amountORiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountORiel + "</font>" : obj.amountORiel;
                    }


                    if (obj.amountA1Riel === max3DA1Riel) {
                        amount3DA1Riel = "<font color='red'>" + obj.amountA1Riel + "</font>";
                    }
                    else if (obj.amountA1Riel >= rankInfo.maxKHR) {
                        amount3DA1Riel = "<font color='brown'>" + obj.amountA1Riel + "</font>";
                    } else {
                        amount3DA1Riel = obj.amountA1Riel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountA1Riel + "</font>" : obj.amountA1Riel;
                    }


                    if (obj.amountA2Riel === max3DA2Riel) {
                        amount3DA2Riel = "<font color='red'>" + obj.amountA2Riel + "</font>";
                    }
                    else if (obj.amountA2Riel >= rankInfo.maxKHR) {
                        amount3DA2Riel = "<font color='brown'>" + obj.amountA2Riel + "</font>";
                    } else {
                        amount3DA2Riel = obj.amountA2Riel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountA2Riel + "</font>" : obj.amountA2Riel;
                    }


                    if (obj.amountA3Riel === max3DA3Riel) {
                        amount3DA3Riel = "<font color='red'>" + obj.amountA3Riel + "</font>";
                    }
                    else if (obj.amountA3Riel >= rankInfo.maxKHR) {
                        amount3DA3Riel = "<font color='brown'>" + obj.amountA3Riel + "</font>";
                    } else {
                        amount3DA3Riel = obj.amountA3Riel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountA3Riel + "</font>" : obj.amountA3Riel;
                    }


                    if (obj.amountA4Riel === max3DA4Riel) {
                        amount3DA4Riel = "<font color='red'>" + obj.amountA4Riel + "</font>";
                    }
                    else if (obj.amountA4Riel >= rankInfo.maxKHR) {
                        amount3DA4Riel = "<font color='brown'>" + obj.amountA4Riel + "</font>";
                    } else {
                        amount3DA4Riel = obj.amountA4Riel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountA4Riel + "</font>" : obj.amountA4Riel;
                    }


                    if (obj.amountTRiel === max3DTRiel) {
                        amount3DTRiel = "<font color='red'>" + obj.amountTRiel + "</font>";
                    }
                    else if (obj.amountTRiel >= rankInfo.maxKHR) {
                        amount3DTRiel = "<font color='brown'>" + obj.amountTRiel + "</font>";
                    } else {
                        amount3DTRiel = obj.amountTRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountTRiel + "</font>" : obj.amountTRiel;
                    }



                    if (obj.amountVatRiel === max3DVatRiel) {
                        amount3DVatRiel = "<font color='red'>" + obj.amountVatRiel + "</font>";
                    }
                    else if (obj.amountVatRiel >= rankInfo.maxKHR) {
                        amount3DVatRiel = "<font color='brown'>" + obj.amountVatRiel + "</font>";
                    } else {
                        amount3DVatRiel = obj.amountVatRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountVatRiel + "</font>" : obj.amountVatRiel;
                    }



                    if (obj.amountLerRiel === max3DLerRiel) {
                        amount3DLerRiel = "<font color='red'>" + obj.amountLerRiel + "</font>";
                    }
                    else if (obj.amountLerRiel >= rankInfo.maxKHR) {
                        amount3DLerRiel = "<font color='brown'>" + obj.amountLerRiel + "</font>";
                    } else {
                        amount3DLerRiel = obj.amountLerRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountLerRiel + "</font>" : obj.amountLerRiel;
                    }



                    if (obj.amountTotRiel === max3DTotRiel) {
                        amount3DTotRiel = "<font color='red'>" + obj.amountTotRiel + "</font>";
                    }
                    else if (obj.amountTotRiel >= rankInfo.maxKHR) {
                        amount3DTotRiel = "<font color='brown'>" + obj.amountTotRiel + "</font>";
                    } else {
                        amount3DTotRiel = obj.amountTotRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountTotRiel + "</font>" : obj.amountTotRiel;
                    }





                    if (obj.amountLoRiel === max3DLoRiel) {
                        amount3DLoRiel = "<font color='red'>" + obj.amountLoRiel + "</font>";
                    }
                    else if (obj.amountLoRiel >= rankInfo.maxKHR) {
                        amount3DLoRiel = "<font color='brown'>" + obj.amountLoRiel + "</font>";
                    } else {
                        amount3DLoRiel = obj.amountLoRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountLoRiel + "</font>" : obj.amountLoRiel;
                    }


                    if (obj.amountADollar === max3DADollar) {
                        amount3DADollar = "<font color='red'>" + obj.amountADollar + "</font>";
                    }
                    else if (obj.amountADollar >= rankInfo.maxUSD) {
                        amount3DADollar = "<font color='brown'>" + obj.amountADollar + "</font>";

                    } else {
                        amount3DADollar = obj.amountADollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountADollar + "</font>" : obj.amountADollar;

                    }

                    if (obj.amountBDollar === max3DBDollar) {
                        amount3DBDollar = "<font color='red'>" + obj.amountBDollar + "</font>";
                    }
                    else if (obj.amountBDollar >= rankInfo.maxUSD) {
                        amount3DBDollar = "<font color='brown'>" + obj.amountBDollar + "</font>";
                    } else {
                        amount3DBDollar = obj.amountBDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountBDollar + "</font>" : obj.amountBDollar;
                    }

                    if (obj.amountCDollar === max3DCDollar) {
                        amount3DCDollar = "<font color='red'>" + obj.amountCDollar + "</font>";
                    }
                    else if (obj.amountCDollar >= rankInfo.maxUSD) {
                        amount3DCDollar = "<font color='brown'>" + obj.amountCDollar + "</font>";
                    } else {
                        amount3DCDollar = obj.amountCDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountCDollar + "</font>" : obj.amountCDollar;
                    }

                    if (obj.amountDDollar === max3DDDollar) {
                        amount3DDDollar = "<font color='red'>" + obj.amountDDollar + "</font>";
                    }
                    else if (obj.amountDDollar >= rankInfo.maxUSD) {
                        amount3DDDollar = "<font color='brown'>" + obj.amountDDollar + "</font>";
                    } else {
                        amount3DDDollar = obj.amountDDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountDDollar + "</font>" : obj.amountDDollar;
                    }






                    if (obj.amountFDollar === max3DFDollar) {
                        amount3DFDollar = "<font color='red'>" + obj.amountFDollar + "</font>";
                    }
                    else if (obj.amountFDollar >= rankInfo.maxKHR) {
                        amount3DFDollar = "<font color='brown'>" + obj.amountFDollar + "</font>";
                    } else {
                        amount3DFDollar = obj.amountFDollar >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountFDollar + "</font>" : obj.amountFDollar;
                    }

                    if (obj.amountIDollar === max3DIDollar) {
                        amount3DIDollar = "<font color='red'>" + obj.amountIDollar + "</font>";
                    }
                    else if (obj.amountIDollar >= rankInfo.maxKHR) {
                        amount3DIDollar = "<font color='brown'>" + obj.amountIDollar + "</font>";
                    } else {
                        amount3DIDollar = obj.amountIDollar >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountIDollar + "</font>" : obj.amountIDollar;
                    }

                    if (obj.amountKDollar === max3DKDollar) {
                        amount3DKDollar = "<font color='red'>" + obj.amountKDollar + "</font>";
                    }
                    else if (obj.amountKDollar >= rankInfo.maxKHR) {
                        amount3DKDollar = "<font color='brown'>" + obj.amountKDollar + "</font>";
                    } else {
                        amount3DKDollar = obj.amountKDollar >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountKDollar + "</font>" : obj.amountKDollar;
                    }

                    if (obj.amountLDollar === max3DLDollar) {
                        amount3DLDollar = "<font color='red'>" + obj.amountLDollar + "</font>";
                    }
                    else if (obj.amountLDollar >= rankInfo.maxKHR) {
                        amount3DLDollar = "<font color='brown'>" + obj.amountLDollar + "</font>";
                    } else {
                        amount3DLDollar = obj.amountLDollar >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountLDollar + "</font>" : obj.amountLDollar;
                    }

                    if (obj.amountNDollar === max3DNDollar) {
                        amount3DNDollar = "<font color='red'>" + obj.amountNDollar + "</font>";
                    }
                    else if (obj.amountNDollar >= rankInfo.maxKHR) {
                        amount3DNDollar = "<font color='brown'>" + obj.amountNDollar + "</font>";
                    } else {
                        amount3DNDollar = obj.amountNDollar >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountNDollar + "</font>" : obj.amountNDollar;
                    }

                    if (obj.amountODollar === max3DODollar) {
                        amount3DODollar = "<font color='red'>" + obj.amountODollar + "</font>";
                    }
                    else if (obj.amountODollar >= rankInfo.maxKHR) {
                        amount3DODollar = "<font color='brown'>" + obj.amountODollar + "</font>";
                    } else {
                        amount3DODollar = obj.amountODollar >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountODollar + "</font>" : obj.amountODollar;
                    }







                    if (obj.amountA1Dollar === max3DA1Dollar) {
                        amount3DA1Dollar = "<font color='red'>" + obj.amountA1Dollar + "</font>";
                    }
                    else if (obj.amountA1Dollar >= rankInfo.maxUSD) {
                        amount3DA1Dollar = "<font color='brown'>" + obj.amountA1Dollar + "</font>";
                    } else {
                        amount3DA1Dollar = obj.amountA1Dollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountA1Dollar + "</font>" : obj.amountA1Dollar;
                    }


                    if (obj.amountA2Dollar === max3DA2Dollar) {
                        amount3DA2Dollar = "<font color='red'>" + obj.amountA2Dollar + "</font>";
                    }
                    else if (obj.amountA2Dollar >= rankInfo.maxUSD) {
                        amount3DA2Dollar = "<font color='brown'>" + obj.amountA2Dollar + "</font>";
                    } else {
                        amount3DA2Dollar = obj.amountA2Dollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountA2Dollar + "</font>" : obj.amountA2Dollar;
                    }


                    if (obj.amountA3Dollar === max3DA3Dollar) {
                        amount3DA3Dollar = "<font color='red'>" + obj.amountA3Dollar + "</font>";
                    }
                    else if (obj.amountA3Dollar >= rankInfo.maxUSD) {
                        amount3DA3Dollar = "<font color='brown'>" + obj.amountA3Dollar + "</font>";
                    } else {
                        amount3DA3Dollar = obj.amountA3Dollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountA3Dollar + "</font>" : obj.amountA3Dollar;
                    }


                    if (obj.amountA4Dollar === max3DA4Dollar) {
                        amount3DA4Dollar = "<font color='red'>" + obj.amountA4Dollar + "</font>";
                    }
                    else if (obj.amountA4Dollar >= rankInfo.maxUSD) {
                        amount3DA4Dollar = "<font color='brown'>" + obj.amountA4Dollar + "</font>";
                    } else {
                        amount3DA4Dollar = obj.amountA4Dollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountA4Dollar + "</font>" : obj.amountA4Dollar;
                    }


                    if (obj.amountTDollar === max3DTDollar) {
                        amount3DTDollar = "<font color='red'>" + obj.amountTDollar + "</font>";
                    }
                    else if (obj.amountTDollar >= rankInfo.maxUSD) {
                        amount3DTDollar = "<font color='brown'>" + obj.amountTDollar + "</font>";
                    } else {
                        amount3DTDollar = obj.amountTDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountTDollar + "</font>" : obj.amountTDollar;
                    }



                    if (obj.amountVatDollar === max3DVatDollar) {
                        amount3DVatDollar = "<font color='red'>" + obj.amountVatDollar + "</font>";
                    }
                    else if (obj.amountVatDollar >= rankInfo.maxUSD) {
                        amount3DVatDollar = "<font color='brown'>" + obj.amountVatDollar + "</font>";
                    } else {
                        amount3DVatDollar = obj.amountVatDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountVatDollar + "</font>" : obj.amountVatDollar;
                    }



                    if (obj.amountLerDollar === max3DLerDollar) {
                        amount3DLerDollar = "<font color='red'>" + obj.amountLerDollar + "</font>";
                    }
                    else if (obj.amountLerDollar >= rankInfo.maxUSD) {
                        amount3DLerDollar = "<font color='brown'>" + obj.amountLerDollar + "</font>";
                    } else {
                        amount3DLerDollar = obj.amountLerDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountLerDollar + "</font>" : obj.amountLerDollar;
                    }



                    if (obj.amountTotDollar === max3DTotDollar) {
                        amount3DTotDollar = "<font color='red'>" + obj.amountTotDollar + "</font>";
                    }
                    else if (obj.amountTotDollar >= rankInfo.maxUSD) {
                        amount3DTotDollar = "<font color='brown'>" + obj.amountTotDollar + "</font>";
                    } else {
                        amount3DTotDollar = obj.amountTotDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountTotDollar + "</font>" : obj.amountTotDollar;
                    }








                    if (obj.amountLoDollar === max3DLoDollar) {
                        amount3DLoDollar = "<font color='red'>" + obj.amountLoDollar + "</font>";
                    }
                    else if (obj.amountLoDollar >= rankInfo.maxUSD) {
                        amount3DLoDollar = "<font color='brown'>" + obj.amountLoDollar + "</font>";
                    } else {
                        amount3DLoDollar = obj.amountLoDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountLoDollar + "</font>" : obj.amountLoDollar;
                    }


                    if (obj.amountABaht === max3DABaht) {
                        amount3DABaht = "<font color='red'>" + obj.amountABaht + "</font>";
                    }
                    else if (obj.amountABaht >= rankInfo.maxTHB) {
                        amount3DABaht = "<font color='brown'>" + obj.amountABaht + "</font>";
                    } else {
                        amount3DABaht = obj.amountABaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountABaht + "</font>" : obj.amountABaht;
                    }

                    if (obj.amountBBaht === max3DBBaht) {
                        amount3DBBaht = "<font color='red'>" + obj.amountBBaht + "</font>";
                    }
                    else if (obj.amountBBaht >= rankInfo.maxTHB) {
                        amount3DBBaht = "<font color='brown'>" + obj.amountBBaht + "</font>";
                    } else {
                        amount3DBBaht = obj.amountBBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountBBaht + "</font>" : obj.amountBBaht;
                    }


                    if (obj.amountCBaht === max3DCBaht) {
                        amount3DCBaht = "<font color='red'>" + obj.amountCBaht + "</font>";
                    }
                    else if (obj.amountCBaht >= rankInfo.maxTHB) {
                        amount3DCBaht = "<font color='brown'>" + obj.amountCBaht + "</font>";
                    } else {
                        amount3DCBaht = obj.amountCBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountCBaht + "</font>" : obj.amountCBaht;
                    }

                    if (obj.amountDBaht === max3DDBaht) {
                        amount3DDBaht = "<font color='red'>" + obj.amountDBaht + "</font>";
                    }
                    else if (obj.amountDBaht >= rankInfo.maxTHB) {
                        amount3DDBaht = "<font color='brown'>" + obj.amountDBaht + "</font>";
                    } else {
                        amount3DDBaht = obj.amountDBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountDBaht + "</font>" : obj.amountDBaht;
                    }





                    if (obj.amountFBaht === max3DFBaht) {
                        amount3DFBaht = "<font color='red'>" + obj.amountFBaht + "</font>";
                    }
                    else if (obj.amountFBaht >= rankInfo.maxKHR) {
                        amount3DFBaht = "<font color='brown'>" + obj.amountFBaht + "</font>";
                    } else {
                        amount3DFBaht = obj.amountFBaht >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountFBaht + "</font>" : obj.amountFBaht;
                    }

                    if (obj.amountIBaht === max3DIBaht) {
                        amount3DIBaht = "<font color='red'>" + obj.amountIBaht + "</font>";
                    }
                    else if (obj.amountIBaht >= rankInfo.maxKHR) {
                        amount3DIBaht = "<font color='brown'>" + obj.amountIBaht + "</font>";
                    } else {
                        amount3DIBaht = obj.amountIBaht >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountIBaht + "</font>" : obj.amountIBaht;
                    }

                    if (obj.amountKBaht === max3DKBaht) {
                        amount3DKBaht = "<font color='red'>" + obj.amountKBaht + "</font>";
                    }
                    else if (obj.amountKBaht >= rankInfo.maxKHR) {
                        amount3DKBaht = "<font color='brown'>" + obj.amountKBaht + "</font>";
                    } else {
                        amount3DKBaht = obj.amountKBaht >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountKBaht + "</font>" : obj.amountKBaht;
                    }

                    if (obj.amountLBaht === max3DLBaht) {
                        amount3DLBaht = "<font color='red'>" + obj.amountLBaht + "</font>";
                    }
                    else if (obj.amountLBaht >= rankInfo.maxKHR) {
                        amount3DLBaht = "<font color='brown'>" + obj.amountLBaht + "</font>";
                    } else {
                        amount3DLBaht = obj.amountLBaht >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountLBaht + "</font>" : obj.amountLBaht;
                    }

                    if (obj.amountNBaht === max3DNBaht) {
                        amount3DNBaht = "<font color='red'>" + obj.amountNBaht + "</font>";
                    }
                    else if (obj.amountNBaht >= rankInfo.maxKHR) {
                        amount3DNBaht = "<font color='brown'>" + obj.amountNBaht + "</font>";
                    } else {
                        amount3DNBaht = obj.amountNBaht >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountNBaht + "</font>" : obj.amountNBaht;
                    }

                    if (obj.amountOBaht === max3DOBaht) {
                        amount3DOBaht = "<font color='red'>" + obj.amountOBaht + "</font>";
                    }
                    else if (obj.amountOBaht >= rankInfo.maxKHR) {
                        amount3DOBaht = "<font color='brown'>" + obj.amountOBaht + "</font>";
                    } else {
                        amount3DOBaht = obj.amountOBaht >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountOBaht + "</font>" : obj.amountOBaht;
                    }




                    if (obj.amountA1Baht === max3DA1Baht) {
                        amount3DA1Baht = "<font color='red'>" + obj.amountA1Baht + "</font>";
                    }
                    else if (obj.amountA1Baht >= rankInfo.maxTHB) {
                        amount3DA1Baht = "<font color='brown'>" + obj.amountA1Baht + "</font>";
                    } else {
                        amount3DA1Baht = obj.amountA1Baht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountA1Baht + "</font>" : obj.amountA1Baht;
                    }


                    if (obj.amountA2Baht === max3DA2Baht) {
                        amount3DA2Baht = "<font color='red'>" + obj.amountA2Baht + "</font>";
                    }
                    else if (obj.amountA2Baht >= rankInfo.maxTHB) {
                        amount3DA2Baht = "<font color='brown'>" + obj.amountA2Baht + "</font>";
                    } else {
                        amount3DA2Baht = obj.amountA2Baht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountA2Baht + "</font>" : obj.amountA2Baht;
                    }


                    if (obj.amountA3Baht === max3DA3Baht) {
                        amount3DA3Baht = "<font color='red'>" + obj.amountA3Baht + "</font>";
                    }
                    else if (obj.amountA3Baht >= rankInfo.maxTHB) {
                        amount3DA3Baht = "<font color='brown'>" + obj.amountA3Baht + "</font>";
                    } else {
                        amount3DA3Baht = obj.amountA3Baht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountA3Baht + "</font>" : obj.amountA3Baht;
                    }


                    if (obj.amountA4Baht === max3DA4Baht) {
                        amount3DA4Baht = "<font color='red'>" + obj.amountA4Baht + "</font>";
                    }
                    else if (obj.amountA4Baht >= rankInfo.maxTHB) {
                        amount3DA4Baht = "<font color='brown'>" + obj.amountA4Baht + "</font>";
                    } else {
                        amount3DA4Baht = obj.amountA4Baht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountA4Baht + "</font>" : obj.amountA4Baht;
                    }


                    if (obj.amountTBaht === max3DTBaht) {
                        amount3DTBaht = "<font color='red'>" + obj.amountTBaht + "</font>";
                    }
                    else if (obj.amountTBaht >= rankInfo.maxTHB) {
                        amount3DTBaht = "<font color='brown'>" + obj.amountTBaht + "</font>";
                    } else {
                        amount3DTBaht = obj.amountTBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountTBaht + "</font>" : obj.amountTBaht;
                    }


                    if (obj.amountVatBaht === max3DVatBaht) {
                        amount3DVatBaht = "<font color='red'>" + obj.amountVatBaht + "</font>";
                    }
                    else if (obj.amountVatBaht >= rankInfo.maxTHB) {
                        amount3DVatBaht = "<font color='brown'>" + obj.amountVatBaht + "</font>";
                    } else {
                        amount3DVatBaht = obj.amountVatBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountVatBaht + "</font>" : obj.amountVatBaht;
                    }


                    if (obj.amountLerBaht === max3DLerBaht) {
                        amount3DLerBaht = "<font color='red'>" + obj.amountLerBaht + "</font>";
                    }
                    else if (obj.amountLerBaht >= rankInfo.maxTHB) {
                        amount3DLerBaht = "<font color='brown'>" + obj.amountLerBaht + "</font>";
                    } else {
                        amount3DLerBaht = obj.amountLerBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountLerBaht + "</font>" : obj.amountLerBaht;
                    }


                    if (obj.amountTotBaht === max3DTotBaht) {
                        amount3DTotBaht = "<font color='red'>" + obj.amountTotBaht + "</font>";
                    }
                    else if (obj.amountTotBaht >= rankInfo.maxTHB) {
                        amount3DTotBaht = "<font color='brown'>" + obj.amountTotBaht + "</font>";
                    } else {
                        amount3DTotBaht = obj.amountTotBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountTotBaht + "</font>" : obj.amountTotBaht;
                    }





                    if (obj.amountLoBaht === max3DLoBaht) {
                        amount3DLoBaht = "<font color='red'>" + obj.amountLoBaht + "</font>";
                    }
                    else if (obj.amountLoBaht >= rankInfo.maxTHB) {
                        amount3DLoBaht = "<font color='brown'>" + obj.amountLoBaht + "</font>";
                    } else {
                        amount3DLoBaht = obj.amountLoBaht >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountLoBaht + "</font>" : obj.amountLoBaht;
                    }

                }
                let valueARiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DARiel + "</b</td>" : "";
                let valueBRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DBRiel + "</b></td>" : "";
                let valueCRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DCRiel + "</b></td>" : "";
                let valueDRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DDRiel + "</b></td>" : "";
                let valueFRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DFRiel + "</b></td>" : "";
                let valueIRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DIRiel + "</b></td>" : "";
                let valueKRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DKRiel + "</b></td>" : "";
                let valueLRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DLRiel + "</b></td>" : "";
                let valueNRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DNRiel + "</b></td>" : "";
                let valueORiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DORiel + "</b></td>" : "";
                let valueA1Riel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DA1Riel + "</b></td>" : "";
                let valueA2Riel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DA2Riel + "</b></td>" : "";
                let valueA3Riel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DA3Riel + "</b></td>" : "";
                let valueA4Riel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DA4Riel + "</b></td>" : "";
                let valueTRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DTRiel + "</b></td>" : "";
                let valueVatRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DVatRiel + "</b></td>" : "";
                let valueLerRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DLerRiel + "</b></td>" : "";
                let valueTotRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DTotRiel + "</b></td>" : "";
                let valueLoRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DLoRiel + "</b></td>" : "";

                let valueADollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DADollar + "</b></td>" : "";
                let valueBDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DBDollar + "</b></td>" : "";
                let valueCDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DCDollar + "</b></td>" : "";
                let valueDDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DDDollar + "</b></td>" : "";
                let valueFDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DFDollar + "</b></td>" : "";
                let valueIDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DIDollar + "</b></td>" : "";
                let valueKDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DKDollar + "</b></td>" : "";
                let valueLDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DLDollar + "</b></td>" : "";
                let valueNDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DNDollar + "</b></td>" : "";
                let valueODollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DODollar + "</b></td>" : "";
                let valueA1Dollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DA1Dollar + "</b></td>" : "";
                let valueA2Dollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DA2Dollar + "</b></td>" : "";
                let valueA3Dollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DA3Dollar + "</b></td>" : "";
                let valueA4Dollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DA4Dollar + "</b></td>" : "";
                let valueTDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DTDollar + "</b></td>" : "";
                let valueVatDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DVatDollar + "</b></td>" : "";
                let valueLerDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DLerDollar + "</b></td>" : "";
                let valueTotDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DTotDollar + "</b></td>" : "";

                let valueLoDollar3D = self.currency.indexOf("2:USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DLoDollar + "</b></td>" : "";

                let valueABaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DABaht + "</b></td>" : "";
                let valueBBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DBBaht + "</b></td>" : "";
                let valueCBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DCBaht + "</b></td>" : "";
                let valueDBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DDBaht + "</b></td>" : "";
                let valueFBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DFBaht + "</b></td>" : "";
                let valueIBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DIBaht + "</b></td>" : "";
                let valueKBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DKBaht + "</b></td>" : "";
                let valueLBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DLBaht + "</b></td>" : "";
                let valueNBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DNBaht + "</b></td>" : "";
                let valueOBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DOBaht + "</b></td>" : "";
                let valueA1Baht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DA1Baht + "</b></td>" : "";
                let valueA2Baht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DA2Baht + "</b></td>" : "";
                let valueA3Baht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DA3Baht + "</b></td>" : "";
                let valueA4Baht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DA4Baht + "</b></td>" : "";
                let valueTBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DTBaht + "</b></td>" : "";
                let valueVatBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DVatBaht + "</b></td>" : "";
                let valueLerBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DLerBaht + "</b></td>" : "";
                let valueTotBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DTotBaht + "</b></td>" : "";

                let valueLoBaht3D = self.currency.indexOf("3:THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DLoBaht + "</b></td>" : "";

                dataHtml += "<tr>" +
                    "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + obj.number + "</td>" +
                    valueARiel3D +
                    valueADollar3D +
                    valueABaht3D +

                    valueBRiel3D +
                    valueBDollar3D +
                    valueBBaht3D +


                    valueCRiel3D +
                    valueCDollar3D +
                    valueCBaht3D +

                    valueDRiel3D +
                    valueDDollar3D +
                    valueDBaht3D +

                    valueFRiel3D +
                    valueFDollar3D +
                    valueFBaht3D +

                    valueIRiel3D +
                    valueIDollar3D +
                    valueIBaht3D +

                    valueKRiel3D +
                    valueKDollar3D +
                    valueKBaht3D +

                    valueLRiel3D +
                    valueLDollar3D +
                    valueLBaht3D +

                    valueNRiel3D +
                    valueNDollar3D +
                    valueNBaht3D +

                    valueORiel3D +
                    valueODollar3D +
                    valueOBaht3D +

                    valueA1Riel3D +
                    valueA1Dollar3D +
                    valueA1Baht3D +

                    valueA2Riel3D +
                    valueA2Dollar3D +
                    valueA2Baht3D +

                    valueA3Riel3D +
                    valueA3Dollar3D +
                    valueA3Baht3D +

                    valueA4Riel3D +
                    valueA4Dollar3D +
                    valueA4Baht3D +

                    valueTRiel3D +
                    valueTDollar3D +
                    valueTBaht3D +

                    valueVatRiel3D +
                    valueVatDollar3D +
                    valueVatBaht3D +

                    valueLerRiel3D +
                    valueLerDollar3D +
                    valueLerBaht3D +

                    valueTotRiel3D +
                    valueTotDollar3D +
                    valueTotBaht3D +

                    valueLoRiel3D +
                    valueLoDollar3D +
                    valueLoBaht3D +
                    "</tr>";

            })
            let footerARiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueARiel3D + "</b</th>" : "";
            let footerBRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueBRiel3D + "</b></th>" : "";
            let footerCRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueCRiel3D + "</b></th>" : "";
            let footerDRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueDRiel3D + "</b></th>" : "";
            let footerFRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueFRiel3D + "</b></th>" : "";
            let footerIRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueIRiel3D + "</b></th>" : "";
            let footerKRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueKRiel3D + "</b></th>" : "";
            let footerLRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLRiel3D + "</b></th>" : "";
            let footerNRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueNRiel3D + "</b></th>" : "";
            let footerORiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueORiel3D + "</b></th>" : "";
            let footerA1Riel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA1Riel3D + "</b></th>" : "";
            let footerA2Riel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA2Riel3D + "</b></th>" : "";
            let footerA3Riel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA3Riel3D + "</b></th>" : "";
            let footerA4Riel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA4Riel3D + "</b></th>" : "";
            let footerTRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueTRiel3D + "</b></th>" : "";
            let footerVatRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueVatRiel3D + "</b></th>" : "";
            let footerLerRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLerRiel3D + "</b></th>" : "";
            let footerTotRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueTotRiel3D + "</b></th>" : "";
            let footerLoRiel3D = self.currency.indexOf("1:KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLoRiel3D + "</b></th>" : "";

            let footerADollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueADollar3D + "</b></th>" : "";
            let footerBDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueBDollar3D + "</b></th>" : "";
            let footerCDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueCDollar3D + "</b></th>" : "";
            let footerDDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueDDollar3D + "</b></th>" : "";
            let footerFDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueFDollar3D + "</b></th>" : "";
            let footerIDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueIDollar3D + "</b></th>" : "";
            let footerKDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueKDollar3D + "</b></th>" : "";
            let footerLDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLDollar3D + "</b></th>" : "";
            let footerNDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueNDollar3D + "</b></th>" : "";
            let footerODollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueODollar3D + "</b></th>" : "";
            let footerA1Dollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA1Dollar3D + "</b></th>" : "";
            let footerA2Dollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA2Dollar3D + "</b></th>" : "";
            let footerA3Dollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA3Dollar3D + "</b></th>" : "";
            let footerA4Dollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA4Dollar3D + "</b></th>" : "";
            let footerTDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueTDollar3D + "</b></th>" : "";
            let footerVatDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueVatDollar3D + "</b></th>" : "";
            let footerLerDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLerDollar3D + "</b></th>" : "";
            let footerTotDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueTotDollar3D + "</b></th>" : "";

            let footerLoDollar3D = self.currency.indexOf("2:USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLoDollar3D + "</b></th>" : "";

            let footerABaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueABaht3D + "</b></th>" : "";
            let footerBBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueBBaht3D + "</b></th>" : "";
            let footerCBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueCBaht3D + "</b></th>" : "";
            let footerDBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueDBaht3D + "</b></th>" : "";
            let footerFBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueFBaht3D + "</b></th>" : "";
            let footerIBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueIBaht3D + "</b></th>" : "";
            let footerKBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueKBaht3D + "</b></th>" : "";
            let footerLBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLBaht3D + "</b></th>" : "";
            let footerNBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueNBaht3D + "</b></th>" : "";
            let footerOBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueOBaht3D + "</b></th>" : "";
            let footerA1Baht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA1Baht3D + "</b></th>" : "";
            let footerA2Baht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA2Baht3D + "</b></th>" : "";
            let footerA3Baht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA3Baht3D + "</b></th>" : "";
            let footerA4Baht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueA4Baht3D + "</b></th>" : "";
            let footerTBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueTBaht3D + "</b></th>" : "";
            let footerVatBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueVatBaht3D + "</b></th>" : "";
            let footerLerBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLerBaht3D + "</b></th>" : "";
            let footerTotBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueTotBaht3D + "</b></th>" : "";

            let footerLoBaht3D = self.currency.indexOf("3:THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLoBaht3D + "</b></th>" : "";

            dataHtml += "<tr class='sumFooter'>" +
                "<th style='border: solid 1px;' align='center';><font size='1'>TTL</font></th>" +

                footerARiel3D +
                footerADollar3D +
                footerABaht3D +

                footerBRiel3D +
                footerBDollar3D +
                footerBBaht3D +

                footerCRiel3D +
                footerCDollar3D +
                footerCBaht3D +

                footerDRiel3D +
                footerDDollar3D +
                footerDBaht3D +

                footerFRiel3D +
                footerFDollar3D +
                footerFBaht3D +

                footerIRiel3D +
                footerIDollar3D +
                footerIBaht3D +

                footerKRiel3D +
                footerKDollar3D +
                footerKBaht3D +

                footerLRiel3D +
                footerLDollar3D +
                footerLBaht3D +

                footerNRiel3D +
                footerNDollar3D +
                footerNBaht3D +

                footerORiel3D +
                footerODollar3D +
                footerOBaht3D +

                footerA1Riel3D +
                footerA1Dollar3D +
                footerA1Baht3D +

                footerA2Riel3D +
                footerA2Dollar3D +
                footerA2Baht3D +

                footerA3Riel3D +
                footerA3Dollar3D +
                footerA3Baht3D +

                footerA4Riel3D +
                footerA4Dollar3D +
                footerA4Baht3D +

                footerTRiel3D +
                footerTDollar3D +
                footerTBaht3D +

                footerVatRiel3D +
                footerVatDollar3D +
                footerVatBaht3D +

                footerLerRiel3D +
                footerLerDollar3D +
                footerLerBaht3D +

                footerTotRiel3D +
                footerTotDollar3D +
                footerTotBaht3D +

                footerLoRiel3D +
                footerLoDollar3D +
                footerLoBaht3D +
                "</tr>" + "</table>";


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
    }
    else {
        return (a.date < b.date) ? -1 : 1;
    }
};

function finder(cmp, arr, attr) {
    let val = arr[0][attr];
    for (let i = 1; i < arr.length; i++) {
        val = cmp(val, arr[i][attr])
    }
    return val;
}
