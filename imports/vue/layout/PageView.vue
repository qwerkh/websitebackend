<template>
    <v-main>
        <v-container
                fluid
                grid-list-xl
        >
            <v-flex xs12 md12 v-show="!userStatus" v-if="currentUser">
                <v-banner elevation="9" color="red">
                    <v-icon
                            slot="icon"
                            color="warning"
                            size="36"
                    >
                        mdi-wifi-strength-alert-outline
                    </v-icon>
                    <span style="color: white;">{{$t('cannotConnect')}}</span>

                    <template v-slot:actions>
                        <v-btn
                                color="white"
                                text
                                @click="reconnect"
                        >
                            {{$t('reconnect')}}
                        </v-btn>
                    </template>
                </v-banner>
            </v-flex>

            <v-fade-transition mode="out-in">
                <router-view/>
            </v-fade-transition>
            <v-btn  v-if="!currentUser.agentId"
                    v-scroll="onScroll"
                    v-show="fab"
                    fab
                    dark
                    fixed
                    bottom
                    right
                    color="success"
                    @click="toTop"
            >
                <v-icon>keyboard_arrow_up</v-icon>
            </v-btn>
        </v-container>
    </v-main>
</template>

<script>
    export default {
        props: {
            source: String,
        },
        name: "PageView",
        meteor: {
            userStatus() {
                return Meteor.status().connected;
            },
        },
        data() {
            return {
                fab: false
            }
        },
        methods: {
            reconnect() {
                Meteor.reconnect();
            },
            onScroll(e) {
                if (typeof window === 'undefined') return
                const top = window.pageYOffset || e.target.scrollTop || 0
                this.fab = top > 20
            },
            toTop() {
                this.$vuetify.goTo(0)
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.currentUser;
            },
        },
    }
</script>