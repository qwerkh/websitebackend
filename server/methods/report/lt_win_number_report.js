import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../../imports/libs/globalFn"
import _ from 'lodash'
import {t} from "../../../imports/libs/constant";
import {LT_Bet} from "../../../imports/collections/lt_bet"
import {LT_Agent} from "../../../imports/collections/lt_agent"
import {LT_Result} from "../../../imports/collections/lt_result";
import {LT_BetDetail} from "../../../imports/collections/lt_betDetail";

let secret = Meteor.settings.private.secret;
Meteor.methods({
    base_fetchWinNumberReport(params, accessToken, language) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let selector = {};
            let selectorPage = {};
            let data = {};

            let dataHtml = "";
            let self = params;


            let selectorLo = {};
            let selectorA = {};
            let selectorA1 = {};
            let selectorA2 = {};
            let selectorA3 = {};
            let selectorA4 = {};
            let selectorB = {};
            let selectorC = {};
            let selectorD = {};
            let selectorF = {};
            let selectorI = {};
            let selectorK = {};
            let selectorL = {};
            let selectorN = {};
            let selectorO = {};
            let selectorT = {};
            let selectorVat = {};
            let selectorLer = {};
            let selectorTot = {};
            let selector4P = {};
            let userDoc = Meteor.user();
            if (params.branch !== "" && params.branch.length > 0) {
                selectorPage.branchId = {$in: self.branch || []};
                selector.branchId = {$in: self.branch || []};
                selectorLo.branchId = {$in: self.branch || []};
                selectorA.branchId = {$in: self.branch || []};
                selectorA1.branchId = {$in: self.branch || []};
                selectorA2.branchId = {$in: self.branch || []};
                selectorA3.branchId = {$in: self.branch || []};
                selectorA4.branchId = {$in: self.branch || []};
                selectorB.branchId = {$in: self.branch || []};
                selectorC.branchId = {$in: self.branch || []};
                selectorD.branchId = {$in: self.branch || []};
                selectorF.branchId = {$in: self.branch || []};
                selectorI.branchId = {$in: self.branch || []};
                selectorK.branchId = {$in: self.branch || []};
                selectorL.branchId = {$in: self.branch || []};
                selectorN.branchId = {$in: self.branch || []};
                selectorO.branchId = {$in: self.branch || []};
                selectorT.branchId = {$in: self.branch || []};
                selectorVat.branchId = {$in: self.branch || []};
                selectorLer.branchId = {$in: self.branch || []};
                selectorTot.branchId = {$in: self.branch || []};
                selector4P.branchId = {$in: self.branch || []};
            } else {

                selectorPage.branchId = {$in: userDoc.branch || []};
                selector.branchId = {$in: userDoc.branch || []};
                selectorLo.branchId = {$in: userDoc.branch || []};
                selectorA.branchId = {$in: userDoc.branch || []};
                selectorA1.branchId = {$in: userDoc.branch || []};
                selectorA2.branchId = {$in: userDoc.branch || []};
                selectorA3.branchId = {$in: userDoc.branch || []};
                selectorA4.branchId = {$in: userDoc.branch || []};
                selectorB.branchId = {$in: userDoc.branch || []};
                selectorC.branchId = {$in: userDoc.branch || []};
                selectorD.branchId = {$in: userDoc.branch || []};
                selectorF.branchId = {$in: userDoc.branch || []};
                selectorI.branchId = {$in: userDoc.branch || []};
                selectorK.branchId = {$in: userDoc.branch || []};
                selectorL.branchId = {$in: userDoc.branch || []};
                selectorN.branchId = {$in: userDoc.branch || []};
                selectorO.branchId = {$in: userDoc.branch || []};
                selectorT.branchId = {$in: userDoc.branch || []};
                selectorVat.branchId = {$in: userDoc.branch || []};
                selectorLer.branchId = {$in: userDoc.branch || []};
                selectorTot.branchId = {$in: userDoc.branch || []};
                selector4P.branchId = {$in: userDoc.branch || []};
            }

            selector.betDate = self.date;
            selectorPage.betDate = self.date;
            selector.time = self.time;
            selectorPage.time = self.time;


            /*Result */
            let selectorResult = {};
            selectorResult.time = self.time;
            selectorResult.resultDate = self.date;
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


            let result4P = [];
            let result4P2D = [];
            let result4P3D = [];
            let resultLo = [];
            let resultLo2D = [];
            let resultLo3D = [];


            if (resultThisDay != null) {


                /*2D*/


                if (resultThisDay.postA.result2D !== null && resultThisDay.postA.result2D !== undefined) {
                    resultThisDay.postA.result2D.forEach(function (obj) {
                        resultA.push(obj);
                        resultA2D.push(obj);
                        result4P.push(obj);
                        result4P2D.push(obj);
                    })
                }


                if (resultThisDay.postB.result2D !== null && resultThisDay.postB.result2D !== undefined) {
                    resultThisDay.postB.result2D.split(",").forEach(function (obj) {
                        resultB.push(obj);
                        resultB2D.push(obj);
                        result4P.push(obj);
                        result4P2D.push(obj);
                    })
                }
                if (resultThisDay.postA1.result2D !== null && resultThisDay.postA1.result2D !== undefined) {
                    resultThisDay.postA1.result2D.split(",").forEach(function (obj) {
                        resultA1.push(obj);
                        resultA12D.push(obj);
                    })
                }
                if (resultThisDay.postA2.result2D !== null && resultThisDay.postA2.result2D !== undefined) {
                    resultThisDay.postA2.result2D.split(",").forEach(function (obj) {
                        resultA2.push(obj);
                        resultA22D.push(obj);
                    })
                }
                if (resultThisDay.postA3.result2D !== null && resultThisDay.postA3.result2D !== undefined) {
                    resultThisDay.postA3.result2D.split(",").forEach(function (obj) {
                        resultA3.push(obj);
                        resultA32D.push(obj);
                    })
                }
                if (resultThisDay.postA4.result2D !== null && resultThisDay.postA4.result2D !== undefined) {
                    resultThisDay.postA4.result2D.split(",").forEach(function (obj) {
                        resultA4.push(obj);
                        resultA42D.push(obj);
                    })
                }
                if (resultThisDay.postT.result2D !== null && resultThisDay.postT.result2D !== undefined) {
                    resultThisDay.postT.result2D.split(",").forEach(function (obj) {
                        resultT.push(obj);
                        resultT2D.push(obj);
                    })
                }
                if (resultThisDay.postVat.result2D !== null && resultThisDay.postVat.result2D !== undefined) {
                    resultThisDay.postVat.result2D.split(",").forEach(function (obj) {
                        resultVat.push(obj);
                        resultVat2D.push(obj);
                    })
                }
                if (self.time !== "T") {
                    if (resultThisDay.postC.result2D !== null && resultThisDay.postC.result2D !== undefined) {
                        resultThisDay.postC.result2D.split(",").forEach(function (obj) {
                            resultC.push(obj);
                            resultC2D.push(obj);
                            result4P.push(obj);
                            result4P2D.push(obj);
                        })
                    }
                    if (resultThisDay.postD.result2D !== null && resultThisDay.postD.result2D !== undefined) {
                        resultThisDay.postD.result2D.split(",").forEach(function (obj) {
                            resultD.push(obj);
                            resultD2D.push(obj);
                            result4P.push(obj);
                            result4P2D.push(obj);
                        })
                    }
                    if (resultThisDay.postF.result2D !== null && resultThisDay.postF.result2D !== undefined) {
                        resultThisDay.postF.result2D.split(",").forEach(function (obj) {
                            resultF.push(obj);
                            resultF2D.push(obj);
                        })
                    }
                    if (resultThisDay.postI.result2D !== null && resultThisDay.postI.result2D !== undefined) {
                        resultThisDay.postI.result2D.split(",").forEach(function (obj) {
                            resultI.push(obj);
                            resultI2D.push(obj);
                        })
                    }
                    if (resultThisDay.postK.result2D !== null && resultThisDay.postK.result2D !== undefined) {
                        resultThisDay.postK.result2D.split(",").forEach(function (obj) {
                            resultK.push(obj);
                            resultK2D.push(obj);
                        })
                    }
                    if (resultThisDay.postL.result2D !== null && resultThisDay.postL.result2D !== undefined) {
                        resultThisDay.postL.result2D.split(",").forEach(function (obj) {
                            resultL.push(obj);
                            resultL2D.push(obj);
                        })
                    }
                    if (resultThisDay.postN.result2D !== null && resultThisDay.postN.result2D !== undefined) {
                        resultThisDay.postN.result2D.split(",").forEach(function (obj) {
                            resultN.push(obj);
                            resultN2D.push(obj);
                        })
                    }
                    if (resultThisDay.postO.result2D !== null && resultThisDay.postO.result2D !== undefined) {
                        resultThisDay.postO.result2D.split(",").forEach(function (obj) {
                            resultO.push(obj);
                            resultO2D.push(obj);
                        })
                    }
                }


                /*3D*/
                if (resultThisDay.postA.result3D !== null && resultThisDay.postA.result3D !== undefined) {
                    resultThisDay.postA.result3D.forEach(function (obj) {
                        resultA.push(obj);
                        resultA3D.push(obj);
                        result4P.push(obj);
                        result4P3D.push(obj);
                    })
                }
                if (resultThisDay.postB.result3D !== null && resultThisDay.postB.result3D !== undefined) {
                    resultThisDay.postB.result3D.split(",").forEach(function (obj) {
                        resultB.push(obj);
                        resultB3D.push(obj);
                        result4P.push(obj);
                        result4P3D.push(obj);
                    })
                }

                if (resultThisDay.postA1.result3D !== null && resultThisDay.postA1.result3D !== undefined) {
                    resultThisDay.postA1.result3D.split(",").forEach(function (obj) {
                        resultA1.push(obj);
                        resultA13D.push(obj);
                    })
                }

                if (resultThisDay.postA2.result3D !== null && resultThisDay.postA2.result3D !== undefined) {
                    resultThisDay.postA2.result3D.split(",").forEach(function (obj) {
                        resultA2.push(obj);
                        resultA23D.push(obj);
                    })
                }

                if (resultThisDay.postA3.result3D !== null && resultThisDay.postA3.result3D !== undefined) {
                    resultThisDay.postA3.result3D.split(",").forEach(function (obj) {
                        resultA3.push(obj);
                        resultA33D.push(obj);
                    })
                }

                if (resultThisDay.postA4.result3D !== null && resultThisDay.postA4.result3D !== undefined) {
                    resultThisDay.postA4.result3D.split(",").forEach(function (obj) {
                        resultA4.push(obj);
                        resultA43D.push(obj);
                    })
                }

                if (resultThisDay.postT.result3D !== null && resultThisDay.postT.result3D !== undefined) {
                    resultThisDay.postT.result3D.split(",").forEach(function (obj) {
                        resultT.push(obj);
                        resultT3D.push(obj);

                        resultLer.push(obj.substr(1, 2));
                        resultTot.push(...GlobalFn.trolob(obj));
                    })
                }

                if (resultThisDay.postVat.result3D !== null && resultThisDay.postVat.result3D !== undefined) {
                    resultThisDay.postVat.result3D.split(",").forEach(function (obj) {
                        resultVat.push(obj);
                        resultVat3D.push(obj);
                    })
                }

                if (self.time !== "T") {

                    if (resultThisDay.postC.result3D !== null && resultThisDay.postC.result3D !== undefined) {
                        resultThisDay.postC.result3D.split(",").forEach(function (obj) {
                            resultC.push(obj);
                            resultC3D.push(obj);
                            result4P.push(obj);
                            result4P3D.push(obj);
                        })
                    }
                    if (resultThisDay.postD.result3D !== null && resultThisDay.postD.result3D !== undefined) {
                        resultThisDay.postD.result3D.split(",").forEach(function (obj) {
                            resultD.push(obj);
                            resultD3D.push(obj);
                            result4P.push(obj);
                            result4P3D.push(obj);
                        })
                    }

                    if (resultThisDay.postF.result3D !== null && resultThisDay.postF.result3D !== undefined) {
                        resultThisDay.postF.result3D.split(",").forEach(function (obj) {
                            resultF.push(obj);
                            resultF3D.push(obj);

                        })
                    }

                    if (resultThisDay.postI.result3D !== null && resultThisDay.postI.result3D !== undefined) {
                        resultThisDay.postI.result3D.split(",").forEach(function (obj) {
                            resultI.push(obj);
                            resultI3D.push(obj);

                        })
                    }

                    if (resultThisDay.postK.result3D !== null && resultThisDay.postK.result3D !== undefined) {
                        resultThisDay.postK.result3D.split(",").forEach(function (obj) {
                            resultK.push(obj);
                            resultK3D.push(obj);

                        })
                    }

                    if (resultThisDay.postL.result3D !== null && resultThisDay.postL.result3D !== undefined) {
                        resultThisDay.postL.result3D.split(",").forEach(function (obj) {
                            resultL.push(obj);
                            resultL3D.push(obj);

                        })
                    }

                    if (resultThisDay.postN.result3D !== null && resultThisDay.postN.result3D !== undefined) {
                        resultThisDay.postN.result3D.split(",").forEach(function (obj) {
                            resultN.push(obj);
                            resultN3D.push(obj);

                        })
                    }

                    if (resultThisDay.postO.result3D !== null && resultThisDay.postO.result3D !== undefined) {
                        resultThisDay.postO.result3D.split(",").forEach(function (obj) {
                            resultO.push(obj);
                            resultO3D.push(obj);

                        })
                    }


                    /*Lo*/
                    if (resultThisDay.postLo !== undefined) {
                        if (resultThisDay.postLo.result2D !== null) {
                            resultThisDay.postLo.result2D.forEach(function (obj) {
                                resultLo.push(obj);
                                resultLo2D.push(obj);
                            })
                        }
                        if (resultThisDay.postLo.result3D !== null) {
                            resultThisDay.postLo.result3D.forEach(function (obj) {
                                resultLo.push(obj);
                                resultLo3D.push(obj);
                            })
                        }
                    }
                }
            }


            let agentList = LT_Agent.find({status: {$ne: false}});
            agentList.forEach((d) => {
                let agentName = d.name;

                selector.agentId = d._id;
                selectorPage.agentId = d._id;
                selectorA.agentId = d._id;
                selectorA1.agentId = d._id;
                selectorA2.agentId = d._id;
                selectorA3.agentId = d._id;
                selectorA4.agentId = d._id;
                selectorB.agentId = d._id;
                selectorC.agentId = d._id;
                selectorD.agentId = d._id;
                selectorF.agentId = d._id;
                selectorI.agentId = d._id;
                selectorK.agentId = d._id;
                selectorL.agentId = d._id;
                selectorN.agentId = d._id;
                selectorO.agentId = d._id;
                selectorT.agentId = d._id;
                selectorVat.agentId = d._id;
                selectorLer.agentId = d._id;
                selectorTot.agentId = d._id;
                selector4P.agentId = d._id;
                selectorLo.agentId = d._id;

                let totalPage = Meteor.call('lt_getLastPage', selectorPage, secret, self.branch[0] || userDoc.branch[0]);
                let pageList = []

                let i = 1;
                for (i; i <= parseInt(totalPage); i++) {
                    pageList.push(i.toString());
                }

                dataHtml += `<footer></footer><h3>${agentName}  ${self.date} - ${self.time}</h3>`;

                dataHtml += `
                <table class="table table-report" style="margin-top: 10px !important;border-collapse: collapse !important;">
                    <tr>
                 
                        <td>${t[language].no}</td>
                        <td>${t[language].betNumber}</td>
                        <td>${t[language].page}</td>
                        <td>${t[language].line}</td>
                        <td>${t[language].amount}</td>
                                                <td>${t[language].post}</td>

                      
                    </tr>
                `


                /*Right Number*/


                selectorA['items.number'] = {$in: resultA};
                selectorA.time = self.time;
                selectorA.betDetailDate = self.date;
                selectorA.post = {$elemMatch: {$eq: "0A"}};
                let rightA = LT_BetDetail.find(selectorA).fetch();

                rightA.forEach(function (obj) {
                    betDetailList.push(obj._id);
                })


                selectorB['items.number'] = {$in: resultB};
                selectorB.post = {$elemMatch: {$eq: "1B"}};
                selectorB.time = self.time;
                selectorB.betDetailDate = self.date;
                let rightB = LT_BetDetail.find(selectorB).fetch();

                rightB.forEach(function (obj) {
                    betDetailList.push(obj._id);
                })

                selectorC['items.number'] = {$in: resultC};
                selectorC.post = {$elemMatch: {$eq: "2C"}};
                selectorC.time = self.time;
                selectorC.betDetailDate = self.date;
                let rightC = LT_BetDetail.find(selectorC).fetch();

                rightC.forEach(function (obj) {
                    betDetailList.push(obj._id);
                })

                selectorD['items.number'] = {$in: resultD};
                selectorD.post = {$elemMatch: {$eq: "3D"}};
                selectorD.time = self.time;
                selectorD.betDetailDate = self.date;
                let rightD = LT_BetDetail.find(selectorD).fetch();

                rightD.forEach(function (obj) {
                    betDetailList.push(obj._id);
                })

                selectorA1['items.number'] = {$in: resultA1};
                selectorA1.post = {$elemMatch: {$eq: "A1"}};
                selectorA1.time = self.time;
                selectorA1.betDetailDate = self.date;
                let rightA1 = LT_BetDetail.find(selectorA1).fetch();

                rightA1.forEach(function (obj) {
                    betDetailList.push(obj._id);
                })

                selectorA2['items.number'] = {$in: resultA2};
                selectorA2.post = {$elemMatch: {$eq: "A2"}};
                selectorA2.time = self.time;
                selectorA2.betDetailDate = self.date;
                let rightA2 = LT_BetDetail.find(selectorA2).fetch();

                rightA2.forEach(function (obj) {
                    betDetailList.push(obj._id);
                })

                selectorA3['items.number'] = {$in: resultA3};
                selectorA3.post = {$elemMatch: {$eq: "A3"}};
                selectorA3.time = self.time;
                selectorA3.betDetailDate = self.date;
                let rightA3 = LT_BetDetail.find(selectorA3).fetch();

                rightA3.forEach(function (obj) {
                    betDetailList.push(obj._id);
                })
                selectorA4['items.number'] = {$in: resultA4};
                selectorA4.post = {$elemMatch: {$eq: "A4"}};
                selectorA4.time = self.time;
                selectorA4.betDetailDate = self.date;
                let rightA4 = LT_BetDetail.find(selectorA4).fetch();

                rightA4.forEach(function (obj) {
                    betDetailList.push(obj._id);
                })
                selectorT['items.number'] = {$in: resultT};
                selectorT.post = {$elemMatch: {$eq: "T"}};
                selectorT.time = self.time;
                selectorT.betDetailDate = self.date;
                let rightT = LT_BetDetail.find(selectorT).fetch();

                rightT.forEach(function (obj) {
                    betDetailList.push(obj._id);
                })


                selectorVat['items.number'] = {$in: resultVat};
                selectorVat.post = {$elemMatch: {$eq: "Vat"}};
                selectorVat.time = self.time;
                selectorVat.betDetailDate = self.date;
                let rightVat = LT_BetDetail.find(selectorVat).fetch();

                rightVat.forEach(function (obj) {
                    betDetailList.push(obj._id);
                })



                selectorLer['items.number'] = {$in: resultLer};
                selectorLer.post = {$elemMatch: {$eq: "Ler"}};
                selectorLer.time = self.time;
                selectorLer.betDetailDate = self.date;
                let rightLer = LT_BetDetail.find(selectorLer).fetch();

                rightLer.forEach(function (obj) {
                    betDetailList.push(obj._id);
                })

                selectorTot['items.number'] = {$in: resultTot};
                selectorTot.post = {$elemMatch: {$eq: "Tot"}};
                selectorTot.time = self.time;
                selectorTot.betDetailDate = self.date;
                let rightTot = LT_BetDetail.find(selectorTot).fetch();

                rightTot.forEach(function (obj) {
                    betDetailList.push(obj._id);
                })


                selectorF['items.number'] = {$in: resultF};
                selectorF.post = {$elemMatch: {$eq: "F"}};
                selectorF.time = self.time;
                selectorF.betDetailDate = self.date;
                let rightF = LT_BetDetail.find(selectorF).fetch();

                rightF.forEach(function (obj) {
                    betDetailList.push(obj._id);
                })

                selectorI['items.number'] = {$in: resultI};
                selectorI.post = {$elemMatch: {$eq: "I"}};
                selectorI.time = self.time;
                selectorI.betDetailDate = self.date;
                let rightI = LT_BetDetail.find(selectorI).fetch();

                rightI.forEach(function (obj) {
                    betDetailList.push(obj._id);
                })

                selectorK['items.number'] = {$in: resultK};
                selectorK.post = {$elemMatch: {$eq: "K"}};
                selectorK.time = self.time;
                selectorK.betDetailDate = self.date;
                let rightK = LT_BetDetail.find(selectorK).fetch();

                rightK.forEach(function (obj) {
                    betDetailList.push(obj._id);
                })

                selectorL['items.number'] = {$in: resultL};
                selectorL.post = {$elemMatch: {$eq: "L"}};
                selectorL.time = self.time;
                selectorL.betDetailDate = self.date;
                let rightL = LT_BetDetail.find(selectorL).fetch();

                rightL.forEach(function (obj) {
                    betDetailList.push(obj._id);
                })

                selectorN['items.number'] = {$in: resultN};
                selectorN.post = {$elemMatch: {$eq: "N"}};
                selectorN.time = self.time;
                selectorN.betDetailDate = self.date;
                let rightN = LT_BetDetail.find(selectorN).fetch();

                rightN.forEach(function (obj) {
                    betDetailList.push(obj._id);
                })

                selectorO['items.number'] = {$in: resultO};
                selectorO.post = {$elemMatch: {$eq: "O"}};
                selectorO.time = self.time;
                selectorO.betDetailDate = self.date;
                let rightO = LT_BetDetail.find(selectorO).fetch();

                rightO.forEach(function (obj) {
                    betDetailList.push(obj._id);
                })

                selector4P['items.number'] = {$in: result4P};
                selector4P.post = {$elemMatch: {$eq: "4P"}};
                selector4P.time = self.time;
                selector4P.betDetailDate = self.date;
                let right4P = LT_BetDetail.find(selector4P).fetch();

                right4P.forEach(function (obj) {
                    betDetailList.push(obj._id);
                })

                selectorLo['items.number'] = {$in: resultLo};
                selectorLo.post = {$elemMatch: {$eq: "5Lo"}};
                selectorLo.time = self.time;
                selectorLo.betDetailDate = self.date;
                let rightLo = LT_BetDetail.find(selectorLo).fetch();

                rightLo.forEach(function (obj) {
                    betDetailList.push(obj._id);
                })

                let betDetailListUnique = betDetailList.filter(function (item, pos, self) {
                    return self.indexOf(item) === pos;
                })

                let j = 1;

                pageList.forEach(function (pageParam) {
                    selector.page = parseInt(pageParam);
                    let doc = LT_Bet.find(selector, {sort: {line: 1, createdAt: 1}}).fetch();

                    doc.forEach(function (obj) {

                        obj.items = obj.items.reverse();
                        obj.items.forEach(function (ob) {
                            if (betDetailListUnique.indexOf(ob.betDetailId) > -1) {

                                dataHtml += `
                                                                <tr>
                                                                <td>${j}</td>
                                                                <td>${ob.number}</td>
                                                                <td>${obj.page}</td>
                                                                <td>${obj.line}</td>
                                                                <td>${ob.amount} ${ob.currencyId === "1:KHR" ? "<font size= '2'> ៛  </font>" : ob.currencyId === "2:USD" ? "$" : "<span>&#3647;</span>"}</td>
                                                                                                                               <td>${GlobalFn.getPost(ob.post)}</td>

                                                                </tr>`;
                                j++;

                            }
                        })
                    })
                });
                dataHtml += `</table>`;

            })
            data.dataHtml = dataHtml;
            return data;
        }
    }
})


function compare(a, b) {
    if (a.row === b.row) {
        return (a.line < b.line) ? -1 : (a.line > b.line) ? 1 : 0;
    } else {
        return (a.row < b.row) ? -1 : 1;
    }
};

// <footer></footer>
