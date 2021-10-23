<template>
    <v-app-bar
            app
            clipped-right
            :color="toolbarColor"
            dark
    >
        <v-app-bar-nav-icon @click.stop="toggleDrawer"/>
        <v-toolbar-title class="fontTitle">
            {{$t(title)}}
        </v-toolbar-title>
        <v-spacer/>
        <v-btn icon>
            <v-icon>mdi-bell</v-icon>
        </v-btn>

        <v-menu
                transition="slide-x-transition"
                bottom
                right
        >
            <template v-slot:activator="{ on }">
                <v-btn icon text fab x-small v-on="on">
                    <v-img :src="flagImg" style="width: 34px; height: 24px"></v-img>
                </v-btn>
            </template>

            <v-list>
                <v-list-item
                        v-for="(item, i) in nationList"
                        :key="i"
                        @click="changeLang(item.value,item.url)"
                >
                    <v-list-item-avatar tile>
                        <v-img :src="item.url" style="height: 24px"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <v-menu
                transition="slide-x-transition"
                bottom
                right
                :close-on-content-click="closeOnContentClick"
        >
            <template v-slot:activator="{ on }">
                <v-btn icon text
                       dark
                       v-on="on"
                >
                    <v-icon>more_vert</v-icon>
                </v-btn>
            </template>

            <v-card
                    class="mx-auto text-center"
                    width="300px"
                    max-width="400"
            >
                <v-card-text>
                    <strong class="mb-3 d-inline-block">{{$t('sidebarFilters')}}</strong>
                    <v-item-group v-model="sideColorFilter">
                        <v-row>
                            <v-col
                                    v-for="(co,index) in colorSidebarList"
                                    :key="index"
                                    cols="2"
                                    md="2"
                                    sm="2"
                                    xs="2"
                            >
                                <v-item v-slot:default="{ active ,toggle}" class="sideFilter" style="cursor: pointer">
                                    <v-avatar :color="co" size="24"
                                              @click="toggle">
                                    </v-avatar>
                                </v-item>
                            </v-col>
                        </v-row>
                    </v-item-group>
                    <v-divider class="ma-1"></v-divider>
                    <v-row style="margin-left: 0px !important;margin-right: 0px !important;align-items: center !important;">
                        <span>{{$t('darkMode')}}</span>
                        <v-spacer></v-spacer>

                        <v-switch flat color="success" v-model="isDark"
                        ></v-switch>
                    </v-row>

                    <v-divider class="ma-1"></v-divider>
                    <v-row style="margin-left: 0px !important;margin-right: 0px !important;align-items: center !important;">
                        <span>{{$t('sidebarImage')}}</span>
                        <v-spacer></v-spacer>

                        <v-switch flat color="success" v-model="isSideBarImage"
                        ></v-switch>
                    </v-row>
                    <v-divider class="ma-1"></v-divider>

                    <v-row style="margin-left: 0px !important;margin-right: 0px !important;align-items: center !important;">
                        <span>{{$t('dense')}}</span>
                        <v-spacer></v-spacer>

                        <v-switch flat color="success" v-model="dense"
                        ></v-switch>
                    </v-row>
                    <v-divider class="ma-1"></v-divider>

                    <v-row style="margin-left: 0px !important;margin-right: 0px !important;align-items: center !important;">
                        <span>{{$t('language')}}</span>
                        <v-spacer></v-spacer>

                        <v-menu
                                transition="slide-x-transition"
                                bottom
                                right
                        >
                            <template v-slot:activator="{ on }">
                                <v-btn icon text fab x-small v-on="on">
                                    <v-img :src="flagImg" style="width: 34px; height: 24px"></v-img>
                                </v-btn>
                            </template>

                            <v-list>
                                <v-list-item
                                        v-for="(item, i) in nationList"
                                        :key="i"
                                        @click="changeLang(item.value,item.url)"
                                >
                                    <v-list-item-avatar tile>
                                        <v-img :src="item.url" style="height: 24px"></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-row>
                    <v-divider class="ma-1"></v-divider>
                    <strong class="mb-3 d-inline-block">{{$t('images')}}</strong>

                    <v-item-group v-model="imgBackground">
                        <v-container>
                            <v-row>
                                <v-col
                                        v-for="n in imagesList"
                                        :key="n"
                                        cols="3"
                                        md="3"
                                        sm="3"
                                        xs="3"
                                >
                                    <!--v-slot:default="{ active, toggle }"-->
                                    <v-item v-slot:default="{active,toggle}" class="sideBack" style="cursor: pointer">
                                        <v-scroll-y-transition>
                                            <v-img :src="n" @click="toggle"
                                                   style="height: 100px !important;width: 50px !important;border-radius: 7px!important;max-width: 150% !important;"></v-img>
                                        </v-scroll-y-transition>
                                    </v-item>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-item-group>

                </v-card-text>


                <v-card-actions>
                    <v-btn
                            color="orange"
                            text @click="updateProfile"
                    >
                        {{$t('save')}}
                    </v-btn>

                </v-card-actions>
            </v-card>
        </v-menu>
    </v-app-bar>
