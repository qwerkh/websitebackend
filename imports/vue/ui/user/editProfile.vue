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
                            {{user.username || ""}}
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
                        <v-text-field
                                v-model="user.profile.fullName"
                                :rules="profileNameRules"
                                :label="$t('profileName')"
                                persistent-hint
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field :label="$t('email')" required
                                      v-model="user.email"
                                      :rules="emailRules"
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
        >

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
                    profile: {
                        fullName: "",
                    },
                    email: ''
                },
                profileNameRules: [
                    v => !!v || 'Profile Name is required',
                    v => (v && v.length <= 20) || 'Name must be less than 20 characters',
                ],
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ]
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
                    Meteor.call("base_updateProfile", vm.user._id, vm.user, (err, result) => {
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
                    })
                }
            },

        },
        created() {
            let userDoc = Meteor.user();
            this.user._id = userDoc._id;
            this.user.username = userDoc.username;
            this.user.profile.fullName = userDoc.profile.fullName;
            this.user.email = userDoc.emails && userDoc.emails[0] && userDoc.emails[0].address;
        }
    }
</script>