import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Testing from "../../imports/vue/ui/testing";

import LT_Agent from "../../imports/vue/ui/lt_agent";
import LT_Bet from "../../imports/vue/ui/lt_bet";
import LT_Result from "../../imports/vue/ui/lt_result";
import LT_EndPErDay from "../../imports/vue/ui/lt_endPerDay";
import LT_BetFormMobile from "../../imports/vue/ui/lt_betFormMobile";


export const data = [
    {
        path: "/",
        name: "betFormMobile",
        component: LT_BetFormMobile,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "",
        }
    },{
        path: "/agent",
        name: "agent",
        component: LT_Agent,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Data",
        }
    }, {
        path: "/bet/:agentId",
        name: "bet",
        component: LT_Bet,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Data",
        }
    },{
        path: "/result",
        name: "result",
        component: LT_Result,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Data",
        }
    },{
        path: "/endPerDay",
        name: "endPerDay",
        component: LT_EndPErDay,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Data",
        }
    },

];