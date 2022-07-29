import {Meteor} from 'meteor/meteor';
import Vue from 'vue';
import VueMeteorTracker from 'vue-meteor-tracker';// here!
import {vuetify} from '/client/plugins/vuetify' // path to vuetify export
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import {router} from "./routes/index";
import i18n from "./i18n/index"
import {store} from "../imports/vuex/index"
import "./plugins/vueShortKey";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./subscriptions/subscription"
import "./stylesheet/main.css";

Vue.prototype.$jQuery = $;

Vue.use(ElementUI);

Vue.use(VueMeteorTracker);
Vue.filter("momentFormat", function (d) {
    if (d) {
        return moment(d).format("YYYY-MM-DD hh:mm");
    }
    return "";
})

import App from '../imports/vue/App.vue';

Meteor.startup(() => {
    new Vue({
        vuetify,
        router,
        i18n,
        store,
        ...App,

    }).$mount('#app');
});