import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Testing from "../../imports/vue/ui/report/testing";
import LT_BetReport from "../../imports/vue/ui/report/lt_bet_report";
import LT_WinLossReport from "../../imports/vue/ui/report/lt_winLoss_report";
import LT_QuickWinLossReport from "../../imports/vue/ui/report/lt_quick_winLoss_report";
import LT_DailyByDayReport from "../../imports/vue/ui/report/lt_dailyByDay_report";
import LT_BetNumberReviewReport from "../../imports/vue/ui/report/lt_betNumberReview_report";
import LT_WinNumberReport from "../../imports/vue/ui/report/lt_win_number_report";


export const report = [
    {
        path: "/winNumberReport",
        name: "winNumberReport",
        component: LT_WinNumberReport,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Report",
        }
    },{
        path: "/betReport",
        name: "betReport",
        component: LT_BetReport,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Report",
        }
    }, {
        path: "/winLossReport",
        name: "winLossReport",
        component: LT_WinLossReport,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Report",
        }
    }, {
        path: "/quickWinLossReport",
        name: "quickWinLossReport",
        component: LT_QuickWinLossReport,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Report",
        }
    },{
        path: "/dailyByDayReport",
        name: "dailyByDayReport",
        component: LT_DailyByDayReport,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Report",
        }
    },{
        path: "/betNumberReviewReport",
        name: "betNumberReviewReport",
        component: LT_BetNumberReviewReport,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Report",
        }
    }, {
        path: "/testingReport",
        name: "testingReport",
        component: Testing,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Report",
        }
    }

];