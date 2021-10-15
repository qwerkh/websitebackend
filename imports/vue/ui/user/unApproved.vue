<template>
    <div id="base-login">
        <v-layout align-center justify-center column fill-height>
            <v-card class="pa-3">
                <v-layout align-center justify-center column fill-height>


                    <div class="banner">
                        <img src="/images/locker.png"/>
                    </div>
                    <div class="hero black--text">
                        {{$t('error401')}} !
                    </div>
                    <div style="font-size: 18px; color: #ff6b68">
                        <div>{{$t('unApprovedDetail')}}</div>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn @click="logout">{{$t('logout')}}</v-btn>
                    <v-spacer></v-spacer>

                </v-layout>
            </v-card>
        </v-layout>

    </div>

</template>

<script>
    export default {
        name: "UnApproved",
        mounted() {
            this.$jQuery('body').off();
        },
        methods: {
            logout() {
                this.$store.dispatch("logoutUser");
            }
        }
    }
</script>

<style scoped>

</style>