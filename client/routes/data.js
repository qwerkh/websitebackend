import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from "../../imports/vue/ui/home";
import About from "../../imports/vue/ui/about";
import Contact from "../../imports/vue/ui/contact";
import Product from "../../imports/vue/ui/product";
import NewsAndEvents from "../../imports/vue/ui/newsAndEvents";
import Media from "../../imports/vue/ui/media";
import Client from "../../imports/vue/ui/client";
import Organization from "../../imports/vue/ui/organization";
import ProductionLine from "../../imports/vue/ui/productionLine";
import Program from "../../imports/vue/ui/program";
import Overview from "../../imports/vue/ui/overview";
import MajorDetail from "../../imports/vue/ui/majorDetail";
import RectorWelcom from "../../imports/vue/ui/rectorWelcom";
import Major from "../../imports/vue/ui/major";
import HeaderFooter from "../../imports/vue/ui/headerFooter";


export const data = [
    {
        path: "/",
        name: "homePage",
        component: Home,
        meta: {
            permissions: [
                {
                    access: true,
                }
            ],
            roles: "No Role",
        }
    }, {
        path: "/about",
        name: "aboutPage",
        component: About,
        meta: {
            permissions: [
                {
                    access: true,
                }
            ],
            roles: "No Role",
        }
    }, {
        path: "/contact",
        name: "contactPage",
        component: Contact,
        meta: {
            permissions: [
                {
                    access: true,
                }
            ],
            roles: "No Role",
        }
    }, {
        path: "/product",
        name: "productPage",
        component: Product,
        meta: {
            permissions: [
                {
                    access: true,
                }
            ],
            roles: "No Role",
        }
    }, {
        path: "/media",
        name: "mediaPage",
        component: Media,
        meta: {
            permissions: [
                {
                    access: true,
                }
            ],
            roles: "No Role",
        }
    }, {
        path: "/post",
        name: "post",
        component: NewsAndEvents,
        meta: {
            permissions: [
                {
                    access: true,
                }
            ],
            roles: "No Role",
        }
    },{
        path: "/major",
        name: "major",
        component: Major,
        meta: {
            permissions: [
                {
                    access: true,
                }
            ],
            roles: "No Role",
        }
    },{
        path: "/majorDetail",
        name: "majorDetail",
        component: MajorDetail,
        meta: {
            permissions: [
                {
                    access: true,
                }
            ],
            roles: "No Role",
        }
    }, {
        path: "/client",
        name: "clientPage",
        component: Client,
        meta: {
            permissions: [
                {
                    access: true,
                }
            ],
            roles: "No Role",
        }
    },{
        path: "/program",
        name: "programPage",
        component: Program,
        meta: {
            permissions: [
                {
                    access: true,
                }
            ],
            roles: "No Role",
        }
    },{
        path: "/rectorWelcom",
        name: "rectorWelcomPage",
        component: RectorWelcom,
        meta: {
            permissions: [
                {
                    access: true,
                }
            ],
            roles: "No Role",
        }
    },{
        path: "/overview",
        name: "overview",
        component: Overview,
        meta: {
            permissions: [
                {
                    access: true,
                }
            ],
            roles: "No Role",
        }
    },
    {
        path: "/organization",
        name: "organizationPage",
        component: Organization,
        meta: {
            permissions: [
                {
                    access: true,
                }
            ],
            roles: "No Role",
        }
    },
    {
        path: "/productionLine",
        name: "productionLinePage",
        component: ProductionLine,
        meta: {
            permissions: [
                {
                    access: true,
                }
            ],
            roles: "No Role",
        }
    },
    {
        path: "/headerFooter",
        name: "headerFooterPage",
        component: HeaderFooter,
        meta: {
            permissions: [
                {
                    access: true,
                }
            ],
            roles: "No Role",
        }
    },

];