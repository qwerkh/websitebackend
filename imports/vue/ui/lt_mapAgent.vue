<template>
    <v-row justify="center">
        <v-flex
                md12
        >
            <v-card>

                <v-card-title icon="mdi-index">
                    <v-toolbar-title v-show="!$vuetify.breakpoint.xsOnly">
                        <v-icon style="font-size: 70px !important;" large color="green darken-2">sync_alt</v-icon>
                        {{$t("mapAgent")}}
                    </v-toolbar-title>
                    <v-spacer v-show="!$vuetify.breakpoint.xsOnly"></v-spacer>
                    <v-text-field
                            v-model="search"
                            append-icon="search"
                            :label="$t('search')"
                            single-line
                            hide-details
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <add-button @add="dialog=true,titleClick='addMapAgent'" v-if="checkRole('Create')"
                                v-shortkey="['+']"
                                @shortkey.native="dialog=true,titleClick='addMapAgent'"
                                v-show="!$vuetify.breakpoint.xsOnly"></add-button>
                    <raise-button @add="dialog=true,titleClick='addMapAgent'" v-if="checkRole('Create')"
                                  v-show="$vuetify.breakpoint.xsOnly"></raise-button>

                </v-card-title>
                <v-data-table
                        :headers="headers"
                        :items="dataLists"
                        :loading="loading"
                        loading-text=""
                        :search="search"
                        hide-default-footer
                        class="elevation-1"
                        :server-items-length="totalPage"
                        :items-per-page="itemsPerPage"
                        :page.sync="currentPage"
                        :options.sync="options"
                        :mobile-breakpoint="0"
                >

                    <template v-slot:progress>
                        <v-progress-circular indeterminate
                                             color="green"
                                             :value="50"></v-progress-circular>
                    </template>

                    //Header
                    <template v-slot:header.mainAgent="{ header }">
                        {{$t(header.text).toUpperCase()}}

                    </template>
                    <template v-slot:header.agentList="{ header }">
                        {{$t(header.text).toUpperCase()}}

                    </template>


                    //Body

                    <template v-slot:item.mainAgent="{ item }">
                        {{item._id.mainAgent}}
                    </template>
                    <template v-slot:item.agentList="{ item }">
                        <v-chip v-for="it in item.agentList" color="teal" dark>{{it.agentDoc.name}}</v-chip>
                    </template>
                    //Action
                    <template v-slot:item.action="{ item }">
                        <v-btn color="primary" outlined class="table-action-button mr-2" text icon
                               v-if="checkRole('Update')"
                               @click.native="handleUpdate(item)">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn color="error" outlined class="table-action-button" text icon v-if="checkRole('Delete')"
                               @click.native="handleRemove(item)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </template>

                    //No Data
                    <template v-slot:no-data>
                        {{$t("noData")}}
                    </template>


                </v-data-table>
                <div class="text-center">

                    <v-card-actions>
                        <v-col v-if="!$vuetify.breakpoint.xsOnly" class="d-flex" cols="12" sm="1">
                            {{$t("total")}} : {{totalPage}}
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="1" v-if="!$vuetify.breakpoint.xsOnly">
                            <v-select :label="$t('perPage')" v-model="itemsPerPage"
                                      :items="pageList"
                            ></v-select>
                        </v-col>
                        <v-pagination v-model="currentPage" :length="pageCount" circle prev-icon="mdi-menu-left"
                                      next-icon="mdi-menu-right" :total-visible="7"></v-pagination>
                        <v-col class="d-flex" cols="12" sm="1" v-if="!$vuetify.breakpoint.xsOnly">
                            <v-text-field v-model="currentPageComputed" :max="pageCount" min=1 type="number"
                                          :label="$t('goto')"></v-text-field>
                        </v-col>
                    </v-card-actions>
                </div>
            </v-card>
        </v-flex>

        <v-dialog v-model="dialog" persistent max-width="800px" :fullscreen="$vuetify.breakpoint.xsOnly">
            <v-form
                    :model="valid" ref="formData"
                    lazy-validation
            >
                <v-card>
                    <v-card-title>

                        <v-icon v-if="titleClick==='addMapAgent'" large color="green darken-2"
                                style="font-size: 50px !important;">library_add
                        </v-icon>
                        <v-icon v-if="titleClick==='updateMapAgent'" large color="green darken-2"
                                style="font-size: 50px !important;">autorenew
                        </v-icon>
                        <span class="headline">{{$t(titleClick)}}</span>
                        <v-spacer></v-spacer>
                        <close-button @closeForm="dialog=false" valid="false" v-shortkey="['esc']"
                                      @shortkey.native="dialog=false"></close-button>

                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field
                                            v-model="dataObj.mainAgent"
                                            :rules="nameRules"
                                            :label="$t('mainAgent')"
                                            persistent-hint
                                            :dense="dense"
                                            required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="12">
                                    <v-autocomplete v-model="dataObj.agentList"
                                                    :items="agentOptionList"
                                                    outlined
                                                    dense
                                                    item-text="label"
                                                    item-value="value"
                                                    :rules="selectRules"
                                                    :label="$t('agent')"
                                                    search-input
                                                    chips
                                                    small-chips
                                                    multiple
                                                    :search-input.sync="searchAgent"
                                                    cache-items
                                    >
                                    </v-autocomplete>
                                </v-col>

                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>

                        <v-spacer></v-spacer>
                        <reset-button @resetForm="resetForm" valid="false"></reset-button>
                        <save-button @saveForm="handleSubmit" v-shortkey="['enter']"
                                     @shortkey.native="handleSubmit" :valid="valid"></save-button>

                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
    </v-row>
