import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../imports/libs/globalFn"
import _ from 'lodash'

import {LT_Loss, LT_LossReact, LT_LossAudit} from "../../imports/collections/lt_loss"
import {LT_Agent} from "../../imports/collections/lt_agent"
import {Constants} from "../../imports/libs/constant";
import {LT_Result} from "../../imports/collections/lt_result";
import {LT_Bet} from "../../imports/collections/lt_bet";
import {LT_BetDetail} from "../../imports/collections/lt_betDetail";

let secret = Meteor.settings.private.secret;
Meteor.methods({
    lt_calculateLoss: function (docu, accessToken) {

        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let self = docu;
            let selector = {};
            let selectorLo = {};
            let selectorA = {};
            let selectorA1 = {};
            let selectorA2 = {};
            let selectorA3 = {};
            let selectorA4 = {};
            let selectorT = {};
            let selectorVat = {};
            let selectorLer = {};
            let selectorTot = {};
            let selectorB = {};
            let selectorC = {};
            let selectorD = {};
            let selector4P = {};
            let selectorF = {};
            let selectorI = {};
            let selectorK = {};
            let selectorL = {};
            let selectorN = {};
            let selectorO = {};

            if (self.branchId !== "") {
                selector.branchId = self.branchId;
                selectorLo.branchId = self.branchId;
                selectorA.branchId = self.branchId;
                selectorA1.branchId = self.branchId;
                selectorA2.branchId = self.branchId;
                selectorA3.branchId = self.branchId;
                selectorA4.branchId = self.branchId;
                selectorT.branchId = self.branchId;
                selectorVat.branchId = self.branchId;
                selectorLer.branchId = self.branchId;
                selectorTot.branchId = self.branchId;
                selectorB.branchId = self.branchId;
                selectorC.branchId = self.branchId;
                selectorD.branchId = self.branchId;
                selector4P.branchId = self.branchId;

                selectorF.branchId = self.branchId;
                selectorI.branchId = self.branchId;
                selectorK.branchId = self.branchId;
                selectorL.branchId = self.branchId;
                selectorN.branchId = self.branchId;
                selectorO.branchId = self.branchId;
            }

            selector.agentId = self.agentId;
            selectorA.agentId = self.agentId;
            selectorA1.agentId = self.agentId;
            selectorA2.agentId = self.agentId;
            selectorA3.agentId = self.agentId;
            selectorA4.agentId = self.agentId;
            selectorT.agentId = self.agentId;
            selectorVat.agentId = self.agentId;
            selectorLer.agentId = self.agentId;
            selectorTot.agentId = self.agentId;
            selectorB.agentId = self.agentId;
            selectorC.agentId = self.agentId;
            selectorD.agentId = self.agentId;
            selector4P.agentId = self.agentId;
            selectorLo.agentId = self.agentId;


            selectorF.agentId = self.agentId;
            selectorI.agentId = self.agentId;
            selectorK.agentId = self.agentId;
            selectorL.agentId = self.agentId;
            selectorN.agentId = self.agentId;
            selectorO.agentId = self.agentId;

            selector.betDate = self.closeDate;
            selector.time = self.time;

            let totalPage = Meteor.call('lt_getLastPage', selector, secret, self.branchId);
            let pageList = [];

            let i = 1;
            for (i; i <= parseInt(totalPage); i++) {
                pageList.push(i.toString());
            }
            if (pageList.length > 0) {

                /*Result */
                let selectorResult = {};
                selectorResult.time = self.time;
                selectorResult.resultDate = self.closeDate;
                selectorResult.branchId = self.branchId;
                let resultThisDay = LT_Result.findOne(selectorResult);

                let betDetailList = [];

                let resultA = [];
                let resultA2D = [];
                let resultA3D = [];
                let resultB = [];
                let resultB2D = [];
                let resultB3D = [];
                let resultC = [];
                let resultC2D = [];
                let resultC3D = [];
                let resultD = [];
                let resultD2D = [];
                let resultD3D = [];
                let result4P = [];
                let result4P2D = [];
                let result4P3D = [];
                let resultLo = [];
                let resultLo2D = [];
                let resultLo3D = [];

                let resultF = [];
                let resultF2D = [];
                let resultF3D = [];

                let resultI = [];
                let resultI2D = [];
                let resultI3D = [];

                let resultK = [];
                let resultK2D = [];
                let resultK3D = [];

                let resultL = [];
                let resultL2D = [];
                let resultL3D = [];

                let resultN = [];
                let resultN2D = [];
                let resultN3D = [];

                let resultO = [];
                let resultO2D = [];
                let resultO3D = [];


                let resultA1 = [];
                let resultA12D = [];
                let resultA13D = [];


                let resultA2 = [];
                let resultA22D = [];
                let resultA23D = [];


                let resultA3 = [];
                let resultA32D = [];
                let resultA33D = [];


                let resultA4 = [];
                let resultA42D = [];
                let resultA43D = [];

                let resultT = [];
                let resultT2D = [];
                let resultT3D = [];

                let resultVat = [];
                let resultVat2D = [];
                let resultVat3D = [];

                let resultLer = [];
                let resultTot = [];


                if (resultThisDay != null) {


                    /*2D*/
                    resultThisDay.postA.result2D.forEach(function (obj) {
                        resultA.push(obj);
                        resultA2D.push(obj);
                        result4P.push(obj);
                        result4P2D.push(obj);
                    })

                    if (resultThisDay.postB.result2D !== undefined) {
                        resultThisDay.postB.result2D.split(",").forEach(function (obj) {
                            resultB.push(obj);
                            resultB2D.push(obj);
                            result4P.push(obj);
                            result4P2D.push(obj);
                        })
                    }

                    if (resultThisDay.postA1.result2D !== undefined) {
                        resultThisDay.postA1.result2D.split(",").forEach(function (obj) {
                            resultA1.push(obj);
                            resultA12D.push(obj);

                        })
                    }

                    if (resultThisDay.postA2.result2D !== undefined) {
                        resultThisDay.postA2.result2D.split(",").forEach(function (obj) {
                            resultA2.push(obj);
                            resultA22D.push(obj);
                        })
                    }

                    if (resultThisDay.postA3.result2D !== undefined) {
                        resultThisDay.postA3.result2D.split(",").forEach(function (obj) {
                            resultA3.push(obj);
                            resultA32D.push(obj);
                        })
                    }

                    if (resultThisDay.postA4.result2D !== undefined) {
                        resultThisDay.postA4.result2D.split(",").forEach(function (obj) {
                            resultA4.push(obj);
                            resultA42D.push(obj);
                        })
                    }

                    if (resultThisDay.postT.result2D !== undefined) {
                        resultThisDay.postT.result2D.split(",").forEach(function (obj) {
                            resultT.push(obj);
                            resultT2D.push(obj);
                        })
                    }
                    if (resultThisDay.postVat.result2D !== undefined) {
                        resultThisDay.postVat.result2D.split(",").forEach(function (obj) {
                            resultVat.push(obj);
                            resultVat2D.push(obj);
                        })
                    }

                    if (self.time != "T") {

                        if (resultThisDay.postC.result2D !== undefined) {
                            resultThisDay.postC.result2D.split(",").forEach(function (obj) {
                                resultC.push(obj);
                                resultC2D.push(obj);
                                result4P.push(obj);
                                result4P2D.push(obj);
                            })
                        }

                        if (resultThisDay.postD.result2D !== undefined) {
                            resultThisDay.postD.result2D.split(",").forEach(function (obj) {
                                resultD.push(obj);
                                resultD2D.push(obj);
                                result4P.push(obj);
                                result4P2D.push(obj);
                            })
                        }

                        if (resultThisDay.postF.result2D !== undefined) {
                            resultThisDay.postF.result2D.split(",").forEach(function (obj) {
                                resultF.push(obj);
                                resultF2D.push(obj);
                            })
                        }
                        if (resultThisDay.postI.result2D !== undefined) {
                            resultThisDay.postI.result2D.split(",").forEach(function (obj) {
                                resultI.push(obj);
                                resultI2D.push(obj);
                            })
                        }
                        if (resultThisDay.postK.result2D !== undefined) {
                            resultThisDay.postK.result2D.split(",").forEach(function (obj) {
                                resultK.push(obj);
                                resultK2D.push(obj);
                            })
                        }
                        if (resultThisDay.postL.result2D !== undefined) {
                            resultThisDay.postL.result2D.split(",").forEach(function (obj) {
                                resultL.push(obj);
                                resultL2D.push(obj);
                            })
                        }
                        if (resultThisDay.postN.result2D !== undefined) {
                            resultThisDay.postN.result2D.split(",").forEach(function (obj) {
                                resultN.push(obj);
                                resultN2D.push(obj);
                            })
                        }
                        if (resultThisDay.postO.result2D !== undefined) {
                            resultThisDay.postO.result2D.split(",").forEach(function (obj) {
                                resultO.push(obj);
                                resultO2D.push(obj);
                            })
                        }
                    }
                    /*3D*/
                    resultThisDay.postA.result3D.forEach(function (obj) {
                        resultA.push(obj);
                        resultA3D.push(obj);
                        result4P.push(obj);
                        result4P3D.push(obj);
                    })

                    if (resultThisDay.postB.result3D !== undefined) {
                        resultThisDay.postB.result3D.split(",").forEach(function (obj) {
                            resultB.push(obj);
                            resultB3D.push(obj);
                            result4P.push(obj);
                            result4P3D.push(obj);
                        })
                    }
                    if (resultThisDay.postA1.result3D !== undefined) {
                        resultThisDay.postA1.result3D.split(",").forEach(function (obj) {
                            resultA1.push(obj);
                            resultA13D.push(obj);
                        })
                    }

                    if (resultThisDay.postA2.result3D !== undefined) {
                        resultThisDay.postA2.result3D.split(",").forEach(function (obj) {
                            resultA2.push(obj);
                            resultA23D.push(obj);
                        })
                    }

                    if (resultThisDay.postA3.result3D !== undefined) {
                        resultThisDay.postA3.result3D.split(",").forEach(function (obj) {
                            resultA3.push(obj);
                            resultA33D.push(obj);
                        })
                    }

                    if (resultThisDay.postA4.result3D !== undefined) {
                        resultThisDay.postA4.result3D.split(",").forEach(function (obj) {
                            resultA4.push(obj);
                            resultA43D.push(obj);
                        })
                    }

                    if (resultThisDay.postT.result3D !== undefined) {
                        resultThisDay.postT.result3D.split(",").forEach(function (obj) {
                            resultT.push(obj);
                            resultT3D.push(obj);

                            resultLer.push(obj.substr(1, 2));
                            resultTot.push(...GlobalFn.trolob(obj));
                        })
                    }
                    if (resultThisDay.postVat.result3D !== undefined) {
                        resultThisDay.postVat.result3D.split(",").forEach(function (obj) {
                            resultVat.push(obj);
                            resultVat3D.push(obj);
                        })
                    }

                    if (self.time != "T") {
                        if (resultThisDay.postC.result3D !== undefined) {
                            resultThisDay.postC.result3D.split(",").forEach(function (obj) {
                                resultC.push(obj);
                                resultC3D.push(obj);
                                result4P.push(obj);
                                result4P3D.push(obj);
                            })
                        }
                        if (resultThisDay.postD.result3D !== undefined) {
                            resultThisDay.postD.result3D.split(",").forEach(function (obj) {
                                resultD.push(obj);
                                resultD3D.push(obj);
                                result4P.push(obj);
                                result4P3D.push(obj);
                            })
                        }


                        if (resultThisDay.postF.result3D !== undefined) {
                            resultThisDay.postF.result3D.split(",").forEach(function (obj) {
                                resultF.push(obj);
                                resultF3D.push(obj);
                            })
                        }
                        if (resultThisDay.postI.result3D !== undefined) {
                            resultThisDay.postI.result3D.split(",").forEach(function (obj) {
                                resultI.push(obj);
                                resultI3D.push(obj);
                            })
                        }
                        if (resultThisDay.postK.result3D !== undefined) {
                            resultThisDay.postK.result3D.split(",").forEach(function (obj) {
                                resultK.push(obj);
                                resultK3D.push(obj);
                            })
                        }
                        if (resultThisDay.postL.result3D !== undefined) {
                            resultThisDay.postL.result3D.split(",").forEach(function (obj) {
                                resultL.push(obj);
                                resultL3D.push(obj);
                            })
                        }
                        if (resultThisDay.postN.result3D !== undefined) {
                            resultThisDay.postN.result3D.split(",").forEach(function (obj) {
                                resultN.push(obj);
                                resultN3D.push(obj);
                            })
                        }
                        if (resultThisDay.postO.result3D !== undefined) {
                            resultThisDay.postO.result3D.split(",").forEach(function (obj) {
                                resultO.push(obj);
                                resultO3D.push(obj);
                            })
                        }


                        /*Lo*/
                        if (resultThisDay.postLo != undefined) {
                            resultThisDay.postLo.result2D.forEach(function (obj) {
                                resultLo.push(obj);
                                resultLo2D.push(obj);
                            })
                            resultThisDay.postLo.result3D.forEach(function (obj) {
                                resultLo.push(obj);
                                resultLo3D.push(obj);
                            })
                        }
                    }

                    /*Right Number*/


                    selectorA['items.number'] = {$in: resultA};
                    selectorA.time = self.time;
                    selectorA.betDetailDate = self.closeDate;
                    selectorA.post = {$elemMatch: {$eq: "0A"}};
                    let rightA = LT_BetDetail.find(selectorA).fetch();

                    rightA.forEach(function (obj) {
                        betDetailList.push(obj._id);
                    })

                    selectorB['items.number'] = {$in: resultB};
                    selectorB.post = {$elemMatch: {$eq: "1B"}};
                    selectorB.time = self.time;
                    selectorB.betDetailDate = self.closeDate;
                    let rightB = LT_BetDetail.find(selectorB).fetch();

                    rightB.forEach(function (obj) {
                        betDetailList.push(obj._id);
                    })

                    selectorC['items.number'] = {$in: resultC};
                    selectorC.post = {$elemMatch: {$eq: "2C"}};
                    selectorC.time = self.time;
                    selectorC.betDetailDate = self.closeDate;
                    let rightC = LT_BetDetail.find(selectorC).fetch();

                    rightC.forEach(function (obj) {
                        betDetailList.push(obj._id);
                    })

                    selectorD['items.number'] = {$in: resultD};
                    selectorD.post = {$elemMatch: {$eq: "3D"}};
                    selectorD.time = self.time;
                    selectorD.betDetailDate = self.closeDate;
                    let rightD = LT_BetDetail.find(selectorD).fetch();

                    rightD.forEach(function (obj) {
                        betDetailList.push(obj._id);
                    })


                    selectorA1['items.number'] = {$in: resultA1};
                    selectorA1.post = {$elemMatch: {$eq: "A1"}};
                    selectorA1.time = self.time;
                    selectorA1.betDetailDate = self.closeDate;
                    let rightA1 = LT_BetDetail.find(selectorA1).fetch();

                    rightA1.forEach(function (obj) {
                        betDetailList.push(obj._id);
                    })

                    selectorA2['items.number'] = {$in: resultA2};
                    selectorA2.post = {$elemMatch: {$eq: "A2"}};
                    selectorA2.time = self.time;
                    selectorA2.betDetailDate = self.closeDate;
                    let rightA2 = LT_BetDetail.find(selectorA2).fetch();

                    rightA2.forEach(function (obj) {
                        betDetailList.push(obj._id);
                    })

                    selectorA3['items.number'] = {$in: resultA3};
                    selectorA3.post = {$elemMatch: {$eq: "A3"}};
                    selectorA3.time = self.time;
                    selectorA3.betDetailDate = self.closeDate;
                    let rightA3 = LT_BetDetail.find(selectorA3).fetch();

                    rightA3.forEach(function (obj) {
                        betDetailList.push(obj._id);
                    })

                    selectorA4['items.number'] = {$in: resultA4};
                    selectorA4.post = {$elemMatch: {$eq: "A4"}};
                    selectorA4.time = self.time;
                    selectorA4.betDetailDate = self.closeDate;
                    let rightA4 = LT_BetDetail.find(selectorA4).fetch();

                    rightA4.forEach(function (obj) {
                        betDetailList.push(obj._id);
                    })

                    selectorT['items.number'] = {$in: resultT};
                    selectorT.post = {$elemMatch: {$eq: "T"}};
                    selectorT.time = self.time;
                    selectorT.betDetailDate = self.closeDate;
                    let rightT = LT_BetDetail.find(selectorT).fetch();

                    rightT.forEach(function (obj) {
                        betDetailList.push(obj._id);
                    })

                    selectorVat['items.number'] = {$in: resultVat};
                    selectorVat.post = {$elemMatch: {$eq: "Vat"}};
                    selectorVat.time = self.time;
                    selectorVat.betDetailDate = self.closeDate;
                    let rightVat = LT_BetDetail.find(selectorVat).fetch();

                    rightVat.forEach(function (obj) {
                        betDetailList.push(obj._id);
                    })

                    selectorLer['items.number'] = {$in: resultLer};
                    selectorLer.post = {$elemMatch: {$eq: "Ler"}};
                    selectorLer.time = self.time;
                    selectorLer.betDetailDate = self.closeDate;
                    let rightLer = LT_BetDetail.find(selectorLer).fetch();

                    rightLer.forEach(function (obj) {
                        betDetailList.push(obj._id);
                    })

                    selectorTot['items.number'] = {$in: resultTot};
                    selectorTot.post = {$elemMatch: {$eq: "Tot"}};
                    selectorTot.time = self.time;
                    selectorTot.betDetailDate = self.closeDate;
                    let rightTot = LT_BetDetail.find(selectorTot).fetch();

                    rightTot.forEach(function (obj) {
                        betDetailList.push(obj._id);
                    })


                    selector4P['items.number'] = {$in: result4P};
                    selector4P.post = {$elemMatch: {$eq: "4P"}};
                    selector4P.time = self.time;
                    selector4P.betDetailDate = self.closeDate;
                    let right4P = LT_BetDetail.find(selector4P).fetch();

                    right4P.forEach(function (obj) {
                        betDetailList.push(obj._id);
                    })

                    selectorLo['items.number'] = {$in: resultLo};
                    selectorLo.post = {$elemMatch: {$eq: "5Lo"}};
                    selectorLo.time = self.time;
                    selectorLo.betDetailDate = self.closeDate;
                    let rightLo = LT_BetDetail.find(selectorLo).fetch();
                    rightLo.forEach(function (obj) {
                        betDetailList.push(obj._id);
                    })


                    selectorF['items.number'] = {$in: resultF};
                    selectorF.post = {$elemMatch: {$eq: "F"}};
                    selectorF.time = self.time;
                    selectorF.betDetailDate = self.closeDate;
                    let rightF = LT_BetDetail.find(selectorF).fetch();

                    rightF.forEach(function (obj) {
                        betDetailList.push(obj._id);
                    })

                    selectorI['items.number'] = {$in: resultI};
                    selectorI.post = {$elemMatch: {$eq: "I"}};
                    selectorI.time = self.time;
                    selectorI.betDetailDate = self.closeDate;
                    let rightI = LT_BetDetail.find(selectorI).fetch();

                    rightI.forEach(function (obj) {
                        betDetailList.push(obj._id);
                    })


                    selectorK['items.number'] = {$in: resultK};
                    selectorK.post = {$elemMatch: {$eq: "K"}};
                    selectorK.time = self.time;
                    selectorK.betDetailDate = self.closeDate;
                    let rightK = LT_BetDetail.find(selectorK).fetch();

                    rightK.forEach(function (obj) {
                        betDetailList.push(obj._id);
                    })


                    selectorL['items.number'] = {$in: resultL};
                    selectorL.post = {$elemMatch: {$eq: "L"}};
                    selectorL.time = self.time;
                    selectorL.betDetailDate = self.closeDate;
                    let rightL = LT_BetDetail.find(selectorL).fetch();

                    rightL.forEach(function (obj) {
                        betDetailList.push(obj._id);
                    })


                    selectorN['items.number'] = {$in: resultN};
                    selectorN.post = {$elemMatch: {$eq: "N"}};
                    selectorN.time = self.time;
                    selectorN.betDetailDate = self.closeDate;
                    let rightN = LT_BetDetail.find(selectorN).fetch();

                    rightN.forEach(function (obj) {
                        betDetailList.push(obj._id);
                    })


                    selectorO['items.number'] = {$in: resultO};
                    selectorO.post = {$elemMatch: {$eq: "O"}};
                    selectorO.time = self.time;
                    selectorO.betDetailDate = self.closeDate;
                    let rightO = LT_BetDetail.find(selectorO).fetch();

                    rightO.forEach(function (obj) {
                        betDetailList.push(obj._id);
                    })
                }


                let betDetailListUnique = betDetailList.filter(function (item, pos, self) {
                    return self.indexOf(item) == pos;
                })

                let loseDetail = {};
                let detail = [];
                pageList.forEach(function (pageParam) {

                    let totalRiel2DPerPage = 0;
                    let totalRiel3DPerPage = 0;
                    let totalRielLerPerPage = 0;
                    let totalRielTotPerPage = 0;
                    let totalDollar2DPerPage = 0;
                    let totalDollar3DPerPage = 0;
                    let totalDollarLerPerPage = 0;
                    let totalDollarTotPerPage = 0;
                    let totalBaht2DPerPage = 0;
                    let totalBaht3DPerPage = 0;
                    let totalBahtLerPerPage = 0;
                    let totalBahtTotPerPage = 0;

                    let returnTotalRiel2DPerPage = 0;
                    let returnTotalRiel3DPerPage = 0;
                    let returnTotalRielLerPerPage = 0;
                    let returnTotalRielTotPerPage = 0;
                    let returnTotalDollar2DPerPage = 0;
                    let returnTotalDollar3DPerPage = 0;
                    let returnTotalDollarLerPerPage = 0;
                    let returnTotalDollarTotPerPage = 0;
                    let returnTotalBaht2DPerPage = 0;
                    let returnTotalBaht3DPerPage = 0;
                    let returnTotalBahtLerPerPage = 0;
                    let returnTotalBahtTotPerPage = 0;

                    selector.page = parseInt(pageParam);
                    let doc = LT_Bet.find(selector, {sort: {line: 1}}).fetch();
                    if (doc.length !== 0) {
                        let sumUpdateCount = 0;
                        doc.forEach(function (obj) {
                            sumUpdateCount += parseInt(obj.updateCount);
                            let i = 0;
                            obj.items.forEach(function (ob) {
                                if (betDetailListUnique.indexOf(ob.betDetailId) > -1) {
                                    let betDetailNumber = LT_BetDetail.findOne(ob.betDetailId);

                                    if (betDetailNumber.currencyId === "1:KHR") {
                                        betDetailNumber.items.forEach(function (detail) {
                                                if (betDetailNumber.post.indexOf("4P") > -1) {
                                                    if (detail.number.length === 2) {
                                                        if (resultA2D.indexOf(detail.number) > -1) {
                                                            resultA2D.forEach(function (timeRight) {
                                                                if (timeRight === detail.number) {
                                                                    returnTotalRiel2DPerPage += detail.amount;

                                                                }
                                                            })
                                                        }
                                                        if (resultB2D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel2DPerPage += detail.amount;

                                                        }
                                                        if (resultC2D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel2DPerPage += detail.amount;

                                                        }
                                                        if (resultD2D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel2DPerPage += detail.amount;

                                                        }


                                                    } else if (detail.number.length === 3) {
                                                        if (resultA3D.indexOf(detail.number) > -1) {
                                                            resultA3D.forEach(function (timeRight) {
                                                                if (timeRight === detail.number) {
                                                                    returnTotalRiel3DPerPage += detail.amount;

                                                                }
                                                            })
                                                        }
                                                        if (resultB3D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel3DPerPage += detail.amount;

                                                        }
                                                        if (resultC3D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel3DPerPage += detail.amount;

                                                        }
                                                        if (resultD3D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel3DPerPage += detail.amount;

                                                        }
                                                    }
                                                }
                                                if (betDetailNumber.post.indexOf("0A") > -1) {
                                                    if (detail.number.length === 2) {
                                                        if (resultA2D.indexOf(detail.number) > -1) {
                                                            resultA2D.forEach(function (timeRight) {
                                                                if (timeRight === detail.number) {
                                                                    returnTotalRiel2DPerPage += detail.amount;

                                                                }
                                                            })
                                                        }
                                                    } else if (detail.number.length === 3) {
                                                        if (resultA3D.indexOf(detail.number) > -1) {
                                                            resultA3D.forEach(function (timeRight) {
                                                                if (timeRight === detail.number) {
                                                                    returnTotalRiel3DPerPage += detail.amount;

                                                                }
                                                            })
                                                        }
                                                    }
                                                }

                                                if (betDetailNumber.post.indexOf("1B") > -1) {
                                                    if (detail.number.length === 2) {
                                                        if (resultB2D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel2DPerPage += detail.amount;

                                                        }
                                                    } else if (detail.number.length === 3) {
                                                        if (resultB3D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel3DPerPage += detail.amount;

                                                        }
                                                    }
                                                }

                                                if (betDetailNumber.post.indexOf("2C") > -1) {
                                                    if (detail.number.length === 2) {
                                                        if (resultC2D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel2DPerPage += detail.amount;

                                                        }
                                                    } else if (detail.number.length === 3) {
                                                        if (resultC3D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel3DPerPage += detail.amount;

                                                        }
                                                    }
                                                }

                                                if (betDetailNumber.post.indexOf("3D") > -1) {
                                                    if (detail.number.length === 2) {
                                                        if (resultD2D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel2DPerPage += detail.amount;

                                                        }
                                                    } else if (detail.number.length === 3) {
                                                        if (resultD3D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel3DPerPage += detail.amount;

                                                        }
                                                    }
                                                }
                                                if (betDetailNumber.post.indexOf("F") > -1) {
                                                    if (detail.number.length === 2) {
                                                        if (resultF2D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel2DPerPage += detail.amount;

                                                        }
                                                    } else if (detail.number.length === 3) {
                                                        if (resultF3D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel3DPerPage += detail.amount;

                                                        }
                                                    }
                                                }
                                                if (betDetailNumber.post.indexOf("I") > -1) {
                                                    if (detail.number.length === 2) {
                                                        if (resultI2D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel2DPerPage += detail.amount;

                                                        }
                                                    } else if (detail.number.length === 3) {
                                                        if (resultI3D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel3DPerPage += detail.amount;

                                                        }
                                                    }
                                                }
                                                if (betDetailNumber.post.indexOf("K") > -1) {
                                                    if (detail.number.length === 2) {
                                                        if (resultK2D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel2DPerPage += detail.amount;

                                                        }
                                                    } else if (detail.number.length === 3) {
                                                        if (resultK3D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel3DPerPage += detail.amount;

                                                        }
                                                    }
                                                }
                                                if (betDetailNumber.post.indexOf("L") > -1) {
                                                    if (detail.number.length === 2) {
                                                        if (resultL2D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel2DPerPage += detail.amount;

                                                        }
                                                    } else if (detail.number.length === 3) {
                                                        if (resultL3D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel3DPerPage += detail.amount;

                                                        }
                                                    }
                                                }
                                                if (betDetailNumber.post.indexOf("N") > -1) {
                                                    if (detail.number.length === 2) {
                                                        if (resultN2D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel2DPerPage += detail.amount;

                                                        }
                                                    } else if (detail.number.length === 3) {
                                                        if (resultN3D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel3DPerPage += detail.amount;

                                                        }
                                                    }
                                                }
                                                if (betDetailNumber.post.indexOf("O") > -1) {
                                                    if (detail.number.length === 2) {
                                                        if (resultO2D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel2DPerPage += detail.amount;

                                                        }
                                                    } else if (detail.number.length === 3) {
                                                        if (resultO3D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel3DPerPage += detail.amount;

                                                        }
                                                    }
                                                }


                                                if (betDetailNumber.post.indexOf("A1") > -1) {
                                                    if (detail.number.length === 2) {
                                                        if (resultA12D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel2DPerPage += detail.amount;

                                                        }
                                                    } else if (detail.number.length === 3) {
                                                        if (resultA13D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel3DPerPage += detail.amount;

                                                        }
                                                    }
                                                }

                                                if (betDetailNumber.post.indexOf("A2") > -1) {
                                                    if (detail.number.length === 2) {
                                                        if (resultA22D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel2DPerPage += detail.amount;

                                                        }
                                                    } else if (detail.number.length === 3) {
                                                        if (resultA23D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel3DPerPage += detail.amount;

                                                        }
                                                    }
                                                }

                                                if (betDetailNumber.post.indexOf("A3") > -1) {
                                                    if (detail.number.length === 2) {
                                                        if (resultA32D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel2DPerPage += detail.amount;

                                                        }
                                                    } else if (detail.number.length === 3) {
                                                        if (resultA33D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel3DPerPage += detail.amount;

                                                        }
                                                    }
                                                }

                                                if (betDetailNumber.post.indexOf("A4") > -1) {
                                                    if (detail.number.length === 2) {
                                                        if (resultA42D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel2DPerPage += detail.amount;

                                                        }
                                                    } else if (detail.number.length === 3) {
                                                        if (resultA43D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel3DPerPage += detail.amount;

                                                        }
                                                    }
                                                }

                                                if (betDetailNumber.post.indexOf("T") > -1) {
                                                    if (detail.number.length === 2) {
                                                        if (resultT2D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel2DPerPage += detail.amount;

                                                        }
                                                    } else if (detail.number.length === 3) {
                                                        if (resultT3D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel3DPerPage += detail.amount;

                                                        }
                                                    }
                                                }

                                                if (betDetailNumber.post.indexOf("Vat") > -1) {
                                                    if (detail.number.length === 2) {
                                                        if (resultVat2D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel2DPerPage += detail.amount;

                                                        }
                                                    } else if (detail.number.length === 3) {
                                                        if (resultVat3D.indexOf(detail.number) > -1) {
                                                            returnTotalRiel3DPerPage += detail.amount;

                                                        }
                                                    }
                                                }

                                                if (betDetailNumber.post.indexOf("Ler") > -1) {
                                                    if (resultLer.indexOf(detail.number) > -1) {
                                                        returnTotalRielLerPerPage += detail.amount;

                                                    }

                                                }


                                                if (betDetailNumber.post.indexOf("Tot") > -1) {
                                                    if (resultTot.indexOf(detail.number) > -1) {
                                                        returnTotalRielTotPerPage += detail.amount;

                                                    }
                                                }


                                                if (betDetailNumber.post.indexOf("5Lo") > -1) {
                                                    if (detail.number.length === 2) {
                                                        if (resultLo2D.indexOf(detail.number) > -1) {
                                                            resultLo2D.forEach(function (timeRight) {
                                                                if (timeRight === detail.number) {
                                                                    returnTotalRiel2DPerPage += detail.amount;

                                                                }
                                                            })
                                                        }
                                                    } else if (detail.number.length === 3) {
                                                        if (resultLo3D.indexOf(detail.number) > -1) {
                                                            resultLo3D.forEach(function (timeRight) {
                                                                if (timeRight === detail.number) {
                                                                    returnTotalRiel3DPerPage += detail.amount;

                                                                }
                                                            })
                                                        }

                                                    }
                                                }
                                            }
                                        )
                                    } else if (betDetailNumber.currencyId === "2:USD") {
                                        betDetailNumber.items.forEach(function (detail) {

                                            if (betDetailNumber.post.indexOf("4P") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultA2D.indexOf(detail.number) > -1) {
                                                        resultA2D.forEach(function (timeRight) {
                                                            if (timeRight === detail.number) {
                                                                returnTotalDollar2DPerPage += detail.amount;

                                                            }
                                                        })
                                                    }
                                                    if (resultB2D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar2DPerPage += detail.amount;

                                                    }
                                                    if (resultC2D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar2DPerPage += detail.amount;

                                                    }
                                                    if (resultD2D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar2DPerPage += detail.amount;

                                                    }

                                                } else if (detail.number.length === 3) {
                                                    if (resultA3D.indexOf(detail.number) > -1) {
                                                        resultA3D.forEach(function (timeRight) {
                                                            if (timeRight === detail.number) {
                                                                returnTotalDollar3DPerPage += detail.amount;

                                                            }
                                                        })
                                                    }
                                                    if (resultB3D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                    if (resultC3D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                    if (resultD3D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                }
                                            }
                                            if (betDetailNumber.post.indexOf("0A") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultA2D.indexOf(detail.number) > -1) {
                                                        resultA2D.forEach(function (timeRight) {
                                                            if (timeRight === detail.number) {
                                                                returnTotalDollar2DPerPage += detail.amount;

                                                            }
                                                        })
                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultA3D.indexOf(detail.number) > -1) {
                                                        resultA3D.forEach(function (timeRight) {
                                                            if (timeRight === detail.number) {
                                                                returnTotalDollar3DPerPage += detail.amount;

                                                            }
                                                        })
                                                    }
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("1B") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultB2D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultB3D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("2C") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultC2D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultC3D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("3D") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultD2D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultD3D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                }
                                            }


                                            if (betDetailNumber.post.indexOf("F") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultF2D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultF3D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                }
                                            }
                                            if (betDetailNumber.post.indexOf("I") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultI2D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultI3D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                }
                                            }
                                            if (betDetailNumber.post.indexOf("K") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultK2D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultK3D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                }
                                            }
                                            if (betDetailNumber.post.indexOf("L") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultL2D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultL3D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                }
                                            }
                                            if (betDetailNumber.post.indexOf("N") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultN2D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultN3D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                }
                                            }
                                            if (betDetailNumber.post.indexOf("O") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultO2D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultO3D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                }
                                            }


                                            if (betDetailNumber.post.indexOf("A1") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultA12D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultA13D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("A2") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultA22D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultA23D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("A3") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultA32D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultA33D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("A4") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultA42D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultA43D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("T") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultT2D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultT3D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("Vat") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultVat2D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultVat3D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                }
                                            }
                                            if (betDetailNumber.post.indexOf("Ler") > -1) {
                                                if (resultLer.indexOf(detail.number) > -1) {
                                                    returnTotalDollarLerPerPage += detail.amount;

                                                }

                                            }


                                            if (betDetailNumber.post.indexOf("Tot") > -1) {
                                                if (resultTot.indexOf(detail.number) > -1) {
                                                    returnTotalDollarTotPerPage += detail.amount;

                                                }
                                            }


                                            if (betDetailNumber.post.indexOf("5Lo") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultLo2D.indexOf(detail.number) > -1) {
                                                        resultLo2D.forEach(function (timeRight) {
                                                            if (timeRight === detail.number) {
                                                                returnTotalDollar2DPerPage += detail.amount;

                                                            }
                                                        })
                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultLo3D.indexOf(detail.number) > -1) {
                                                        resultLo3D.forEach(function (timeRight) {
                                                            if (timeRight === detail.number) {
                                                                returnTotalDollar3DPerPage += detail.amount;

                                                            }
                                                        })
                                                    }
                                                }
                                            }
                                        })
                                    } else if (betDetailNumber.currencyId === "3:THB") {
                                        betDetailNumber.items.forEach(function (detail) {

                                            if (betDetailNumber.post.indexOf("4P") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultA2D.indexOf(detail.number) > -1) {
                                                        resultA2D.forEach(function (timeRight) {
                                                            if (timeRight === detail.number) {
                                                                returnTotalBaht2DPerPage += detail.amount;
                                                            }
                                                        })
                                                    }
                                                    if (resultB2D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht2DPerPage += detail.amount;

                                                    }
                                                    if (resultC2D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht2DPerPage += detail.amount;

                                                    }
                                                    if (resultD2D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultA3D.indexOf(detail.number) > -1) {
                                                        resultA3D.forEach(function (timeRight) {
                                                            if (timeRight === detail.number) {
                                                                returnTotalBaht3DPerPage += detail.amount;

                                                            }
                                                        })
                                                    }
                                                    if (resultB3D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht3DPerPage += detail.amount;

                                                    }
                                                    if (resultC3D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht3DPerPage += detail.amount;

                                                    }
                                                    if (resultD3D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht3DPerPage += detail.amount;

                                                    }
                                                }
                                            }
                                            if (betDetailNumber.post.indexOf("0A") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultA2D.indexOf(detail.number) > -1) {
                                                        resultA2D.forEach(function (timeRight) {
                                                            if (timeRight === detail.number) {
                                                                returnTotalBaht2DPerPage += detail.amount;

                                                            }
                                                        })
                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultA3D.indexOf(detail.number) > -1) {
                                                        resultA3D.forEach(function (timeRight) {
                                                            if (timeRight === detail.number) {
                                                                returnTotalBaht3DPerPage += detail.amount;

                                                            }
                                                        })
                                                    }
                                                }
                                            }
                                            if (betDetailNumber.post.indexOf("1B") > -1) {

                                                if (detail.number.length === 2) {
                                                    if (resultB2D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultB3D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht3DPerPage += detail.amount;

                                                    }
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("2C") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultC2D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultC3D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht3DPerPage += detail.amount;

                                                    }
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("3D") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultD2D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultD3D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht3DPerPage += detail.amount;

                                                    }
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("F") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultF2D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultF3D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht3DPerPage += detail.amount;

                                                    }
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("I") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultI2D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultI3D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht3DPerPage += detail.amount;

                                                    }
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("K") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultK2D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultK3D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht3DPerPage += detail.amount;

                                                    }
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("L") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultL2D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultL3D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht3DPerPage += detail.amount;

                                                    }
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("N") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultN2D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultN3D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht3DPerPage += detail.amount;

                                                    }
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("O") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultO2D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultO3D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht3DPerPage += detail.amount;

                                                    }
                                                }
                                            }


                                            if (betDetailNumber.post.indexOf("A1") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultA12D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultA13D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht3DPerPage += detail.amount;

                                                    }
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("A2") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultA22D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultA23D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht3DPerPage += detail.amount;

                                                    }
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("A3") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultA32D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultA33D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht3DPerPage += detail.amount;

                                                    }
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("A4") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultA42D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultA43D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht3DPerPage += detail.amount;

                                                    }
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("T") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultT2D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultT3D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("Vat") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultVat2D.indexOf(detail.number) > -1) {
                                                        returnTotalBaht2DPerPage += detail.amount;

                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultVat3D.indexOf(detail.number) > -1) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                }
                                            }
                                            if (betDetailNumber.post.indexOf("Ler") > -1) {
                                                if (resultLer.indexOf(detail.number) > -1) {
                                                    returnTotalBahtLerPerPage += detail.amount;
                                                }
                                            }

                                            if (betDetailNumber.post.indexOf("Tot") > -1) {

                                                if (resultTot.indexOf(detail.number) > -1) {
                                                    returnTotalDollarTotPerPage += detail.amount;

                                                }
                                            }


                                            if (betDetailNumber.post.indexOf("5Lo") > -1) {
                                                if (detail.number.length === 2) {
                                                    if (resultLo2D.indexOf(detail.number) > -1) {
                                                        resultLo2D.forEach(function (timeRight) {
                                                            if (timeRight === detail.number) {
                                                                returnTotalBaht2DPerPage += detail.amount;

                                                            }
                                                        })
                                                    }
                                                } else if (detail.number.length === 3) {
                                                    if (resultLo3D.indexOf(detail.number) > -1) {
                                                        resultLo3D.forEach(function (timeRight) {
                                                            if (timeRight === detail.number) {
                                                                returnTotalBaht3DPerPage += detail.amount;

                                                            }
                                                        })
                                                    }
                                                }
                                            }

                                        })
                                    }
                                }
                            })

                            totalRiel2DPerPage = totalRiel2DPerPage + (obj.totalRiel2D || 0);
                            totalRiel3DPerPage = totalRiel3DPerPage + (obj.totalRiel3D || 0);
                            totalRielLerPerPage = totalRielLerPerPage + (obj.totalRielLer || 0);
                            totalRielTotPerPage = totalRielTotPerPage + (obj.totalRielTot || 0);
                            totalDollar2DPerPage = totalDollar2DPerPage + (obj.totalDollar2D || 0);
                            totalDollar3DPerPage = totalDollar3DPerPage + (obj.totalDollar3D || 0);
                            totalDollarLerPerPage = totalDollarLerPerPage + (obj.totalDollarLer || 0);
                            totalDollarTotPerPage = totalDollarTotPerPage + (obj.totalDollarTot || 0);
                            totalBaht2DPerPage = totalBaht2DPerPage + (obj.totalBaht2D || 0);
                            totalBaht3DPerPage = totalBaht3DPerPage + (obj.totalBaht3D || 0);
                            totalBahtLerPerPage = totalBahtLerPerPage + (obj.totalBahtLer || 0);
                            totalBahtTotPerPage = totalBahtTotPerPage + (obj.totalBahtTot || 0);
                        })

                        detail.push({
                            page: pageParam,
                            updateCount: sumUpdateCount,

                            totalRiel2D: totalRiel2DPerPage,
                            totalRiel3D: totalRiel3DPerPage,
                            totalRielLer: totalRielLerPerPage,
                            totalRielTot: totalRielTotPerPage,
                            totalDollar2D: totalDollar2DPerPage,
                            totalDollar3D: totalDollar3DPerPage,
                            totalDollarLer: totalDollarLerPerPage,
                            totalDollarTot: totalDollarTotPerPage,
                            totalBaht2D: totalBaht2DPerPage,
                            totalBaht3D: totalBaht3DPerPage,
                            totalBahtLer: totalBahtLerPerPage,
                            totalBahtTot: totalBahtTotPerPage,

                            lossRiel2D: returnTotalRiel2DPerPage,
                            lossRiel3D: returnTotalRiel3DPerPage,
                            lossRielLer: returnTotalRielLerPerPage,
                            lossRielTot: returnTotalRielTotPerPage,
                            lossDollar2D: returnTotalDollar2DPerPage,
                            lossDollar3D: returnTotalDollar3DPerPage,
                            lossDollarLer: returnTotalDollarLerPerPage,
                            lossDollarTot: returnTotalDollarTotPerPage,
                            lossBaht2D: returnTotalBaht2DPerPage,
                            lossBaht3D: returnTotalBaht3DPerPage,
                            lossBahtLer: returnTotalBahtLerPerPage,
                            lossBahtTot: returnTotalBahtTotPerPage
                        })

                    }
                });

                loseDetail.lossDate = self.closeDate;
                loseDetail.time = self.time;
                loseDetail.agentId = self.agentId;
                loseDetail.branchId = self.branchId;
                loseDetail.endPerDayId = self._id;

                loseDetail.detail = detail;

                return LT_Loss.insert(loseDetail);
            }
            return "";
        }
    }
    ,
    lt_removeLossByEndId(endPerDayId, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = LT_Loss.remove({endPerDayId: endPerDayId});
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },

})


