import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../../imports/libs/globalFn"
import _ from 'lodash'

import {LT_Bet} from "../../../imports/collections/lt_bet"
import {LT_Agent} from "../../../imports/collections/lt_agent"
import {LT_Loss} from "../../../imports/collections/lt_loss"
import {LT_Result} from "../../../imports/collections/lt_result";
import {LT_BetDetail} from "../../../imports/collections/lt_betDetail";

let secret = Meteor.settings.private.secret;
Meteor.methods({
    lt_betGroupByPage: function (selector) {
        let data = LT_Loss.aggregate([
            {
                $unwind: "$detail"
            }, {
                $match: selector
            }, {
                $group: {
                    _id: {
                        page: "$detail.page"
                    },
                    totalRiel2D: {
                        $sum: "$detail.totalRiel2D"
                    },
                    totalRiel3D: {
                        $sum: "$detail.totalRiel3D"
                    },
                    totalRielLer: {
                        $sum: "$detail.totalRielLer"
                    },
                    totalRielTot: {
                        $sum: "$detail.totalRielTot"
                    },
                    totalDollar2D: {
                        $sum: "$detail.totalDollar2D"
                    },
                    totalDollar3D: {
                        $sum: "$detail.totalDollar3D"
                    },
                    totalDollarLer: {
                        $sum: "$detail.totalDollarLer"
                    },
                    totalDollarTot: {
                        $sum: "$detail.totalDollarTot"
                    },
                    totalBaht2D: {
                        $sum: "$detail.totalBaht2D"
                    },
                    totalBaht3D: {
                        $sum: "$detail.totalBaht3D"
                    },
                    totalBahtLer: {
                        $sum: "$detail.totalBahtLer"
                    },
                    totalBahtTot: {
                        $sum: "$detail.totalBahtTot"
                    },


                    lossRiel2D: {
                        $sum: "$detail.lossRiel2D"
                    },
                    lossRiel3D: {
                        $sum: "$detail.lossRiel3D"
                    },
                    lossRielLer: {
                        $sum: "$detail.lossRielLer"
                    },
                    lossRielTot: {
                        $sum: "$detail.lossRielTot"
                    },
                    lossDollar2D: {
                        $sum: "$detail.lossDollar2D"
                    },
                    lossDollar3D: {
                        $sum: "$detail.lossDollar3D"
                    },
                    lossDollarLer: {
                        $sum: "$detail.lossDollarLer"
                    },
                    lossDollarTot: {
                        $sum: "$detail.lossDollarTot"
                    },
                    lossBaht2D: {
                        $sum: "$detail.lossBaht2D"
                    },
                    lossBaht3D: {
                        $sum: "$detail.lossBaht3D"
                    },
                    lossBahtLer: {
                        $sum: "$detail.lossBahtLer"
                    },
                    lossBahtTot: {
                        $sum: "$detail.lossBahtTot"
                    },
                    updateCount: {
                        $sum: "$detail.updateCount"
                    }
                }
            },

            {
                $sort: {
                    "_id.page": 1
                }
            }
        ]);
        return data;

    },
    lt_betGroupByAgent: function (selector, selectorYouPaidRiel, selectorYouPaidDollar, selectorYouPaidBaht, selectorMePaidRiel, selectorMePaidDollar, selectorMePaidBaht, fDate, mainAgentId) {
        let data = LT_Loss.aggregate([
            {
                $unwind: "$detail"
            }, {
                $match: selector
            }, {
                $group: {
                    _id: {
                        agentId: "$agentId"
                    },
                    totalRiel2D: {
                        $sum: "$detail.totalRiel2D"
                    },
                    totalRiel3D: {
                        $sum: "$detail.totalRiel3D"
                    },
                    totalDollar2D: {
                        $sum: "$detail.totalDollar2D"
                    },
                    totalDollar3D: {
                        $sum: "$detail.totalDollar3D"
                    },
                    totalBaht2D: {
                        $sum: "$detail.totalBaht2D"
                    },
                    totalBaht3D: {
                        $sum: "$detail.totalBaht3D"
                    },


                    lossRiel2D: {
                        $sum: "$detail.lossRiel2D"
                    },
                    lossRiel3D: {
                        $sum: "$detail.lossRiel3D"
                    },
                    lossDollar2D: {
                        $sum: "$detail.lossDollar2D"
                    },
                    lossDollar3D: {
                        $sum: "$detail.lossDollar3D"
                    },
                    lossBaht2D: {
                        $sum: "$detail.lossBaht2D"
                    },
                    lossBaht3D: {
                        $sum: "$detail.lossBaht3D"
                    }
                }
            },
            {
                $sort: {
                    "_id.agentId": 1
                }
            }
        ]);

        let agentListRaw = LT_Agent.find({}, {fields: {_id: 1}}).fetch();
        let agentList = [];
        agentListRaw.forEach(function (obj) {
            agentList.push(obj._id);
        })

        let dataList = [];
        data.forEach(function (obj) {
            dataList.push(obj._id.agentId);
        })

        /*agentList.forEach(function (obj) {
            if (obj.indexOf(dataList) == 0) {
                data.push({
                    _id: {agentId: obj},
                    totalRiel2D: 0,
                    totalRiel3D: 0,
                    totalDollar2D: 0,
                    totalDollar3D: 0,
                    totalBaht2D: 0,
                    totalBaht3D: 0,


                    lossRiel2D: 0,
                    lossRiel3D: 0,
                    lossDollar2D: 0,
                    lossDollar3D: 0,
                    lossBaht2D: 0,
                    lossBaht3D: 0

                })
            }
        })*/
        let endDateLastMonth = Lottery.Collection.EndPerMonth.findOne({endDate: {$lt: new Date(fDate)}}, {sort: {endDate: -1}});
        let dataFinal = [];
        let i = 0;
        data.forEach(function (obj) {

            let oldRemain = {};
            if (i == 0) {
                let youPaidRiel = Meteor.call('getTransferMoneyByAgentId', selectorYouPaidRiel);
                let youPaidDollar = Meteor.call('getTransferMoneyByAgentId', selectorYouPaidDollar);
                let youPaidBaht = Meteor.call('getTransferMoneyByAgentId', selectorYouPaidBaht);

                let mePaidRiel = Meteor.call('getTransferMoneyByAgentId', selectorMePaidRiel);
                let mePaidDollar = Meteor.call('getTransferMoneyByAgentId', selectorMePaidDollar);
                let mePaidBaht = Meteor.call('getTransferMoneyByAgentId', selectorMePaidBaht);


                let selectorOldRemain = {};
                selectorOldRemain['detail.agentId'] = mainAgentId;

                if (endDateLastMonth != null) {
                    selectorOldRemain.endDate = endDateLastMonth.endDate;
                    oldRemain = Meteor.call('getEndPerMonthByAgent', selectorOldRemain);
                }

            } else {

                let youPaidRiel = 0;
                let youPaidDollar = 0;
                let youPaidBaht = 0;

                let mePaidRiel = 0;
                let mePaidDollar = 0;
                let mePaidBaht = 0;

            }

            i++;

            if (_.isEmpty(oldRemain)) {
                oldRemain.remainRiel = 0;
                oldRemain.remainDollar = 0;
                oldRemain.remainBaht = 0;
            }

            dataFinal.push({
                agentId: obj._id.agentId,
                totalRiel2D: obj.totalRiel2D,
                totalRiel3D: obj.totalRiel3D,
                totalDollar2D: obj.totalDollar2D,
                totalDollar3D: obj.totalDollar3D,
                totalBaht2D: obj.totalBaht2D,
                totalBaht3D: obj.totalBaht3D,

                lossRiel2D: obj.lossRiel2D,
                lossRiel3D: obj.lossRiel3D,
                lossDollar2D: obj.lossDollar2D,
                lossDollar3D: obj.lossDollar3D,
                lossBaht2D: obj.lossBaht2D,
                lossBaht3D: obj.lossBaht3D,

                youPaidRiel: youPaidRiel,
                youPaidDollar: youPaidDollar,
                youPaidBaht: youPaidBaht,

                mePaidRiel: mePaidRiel,
                mePaidDollar: mePaidDollar,
                mePaidBaht: mePaidBaht,

                oldRemainRiel: oldRemain.remainRiel,
                oldRemainDollar: oldRemain.remainDollar,
                oldRemainBaht: oldRemain.remainBaht
            })
        })
        return dataFinal;
    },
    lt_betGroupByDay: function (selector) {
        let data = LT_Loss.aggregate([
            {
                $unwind: "$detail"
            }, {
                $match: selector
            }, {
                $group: {
                    _id: {
                        date: "$lossDate"
                    },
                    totalRiel2D: {
                        $sum: "$detail.totalRiel2D"
                    },
                    totalRiel3D: {
                        $sum: "$detail.totalRiel3D"
                    },
                    totalRielLer: {
                        $sum: "$detail.totalRielLer"
                    },
                    totalRielTot: {
                        $sum: "$detail.totalRielTot"
                    },
                    totalDollar2D: {
                        $sum: "$detail.totalDollar2D"
                    },
                    totalDollar3D: {
                        $sum: "$detail.totalDollar3D"
                    },
                    totalDollarLer: {
                        $sum: "$detail.totalDollarLer"
                    },
                    totalDollarTot: {
                        $sum: "$detail.totalDollarTot"
                    },
                    totalBaht2D: {
                        $sum: "$detail.totalBaht2D"
                    },
                    totalBaht3D: {
                        $sum: "$detail.totalBaht3D"
                    },

                    totalBahtLer: {
                        $sum: "$detail.totalBahtLer"
                    },

                    totalBahtTot: {
                        $sum: "$detail.totalBahtTot"
                    },


                    lossRiel2D: {
                        $sum: "$detail.lossRiel2D"
                    },
                    lossRiel3D: {
                        $sum: "$detail.lossRiel3D"
                    },
                    lossRielLer: {
                        $sum: "$detail.lossRielLer"
                    },
                    lossRielTot: {
                        $sum: "$detail.lossRielTot"
                    },
                    lossDollar2D: {
                        $sum: "$detail.lossDollar2D"
                    },
                    lossDollar3D: {
                        $sum: "$detail.lossDollar3D"
                    },
                    lossDollarLer: {
                        $sum: "$detail.lossDollarLer"
                    },
                    lossDollarTot: {
                        $sum: "$detail.lossDollarTot"
                    },
                    lossBaht2D: {
                        $sum: "$detail.lossBaht2D"
                    },
                    lossBaht3D: {
                        $sum: "$detail.lossBaht3D"
                    },
                    lossBahtLer: {
                        $sum: "$detail.lossBahtLer"
                    },
                    lossBahtTot: {
                        $sum: "$detail.lossBahtTot"
                    }
                }
            },
            {
                $sort: {
                    "_id.date": 1
                }
            }
        ]);
        return data;
    }

})


