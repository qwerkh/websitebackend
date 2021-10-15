<template>
  <div v-if="$vuetify.breakpoint.xsOnly">
    <v-dialog
        v-model="dialog"
        persistent
        :fullscreen="$vuetify.breakpoint.xsOnly"
        max-width="600px"
    >

      <v-card
          :loading="loading"
          class="mx-auto my-12"
          max-width="374"
          elevation="9"
      >
        <v-card-title>
          <v-layout column align-center justify-center class="mb-2">
            <img src="/images/logo.png" style="height: 130px; width: auto;" class="mb-4 mt-2"
                 alt="logo"/>
            <div class="headline font-weight-bold center primary--text"
                 style="line-height: 46px!important;">
              {{ companyDoc.name }}
            </div>
            <v-chip class="title font-weight-bold mt-3" style="font-size: 17px;"
                    text-color="primary">
              {{ companyDoc.latinName }}

            </v-chip>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-form :model="valid" ref="formData"
                  lazy-validation>
            <v-col cols="12">
              <v-text-field :label="$t('userEmail')" required
                            prepend-icon="mdi-face"
                            v-model="user.email"
                            :rules="emailRules"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field :label="$t('password')" type="password" required
                            autocomplete
                            prepend-icon="mdi-lock-outline"
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            v-model="user.password"
                            :rules="passwordRules"
                            :type="show ? 'text' : 'password'"
                            @click:append="show = !show"
              >
              </v-text-field>
            </v-col>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              color="deep-purple accent-4"
              text
              x-large
              v-shortkey="['enter']"
              @shortkey="submitForm"
              @click="submitForm"
          >
            {{ $t("letGo") }}
          </v-btn>
          <v-spacer></v-spacer>


        </v-card-actions>
        <v-card-actions>
          <v-spacer></v-spacer>

          {{ $t("lookingTo") }}
          <v-btn
              color="deep-purple accent-4"
              text
              @click=""
              to="/register"
              x-small
          >
            {{ $t("createAnAccount") }}
          </v-btn>
          <v-spacer></v-spacer>


        </v-card-actions>
      </v-card>

      <v-snackbar
          v-model="isCorrect"
          :timeout="timeout"
          top
          color="orange"
      >
        {{ $t(messageError) }}
        <v-btn
            color="white"
            text
            @click="isCorrect = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    </v-dialog>
  </div>
  <div v-else>
    <div id="base-login">
      <v-layout class="auth-background" align-center justify-center row fill-height>
        <!--<loading :active.sync="isLoading"
                 :can-cancel="true"
                 :is-full-page="fullPage"></loading>-->
        <v-overlay :value="loading">
          <v-progress-circular indeterminate size="64" color="white"></v-progress-circular>
        </v-overlay>

        <v-container fluid
                     grid-list-xl>
          <v-card
              :loading="loading"
              class="mx-auto my-12"
              max-width="374"
              shaped
              :ma-0="$vuetify.breakpoint.xsOnly"
              elevation="9"
          >
            <v-card-title>
              <v-layout column align-center justify-center class="mb-2">
                <img src="/images/logo.png" style="height: 130px; width: auto;" class="mb-4 mt-2"
                     alt="logo"/>
                <div class="headline font-weight-bold center primary--text"
                     style="line-height: 46px!important;">
                  {{ companyDoc.name }}
                </div>
                <v-chip class="title font-weight-bold mt-3" style="font-size: 17px;"
                        text-color="primary">
                  {{ companyDoc.latinName }}
                </v-chip>
              </v-layout>
            </v-card-title>
            <v-card-text>
              <v-form :model="valid" ref="formData"
                      lazy-validation>
                <v-col cols="12">
                  <v-text-field :label="$t('userEmail')" required
                                prepend-icon="mdi-face"
                                v-model="user.email"
                                :rules="emailRules"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field :label="$t('password')" type="password" required
                                autocomplete
                                prepend-icon="mdi-lock-outline"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                v-model="user.password"
                                :rules="passwordRules"
                                :type="show ? 'text' : 'password'"
                                @click:append="show = !show"
                  >
                  </v-text-field>
                </v-col>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                  color="deep-purple accent-4"
                  text
                  x-large
                  v-shortkey="['enter']"
                  @shortkey="submitForm"
                  @click="submitForm"
              >
                {{ $t("letGo") }}
              </v-btn>
              <v-spacer></v-spacer>


            </v-card-actions>
            <v-card-actions>
              <v-spacer></v-spacer>

              {{ $t("lookingTo") }}
              <v-btn
                  color="deep-purple accent-4"
                  text
                  @click=""
                  to="/register"
                  x-small
              >
                {{ $t("createAnAccount") }}
              </v-btn>
              <v-spacer></v-spacer>


            </v-card-actions>
          </v-card>

          <v-snackbar
              v-model="isCorrect"
              :timeout="timeout"
              top
              color="orange"
          >
            {{ $t(messageError) }}
            <v-btn
                color="white"
                text
                @click="isCorrect = false"
            >
              Close
            </v-btn>
          </v-snackbar>
        </v-container>


      </v-layout>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex"
import 'vue-loading-overlay/dist/vue-loading.css';
import Loading from 'vue-loading-overlay';
import {Company} from "../../../collections/company"
import {Meteor} from 'meteor/meteor';

export default {
  mounted() {
    this.$jQuery('body').off();
  },
  name: "Login",
  components: {
    Loading
  },
  data() {
    return {
      dense: this.$store.state.isDense,

      loading: false,
      valid: null,
      show: false,
      isCorrect: false,
      timeout: 2000,
      fullPage: true,
      user: {
        email: "",
        password: ""
      },
      emailRules: [
        v => !!v || '',
      ],
      passwordRules: [
        v => !!v || '',
      ],
      dialog: true,
      companyDoc: {},
      messageError: ""
    }
  },

  methods: {
    ...mapActions(["updateUser"]),
    submitForm() {
      let vm = this;
      if (vm.$refs.formData.validate()) {
        vm.loading = true;
        Meteor.loginWithPassword(this.user.email || "", this.user.password, error => {
          if (error) {
            if (error.error === "maxUserLogin" || error.error === "userOutOfRole") {
              vm.messageError = error.error;
            } else {
              vm.messageError = "incorrect";
            }
            vm.isCorrect = true;
          } else {
            vm.loginUserWithCurrentProfile();
          }
          vm.loading = false;
        })
      }
    },
    loginUserWithCurrentProfile() {
      let vm = this;
      let userDoc = Meteor.user();
      vm.updateUser(userDoc);
      if (userDoc && userDoc.profile) {
        vm.$i18n.locale = userDoc.profile.language || "en";
      }
      console.log(userDoc);
      vm.loading = false;
      if (userDoc && userDoc.profile.approved === false) {
        vm.$router.replace('/unApproved');
      } else if (userDoc && !!userDoc.agentId) {
        if (vm.$router.history.current.path !== '/') {
          vm.$router.replace('/');

        }
      } else if (vm.$router.history.current.path !== '/SHome') {
        vm.$router.replace('/SHome');
      }
    }
  },
  created() {
    let vm = this;
    Meteor.call("base_findCompany", (err, result) => {
      if (!err) {
        vm.companyDoc = result;
        vm.$store.state.companyDoc = result;
      }
    })
    vm.$store.dispatch("logoutUser");
  }
}
</script>
<style scoped>
#base-login {
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/login-1.jpg');
  /*background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/images/login.jpg');*/
  background-position: center center;
  background-size: cover;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  /*z-index: 1;*/
  /*width: 0;*/
  /*height: 0;*/
  background-size: cover;
}
</style>

