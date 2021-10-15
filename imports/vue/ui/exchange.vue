<template>
    <v-row justify="center">
        <v-flex
                md12
        >
            <v-card>
                <v-card-title icon="mdi-index">
                    <v-toolbar-title v-show="!$vuetify.breakpoint.xsOnly">
                        <v-icon style="font-size: 70px !important;" large color="green darken-2">
                            swap_horizontal_circle
                        </v-icon>
                        {{$t("exchange")}}
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
                    <add-button @add="handleAdd()" v-shortkey="['+']"
                                @shortkey.native="handleAdd()"
                                v-if="checkRole('Create')"
                                v-show="!$vuetify.breakpoint.xsOnly"></add-button>
                    <raise-button @add="handleAdd()"
                                  v-if="checkRole('Create')"
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
                    <template v-slot:header.exDateName="{ header }">
                        {{$t(header.text).toUpperCase()}}

                    </template>
                    <template v-slot:header.base="{ header }">
                        {{$t(header.text).toUpperCase()}}

                    </template>
                    <template v-slot:header.rates="{ header }">
                        {{$t(header.text).toUpperCase()}}

                    </template>
                    <template v-slot:header.status="{ header }">
                        {{$t(header.text).toUpperCase()}}

                    </template>
                    <template v-slot:header.action="{ header }">
                        {{$t(header.text).toUpperCase()}}

                    </template>

                    //Body

                    <template v-slot:item.rates="{ item }">
                        {{JSON.stringify(item.rates)}}
                    </template>
                    <template v-slot:item.status="{ item }">
                        <v-icon v-if="!!item.status" color="success">check_circle</v-icon>
                        <v-icon v-else color="error">remove_circle</v-icon>
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

                        <v-icon v-if="titleClick==='addExchange'" large color="green darken-2"
                                style="font-size: 50px !important;">library_add
                        </v-icon>
                        <v-icon v-if="titleClick==='updateExchange'" large color="green darken-2"
                                style="font-size: 50px !important;">autorenew
                        </v-icon>
                        <span class="headline">{{$t(titleClick)}}</span>
                        <v-spacer></v-spacer>
                        <close-button @closeForm="dialog=false" v-shortkey="['esc']"
                                      @shortkey.native="disabled=false" valid="false"></close-button>

                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>


                                <v-col cols="12" sm="6" md="6">

                                    <v-dialog

                                            v-model="modalExDate"
                                            :return-value.sync="date"
                                            width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                    v-model="dataObj.exDate"
                                                    :label="$t('date')"
                                                    prepend-icon="event"
                                                    readonly
                                                    :rules="dateRules"
                                                    v-on="on"
                                                    :dense="dense"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="dataObj.exDate"
                                                       @input="modalExDate = false" scrollable></v-date-picker>

                                    </v-dialog>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field
                                            v-model="dataObj.base"
                                            :label="$t('baseCurrency')"
                                            persistent-hint
                                            required
                                            readonly
                                            :dense="dense"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field
                                            v-model="dataObj.rates.USD"
                                            :label="$t('USD')"
                                            persistent-hint
                                            required
                                            readonly
                                            :dense="dense"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field
                                            v-model="dataObj.rates.KHR"
                                            :label="$t('KHR')"
                                            persistent-hint
                                            :rules="nameRules"
                                            required
                                            :dense="dense"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field
                                            v-model="dataObj.rates.THB"
                                            :label="$t('THB')"
                                            persistent-hint
                                            :rules="nameRules"
                                            required
                                            :dense="dense"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field
                                            v-model="dataObj.rates.CNY"
                                            :label="$t('CNY')"
                                            persistent-hint
                                            :rules="nameRules"
                                            required
                                            :dense="dense"

                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="6">
                                    <v-switch v-model="dataObj.status"  :dense="dense" :label="$t('startUsing')" ></v-switch>
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
    import {ExchangeReact} from "../../../imports/collections/exchange"
    import numeral from "numeral";

    export default {
        meteor: {
            reactData() {
                let vm = this;
                if (Meteor.userId()) {
                    ExchangeReact.find({}).fetch();
                    vm.fetchDataTable(vm.search, vm.skip, vm.itemsPerPage + vm.skip);
                }

            }
        },
        mounted() {
            this.$jQuery('body').off();
        },
        name: "Exchange",
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
                    exDate: new Date().toISOString().substr(0, 10),
                    rates: {
                        USD: 1,
                        KHR: "",
                        THB: "",
                        CNY: ""
                    },
                    base: "USD",
                    status: true
                },

                nameRules: [
                    v => !!v || 'required',
                ],
                dateRules: [
                    v => !!v || 'Date is required',
                ],

                selectRules: [
                    v => !!v || 'Please Choose one',
                ],
                headers: [
                    {
                        text: 'date',
                        align: 'left',
                        sortable: true,
                        value: 'exDateName',
                    }, {
                        text: 'baseCurrency',
                        align: 'left',
                        sortable: true,
                        value: 'base',
                    }, {
                        text: 'rates',
                        align: 'left',
                        sortable: true,
                        value: 'rates',
                    }, {
                        text: 'startUsing',
                        align: 'left',
                        sortable: true,
                        value: 'status',
                    },
                    {text: 'actions', value: 'action', sortable: false, width: "120px"}
                ],
                dataLists: [],
                modalExDate: false
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
                    Meteor.call("base_fetchExchange", {
                        q: val,
                        filter: this.filter,
                        sort: {sortBy: vm.sortBy || "", sortDesc: vm.sortDesc || ""},
                        options: {skip: skip || 0, limit: limit || 10},
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

            }, 300),
            handleAdd() {
                this.dialog = true;
                this.titleClick = 'addExchange';
                this.dataObj.base = 'USD';
                this.dataObj.rates.USD = 1;
                this.dataObj.exDate = new Date().toISOString().substr(0, 10);
            },
            handleSubmit() {
                let vm = this;

                if (vm.$refs.formData.validate()) {
                    vm.loading = true;
                    vm.dataObj.exDateName = moment(vm.dataObj.exDate).format("DD/MM/YYYY");
                    if (vm.dataObj._id === "") {
                        return new Promise((resolve, reject) => {
                            Meteor.call("base_insertExchange", vm.dataObj,Constants.secret, (err, result) => {
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
                            Meteor.call("base_updateExchange", vm.dataObj._id, vm.dataObj,Constants.secret, (err, result) => {
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
                vm.dataObj = {
                    _id: doc._id,
                    exDate: moment(doc.exDate).format("YYYY-MM-DD"),
                    rates: {
                        USD: doc.rates.USD,
                        KHR: doc.rates.KHR,
                        THB: doc.rates.THB,
                        CNY: doc.rates.CNY
                    },
                    base: doc.base,
                    status: doc.status
                };

                vm.titleClick = "updateExchange";
                vm.dialog = true;

            },
            handleRemove(row) {
                let vm = this;
                vm.$confirm(this.$t('messageWarning'), this.$t('warning'), {
                    confirmButtonText: this.$t('ok'),
                    cancelButtonText: this.$t('cancel'),
                    type: 'warning'
                }).then(() => {
                    Meteor.call("base_removeExchange", row,Constants.secret ,(err, result) => {
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
            Meteor.subscribe('exchangeReact');
        }
    }
</script>
