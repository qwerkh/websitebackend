import {router} from "../../client/routes/index";
import {Meteor} from "meteor/meteor"

export default {
    updateUser({commit, state}, val) {
        commit("setUser", val);
    },
    logoutUser({commit, state}, payload) {
        Meteor.logout(() => {
            commit("setUser", null);
            if (router.history.current.path !== '/login') {
                router.replace('/login');
            }

        });

    },
    updateModule({commit, state}, payload) {
        commit("setModule", payload);
    }
}
