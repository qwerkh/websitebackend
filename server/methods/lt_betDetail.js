import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../imports/libs/globalFn"
import _ from 'lodash'
import numeral from "numeral"
import {LT_BetDetail, LT_BetDetailReact, LT_BetDetailAudit} from "../../imports/collections/lt_betDetail"
import {LT_Bet} from "../../imports/collections/lt_bet";

let secret = Meteor.settings.private.secret;
Meteor.methods({
    lt_insertBetDetail(data, betId, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {

                let betDetailList = [];
                data.items.forEach((d) => {
                    let dataEntry = {};
                    dataEntry._id = d.betDetailId;
                    dataEntry.currencyId = d.currencyId;

                    dataEntry.betId = betId;
                    dataEntry.betDetailDate = data.betDate;
                    dataEntry.page = data.page;
                    dataEntry.line = data.line;
                    dataEntry.agentId = data.agentId;
                    dataEntry.time = data.time;

                    dataEntry.branchId = data.branchId;


                    //Must correct this condition

                    let isThreeDB = false;
                    let postLen = 0;
                    let postLen2D = 0;
                    let postLen3D = 0;


                    //Len 2D
                    if (data.time === "N") {
                        if (Array.isArray(d.post)) {
                            d.post.forEach(function (obj) {
                                if (obj === "0A") {
                                    postLen2D = postLen2D + 4;
                                } else if (obj === "4P") {
                                    postLen2D = postLen2D + 7;
                                } else if (obj === "5Lo") {
                                    postLen2D = postLen2D + 32;
                                } else {
                                    postLen2D = postLen2D + 1;
                                }
                            })
                        } else {
                            d.post.split(",").forEach(function (postFin) {
                                if (postFin === "0A") {
                                    postLen2D += 4;
                                } else if (postFin === "4P") {
                                    postLen2D += 7;
                                } else if (postFin === "5Lo") {
                                    postLen2D = postLen2D + 32;
                                } else {
                                    postLen2D += 1;
                                }
                            })
                        }
                    } else {
                        if (Array.isArray(d.post)) {
                            d.post.forEach(function (obj) {
                                if (obj === "4P") {
                                    postLen2D = postLen2D + 4;
                                } else if (obj == "5Lo") {
                                    if (data.time === "V13") {
                                        postLen2D = postLen2D + 20;
                                    } else {
                                        postLen2D = postLen2D + 23;
                                    }
                                } else {
                                    postLen2D = postLen2D + 1;
                                }
                            })
                        } else {
                            d.post.split(",").forEach(function (postFin) {
                                if (postFin === "4P") {
                                    postLen2D += 4;
                                } else if (postFin === "5Lo") {
                                    if (data.time === "V13") {
                                        postLen2D = postLen2D + 20;
                                    } else {
                                        postLen2D = postLen2D + 23;
                                    }
                                } else {
                                    postLen2D += 1;
                                }
                            })
                        }
                    }

                    //Len 3D
                    if (data.time === "N") {
                        if (Array.isArray(d.post)) {
                            d.post.forEach(function (obj) {
                                if (obj === "0A") {
                                    postLen3D = postLen3D + 3;
                                } else if (obj === "4P") {
                                    postLen3D = postLen3D + 6;
                                } else if (obj === "5Lo") {
                                    postLen3D = postLen3D + 25;
                                } else {
                                    postLen3D = postLen3D + 1;
                                }
                            })
                        } else {
                            d.post.split(",").forEach(function (postFin) {
                                if (postFin === "0A") {
                                    postLen3D += 3;
                                } else if (postFin === "4P") {
                                    postLen3D += 6;
                                } else if (postFin === "5Lo") {
                                    postLen3D = postLen3D + 25;
                                } else {
                                    postLen3D += 1;
                                }
                            })
                        }
                    } else {
                        if (Array.isArray(d.post)) {
                            d.post.forEach(function (obj) {
                                if (obj === "4P") {
                                    postLen3D = postLen3D + 4;
                                } else if (obj === "5Lo") {
                                    if (data.time === "V13") {
                                        postLen2D = postLen2D + 16;
                                    } else {
                                        postLen3D = postLen3D + 19;
                                    }
                                } else {
                                    postLen3D = postLen3D + 1;
                                }
                            })
                        } else {
                            d.post.split(",").forEach(function (postFin) {
                                if (postFin === "4P") {
                                    postLen3D += 4;
                                } else if (postFin === "5Lo") {
                                    if (data.time === "V13") {
                                        postLen2D = postLen2D + 16;
                                    } else {
                                        postLen3D = postLen3D + 19;
                                    }
                                } else {
                                    postLen3D += 1;
                                }
                            })
                        }
                    }


                    if (d.number.substr(d.number.length - 1, d.number.length) === "*") {
                        if (d.number.length === 4) {
                            isThreeDB = true;
                        } else {
                            isThreeDB = false;
                        }
                    } else {
                        if (d.number.length === 3) {
                            isThreeDB = true
                        } else {
                            isThreeDB = false;
                        }
                    }


                    if (isThreeDB === true) {
                        postLen = postLen3D;
                    } else {
                        postLen = postLen2D;
                    }

                    let amount = 0;

                    let items = [];
                    if (/-/.test(d.number)) {
                        let num = d.number.split("-");
                        let doc = [];
                        if (parseInt(num[1]) - parseInt(num[0]) >= 10 && num[0].substr(num[0].length - 1, 1) === num[1].substr(num[1].length - 1, 1)) {
                            doc = GlobalFn.ousKot(d.number);
                        } else if (num[0].length === 2 && parseInt(num[1]) % 11 === 0 && parseInt(num[0]) % 11 === 0 && parseInt(num[1]) >= 10) {
                            doc = GlobalFn.ousPhe(d.number);
                        } else if (num[0].length === 3 && parseInt(num[1]) % 111 === 0 && parseInt(num[0]) % 111 === 0 && parseInt(num[1]) >= 111) {
                            doc = GlobalFn.ousPhe(d.number);
                        } else {
                            doc = GlobalFn.reang(d.number);
                        }

                        doc.forEach(function (obj) {
                            items.push({
                                number: obj,
                                amount: d.amount,
                                totalPerNumber: d.amount * postLen
                            })
                            amount += d.amount;
                        })

                        dataEntry.total = postLen * amount;
                    } else if (/0>/.test(d.number)) {
                        let doc = GlobalFn.ouskbal(d.number);
                        doc.forEach(function (obj) {
                            items.push({
                                number: obj,
                                amount: d.amount,
                                totalPerNumber: d.amount * postLen
                            })
                            amount += d.amount;
                        })
                        dataEntry.total = postLen * amount;
                    } else if (/>/.test(d.number) && d.number.search(/0>/) === -1) {
                        let doc = GlobalFn.ouskontoy(d.number);
                        doc.forEach(function (obj) {
                            items.push({
                                number: obj,
                                amount: d.amount,
                                totalPerNumber: d.amount * postLen
                            })
                            amount += d.amount;
                        })
                        dataEntry.total = postLen * amount;
                    } else if (d.number.substr(d.number.length - 1, d.number.length) === "*") {
                        let doc = GlobalFn.trolob(d.number);
                        doc.forEach(function (obj) {
                            items.push({
                                number: obj,
                                amount: d.amount,
                                totalPerNumber: d.amount * postLen
                            })
                            amount += d.amount;
                        })
                        dataEntry.total = postLen * amount;
                    } else {
                        items.push({
                            number: d.number,
                            amount: d.amount,
                            totalPerNumber: d.amount * postLen
                        })
                        dataEntry.total = postLen * d.amount;
                    }

                    dataEntry.post = d.post;
                    dataEntry.items = items;

                    betDetailList.push(dataEntry);
                })
                LT_BetDetail.rawCollection().insert(betDetailList);
            } catch (e) {
                throw new Meteor.Error(e.message);
            }

        }

    },
    lt_removeBetDetail(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = LT_BetDetail.remove({_id: doc._id});

                if (isRemoved) {
                    GlobalFn.collectionReact(LT_BetDetailReact, doc._id, LT_BetDetailAudit, doc, "Remove");
                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    factorial: function (n) {
        if (n === 0) {
            return 1;
        }
        return n * Meteor.call('factorial', n - 1);
    },
    lottery_berDetailRemoveByBetId: function (id) {
        let doc = LT_Bet.findOne(id);

        doc.items.map(function (obj) {
            LT_BetDetail.remove(obj.betDetailId);
        })
        return true;
    },
    lottery_betDetailGroupByNumber: function (selector) {
        return LT_BetDetail.aggregate([
            {
                $unwind: "$items"
            }, {
                $match: selector
            }, {
                $group: {
                    _id: {
                        betNumber: "$items.number"
                    },
                    total: {
                        $sum: "$items.amount"
                    }
                }
            },
            {
                $sort: {
                    "_id.betNumber": 1
                }
            }
        ]);
    }
})

LT_BetDetail.rawCollection().createIndex({
    betDetailDate: -1,
});
LT_BetDetail.rawCollection().createIndex({
    betId: -1,
});

LT_BetDetail.rawCollection().createIndex({
    agentId: -1,
});

LT_BetDetail.rawCollection().createIndex({
    time: -1,
});
LT_BetDetail.rawCollection().createIndex({
    currencyId: -1,
});

LT_BetDetail.rawCollection().createIndex({
    branchId: -1,
});

