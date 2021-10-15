<template>
  <v-app id="inspire" :dark="isDark">
    <div v-if="currentUser && currentUser.profile">
      <div v-if="currentUser.profile.approved">
        <div v-if="!currentUser.agentId">
          <drawer :drawer-prop="drawer" :mini-variant-prop="miniVariant"
                  @getDrawerState="getDrawerState"></drawer>
          <toolbar @toggleDrawer="toggleDrawer"></toolbar>
          <page-view></page-view>
          <v-footer
              app
              :color="footerColor"
              class="white--text"
          >
            <span>&nbsp; narongsao98@gmail.com</span>
            <v-spacer/>
            <span>&copy; 2019</span>
          </v-footer>
        </div>
        <div v-else>
          <v-fade-transition mode="out-in">
            <router-view/>
          </v-fade-transition>

        </div>
      </div>
      <div v-else>
        <v-fade-transition mode="out-in">
          <router-view/>
        </v-fade-transition>
      </div>

    </div>
    <div v-else>
      <v-fade-transition mode="out-in">
        <router-view/>
      </v-fade-transition>
    </div>
  </v-app>
</template>

<script>
import Drawer from "./layout/Drawer"
import Toolbar from "./layout/Toolbar"
import PageView from "./layout/PageView"
import Login from "./ui/user/login"
import UnApproved from "./ui/user/unApproved"
import {mapActions} from "vuex"

export default {
  meteor: {
    reactData() {
      let vm = this;
      if (!Meteor.userId()) {
        vm.updateUser(Meteor.user());
      }

    }
  },
  components: {
    Drawer,
    Toolbar,
    PageView,
    Login,
    UnApproved
  },
  data: () => ({
    drawer: true,
    miniVariant: false,
    footerColor: "blue-grey",
    loading: false,
  }),
  methods: {
    toggleDrawer() {
      //this.drawer = !this.drawer;
      this.drawer = true;
      if (this.$vuetify.breakpoint.xsOnly) {
        this.miniVariant = false;
      } else {
        this.miniVariant = !this.miniVariant;
      }
    },
    getDrawerState(val) {
      this.drawer = val;
    },
    ...mapActions(["updateUser"]),

  },
  watch: {
    isDark(val) {
      this.footerColor = val === true ? "black" : "blue-grey";
    },

  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    isDark() {
      /*if (!!this.currentUser) {
          return this.$vuetify.theme.dark = !!this.currentUser.profile.isDark || false;
      }*/
      return this.$vuetify.theme.dark = this.$store.state.isDark;
    }

  },
  created() {
    let vm = this;
    Meteor.call("base_finUserById", (err, result) => {
      if (result) {
        vm.updateUser(result);
        if (result && result.profile) {
          vm.$i18n.locale = result.profile.language || "en";
        }
      }
    })
  }
}
</script>

<style scoped>
.meteor-status {
  width: 100%;
  position: fixed;
  z-index: 205;
  /*bottom: 0;*/
}
</style>