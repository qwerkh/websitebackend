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
import HeaderFooter from "../../imports/vue/ui/headerFooter";
import Book from "../../imports/vue/ui/book.vue";
import Welcome from "../../imports/vue/ui/welcome.vue";


export const data = [
    {
        path: "/",
        name: "welcome",
        component: Welcome,
        meta: {
            permissions: [
                {
                    access: true,
                }
            ],
            roles: "No Role",
        }
    },  {
        path: "/myhomepage",
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
    },
    {
        path: "/book",
        name: "book",
        component: Book,
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