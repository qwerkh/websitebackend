import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import User from "../../imports/vue/ui/user/user";
import Branch from "../../imports/vue/ui/branch";
import Company from "../../imports/vue/ui/company";
import Exchange from "../../imports/vue/ui/exchange";
import LT_Location from "../../imports/vue/ui/lt_location";
import LT_Rank from "../../imports/vue/ui/lt_rank";
import LT_MapAgent from "../../imports/vue/ui/lt_mapAgent";

export const setting = [
    {
        path: "/rank",
        name: "rank",
        component: LT_Rank,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Setting",
        }
    },{
        path: "/location",
        name: "location",
        component: LT_Location,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Setting",
        }
    },{
        path: "/exchange",
        name: "exchange",
        component: Exchange,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Setting",
        }
    },{
        path: "/mapAgent",
        name: "mapAgent",
        component: LT_MapAgent,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Setting",
        }
    }, {
        path: "/user",
        name: "user",
        component: User,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Control User",
        }
    }, {
        path: "/branch",
        name: "branch",
        component: Branch,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Super",
        }
    }, {
        path: "/company",
        name: "company",
        component: Company,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Super",
        }
    },

];