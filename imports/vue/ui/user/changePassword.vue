<template>
    <v-row justify="center">
        <v-flex
                md4
        >
            <v-form
                    :model="valid" ref="formData"
                    lazy-validation
            >
                <v-card-title>
                    <v-layout column align-center justify-center class="mb-2">
                        <img src="/images/avatar.png" style="height: 130px; width: auto;" class="mb-4 mt-2"
                             alt="logo"/>
                        <div class="headline font-weight-bold center primary&#45;&#45;text"
                             style="line-height: 46px!important;">
                            {{user && user.username || ""}}
                        </div>
                    </v-layout>
                </v-card-title>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                                v-model="user.username"
                                :label="$t('userName')"
                                persistent-hint
                                required
                                disabled
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field :label="$t('oldPassword')" type="password" required
                                      v-model="user.oldPassword"
                                      :rules="passwordRules"
                                      autocomplete
                        ></v-text-field>
                    </v-col>


                    <v-col cols="12">
                        <v-text-field :label="$t('newPassword')" type="password" required
                                      v-model="user.password"
                                      :rules="passwordRules"
                                      autocomplete
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field :label="$t('confirmNewPassword')" type="password" required
                                      autocomplete
                                      v-model="user.confirmPassword"
                                      :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-card-actions>

                    <v-spacer></v-spacer>
                    <reset-button @resetForm="resetForm" valid="false"></reset-button>
                    <save-button @saveForm="handleSubmit" v-shortkey="['enter']"
                                 @shortkey.native="handleSubmit" :valid="valid"></save-button>

                </v-card-actions>
            </v-form>
        </v-flex>
    </v-row>

</template>

<script>
    import AddButton from "../../components/addButton"
    import RaiseButton from "../../components/raiseAddButton"
    import SaveButton from "../../components/saveButton"
    import CloseButton from "../../components/closeButton"
    import ResetButton from "../../components/resetButton"
    import {mapActions} from "vuex"

    export default {
        mounted() {
            this.$jQuery('body').off();
        },
        components: {AddButton, RaiseButton, SaveButton, ResetButton, CloseButton},
        data() {
            return {
                valid: true,
                dense: this.$store.state.isDense,
                user: {
                    _id: "",
                    username: "",
                    oldPassword: "",
                    password: "",
                    confirmPassword: ""
                },
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
            resetForm() {
                this.$refs.formData.reset()
            },
            handleSubmit() {
                let vm = this;

                if (vm.$refs.formData.validate()) {
                    vm.loading = true;

                    Accounts.changePassword(vm.user.oldPassword, vm.user.password, (err, result) => {
                        if (!err) {
                            this.$message({
                                message: this.$t('successNotification'),
                                showClose: true,
                                type: 'success'
                            });
                            vm.loading = false;
                            vm.$store.dispatch("logoutUser");
                        } else {
                            console.log(err.message);
                            this.$message({
                                message: err.message,
                                showClose: true,
                                type: 'error'
                            });

                        }
                    })
                    /*Meteor.call("base_updateProfile", vm.user._id, vm.user, (err, result) => {
                        if (!err) {
                            this.$message({
                                message: this.$t('successNotification'),
                                showClose: true,
                                type: 'success'
                            });
                            vm.updateUser(Meteor.user());
                            vm.loading = false;
                        } else {
                            console.log(err.message);
                            this.$message({
                                message: err.message,
                                showClose: true,
                                type: 'error'
                            });

                        }
                    })*/
                }
            },

        },
        computed: {
            passwordConfirmationRule() {
                return () =>
                    this.user.password === this.user.confirmPassword || "Password must match";
            }
        },
        created() {
            let userDoc = Meteor.user();
            this.user._id = userDoc._id;
            this.user.username = userDoc.username;
        }
    }
</script>