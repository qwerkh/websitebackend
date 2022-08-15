<template>
  <v-navigation-drawer
      v-model="drawer"
      app
      :id="idNavigatorDrawer"
      dark
      persistent
      mobile-breakpoint="991"
      :mini-variant="miniVariant"
      :expand-on-hover="expandOnHover"
      width="260"

  >
    <v-navigation-drawer
        v-model="left"
        absolute
        temporary
        dark
        persistent
        :id="idNavigatorDrawer"
        fixed
        width="260"
    >
      <v-list
          nav
          dense
      >
        <v-list-item-group
        >
          <v-list-item v-for="(item, index) in branchList"
                       :key="item.value"
                       @click="changeBranch(item.value)" tag="a" :class="sideBarMode"
                       style="text-align: center !important;">
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


    <v-list dense>
      <v-list-item>
        <v-list-item-icon v-text="companyDoc.shortName">
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="font-size: 18px !important;line-height: 1.7rem !important;">
            {{ companyDoc.name }}
          </v-list-item-title>
        </v-list-item-content>


      </v-list-item>
    </v-list>
    <v-divider class="ma-1"></v-divider>

    <v-list dense nav shaped>
      <v-list-group
          v-for="base in bases"
          :key="base.title"
          v-model="base.active"
          no-action
          class="navigateDrawer"
      >
        <template slot="activator">
          <v-list-item-avatar>
            <v-img :src="avatarUrl"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ currentUser && currentUser.profile.fullName || "" }}</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
            v-for="subBase in base.bases"
            :key="subBase.title"
            @click=""
            :to="subBase.to"
            :class="sideBarMode"
            v-if="subBase.hasRole()"
        >
          <v-list-item-icon v-text="subBase.action">
          </v-list-item-icon>
          <v-list-item-content link>
            <v-list-item-title v-text="$t(subBase.title)"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-show="!!$vuetify.breakpoint.xsOnly"
                     key="logout"
                     @click="logout"
        >
          <v-list-item-icon>LO
          </v-list-item-icon>
          <v-list-item-content link>
            <v-list-item-title v-text="$t('logout')"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-item @click.stop="left = !left">
        <v-list-item-action>
          <v-icon>mdi-exit-to-app</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ branchName }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="ma-1"></v-divider>

    <v-list dense nav shaped>
      <v-list-item
          v-for="subItem in items"
          :key="subItem.title"
          @click=""
          tag="a"
          :to="subItem.to"
          :class="sideBarMode"
          v-if="subItem.hasRole()"
      >
        <v-list-item-icon v-text="subItem.action"></v-list-item-icon>

        <v-list-item-content link>
          <v-list-item-title v-text="$t(subItem.title)"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>


    <v-list dense nav shaped>
      <v-list-group
          v-for="item in setting"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
          class="navigateDrawer"
          v-if="item.hasRole()"
      >
        <template slot="activator">
          <v-list-item-content>
            <v-list-item-title v-text="$t(item.title)"></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
            v-for="subItem in item.items"
            :key="subItem.title"
            @click=""
            tag="a"
            :to="subItem.to"
            :class="sideBarMode"
            v-if="subItem.hasRole()"
        >
          <v-list-item-icon v-text="subItem.action"></v-list-item-icon>

          <v-list-item-content link>
            <v-list-item-title v-text="$t(subItem.title)"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    <template slot="append">
      <div class="pa-2">
        <v-hover
            v-slot:default="{ hover }"
            open-delay="200"
        >
          <v-btn block @click="logout" rounded
                 :elevation="hover ? 16 :0">
            <i class="material-icons">
              power_settings_new
            </i>
          </v-btn>
        </v-hover>
      </div>
    </template>


  </v-navigation-drawer>

</template>

<script>
import GlobalFn from "../../libs/globalFn";
import {Constants} from "../../libs/constant"
import {Company} from "../../collections/company"

