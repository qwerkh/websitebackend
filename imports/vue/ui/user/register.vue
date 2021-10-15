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
                <v-card-title class="headline"> {{$t('register')}}</v-card-title>
                <v-card-text>
                    <v-form :model="valid" ref="formData"
                            lazy-validation>
                        <v-col cols="12">
                            <v-text-field
                                    prepend-icon="mdi-account"
                                    v-model="user.username"
                                    :rules="usernameRules"
                                    :label="$t('userName')"
                                    persistent-hint
                                    required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                    prepend-icon="mdi-face"
                                    v-model="user.profile.fullName"
                                    :rules="profileNameRules"
                                    :label="$t('profileName')"
                                    persistent-hint
                                    required
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-text-field :label="$t('email')" required
                                          prepend-icon="mdi-email"
                                          v-model="user.email"
                                          :rules="emailRules"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field :label="$t('password')" type="password" required
                                          autocomplete
                                          prepend-icon="mdi-lock-outline"
                                          v-model="user.password"
                                          :rules="passwordRules"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field :label="$t('confirmPassword')" type="password" required autocomplete
                                          v-model="user.confirmPassword"
                                          :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                                          prepend-icon="mdi-lock-outline"
                            ></v-text-field>
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
                        {{$t("save")}}
                    </v-btn>
                    <v-spacer></v-spacer>


                </v-card-actions>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    {{$t("haveAccount")}}
                    <v-btn
                            color="deep-purple accent-4"
                            text
                            @click=""
                            to="/"
                            x-small
                    >
                        {{$t("login")}}
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
                {{$t("incorrect")}}
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
                <v-container fluid
                             grid-list-xl>
                    <v-card
                            :loading="loading"
                            class="mx-auto my-12"
                            max-width="374"
                            shaped
                            elevation="9"
                    >
                        <v-card-title class="headline"> {{$t('register')}}</v-card-title>
                        <v-card-text>
                            <v-form :model="valid" ref="formData"
                                    lazy-validation>
                                <v-col cols="12">
                                    <v-text-field
                                            prepend-icon="mdi-account"
                                            v-model="user.username"
                                            :rules="usernameRules"
                                            :label="$t('userName')"
                                            persistent-hint
                                            :dense="dense"
                                            required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                            prepend-icon="mdi-face"
                                            v-model="user.profile.fullName"
                                            :rules="profileNameRules"
                                            :label="$t('profileName')"
                                            persistent-hint
                                            :dense="dense"
                                            required
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field :label="$t('email')" required
                                                  prepend-icon="mdi-email"
                                                  v-model="user.email"
                                                  :dense="dense"
                                                  :rules="emailRules"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field :label="$t('password')" type="password" required
                                                  autocomplete
                                                  prepend-icon="mdi-lock-outline"
                                                  v-model="user.password"
                                                  :dense="dense"
                                                  :rules="passwordRules"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field :label="$t('confirmPassword')" type="password" required autocomplete
                                                  v-model="user.confirmPassword"
                                                  :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                                                  :dense="dense"
                                                  prepend-icon="mdi-lock-outline"
                                    ></v-text-field>
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
                                    :dense="dense"
                            >
                                {{$t("save")}}
                            </v-btn>
                            <v-spacer></v-spacer>


                        </v-card-actions>
                        <v-card-actions>
                            <v-spacer></v-spacer>

                            {{$t("haveAccount")}}
                            <v-btn
                                    color="deep-purple accent-4"
                                    text
                                    @click=""
                                    to="/login"
                                    x-small
                                    :dense="dense"
                            >
                                {{$t("login")}}
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
                        {{$t("incorrect")}}
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

    export default {
        mounted() {
            this.$jQuery('body').off();
        },
        name: "Register",
        data() {
            return {
                dense: this.$store.state.isDense,

                loading: false,
                valid: null,
                isCorrect: false,
                dialog: true,
                timeout: 2000,
                user: {
                    username: "",
                    profile: {
                        fullName: "",
                        approved: false
                    },
                    email: "",
                    password: "",
                    confirmPassword: ""
                },
                usernameRules: [
                    v => !!v || 'User Name is required',
                    v => (v && v.length <= 10) || 'User Name must be less than 10 characters',
                ],
                profileNameRules: [
                    v => !!v || 'Profile Name is required',
                    v => (v && v.length <= 20) || 'Name must be less than 20 characters',
                ],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 6) || 'Password must be more than 6 characters',
                ],
                confirmPasswordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 6) || 'Password must be more than 6 characters',
                ],
            }
        },

        methods: {
            ...mapActions(["updateUser"]),
            submitForm() {
                let vm = this;
                vm.loading = true;
                if (vm.$refs.formData.validate()) {

                    Meteor.call("base_insertUser", vm.user, (err, result) => {
                        if (!err) {
                            Meteor.loginWithPassword(vm.user.email, vm.user.password, error => {
                                if (error) {
                                    vm.isCorrect = true;
                                } else {
                                    vm.loginUserWithCurrentProfile();
                                    vm.loading = false;
                                }

                            })

                        } else {

                        }
                    })


                }
            },
            loginUserWithCurrentProfile() {
                let vm = this;
                vm.updateUser(Meteor.user());
                if (vm.$router.history.current.path !== '/') {
                    vm.$router.replace('/');
                }
            }
        },
        computed: {
            passwordConfirmationRule() {
                return () =>
                    this.user.password === this.user.confirmPassword || "Password must match";
            }
        },
    }
</script>

<style scoped>
    #base-login {
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/login2.jpg');
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