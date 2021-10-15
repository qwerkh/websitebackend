<template>
    <v-row justify="center">
        <v-flex
                md12
        >
            <v-card>

                <v-card-title icon="mdi-index">
                    <v-toolbar-title v-show="!$vuetify.breakpoint.xsOnly">
                        <v-icon style="font-size: 70px !important;" large color="green darken-2">control_camera</v-icon>
                        {{$t("endPerDay")}}
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
                    <add-button @add="handleAdd()" v-if="checkRole('Create')"
                                v-shortkey="['+']"
                                @shortkey.native="handleAdd()"
                                v-show="!$vuetify.breakpoint.xsOnly"></add-button>
                    <raise-button @add="handleAdd()" v-if="checkRole('Create')"
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
                    <template v-slot:header.closeDate="{ header }">
                        {{$t(header.text).toUpperCase()}}

                    </template>
                    <template v-slot:header.time="{ header }">
                        {{$t(header.text).toUpperCase()}}

                    </template>

                    <template v-slot:header.agentDoc="{ header }">
                        {{$t(header.text).toUpperCase()}}

                    </template>
                    <template v-slot:header.action="{ header }">
                        {{$t(header.text).toUpperCase()}}

                    </template>


                    //Body
                    <template v-slot:item.agentDoc="{ item }">
                        {{item.agentDoc && item.agentDoc.code || ""}} : {{item.agentDoc && item.agentDoc.name || ""}}

                    </template>

                    //Action
                    <template v-slot:item.action="{ item }">
                        <v-btn color="primary" outlined class="table-action-button mr-2" text icon
                               v-if="checkRole('Update')" disabled
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

                        <v-icon v-if="titleClick==='addEndPerDay'" large color="green darken-2"
                                style="font-size: 50px !important;">library_add
                        </v-icon>
                        <v-icon v-if="titleClick==='updateEndPerDay'" large color="green darken-2"
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
                                    <v-menu
                                            v-model="menuDate"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                    v-model="closeDateFormatted"
                                                    hint="DD/MM/YYYY"
                                                    :label="$t('endPerDayDate')"
                                                    prepend-icon="event"
                                                    @blur="dataObj.closeDate = parseDate(closeDateFormatted)"
                                                    readonly
                                                    :dense="dense"
                                                    v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="dataObj.closeDate" :readonly="isReadonly"
                                                       @input="menuDate = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" sm="12" md="12">
                                    <span class="subheading">{{$t('time')}}</span>

                                    <v-chip-group
                                            v-model="dataObj.time"
                                            :rules="requireRules"
                                            active-class="deep-purple--text text--accent-4"
                                            mandatory
                                            :dense="dense"
                                    >
                                        <v-chip v-for="d in timeOptionList" :key="d.value" :value="d.value">
                                            {{$t(d.label)}}
                                        </v-chip>
                                    </v-chip-group>

                                </v-col>
                                <v-col cols="12" sm="12" md="12">
                                    <v-autocomplete v-model="dataObj.agentId"
                                                    :items="agentOptionList"
                                                    outlined
                                                    dense
                                                    item-text="label"
                                                    item-value="value"
                                                    :rules="selectRules"
                                                    :label="$t('agent')"
                                                    search-input
                                                    chips
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
    import {LT_EndPerDayReact} from "../../../imports/collections/lt_endPerDay"
    import numeral from "numeral";
    import {Meteor} from 'meteor/meteor';

    export default {
        meteor: {
            reactData() {
                let vm = this;
                if (Meteor.userId()) {
                    LT_EndPerDayReact.find({}).fetch();
                    vm.fetchDataTable(vm.search, vm.skip, vm.itemsPerPage + vm.skip);
                }
            }
        },
        mounted() {
            this.$jQuery('body').off();
        },
        name: "EndPerDay",
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
                    closeDate: "",
                    time: "E",
                    agentId: ""
                },

                nameRules: [
                    v => !!v || 'EndPerDay Name is required',
                ],
                codeRules: [
                    v => !!v || 'EndPerDay Code is required',
                ],
                requireRules: [
                    v => !!v || 'is required',
                ],
                selectRules: [
                    v => !!v || 'Please Choose one',
                ],
                headers: [
                    {
                        text: 'endPerDayDate',
                        align: 'left',
                        sortable: true,
                        value: 'closeDate',
                    }, {
                        text: 'time',
                        align: 'left',
                        sortable: true,
                        value: 'time',
                    }, {
                        text: 'agent',
                        align: 'left',
                        sortable: true,
                        value: 'agentDoc',
                    },

                    {text: 'actions', value: 'action', sortable: false, width: "120px"},
                ],
                dataLists: [],
                timeOptionList: Constants.timeList,
                menuDate: false,
                closeDateFormatted: "",
                agentOptionList: [],
                searchAgent: ""


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
                    Meteor.call("lt_fetchEndPerDay", {
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
            formatDate(date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${day}/${month}/${year}`
            },
            parseDate(date) {
                if (!date) return null

                const [day, month, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
            handleSubmit() {
                let vm = this;

                if (vm.$refs.formData.validate()) {
                    vm.loading = true;
                    vm.dataObj.branchId = vm.$store.state.branchId;
                    if (vm.dataObj._id === "") {
                        return new Promise((resolve, reject) => {
                            Meteor.call("lt_insertEndPerDay", vm.dataObj, Constants.secret, (err, result) => {
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
                            Meteor.call("lt_updateEndPerDay", vm.dataObj._id, vm.dataObj, Constants.secret, (err, result) => {
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
            handleAdd() {
                let vm = this;
                vm.dataObj.closeDate = moment().format("YYYY-MM-DD");
                vm.dataObj.time = "E";

                vm.dialog = true;
                vm.titleClick = 'addEndPerDay';
            },
            handleUpdate(doc) {
                let vm = this;
                vm.dataObj = Object.assign({}, doc);
                vm.titleClick = "updateEndPerDay";
                vm.dialog = true;

            },
            handleRemove(row) {
                let vm = this;
                vm.$confirm(this.$t('messageWarning'), this.$t('warning'), {
                    confirmButtonText: this.$t('ok'),
                    cancelButtonText: this.$t('cancel'),
                    type: 'warning'
                }).then(() => {
                    Meteor.call("lt_removeEndPerDay", row, Constants.secret, (err, result) => {
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
                    vm.dataObj.closeDate = "";

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
            "dataObj.closeDate"(val) {
                this.closeDateFormatted = this.formatDate(val);
            },
            searchAgent(val) {
                val && this.queryAgentOption(val)
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
            vm.dataObj.closeDate = moment().format("YYYY-MM-DD");
            //vm.fetchDataTable();
            vm.queryAgentOption();
            Meteor.subscribe('lt_endPerDayReact');

        }
    }
</script>
