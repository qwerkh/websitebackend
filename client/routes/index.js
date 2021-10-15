import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
import GlobalFn from "../../imports/libs/globalFn";

import Home from "../../imports/vue/ui/home";
import Login from "../../imports/vue/ui/user/login";
import UnApproved from "../../imports/vue/ui/user/unApproved";
import Register from "../../imports/vue/ui/user/register";
import EditProfile from "../../imports/vue/ui/user/editProfile";
import ChangePassword from "../../imports/vue/ui/user/changePassword";
import {setting} from "./setting";
import {data} from "./data";
import {report} from "./report";
import {Constants} from "../../imports/libs/constant"

const routes = [
    // {path: '', redirect: '/login'},
    {
        path: "/SHome",
        name: "home",
        component: Home,
        meta: {
            permissions: [
                {
                    access: (user, to) => user.id === to.params.id,
                    redirect: ""
                }

            ],
            roles: "No Role",
        },
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        default: true,
        meta: {
            permissions: [
                {access: true}
            ],
            notRequiresAuth: true,
            pageTitle: " ",
            breadcrumb: {
                title: " ",
                ignore: true
            },
        }
    },
    {
        path: "/register",
        name: "register",
        component: Register,
        meta: {
            permissions: [
                {access: true}
            ],
            notRequiresAuth: true,
            pageTitle: " ",
            breadcrumb: {
                title: " ",
                ignore: true
            }
        }
    },
    {
        path: "/unApproved",
        name: "unApproved",
        component: UnApproved,
        meta: {
            permissions: [
                {access: true}
            ],
            notRequiresAuth: true,
            pageTitle: " ",
            breadcrumb: {
                title: " ",
                ignore: true
            },
            roles: "No Role",
        }
    },
    {
        path: "/editProfile",
        name: "editProfile",
        component: EditProfile,
        meta: {
            permissions: [
                {
                    //role: "guest",
                    access: true,
                    //redirect: "login"
                }
            ],
            roles: "No Role",
        }
    }, {
        path: "/changePassword",
        name: "changePassword",
        component: ChangePassword,
        meta: {
            permissions: [
                {
                    //role: "guest",
                    access: true,
                    //redirect: "login"
                }
            ],
            roles: "No Role",
        }
    },
    /*{
        path: "/profile/:id",
        name: "profile",
        component: Home,
        meta: {
            permissions: [
                {
                    role: "registered",
                    access: (user, to) => user.id === to.params.id,
                    redirect: "login"
                },
                {
                    role: "guest",
                    access: false,
                    redirect: "login"
                }
            ],
            roles: "No Role",
        }
    },*/
    ...setting,
    ...data,
    ...report
];

export const router = new VueRouter({mode: "history", routes});

router.beforeEach((to, from, next) => {
    switch (to.meta.roles) {
        case "Setting":
            !!GlobalFn.CheckRoles({roles: Constants.setting}) ? next() : !!Meteor.userId() ? "" : next("/login");
            break;
        case "Data":
            !!GlobalFn.CheckRoles({roles: Constants.data}) ? next() : !!Meteor.userId() ? "" : next("/login");
            break;

        case "Report":
            !!GlobalFn.CheckRoles({roles: Constants.report}) ? next() : !!Meteor.userId() ? "" : next("/login");
            break;

        case "Control User":
            !!GlobalFn.CheckRoles({roles: Constants.controlUser}) ? next() : !!Meteor.userId() ? "" : next("/login");
            break;

        case "Super":
            !!GlobalFn.CheckRoles({roles: Constants.super}) ? next() : !!Meteor.userId() ? "" : next("/login");
            break;

        case "No Role":
            !!Meteor.userId() ? next() : next("/login");
            break;

        default:
            next();
            break;

    }
})