import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from "../../imports/vue/ui/home";
import About from "../../imports/vue/ui/about";
import Contact from "../../imports/vue/ui/contact";
import Product from "../../imports/vue/ui/product";
import HeaderFooter from "../../imports/vue/ui/headerFooter";
import PlantType from "../../imports/vue/ui/plantType";


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
    },{
        path: "/plantType",
        name: "plantType",
        component: PlantType,
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