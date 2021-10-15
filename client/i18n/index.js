import Vue from 'vue';
import VueI18n from 'vue-i18n';
import {en} from "../../imports/libs/lang/en"
import {km} from "../../imports/libs/lang/km"

import Vuetify from 'vuetify';
Vue.use(Vuetify);

export const messages = {en, km};
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages
});

export default i18n;
