export default {
    data() {
        return {
        }
    },
    methods: {
        getTranslate(data) {
            if (data) {
                if (this.$i18n.locale === 'en') {
                    return data.en;
                } else if (this.$i18n.locale === 'km') {
                    return data.km || data.en;
                } else {
                    return data.cn || data.en;
                }
            } else {
                return "";
            }
        },
    }
}