</template>

<script>
    import {Constants} from "../../libs/constant"

    export default {
        // props: [],
        name: "Toolbar",
        data: () => ({
            title: "homePage",
            closeOnContentClick: false,
            imgBackground: "",
            sideColorFilter: "",
            isDark: false,
            isSideBarImage: true,
            dense: true,
            toolbarColor: "blue-grey",
            nationList: [
                {name: "ភាសារខ្មែរ", value: "km", url: "/images/km.png"},
                {name: "English", value: "en", url: "/images/us.png"}

            ],
            flagImg: "/images/us.png",
            colorSidebarList: [
                "#28a745",
                "#9c27b0",
                "#00cae3",
                "#ff9800",
                "#e91e63",
                "#ff5252",
            ],
            imagesList: [
                "/images/sidebar-1.jpg",
                "/images/sidebar-2.jpg",
                "/images/sidebar-3.jpg",
                "/images/sidebar-4.jpg",
            ],
            branchList: []
        }),
        methods: {
            toggleDrawer(val) {
                this.$emit('toggleDrawer');
            },
            changeLang(val, url) {
                this.$i18n.locale = val;
                this.flagImg = url;
            },
            fetchBranchOptionList(q) {
                let vm = this;
                return new Promise((resolve, reject) => {
                    // , vm.user.branch || []
                    Meteor.call("base_fetchBranchOptionList", q, Constants.secret, (err, result) => {
                        if (!err) {
                            vm.branchOptionList = result;
                            resolve(result);
                        } else {
                            reject(err.message);
                        }
                    })
                })
            },
            updateProfile() {
                let vm = this;
                return new Promise((resolve, reject) => {
                    let profile = {};
                    profile.isDark = vm.isDark;
                    profile.sideColorFilter = vm.sideColorFilter;
                    profile.imgBackground = vm.imgBackground;
                    profile.isSideBarImage = vm.isSideBarImage;
                    profile.dense = vm.dense;
                    profile.language = vm.$i18n.locale;
                    Meteor.call("base_updateLayout", Meteor.userId(), profile, (err, result) => {
                        if (!err) {
                            resolve(result);
                            this.$message({
                                message: this.$t('successNotification'),
                                showClose: true,
                                type: 'success'
                            });
                        } else {
                            reject(err.message);
                        }
                    })
                })
            }
        },
        watch: {
            "$route"(val) {
                this.title = val.name;
                /*if (val) {
                    this.breadcrumbList = [
                        {
                            text: this.$t('home'),
                            disabled: false,
                            href: '/home',
                        },
                        {
                            text: this.$t(val.name),
                            disabled: false,
                            href: val.path,
                        }
                    ];
                }*/
            },
            imgBackground(val) {
                this.$store.state.drawerBackground = val || 0;
            },
            sideColorFilter(val) {
                this.$store.state.mode = this.colorSidebarList[val || 0];
            },
            isDark(val) {
                this.$store.state.isDark = val;
                this.toolbarColor = val === true ? "black" : "blue-grey";
            },
            dense(val) {
                this.$store.state.isDense = val;
            },
            isSideBarImage(val) {
                this.$store.state.isSideBarImage = val;
            }
        },
        created() {
            this.imgBackground = this.$store.state.drawerBackground;
            this.sideColorFilter = this.$store.state.sideColorFilter;
            this.isDark = this.$store.state.isDark;
            this.dense = this.$store.state.isDense;
            this.isSideBarImage = this.$store.state.isSideBarImage;
            this.flagImg = this.$store.state.language === "en" ? "/images/us.png" : "/images/km.png";
            this.fetchBranchOptionList();

        }
    }
</script>

<style scoped>
    .sideBack.v-item--active {
        border-color: rgb(0, 202, 227) !important;
        border-width: 3px !important;
        border-style: solid;
        box-shadow: 0px 0px 25px 0px #00cae3;
    }

    .sideFilter.v-item--active {
        border-color: rgb(0, 202, 227) !important;
        border-width: 3px !important;
        border-style: solid;
        box-shadow: 0px 0px 25px 0px #00cae3;
    }
</style>