</template>

<script>
    import AddButton from "../components/addButton"
    import RaiseButton from "../components/raiseAddButton"
    import SaveButton from "../components/saveButton"
    import CloseButton from "../components/closeButton"
    import ResetButton from "../components/resetButton"
    import {Constants} from "../../libs/constant"
    import GlobalFn from "../../libs/globalFn"
    import _ from 'lodash'
    import {LT_MapAgentReact} from "../../../imports/collections/lt_mapAgent"
    import numeral from "numeral";
    import {Meteor} from 'meteor/meteor';

    export default {
        meteor: {
            reactData() {
                let vm = this;
                if (Meteor.userId()) {
                    LT_MapAgentReact.find({}).fetch();
                    vm.fetchDataTable(vm.search, vm.skip, vm.itemsPerPage + vm.skip);
                }
            }
        },
        mounted() {
            this.$jQuery('body').off();
        },
        name: "MapAgent",
        components: {AddButton, RaiseButton, SaveButton, ResetButton, CloseButton},
        data() {
            return {
                dense: this.$store.state.isDense,
                isLoading: false,
                fullPage: false,
                dialog: false,
                search: '',
                currentPage: 1,
                pageCount: 0,
                totalPage: 0,
                itemsPerPage: 10,
                sortBy: "",
                sortDesc: "",
                options: {},
                skip: 0,
                limit: 10,
                filter: "",
                loading: true,
                valid: true,
                titleClick: "",
                pageList: [10, 20, 50, 100, 200],

                dataObj: {
                    _id: "",
                    mainAgent: "",
                    agentList: ""
                },
                agentOptionList: [],
                searchAgent: "",
                nameRules: [
                    v => !!v || 'MapAgent Name is required',
                ],
                selectRules: [
                    v => !!v || 'Please Choose one',
                ],
                headers: [
                    {
                        text: 'mainAgent',
                        align: 'left',
                        sortable: true,
                        value: 'mainAgent',
                    }, {
                        text: 'agent',
                        align: 'left',
                        sortable: true,
                        value: 'agentList',
                    },

                    {text: 'actions', value: 'action', sortable: false, width: "120px"},
                ],
                dataLists: [],
                genderOptionList: Constants.gender,
                locationOptionList: []


            }
        },
        methods: {
            resetForm() {
                this.$refs.formData.reset();
            },
            checkRole(roles) {
                switch (roles) {
                    case 'Create':
                        return GlobalFn.CheckRoles({roles: Constants.create});
                        break;
                    case 'Update':
                        return GlobalFn.CheckRoles({roles: Constants.update});
                        break;
                    case 'Delete':
                        return GlobalFn.CheckRoles({roles: Constants.delete});
                        break;
                    default:
                        return GlobalFn.CheckRoles({roles});
                        break;
                }

            },

            fetchDataTable: _.debounce(function (val, skip, limit) {
                let vm = this;
                vm.loading = true;
                return new Promise((resolve, reject) => {
                    Meteor.call("lt_fetchMapAgent", {
                        q: val,
                        filter: this.filter,
                        sort: {sortBy: vm.sortBy || "", sortDesc: vm.sortDesc || ""},
                        options: {skip: skip || 0, limit: limit || 10},
                        branchId: vm.$store.state.branchId,
                        accessToken: Constants.secret
                    }, (err, result) => {
                        if (result) {
                            vm.loading = false;
                            vm.dataLists = result.content;
                            vm.pageCount = Math.ceil((result.countContent || 1) / vm.itemsPerPage);
                            vm.totalPage = result.countContent;
                            vm.currentPage = vm.pageCount < vm.currentPage ? vm.pageCount : vm.currentPage;
                            resolve(result)
                        } else {
                            reject(err.message);
                        }
                    })
                });

            }, 50),

            queryAgentOption(q) {
                let vm = this;
                return new Promise((resolve, reject) => {
                    Meteor.call("lt_fetchAgentOption", q, Constants.secret, vm.$store.state.branchId, (err, result) => {
                        if (result) {
                            vm.agentOptionList = result;
                            resolve(result);
                        } else {
                            reject(err.message);
                        }
                    })
                })
            },
            handleSubmit() {
                let vm = this;

                if (vm.$refs.formData.validate()) {
                    vm.loading = true;
                    vm.dataObj.branchId = vm.$store.state.branchId;
                    if (vm.dataObj._id === "") {
                        return new Promise((resolve, reject) => {
                            Meteor.call("lt_insertMapAgent", vm.dataObj, Constants.secret, (err, result) => {
                                if (!err) {
                                    this.$message({
                                        message: this.$t('successNotification'),
                                        showClose: true,
                                        type: 'success'
                                    });
                                    resolve(result);
                                } else {
                                    console.log(err.message);
                                    this.$message({
                                        message: err.message,
                                        showClose: true,
                                        type: 'error'
                                    });
                                    reject(err.message);
                                }
                                vm.loading = false;
                            })
                            vm.dialog = false;
                        });


                    } else {
                        return new Promise((resolve, reject) => {
                            Meteor.call("lt_updateMapAgent", vm.dataObj._id, vm.dataObj, Constants.secret, (err, result) => {
                                if (!err) {
                                    this.$message({
                                        message: this.$t('successNotification'),
                                        showClose: true,
                                        type: 'success'
                                    });
                                    vm.loading = false;
                                    resolve(result);
                                } else {
                                    console.log(err.message);
                                    this.$message({
                                        message: err.message,
                                        showClose: true,
                                        type: 'error'
                                    });
                                    reject(err.message);
                                }
                            })
                            vm.dialog = false;
                        });
                    }
                }
            },
            handleUpdate(doc) {
                let vm = this;
                Meteor.call("lt_findMapAgentById",doc._id._id,Constants.secret,(err,result)=>{
                    if(result){
                        vm.dataObj = Object.assign({}, result);
                        vm.titleClick = "updateMapAgent";
                        vm.dialog = true;
                    }
                })


            },
            handleRemove(row) {
                let vm = this;

                vm.$confirm(this.$t('messageWarning'), this.$t('warning'), {
                    confirmButtonText: this.$t('ok'),
                    cancelButtonText: this.$t('cancel'),
                    type: 'warning'
                }).then(() => {
                    Meteor.call("lt_removeMapAgent", row, Constants.secret, (err, result) => {
                        if (!err) {
                            vm.$message({
                                message: this.$t('removeSuccess'),
                                type: 'success'
                            });

                        } else {
                            vm.$message({
                                type: 'error',
                                message: this.$t('removeFail') + " " + err.message
                            });
                        }

                    })
                }).catch(() => {
                    vm.$message({
                        type: 'info',
                        message: this.$t('removeCancel')
                    });
                });


            }
        },
        watch: {
            dialog(val) {
                let vm = this;
                if (val === false) {
                    this.$refs.formData.reset();
                    vm.dataObj._id = "";
                }
            },
            currentPage(val) {
                this.loading = true;
                this.skip = (val - 1) * this.itemsPerPage > 0 ? (val - 1) * this.itemsPerPage : 0;
                this.fetchDataTable(this.search, this.skip, this.itemsPerPage + this.skip);
            },

            options: {
                handler() {
                    this.sortBy = this.options.sortBy[0] || "";
                    this.sortDesc = this.options.sortDesc[0] || "";

                    this.fetchDataTable(this.search, this.skip, this.itemsPerPage + this.skip);
                },
                deep: true,
            },
            searchAgent(val) {
                this.queryAgentOption(val);
            }
        },
        computed: {
            currentPageComputed: {
                get() {
                    return this.currentPage;
                },
                set(value) {
                    this.currentPage = numeral(value).value()
                }
            }
        },
        created() {
            let vm = this;
            //vm.fetchDataTable();
            vm.queryAgentOption();
            Meteor.subscribe('lt_mapAgentReact');

        }
    }
</script>
