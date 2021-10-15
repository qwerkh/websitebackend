import Vue from 'vue'
import Vuetify from 'vuetify';
Vue.use(Vuetify);
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'
const opts = {
    icons: {
        iconfont: 'mdi',
    },
};

export const vuetify = new Vuetify(opts);