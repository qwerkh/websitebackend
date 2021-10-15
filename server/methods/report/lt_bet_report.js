import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../../imports/libs/globalFn"
import _ from 'lodash'
import {t} from "../../../imports/libs/constant";
import {LT_Bet} from "../../../imports/collections/lt_bet"
import {LT_Agent} from "../../../imports/collections/lt_agent"
import {LT_Result} from "../../../imports/collections/lt_result";
import {LT_BetDetail} from "../../../imports/collections/lt_betDetail";
import {Company} from "../../../imports/collections/company";

let secret = Meteor.settings.private.secret;
Meteor.methods({
    base_fetchBetReport(params, accessToken, language) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let selector = {};
            let data = {};

            let dataHtml = "";
            let self = params;

            let companyDoc = Company.findOne({});
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
            let selectorF = {};
            let selectorI = {};
            let selectorK = {};
            let selectorL = {};
            let selectorN = {};
            let selectorO = {};
            let selector4P = {};
            let userDoc = Meteor.user();
            if (params.branch !== "" && params.branch.length > 0) {
                selector.branchId = {$in: self.branch || []};
                selectorLo.branchId = {$in: self.branch || []};
                selectorA.branchId = {$in: self.branch || []};
                selectorA1.branchId = {$in: self.branch || []};
                selectorA2.branchId = {$in: self.branch || []};
                selectorA3.branchId = {$in: self.branch || []};
                selectorA4.branchId = {$in: self.branch || []};
                selectorT.branchId = {$in: self.branch || []};
                selectorLer.branchId = {$in: self.branch || []};
                selectorTot.branchId = {$in: self.branch || []};
                selectorVat.branchId = {$in: self.branch || []};
                selectorB.branchId = {$in: self.branch || []};
                selectorC.branchId = {$in: self.branch || []};
                selectorD.branchId = {$in: self.branch || []};
                selectorF.branchId = {$in: self.branch || []};
                selectorI.branchId = {$in: self.branch || []};
                selectorK.branchId = {$in: self.branch || []};
                selectorL.branchId = {$in: self.branch || []};
                selectorN.branchId = {$in: self.branch || []};
                selectorO.branchId = {$in: self.branch || []};
                selector4P.branchId = {$in: self.branch || []};
            } else {

                selector.branchId = {$in: userDoc.branch || []};
                selectorLo.branchId = {$in: userDoc.branch || []};
                selectorA.branchId = {$in: userDoc.branch || []};
                selectorA1.branchId = {$in: userDoc.branch || []};
                selectorA2.branchId = {$in: userDoc.branch || []};
                selectorA3.branchId = {$in: userDoc.branch || []};
                selectorA4.branchId = {$in: userDoc.branch || []};
                selectorT.branchId = {$in: userDoc.branch || []};
                selectorLer.branchId = {$in: userDoc.branch || []};
                selectorTot.branchId = {$in: userDoc.branch || []};
                selectorVat.branchId = {$in: userDoc.branch || []};
                selectorB.branchId = {$in: userDoc.branch || []};
                selectorC.branchId = {$in: userDoc.branch || []};
                selectorD.branchId = {$in: userDoc.branch || []};
                selectorF.branchId = {$in: userDoc.branch || []};
                selectorI.branchId = {$in: userDoc.branch || []};
                selectorK.branchId = {$in: userDoc.branch || []};
                selectorL.branchId = {$in: userDoc.branch || []};
                selectorN.branchId = {$in: userDoc.branch || []};
                selectorO.branchId = {$in: userDoc.branch || []};
                selector4P.branchId = {$in: userDoc.branch || []};
            }
            let agentName = "";

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
            selectorF.agentId = self.agentId;
            selectorI.agentId = self.agentId;
            selectorK.agentId = self.agentId;
            selectorL.agentId = self.agentId;
            selectorN.agentId = self.agentId;
            selectorO.agentId = self.agentId;
            selector4P.agentId = self.agentId;
            selectorLo.agentId = self.agentId;

            agentName = LT_Agent.findOne({_id: self.agentId}).name;

            selector.betDate = self.date;
            selector.time = self.time;

            let totalPage = Meteor.call('lt_getLastPage', selector, secret, self.branch[0] || userDoc.branch[0]);
            let pageList = [];
            let allPage = false;

            if (self.page && self.page === 0 || self.page === "" || self.page === null) {
                allPage = true;
            } else {
                pageList.push(self.page.toString());
            }

            if (allPage === true) {
                pageList = [];
                let i = 1;
                for (i; i <= parseInt(totalPage); i++) {
                    pageList.push(i.toString());
                }
            }


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

            let resultLer = [];
            let resultTot = [];

            let resultVat = [];
            let resultVat2D = [];
            let resultVat3D = [];

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
            }

            let betDetailListUnique = betDetailList.filter(function (item, pos, self) {
                return self.indexOf(item) === pos;
            })


            pageList.forEach(function (pageParam) {
                let dataList = [];
                let dataListFooter = [];
                let totalLine = 0;

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
                let doc = LT_Bet.find(selector, {sort: {line: 1, createdAt: 1}}).fetch();
                let oldLine = 0;
                let i = 0;

                let totalRiel2D = 0;
                let totalRiel3D = 0;
                let totalRielLer = 0;
                let totalRielTot = 0;
                let totalDollar2D = 0;
                let totalDollar3D = 0;
                let totalDollarLer = 0;
                let totalDollarTot = 0;
                let totalBaht2D = 0;
                let totalBaht3D = 0;
                let totalBahtLer = 0;
                let totalBahtTot = 0;

                let docLength = 0;
                doc.forEach(function (obj) {
                    docLength++;
                    if (oldLine !== obj.line) {
                        i = 0;
                    }
                    obj.items = obj.items.reverse();
                    obj.items.forEach(function (ob) {
                        if (betDetailListUnique.indexOf(ob.betDetailId) > -1) {

                            let superScript = 0;
                            let betDetailNumber = LT_BetDetail.findOne(ob.betDetailId);
                            if (betDetailNumber.currencyId === "1:KHR") {
                                betDetailNumber.items.forEach(function (detail) {
                                        if (betDetailNumber.post.indexOf("4P") > -1) {
                                            if (detail.number.length === 2) {
                                                if (resultA2D.indexOf(detail.number) > -1) {
                                                    resultA2D.forEach(function (timeRight) {
                                                        if (timeRight === detail.number) {
                                                            returnTotalRiel2DPerPage += detail.amount;
                                                            superScript += 1;
                                                        }
                                                    })
                                                }
                                                if (resultB2D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                                if (resultC2D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                                if (resultD2D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            } else if (detail.number.length === 3) {
                                                if (resultA3D.indexOf(detail.number) > -1) {
                                                    resultA3D.forEach(function (timeRight) {
                                                        if (timeRight === detail.number) {
                                                            returnTotalRiel3DPerPage += detail.amount;
                                                            superScript += 1;
                                                        }
                                                    })
                                                }
                                                if (resultB3D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                                if (resultC3D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                                if (resultD3D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            }
                                        }
                                        if (betDetailNumber.post.indexOf("0A") > -1) {
                                            if (detail.number.length === 2) {
                                                if (resultA2D.indexOf(detail.number) > -1) {
                                                    resultA2D.forEach(function (timeRight) {
                                                        if (timeRight === detail.number) {
                                                            returnTotalRiel2DPerPage += detail.amount;
                                                            superScript += 1;
                                                        }
                                                    })
                                                }
                                            } else if (detail.number.length === 3) {
                                                if (resultA3D.indexOf(detail.number) > -1) {
                                                    resultA3D.forEach(function (timeRight) {
                                                        if (timeRight === detail.number) {
                                                            returnTotalRiel3DPerPage += detail.amount;
                                                            superScript += 1;
                                                        }
                                                    })
                                                }
                                            }
                                        }

                                        if (betDetailNumber.post.indexOf("1B") > -1) {
                                            if (detail.number.length === 2) {
                                                if (resultB2D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            } else if (detail.number.length === 3) {
                                                if (resultB3D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            }
                                        }

                                        if (betDetailNumber.post.indexOf("2C") > -1) {
                                            if (detail.number.length === 2) {
                                                if (resultC2D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            } else if (detail.number.length === 3) {
                                                if (resultC3D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            }
                                        }

                                        if (betDetailNumber.post.indexOf("3D") > -1) {
                                            if (detail.number.length === 2) {
                                                if (resultD2D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            } else if (detail.number.length === 3) {
                                                if (resultD3D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            }
                                        }


                                        if (betDetailNumber.post.indexOf("A1") > -1) {
                                            if (detail.number.length === 2) {
                                                if (resultA12D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            } else if (detail.number.length === 3) {
                                                if (resultA13D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            }
                                        }

                                        if (betDetailNumber.post.indexOf("A2") > -1) {
                                            if (detail.number.length === 2) {
                                                if (resultA22D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            } else if (detail.number.length === 3) {
                                                if (resultA23D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            }
                                        }

                                        if (betDetailNumber.post.indexOf("A3") > -1) {
                                            if (detail.number.length === 2) {
                                                if (resultA32D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            } else if (detail.number.length === 3) {
                                                if (resultA33D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            }
                                        }

                                        if (betDetailNumber.post.indexOf("A4") > -1) {
                                            if (detail.number.length === 2) {
                                                if (resultA42D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            } else if (detail.number.length === 3) {
                                                if (resultA43D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            }
                                        }

                                        if (betDetailNumber.post.indexOf("T") > -1) {
                                            if (detail.number.length === 2) {
                                                if (resultT2D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            } else if (detail.number.length === 3) {
                                                if (resultT3D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            }
                                        }

                                        if (betDetailNumber.post.indexOf("Vat") > -1) {
                                            if (detail.number.length === 2) {
                                                if (resultVat2D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            } else if (detail.number.length === 3) {
                                                if (resultVat3D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            }
                                        }


                                        if (betDetailNumber.post.indexOf("Ler") > -1) {
                                            if (resultLer.indexOf(detail.number) > -1) {
                                                returnTotalRielLerPerPage += detail.amount;
                                                superScript += 1;
                                            }

                                        }
                                        if (betDetailNumber.post.indexOf("Tot") > -1) {

                                            if (resultTot.indexOf(detail.number) > -1) {
                                                returnTotalRielTotPerPage += detail.amount;
                                                superScript += 1;
                                            }

                                        }

                                        if (betDetailNumber.post.indexOf("F") > -1) {
                                            if (detail.number.length === 2) {
                                                if (resultF2D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            } else if (detail.number.length === 3) {
                                                if (resultF3D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            }
                                        }
                                        if (betDetailNumber.post.indexOf("I") > -1) {
                                            if (detail.number.length === 2) {
                                                if (resultI2D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            } else if (detail.number.length === 3) {
                                                if (resultI3D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            }
                                        }
                                        if (betDetailNumber.post.indexOf("K") > -1) {
                                            if (detail.number.length === 2) {
                                                if (resultK2D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            } else if (detail.number.length === 3) {
                                                if (resultK3D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            }
                                        }
                                        if (betDetailNumber.post.indexOf("L") > -1) {
                                            if (detail.number.length === 2) {
                                                if (resultL2D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            } else if (detail.number.length === 3) {
                                                if (resultL3D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            }
                                        }
                                        if (betDetailNumber.post.indexOf("N") > -1) {
                                            if (detail.number.length === 2) {
                                                if (resultN2D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            } else if (detail.number.length === 3) {
                                                if (resultN3D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            }
                                        }
                                        if (betDetailNumber.post.indexOf("O") > -1) {
                                            if (detail.number.length === 2) {
                                                if (resultO2D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            } else if (detail.number.length === 3) {
                                                if (resultO3D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            }
                                        }

                                        if (betDetailNumber.post.indexOf("5Lo") > -1) {
                                            if (detail.number.length === 2) {
                                                if (resultLo2D.indexOf(detail.number) > -1) {
                                                    resultLo2D.forEach(function (timeRight) {
                                                        if (timeRight === detail.number) {
                                                            returnTotalRiel2DPerPage += detail.amount;
                                                            superScript += 1;
                                                        }
                                                    })
                                                }
                                            } else if (detail.number.length === 3) {
                                                if (resultLo3D.indexOf(detail.number) > -1) {
                                                    resultLo3D.forEach(function (timeRight) {
                                                        if (timeRight === detail.number) {
                                                            returnTotalRiel3DPerPage += detail.amount;
                                                            superScript += 1;
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
                                                        superScript += 1;
                                                    }
                                                })
                                            }
                                            if (resultB2D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                            if (resultC2D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                            if (resultD2D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultA3D.indexOf(detail.number) > -1) {
                                                resultA3D.forEach(function (timeRight) {
                                                    if (timeRight === detail.number) {
                                                        returnTotalDollar3DPerPage += detail.amount;
                                                        superScript += 1;
                                                    }
                                                })
                                            }
                                            if (resultB3D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                            if (resultC3D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                            if (resultD3D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }
                                    if (betDetailNumber.post.indexOf("0A") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultA2D.indexOf(detail.number) > -1) {
                                                resultA2D.forEach(function (timeRight) {
                                                    if (timeRight === detail.number) {
                                                        returnTotalDollar2DPerPage += detail.amount;
                                                        superScript += 1;
                                                    }
                                                })
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultA3D.indexOf(detail.number) > -1) {
                                                resultA3D.forEach(function (timeRight) {
                                                    if (timeRight === detail.number) {
                                                        returnTotalDollar3DPerPage += detail.amount;
                                                        superScript += 1;
                                                    }
                                                })
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("1B") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultB2D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultB3D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("2C") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultC2D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultC3D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("3D") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultD2D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultD3D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }


                                    if (betDetailNumber.post.indexOf("A1") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultA12D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultA13D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("A2") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultA22D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultA23D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("A3") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultA32D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultA33D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("A4") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultA42D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultA43D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("T") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultT2D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultT3D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("Vat") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultVat2D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultVat3D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("Ler") > -1) {
                                        if (resultLer.indexOf(detail.number) > -1) {
                                            returnTotalDollarLerPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                    }


                                    if (betDetailNumber.post.indexOf("Tot") > -1) {
                                        if (resultTot.indexOf(detail.number) > -1) {
                                            returnTotalDollarTotPerPage += detail.amount;
                                            superScript += 1;
                                        }

                                    }


                                    if (betDetailNumber.post.indexOf("F") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultF2D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultF3D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("I") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultI2D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultI3D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("K") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultK2D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultK3D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("L") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultL2D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultL3D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("N") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultN2D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultN3D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("O") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultO2D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultO3D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("5Lo") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultLo2D.indexOf(detail.number) > -1) {
                                                resultLo2D.forEach(function (timeRight) {
                                                    if (timeRight === detail.number) {
                                                        returnTotalDollar2DPerPage += detail.amount;
                                                        superScript += 1;
                                                    }
                                                })
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultLo3D.indexOf(detail.number) > -1) {
                                                resultLo3D.forEach(function (timeRight) {
                                                    if (timeRight === detail.number) {
                                                        returnTotalDollar3DPerPage += detail.amount;
                                                        superScript += 1;
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
                                                        superScript += 1;
                                                    }
                                                })
                                            }
                                            if (resultB2D.indexOf(detail.number) > -1) {
                                                returnTotalBaht2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                            if (resultC2D.indexOf(detail.number) > -1) {
                                                returnTotalBaht2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                            if (resultD2D.indexOf(detail.number) > -1) {
                                                returnTotalBaht2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultA3D.indexOf(detail.number) > -1) {
                                                resultA3D.forEach(function (timeRight) {
                                                    if (timeRight === detail.number) {
                                                        returnTotalBaht3DPerPage += detail.amount;
                                                        superScript += 1;
                                                    }
                                                })
                                            }
                                            if (resultB3D.indexOf(detail.number) > -1) {
                                                returnTotalBaht3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                            if (resultC3D.indexOf(detail.number) > -1) {
                                                returnTotalBaht3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                            if (resultD3D.indexOf(detail.number) > -1) {
                                                returnTotalBaht3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }
                                    if (betDetailNumber.post.indexOf("0A") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultA2D.indexOf(detail.number) > -1) {
                                                resultA2D.forEach(function (timeRight) {
                                                    if (timeRight === detail.number) {
                                                        returnTotalBaht2DPerPage += detail.amount;
                                                        superScript += 1;
                                                    }
                                                })
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultA3D.indexOf(detail.number) > -1) {
                                                resultA3D.forEach(function (timeRight) {
                                                    if (timeRight === detail.number) {
                                                        returnTotalBaht3DPerPage += detail.amount;
                                                        superScript += 1;
                                                    }
                                                })
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("1B") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultB2D.indexOf(detail.number) > -1) {
                                                returnTotalBaht2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultB3D.indexOf(detail.number) > -1) {
                                                returnTotalBaht3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("2C") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultC2D.indexOf(detail.number) > -1) {
                                                returnTotalBaht2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultC3D.indexOf(detail.number) > -1) {
                                                returnTotalBaht3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("3D") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultD2D.indexOf(detail.number) > -1) {
                                                returnTotalBaht2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultD3D.indexOf(detail.number) > -1) {
                                                returnTotalBaht3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }


                                    if (betDetailNumber.post.indexOf("A1") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultA12D.indexOf(detail.number) > -1) {
                                                returnTotalBaht2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultA13D.indexOf(detail.number) > -1) {
                                                returnTotalBaht3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("A2") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultA22D.indexOf(detail.number) > -1) {
                                                returnTotalBaht2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultA23D.indexOf(detail.number) > -1) {
                                                returnTotalBaht3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("A3") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultA32D.indexOf(detail.number) > -1) {
                                                returnTotalBaht2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultA33D.indexOf(detail.number) > -1) {
                                                returnTotalBaht3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("A4") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultA42D.indexOf(detail.number) > -1) {
                                                returnTotalBaht2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultA43D.indexOf(detail.number) > -1) {
                                                returnTotalBaht3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("T") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultT2D.indexOf(detail.number) > -1) {
                                                returnTotalBaht2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultT3D.indexOf(detail.number) > -1) {
                                                returnTotalBaht3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }
                                    if (betDetailNumber.post.indexOf("Vat") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultVat2D.indexOf(detail.number) > -1) {
                                                returnTotalBaht2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultVat3D.indexOf(detail.number) > -1) {
                                                returnTotalBaht3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.indexOf("Ler") > -1) {
                                        if (resultLer.indexOf(detail.number) > -1) {
                                            returnTotalBahtLerPerPage += detail.amount;
                                            superScript += 1;
                                        }

                                    }

                                    if (betDetailNumber.post.indexOf("Tot") > -1) {
                                        if (resultTot.indexOf(detail.number) > -1) {
                                            returnTotalBahtTotPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                    }


                                    if (betDetailNumber.post.indexOf("F") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultF2D.indexOf(detail.number) > -1) {
                                                returnTotalBaht2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultF3D.indexOf(detail.number) > -1) {
                                                returnTotalBaht3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }
                                    if (betDetailNumber.post.indexOf("I") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultI2D.indexOf(detail.number) > -1) {
                                                returnTotalBaht2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultI3D.indexOf(detail.number) > -1) {
                                                returnTotalBaht3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }
                                    if (betDetailNumber.post.indexOf("K") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultK2D.indexOf(detail.number) > -1) {
                                                returnTotalBaht2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultK3D.indexOf(detail.number) > -1) {
                                                returnTotalBaht3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }
                                    if (betDetailNumber.post.indexOf("L") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultL2D.indexOf(detail.number) > -1) {
                                                returnTotalBaht2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultL3D.indexOf(detail.number) > -1) {
                                                returnTotalBaht3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }
                                    if (betDetailNumber.post.indexOf("N") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultN2D.indexOf(detail.number) > -1) {
                                                returnTotalBaht2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultN3D.indexOf(detail.number) > -1) {
                                                returnTotalBaht3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }
                                    if (betDetailNumber.post.indexOf("O") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultO2D.indexOf(detail.number) > -1) {
                                                returnTotalBaht2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultO3D.indexOf(detail.number) > -1) {
                                                returnTotalBaht3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }


                                    if (betDetailNumber.post.indexOf("5Lo") > -1) {
                                        if (detail.number.length === 2) {
                                            if (resultLo2D.indexOf(detail.number) > -1) {
                                                resultLo2D.forEach(function (timeRight) {
                                                    if (timeRight === detail.number) {
                                                        returnTotalBaht2DPerPage += detail.amount;
                                                        superScript += 1;
                                                    }
                                                })
                                            }
                                        } else if (detail.number.length === 3) {
                                            if (resultLo3D.indexOf(detail.number) > -1) {
                                                resultLo3D.forEach(function (timeRight) {
                                                    if (timeRight === detail.number) {
                                                        returnTotalBaht3DPerPage += detail.amount;
                                                        superScript += 1;
                                                    }
                                                })
                                            }
                                        }
                                    }

                                })
                            }

                            if (superScript > 1) {
                                dataList.push({
                                    page: obj.page,
                                    line: obj.line,
                                    currency: ob.currencyId === "1:KHR" ? "<font size= '2'> ៛  </font>" : ob.currencyId === "2:USD" ? "$" : "<span>&#3647;</span>",
                                    row: i,
                                    number: "<span class='label label-danger' style='font-size:9pt'> " + ob.number,
                                    amount: ob.amount + "<sup>" + superScript + "</sup></span>",
                                    post: ob.post,
                                    postTitle: ob.postTitle || [],
                                    time: obj.time
                                });
                            } else {
                                dataList.push({
                                    page: obj.page,
                                    line: obj.line,
                                    currency: ob.currencyId === "1:KHR" ? "<font size= '2'> ៛  </font>" : ob.currencyId === "2:USD" ? "$" : "<span>&#3647;</span>",
                                    row: i,
                                    number: "<span class='label label-danger' style='font-size:9pt'> " + ob.number,
                                    amount: ob.amount + "</span>",
                                    post: ob.post,
                                    postTitle: ob.postTitle || [],
                                    time: obj.time
                                });
                            }
                        } else {
                            dataList.push({
                                page: obj.page,
                                line: obj.line,
                                currency: ob.currencyId === "1:KHR" ? "<font size= '2'> ៛  </font>" : ob.currencyId === "2:USD" ? "$" : "<span>&#3647;</span>",
                                row: i,
                                number: ob.number,
                                amount: ob.amount,
                                post: ob.post,
                                postTitle: ob.postTitle || [],
                                time: obj.time
                            });
                        }
                        i++;
                    })
                    if (oldLine !== obj.line) {
                        totalRiel2D = (obj.totalRiel2D || 0);
                        totalRiel3D = (obj.totalRiel3D || 0);
                        totalRielLer = (obj.totalRielLer || 0);
                        totalRielTot = (obj.totalRielTot || 0);
                        totalDollar2D = (obj.totalDollar2D || 0);
                        totalDollar3D = (obj.totalDollar3D || 0);
                        totalDollarLer = (obj.totalDollarLer || 0);
                        totalDollarTot = (obj.totalDollarTot || 0);
                        totalBaht2D = (obj.totalBaht2D || 0);
                        totalBaht3D = (obj.totalBaht3D || 0);
                        totalBahtLer = (obj.totalBahtLer || 0);
                        totalBahtTot = (obj.totalBahtTot || 0);

                        dataListFooter.push({
                            page: obj.page,
                            line: obj.line,
                            totalRiel2D: totalRiel2D,
                            totalRiel3D: totalRiel3D,
                            totalRielLer: totalRielLer,
                            totalRielTot: totalRielTot,
                            totalDollar2D: totalDollar2D,
                            totalDollar3D: totalDollar3D,
                            totalDollarLer: totalDollarLer,
                            totalDollarTot: totalDollarTot,
                            totalBaht2D: totalBaht2D,
                            totalBaht3D: totalBaht3D,
                            totalBahtLer: totalBahtLer,
                            totalBahtTot: totalBahtTot
                        })


                    } else if (doc.length === 1 || doc.length === docLength) {

                        totalRiel2D += (obj.totalRiel2D || 0);
                        totalRiel3D += (obj.totalRiel3D || 0);
                        totalRielLer += (obj.totalRielLer || 0);
                        totalRielTot += (obj.totalRielTot || 0);
                        totalDollar2D += (obj.totalDollar2D || 0);
                        totalDollar3D += (obj.totalDollar3D || 0);
                        totalDollarLer += (obj.totalDollarLer || 0);
                        totalDollarTot += (obj.totalDollarTot || 0);
                        totalBaht2D += (obj.totalBaht2D || 0);
                        totalBaht3D += (obj.totalBaht3D || 0);
                        totalBahtLer += (obj.totalBahtLer || 0);
                        totalBahtTot += (obj.totalBahtTot || 0);

                        dataListFooter.push({
                            page: obj.page,
                            line: obj.line,
                            totalRiel2D: totalRiel2D,
                            totalRiel3D: totalRiel3D,
                            totalRielLer: totalRielLer,
                            totalRielTot: totalRielTot,
                            totalDollar2D: totalDollar2D,
                            totalDollar3D: totalDollar3D,
                            totalDollarLer: totalDollarLer,
                            totalDollarTot: totalDollarTot,
                            totalBaht2D: totalBaht2D,
                            totalBaht3D: totalBaht3D,
                            totalBahtLer: totalBahtLer,
                            totalBahtTot: totalBahtTot
                        })
                    }

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

                    if (oldLine !== obj.line) {
                        totalLine++;
                    }
                    oldLine = obj.line;
                })
                dataList.sort(compare);

                if (dataList.length > 0) {
                    let oldRow = 0;
                    let oldLine = 0;
                    dataHtml += '<footer></footer><table class="table table-report" style="margin-top: 10px !important;border-collapse: collapse !important;"><caption><b>' +

                        "<span align='left'>" + t[language].pageNum + " : " + pageParam + "-" + agentName + " " + self.date + "-" + self.time +

                        "</b><table align='right'  class='label-table label-danger'><tr><th>" + t[language].win + "&nbsp;&nbsp;</th><th>2D</th><th>3D</th>";

                    if (self.time === "T") {
                        dataHtml += "<th>លើ</th><th>តូត</th>";
                    }

                    dataHtml += "</tr><tr><td><font size= '2'> ៛  </font>: </td><td>" + returnTotalRiel2DPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + returnTotalRiel3DPerPage +
                        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";

                    if (self.time === "T") {
                        dataHtml += "<td>" + returnTotalRielLerPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + returnTotalRielTotPerPage +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";
                    }

                    dataHtml += "</tr><tr><td>$: </td><td>" + returnTotalDollar2DPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + returnTotalDollar3DPerPage +
                        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";

                    if (self.time === "T") {
                        dataHtml += "<td>" + returnTotalDollarLerPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + returnTotalDollarTotPerPage +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";
                    }

                    dataHtml += "</tr><tr><td><span>&#3647;</span>: </td><td>" + returnTotalBaht2DPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + returnTotalBaht3DPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";

                    if (self.time === "T") {
                        dataHtml += "<td>" + returnTotalBahtLerPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + returnTotalBahtTotPerPage +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";
                    }

                    dataHtml += "</tr></table>&nbsp;<table class='label-table label-warning' align='right'><tr><th>" + t[language].total + "&nbsp;&nbsp;&nbsp;&nbsp;</th><th>2D</th><th>3D</th>";
                    if (self.time === "T") {
                        dataHtml += "<th>លើ</th><th>តូត</th>";
                    }

                    dataHtml += "</tr><tr><td><font size= '2'> ៛  </font>: </td><td>" + totalRiel2DPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + totalRiel3DPerPage +
                        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";

                    if (self.time === "T") {
                        dataHtml += "<td>" + totalRielLerPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + totalRielTotPerPage +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";
                    }
                    dataHtml += "</tr><tr><td>$: </td><td>" + totalDollar2DPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + totalDollar3DPerPage +
                        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";


                    if (self.time === "T") {
                        dataHtml += "<td>" + totalDollarLerPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + totalDollarTotPerPage +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";
                    }
                    dataHtml += "<tr><td><span>&#3647;</span>: </td><td>" + totalBaht2DPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + totalBaht3DPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";

                    if (self.time === "T") {
                        dataHtml += "<td>" + totalBahtLerPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + totalBahtTotPerPage +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";
                    }
                    dataHtml += "<tr></table></caption>";
                    let postTitleBot = [];
                    let rowInPageList = [];
                    dataList.forEach(function (obj) {
                        if (oldRow !== obj.row) {
                            dataHtml += "</tr>";
                            dataHtml += '<tr style="border: none;">';
                            oldLine = 0;
                        }

                        let k = 1;
                        for (k; k < obj.line - oldLine; k++) {
                            dataHtml += '<td style="border-right: solid 1px"></td>';
                        }
                        if (companyDoc.isPostTitle === true) {
                            /*if (obj.postTitle.length > 0) {

                                if (oldRow !== obj.row) {

                                    dataHtml += '<td style="border-right: solid 1px;color:red">&nbsp;&nbsp;&nbsp;&nbsp;' + GlobalFn.getPost(obj.postTitle) + "</td></tr><tr>";

                                } else {
                                    dataHtml += '</tr><tr><td style="border-right: solid 1px;color:red">&nbsp;&nbsp;&nbsp;&nbsp;' + GlobalFn.getPost(obj.postTitle) + "</td></tr><tr>";
                                }

                            }*/
                            if (companyDoc.isPostTop === true) {
                                if (obj.postTitle && obj.postTitle.length > 0) {
                                    dataHtml += '<td style="border-right: solid 1px">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red"><u>' + GlobalFn.getPost(obj.post) + '</u></span><br>' + obj.number + " = " + obj.amount + "</td>";
                                } else {
                                    dataHtml += '<td style="border-right: solid 1px">' + obj.number + " = " + obj.amount + "</td>";
                                }
                            } else {
                                rowInPageList[parseInt(obj.page + "" + obj.line)] = (rowInPageList[parseInt(obj.page + "" + obj.line)] || 0) + 1;
                                let filterRow = dataList.filter((d) => d.page === obj.page && d.line === obj.line).length;
                                let isLastRow = filterRow === rowInPageList[parseInt(obj.page + "" + obj.line)];
                                if (obj.postTitle && obj.postTitle.length > 0 && postTitleBot[parseInt(obj.page + "" + obj.line)] && postTitleBot[parseInt(obj.page + "" + obj.line)].length > 0 && !isLastRow) {
                                    dataHtml += '<td style="border-right: solid 1px;vertical-align: top">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red;border-top:1px solid">' + GlobalFn.getPost(postTitleBot[parseInt(obj.page + "" + obj.line)]) + '</span><br>' + obj.number + " = " + obj.amount + "</td>";

                                } else {
                                    if (obj.postTitle && obj.postTitle.length > 0 && postTitleBot[parseInt(obj.page + "" + obj.line)] && postTitleBot[parseInt(obj.page + "" + obj.line)].length > 0) {
                                        dataHtml += '<td style="border-right: solid 1px;vertical-align: top">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red;border-top:1px solid">' + GlobalFn.getPost(postTitleBot[parseInt(obj.page + "" + obj.line)]) + '</span><br>' + obj.number + " = " + obj.amount;
                                    } else {
                                        dataHtml += '<td style="border-right: solid 1px;">' + obj.number + " = " + obj.amount;
                                    }
                                    if (isLastRow) {
                                        dataHtml += '<br>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red;border-top:1px solid">' + GlobalFn.getPost(obj.post) + '</span>' + "</td>";
                                    } else {
                                        dataHtml += "</td>";
                                    }

                                }
                                if (obj.postTitle && obj.postTitle.length > 0) {
                                    postTitleBot[parseInt(obj.page + "" + obj.line)] = obj.post;
                                }
                            }

                        } else {
                            dataHtml += '<td style="border-right: solid 1px">' + obj.number + " = " + obj.amount + obj.currency + " (" + GlobalFn.getPost(obj.post) + ")</td>";
                        }
                        oldRow = obj.row;
                        oldLine = obj.line;
                    })
                    let oldFooterLine = 0;
                    let footer = "<tr>";
                    dataListFooter.forEach(function (obj) {
                        let m = 1;
                        for (m; m < obj.line - oldFooterLine; m++) {
                            dataHtml += "<td></td>";
                        }

                        footer += "<td><table class=' label-table bg-primary'><tr><th></th><th>2D</th><th>3D</th></tr><tr><td><font size= '3'> ៛  </font>: </td><td>" + (obj.totalRiel2D + obj.totalRielLer) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + (obj.totalRiel3D + obj.totalRielTot) +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr><tr><td>$: </td><td>" + (obj.totalDollar2D + obj.totalDollarLer) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + (obj.totalDollar3D + obj.totalDollarTot) +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr><tr><td><span>&#3647;</span>: </td><td>" + (obj.totalBaht2D + obj.totalBahtLer) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + (obj.totalBaht3D + obj.totalBahtTot) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr></table></td>";

                        oldFooterLine = obj.line;
                    });
                    dataHtml += "</tr>" + footer + "</tr></tbody></table>";
                }
            });
            data.agentName = agentName;
            data.dataHtml = dataHtml;
            Meteor.defer(function () {
                Meteor.call("lt_clearDataLast2Month", moment().format("YYYY-MM-DD"));
            })
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