export default {
  name: "Drawer",
  props: ["drawerProp", "miniVariantProp"],
  data() {
    return {
      right: false,
      left: false,
      drawer: true,
      avatarUrl: "/images/avatar.png",
      branchList: [],
      branchId: "",
      branchName: "",
      offset: false,
      miniVariant: false,
      expandOnHover: false,
      items: [

        {
          title: 'homePage',
          action: "HO",
          to: "/",
          hasRole: () => this.checkRole(Constants.data)
        },
        {
          title: 'plantType',
          action: "PT",
          to: "/plantType",
          hasRole: () => this.checkRole(Constants.data)
        },
        {
          title: 'plantLifeStyle',
          action: "LS",
          to: "/plantLifeStyle",
          hasRole: () => this.checkRole(Constants.data)
        },
        {
          title: 'plantGift',
          action: "PG",
          to: "/plantGift",
          hasRole: () => this.checkRole(Constants.data)
        },
        {
          title: 'plantRoom',
          action: "PR",
          to: "/plantRoom",
          hasRole: () => this.checkRole(Constants.data)
        },
        {
          title: 'productPage',
          action: "PR",
          to: "/product",
          hasRole: () => this.checkRole(Constants.data)
        },
        {
          title: 'aboutPage',
          action: "AB",
          to: "/about",
          hasRole: () => this.checkRole(Constants.data)
        },

        {
          title: 'contactPage',
          action: "CO",
          to: "/contact",
          hasRole: () => this.checkRole(Constants.data)
        },
        {
          title: 'headerFooterPage',
          action: "HF",
          to: "/headerFooter",
          hasRole: () => this.checkRole(Constants.data)
        },

      ],

      setting: [
        {
          action: 'perm_data_setting',
          title: 'setting',
          hasRole: () => this.checkRole(Constants.setting),
          items: [
             {
              title: 'branch',
              action: "BR",
              to: "/branch",
              hasRole: () => this.checkRole(Constants.super)
            },
            {
              title: 'company',
              action: "CO",
              to: "/company",
              hasRole: () => this.checkRole(Constants.super)
            },
          ],
        },
      ],
      bases: [

        {
          title: "",
          bases: [
            {title: 'changePassword', action: "CP", to: "/changePassword", hasRole: () => true},
            {title: 'editProfile', action: "EP", to: "/editProfile", hasRole: () => true},
            {
              title: 'user',
              action: "US",
              to: "/user",
              hasRole: () => this.checkRole(Constants.controlUser)
            },
          ],
        },

      ],
      settingRole: () => this.checkRole(Constants.setting)
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
    },
    checkRole(roles) {
      return GlobalFn.CheckRoles({roles});
    },
    changeBranch(val) {
      let vm = this;
      vm.branchId = val;
      vm.branchName = vm.branchList.find(o => o.value === val).label || "";
      vm.left = false;
    }
  },
  watch: {
    drawerProp(val) {
      this.drawer = val;
    },
    drawer(val) {
      this.$emit('getDrawerState', val);
    },
    branchId(val) {
      let vm = this;
      vm.$store.state.branchId = val;

      Meteor.call("base_fetchBranchById", val, Constants.secret, (err, result) => {
        if (result) {
          vm.$store.state.branchDoc = result;
        }
      })

      if (vm.$router.history.current.path !== '/') {
        vm.$router.replace('/');
      }
    },
    miniVariantProp(val) {
      this.miniVariant = val;
      this.expandOnHover = val;
    },

  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    companyDoc() {
      return this.$store.state.companyDoc;
    },
    sideBarMode() {
      return this.$store.state.mode && this.$store.state.mode.replace("#", "C") || "C28a745";
    },

    idNavigatorDrawer() {
      if (this.$store.state.isSideBarImage === false) {
        return "base-navigation-drawerNo";
      }
      return "base-navigation-drawer" + (this.$store.state.drawerBackground || 0);
    }
  },
  created() {
    let vm = this;
    vm.$store.state.companyDoc = Company.findOne({}) || {};
    let userDoc = Meteor.user();
    if (userDoc) {
      vm.branchId = userDoc.defaultBranch || "";
      let branchListForUser = userDoc && userDoc.branch || [];
      Meteor.call("base_fetchBranchOptionListByListId", branchListForUser, Constants.secret, (err, result) => {
        if (!err) {
          vm.branchList = result || [];
          vm.branchName = result.length > 0 && result.find(o => o.value === vm.branchId).label || "";
        }
      })

    }

  }

}
</script>

<style scoped>
.drawer.v-navigation-drawer .v-list {
  background: transparent;
}

.v-navigation-drawer .v-divider {
  background-color: hsla(0, 0%, 71%, .2);
  border-color: hsla(0, 0%, 71%, .1);
  width: calc(100% - 30px);
  margin-left: 15px !important;
}

.v-application--is-ltr .v-list--dense.v-list--nav .v-list-group--no-action > .v-list-group__items > div > .v-list-item {
  padding-left: 34px;
  /*padding-left: 64px;*/
}

.v-application--is-ltr #base-navigation-drawer div.v-list-item__icon--text, .v-application--is-ltr #base-navigation-drawer div.v-list-item__icon:first-child {
  margin-left: -9px !important;
  margin-right: 14px !important;
  opacity: .8 !important;
  font-size: .8125rem !important;
  font-weight: 500 !important;
  line-height: 1.5rem !important;
}

#base-navigation-drawer0 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/images/sidebar-1.jpg") !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawer1 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/images/sidebar-2.jpg") !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawer2 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/images/sidebar-3.jpg") !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawer3 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/images/sidebar-4.jpg") !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawerNo {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)) !important;
  background-position: center center !important;
  background-size: cover !important;

}

.v-application .primary--text {
  color: white !important;
}

a.v-list-item--active.C28a745 {
  color: #28a745 !important;
}

a.v-list-item--active.C9c27b0 {
  color: #9c27b0 !important;
}

a.v-list-item--active.C00cae3 {
  color: #00cae3 !important;
}

a.v-list-item--active.Cff5252 {
  color: #ff5252 !important;
}

a.v-list-item--active.Cff9800 {
  color: #ff9800 !important;
}

a.v-list-item--active.Ce91e63 {
  color: #e91e63 !important;
}


</style>
