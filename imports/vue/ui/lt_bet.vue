<template>
  <v-row justify="center">
    <v-flex
        md12
    >
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-card>

        <v-card-title icon="mdi-index">
          <v-toolbar-title v-show="!$vuetify.breakpoint.xsOnly">
            <v-icon style="font-size: 70px !important;" large color="green darken-2">local_activity</v-icon>
            {{ $t("bet") }}-{{ agentDoc.name }}
          </v-toolbar-title>
          <v-spacer v-show="!$vuetify.breakpoint.xsOnly"></v-spacer>

          <v-row>
            <v-col cols="12" md="6" sm="6">
              <v-menu
                  v-model="menuBetDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                      v-model="betDateFormatted"
                      hint="DD/MM/YYYY"
                      :label="$t('betDate')"
                      prepend-icon="event"
                      append-icon="loop"
                      @blur="dataObj.betDate = parseDate(betDateFormatted)"
                      readonly
                      v-on="on"
                  >
                  </v-text-field>
                </template>
                <v-date-picker v-model="betDate"
                               @input="menuBetDate = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                  v-model="search"
                  append-icon="search"
                  :label="$t('search')"
                  single-line
                  hide-details
              ></v-text-field>
            </v-col>
          </v-row>

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
          <template v-slot:header.betDate="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.page="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>

          <template v-slot:header.line="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>


          <template v-slot:header.time="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.totalRiel2D="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.totalDollar2D="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.totalBaht2D="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.userDoc.username="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.userUpdateDoc.username="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>


          <template v-slot:header.action="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>

          //Body
          <template v-slot:item.totalRiel2D="{ item }">
            {{ numberFormat(item.totalRiel2D + item.totalRiel3D + item.totalRielLer + item.totalRielTot) }}
          </template>
          <template v-slot:item.totalDollar2D="{ item }">
            {{ numberFormat(item.totalDollar2D + item.totalDollar3D + item.totalDollarLer + item.totalDollarTot) }}
          </template>
          <template v-slot:item.totalBaht2D="{ item }">
            {{ numberFormat(item.totalBaht2D + item.totalBaht3D + item.totalBahtLer + item.totalBahtTot) }}
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
            {{ $t("noData") }}
          </template>


        </v-data-table>
        <div class="text-center">

          <v-card-actions>
            <v-col v-if="!$vuetify.breakpoint.xsOnly" class="d-flex" cols="12" sm="1">
              {{ $t("total") }} : {{ totalPage }}
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

    <v-dialog v-model="dialog" persistent fullscreen class="dialogBet">
      <v-form
          :model="valid" ref="formData"
          lazy-validation
      >
        <v-overlay :value="loadingOverlay">
          <v-progress-circular indeterminate size="64" color="white"></v-progress-circular>
        </v-overlay>
        <v-card>
          <v-card-title>

            <v-icon v-if="titleClick==='addBet'" large color="green darken-2"
                    style="font-size: 50px !important;">library_add
            </v-icon>
            <v-icon v-if="titleClick==='updateBet'" large color="green darken-2"
                    style="font-size: 50px !important;">autorenew
            </v-icon>
            <span class="headline">{{ $t(titleClick) }} -{{ agentDoc.name }}</span>
            <v-spacer></v-spacer>
            <span><p
                style="color: #999;font-family: 'khmer os fasthand'; text-align: center;"> សូមចុច Ctrl +
                        Enter
                        ដើម្បីធ្វើការ Save&nbsp;</p></span>
            <v-spacer></v-spacer>
            <close-button @closeForm="dialog=false" valid="false" v-shortkey="['esc']"
                          @shortkey.native="dialog=false"></close-button>

          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="8" md="8">
                <span class="subheading">{{ $t('time') }}</span>
                <v-chip-group
                    v-model="dataObj.time"
                    active-class="deep-purple--text text--accent-4"
                    mandatory
                    :dense="dense"
                >
                  <v-chip v-for="d in timeOptionList" :key="d.value" :disabled="isReadonly"
                          :value="d.value">
                    {{ $t(d.label) }}
                  </v-chip>
                </v-chip-group>
              </v-col>
              <v-col cols="12" sm="2" md="2">
                <v-text-field
                    v-model="dataObj.page"
                    :rules="requireRules"
                    :label="$t('page')"
                    persistent-hint
                    :dense="dense"
                    min="0"
                    outlined
                    rounded
                    type="number"
                    style="font-size: 20px !important;"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" md="2">
                <v-text-field
                    v-model="dataObj.line"
                    :rules="requireRules"
                    :label="$t('line')"
                    persistent-hint
                    min="0"
                    rounded
                    outlined
                    :dense="dense"
                    type="number"
                    required
                >

                </v-text-field>
              </v-col>

              <v-col cols="12" sm="2" md="2" style="padding-bottom: 0px !important;">
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
                            v-model="dateFormatted"
                            hint="DD/MM/YYYY"
                            :label="$t('betDate')"
                            prepend-icon="event"
                            @blur="dataObj.betDate = parseDate(dateFormatted)"
                            readonly
                            :dense="dense"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="dataObj.betDate" :readonly="isReadonly"

                                     @input="menuDate = false"></v-date-picker>
                    </v-menu>
                  </v-col>

                </v-row>
              </v-col>
              <v-col cols="12" sm="10" md="10" style="padding-bottom: 0px !important;">
                <v-row>
                  <v-col cols="12" sm="2" md="2">
                    <v-combobox
                        v-model="bet.currencyId"
                        :items="currencyOptionList"
                        hide-selected
                        auto-select-first
                        persistent-hint
                        @keypress="validateTypingCurrency"
                        ref="currency"
                        small-chips
                        :label="$t('currency')"
                        :dense="dense"
                        required
                    >
                    </v-combobox>
                  </v-col>
                  <v-col cols="12" sm="3" smd="3">
                    <v-combobox
                        v-model="bet.post"
                        :items="postOptionList"
                        hide-selected
                        ref="post"
                        auto-select-first
                        multiple
                        :disabled="dataObj.time==='Vat'"
                        @keypress="validateTypingPost"
                        persistent-hint
                        :search-input.sync="searchPost"
                        small-chips
                        :label="$t('post')"
                        :dense="dense"
                        autofocus
                        @click="clearPost()"
                        required
                    >
                    </v-combobox>
                  </v-col>
                  <v-col cols="12" sm="4" smd="4">
                    <v-combobox
                        :value="bet.number"
                        hide-selected
                        multiple
                        persistent-hint
                        small-chips
                        :label="$t('betNumber')"
                        :dense="dense"
                        required
                        @keypress="validateTyping"
                        counter
                        :readonly="!(!!dataObj.page && !!dataObj.line)"
                        attach
                        item-text="value"
                        item-value="index"
                        @input="addArgument"
                        ref="betNumber"
                    >
                    </v-combobox>
                  </v-col>

                  <v-col cols="12" sm="2" smd="2">
                    <v-text-field
                        v-model="bet.amount"
                        type="number"
                        :label="$t('amount')"
                        persistent-hint
                        min="0"
                        :dense="dense"
                        @keypress="gotoPost"
                        @keypress.enter="handleInsertBetList()"
                        required
                        ref="betAmount"
                    ></v-text-field>
                  </v-col>


                  <v-col cols="12" sm="1" md="1">
                    <v-btn color="primary" outlined class="table-action-button mr-2" text icon
                           @click.native="handleInsertBetList()">
                      <v-icon>add</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="4" md="4"
                     style="padding-top: 0px !important;border-right: 2px solid green">
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-row>
                      <v-col cols="12" sm="12" smd="12">
                        <v-text-field
                            v-model="dataObj.totalRiel2D"
                            :rules="numberRequireRules"
                            :label="$t('totalRiel2D')"
                            persistent-hint
                            :dense="dense"
                            readonly
                            required
                        >
                          <span slot="append" color="red">R</span>
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" smd="12">
                        <v-text-field
                            v-model="dataObj.totalRiel3D"
                            :rules="numberRequireRules"
                            :label="$t('totalRiel3D')"
                            persistent-hint
                            readonly
                            :dense="dense"
                            required
                        >
                          <span slot="append" color="red">R</span>

                        </v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" smd="6">
                        <v-text-field
                            v-model="dataObj.totalRielLer"
                            :rules="numberRequireRules"
                            :label="$t('totalRielLer')"
                            persistent-hint
                            readonly
                            :dense="dense"
                            required
                        >
                          <span slot="append" color="red">R</span>

                        </v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" smd="6">
                        <v-text-field
                            v-model="dataObj.totalRielTot"
                            :rules="numberRequireRules"
                            :label="$t('totalRielTot')"
                            persistent-hint
                            readonly
                            :dense="dense"
                            required
                        >
                          <span slot="append" color="red">R</span>

                        </v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" smd="6">
                        <v-text-field
                            v-model="dataObj.totalBaht2D"
                            :rules="numberRequireRules"
                            :label="$t('totalBaht2D')"
                            persistent-hint
                            :dense="dense"
                            readonly
                            required
                        >
                          <span slot="append" color="red">B</span>
                        </v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" smd="6">
                        <v-text-field
                            v-model="dataObj.totalBaht3D"
                            :rules="numberRequireRules"
                            :label="$t('totalBaht3D')"
                            persistent-hint
                            :dense="dense"
                            required
                            readonly
                        >
                          <span slot="append" color="red">B</span>
                        </v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" smd="6">
                        <v-text-field
                            v-model="dataObj.totalBahtLer"
                            :rules="numberRequireRules"
                            :label="$t('totalBahtLer')"
                            persistent-hint
                            :dense="dense"
                            required
                            readonly
                        >
                          <span slot="append" color="red">B</span>
                        </v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" smd="6">
                        <v-text-field
                            v-model="dataObj.totalBahtTot"
                            :rules="numberRequireRules"
                            :label="$t('totalBahtTot')"
                            persistent-hint
                            :dense="dense"
                            required
                            readonly
                        >
                          <span slot="append" color="red">B</span>
                        </v-text-field>
                      </v-col>

                      <v-col cols="6" sm="6" smd="6">
                        <v-text-field
                            v-model="dataObj.totalDollar2D"
                            :rules="numberRequireRules"
                            :label="$t('totalDollar2D')"
                            persistent-hint
                            :dense="dense"
                            readonly
                            required
                        >
                          <v-icon slot="append" color="red">attach_money</v-icon>

                        </v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" smd="6">
                        <v-text-field
                            v-model="dataObj.totalDollar3D"
                            :rules="numberRequireRules"
                            :label="$t('totalDollar3D')"
                            persistent-hint
                            :dense="dense"
                            readonly
                            required
                        >
                          <v-icon slot="append" color="red">attach_money</v-icon>

                        </v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" smd="6">
                        <v-text-field
                            v-model="dataObj.totalDollarLer"
                            :rules="numberRequireRules"
                            :label="$t('totalDollarLer')"
                            persistent-hint
                            :dense="dense"
                            readonly
                            required
                        >
                          <v-icon slot="append" color="red">attach_money</v-icon>

                        </v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" smd="6">
                        <v-text-field
                            v-model="dataObj.totalDollarTot"
                            :rules="numberRequireRules"
                            :label="$t('totalDollarTot')"
                            persistent-hint
                            :dense="dense"
                            readonly
                            required
                        >
                          <v-icon slot="append" color="red">attach_money</v-icon>

                        </v-text-field>
                      </v-col>

                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-row>
                      <v-col cols="12" sm="12" smd="12">
                        <span style="color: blue">អូសគត់ 10-50 => [10,20,30,40,50]</span>&nbsp;
                      </v-col>
                      <v-col cols="12" sm="12" smd="12">
                        អូសផែ 11-44 => [11,22,33,44] , 000-333 => [000,111,222,333]&nbsp;
                      </v-col>
                      <v-col cols="12" sm="12" smd="12">
                        <span style="color: blue">អូសរៀង 10-16 => [10,11,12,13,14,15,16]</span>&nbsp;
                      </v-col>
                      <v-col cols="12" sm="12" smd="12">
                        អូសក្បាល 10> => [10,11,12,13,14,15,16,17,18,19]&nbsp;
                      </v-col>
                      <v-col cols="12" sm="12" smd="12">
                        <span style="color: blue">អូសកន្ទុយ 25> => [25,35,45,55,65,75,85,95]</span>&nbsp;
                      </v-col>
                      <v-col cols="12" sm="12" smd="12">
                        ត្រលប់ 45* => [45,54]&nbsp;
                      </v-col>
                    </v-row>


                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="8" md="8" style="padding-top: 0px !important;">
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                    <tr>
                      <th class="text-left">{{ $t('betNumber') }}</th>
                      <th class="text-left">{{ $t('amount') }}</th>
                      <th class="text-left">{{ $t('post') }}</th>
                      <th class="text-left">{{ $t('currency') }}</th>
                      <th class="text-left">{{ $t('actions') }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="it in betList" :key="it.betDetailId">
                      <td>
                        <v-text-field
                            v-model="it.number"
                            :rules="requireRules"
                            persistent-hint
                            :dense="dense"
                            @keypress="validateTyping"
                            @keyup.native="handleUpdateBetList(it)"
                            required
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                            v-model="it.amount"
                            :rules="requireRules"
                            persistent-hint
                            :dense="dense"
                            required
                            @keyup.native="handleUpdateBetList(it)"
                            @change.native="handleUpdateBetList(it)"
                            min="0"
                            type="number"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-combobox
                            v-model="it.post"
                            :items="postOptionList"
                            hide-selected
                            :rules="requireRules"
                            multiple
                            persistent-hint
                            auto-select-first
                            @keypress="validateTypingPost"
                            @change="handleUpdateBetList(it)"
                            small-chips
                            :dense="dense"
                            required
                        >
                        </v-combobox>

                      </td>
                      <td>
                        <v-combobox
                            v-model="it.currencyId"
                            :items="currencyOptionList"
                            hide-selected
                            :rules="requireRules"
                            persistent-hint
                            auto-select-first
                            @keypress="validateTypingCurrency"
                            @change="handleUpdateBetList(it)"
                            small-chips
                            :dense="dense"
                            required
                        >
                        </v-combobox>
                      </td>
                      <td>
                        <v-btn color="error" outlined class="table-action-button mr-2"
                               text icon
                               @click.native="handleRemoveBetList(it.betDetailId)">
                          <v-icon>delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                    </tbody>
                  </template>
                </v-simple-table>


              </v-col>

            </v-row>
          </v-card-text>
          <v-card-actions>

            <v-spacer></v-spacer>
            <reset-button @resetForm="resetForm" valid="false"></reset-button>
            <save-button @saveForm="handleSubmit" v-shortkey="['ctrl','enter']"
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
import {LT_BetReact} from "../../../imports/collections/lt_bet"
import numeral from "numeral";
import {Meteor} from 'meteor/meteor';

export default {
  meteor: {
    reactData() {
      let vm = this;
      if (Meteor.userId()) {
        LT_BetReact.find({}).fetch();
        vm.fetchDataTable(vm.search, vm.skip, vm.itemsPerPage + vm.skip);
      }
    }
  },
  mounted() {
    this.$jQuery('body').off();
  },
  name: "Bet",
  components: {AddButton, RaiseButton, SaveButton, ResetButton, CloseButton},
  data() {
    return {
      dense: this.$store.state.isDense,
      overlay: false,
      isLoading: false,
      loadingOverlay: false,
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
        betDate: "",
        page: 1,
        line: 1,
        time: "E",
        items: [],
        totalRiel2D: "",
        totalRiel3D: "",
        totalRielLer: "",
        totalRielTot: "",
        totalDollar2D: "",
        totalDollar3D: "",
        totalDollarLer: "",
        totalDollarTot: "",
        totalBaht2D: "",
        totalBaht3D: "",
        totalBahtLer: "",
        totalBahtTot: "",
        agentId: "",
      },

      nameRules: [
        v => !!v || 'Bet Name is required',
      ],
      codeRules: [
        v => !!v || 'Bet Code is required',
      ],
      requireRules: [
        v => !!v || 'is required',
      ],
      numberRequireRules: [
        v => (v >= 0 && v !== "" && v !== undefined && v !== null) || 'is required',
      ],
      headers: [
        {
          text: 'betDate',
          align: 'left',
          sortable: true,
          value: 'betDate',
        }, {
          text: 'page',
          align: 'left',
          sortable: true,
          value: 'page',
        }, {
          text: 'line',
          align: 'left',
          sortable: true,
          value: 'line',
        }, {
          text: 'time',
          align: 'left',
          sortable: true,
          value: 'time',
        }, {
          text: 'totalRiel',
          align: 'left',
          sortable: true,
          value: 'totalRiel2D',
        }, {
          text: 'totalDollar',
          align: 'left',
          sortable: true,
          value: 'totalDollar2D',
        }, {
          text: 'totalBaht',
          align: 'left',
          sortable: true,
          value: 'totalBaht2D',
        }, {
          text: 'userEntry',
          align: 'left',
          sortable: true,
          value: 'userDoc.username',
        }, {
          text: 'userUpdate',
          align: 'left',
          sortable: true,
          value: 'userUpdateDoc.username',
        },

        {text: 'actions', value: 'action', sortable: false, width: "120px"},
      ],
      dataLists: [],
      dateFormatted: moment().format("DD/MM/YYYY"),
      menuDate: false,
      betList: [],
      bet: {
        number: [],
        amount: "",
        currencyId: "1:KHR",
        post: "",
      },
      timeOptionList: Constants.timeList,
      postOptionList: Constants.postList,
      currencyOptionList: Constants.currencyList,
      searchPost: "",
      isReadonly: false,
      menuBetDate: false,
      betDateFormatted: "",
      betDate: "",
      agentDoc: {},
      argsIndex: 0,
      oldPost: []


    }
  },
  methods: {
    resetForm() {
      this.$refs.formData.reset();
    },
    clearPost() {
      let vm = this;
      vm.bet.post = [];
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
    addArgument(args) {
      if (args.length > this.bet.number.length) {
        this.argsIndex++;
        args[args.length - 1] = {
          index: this.argsIndex,
          value: args[args.length - 1]
        };
      }
      this.bet.number = args;
    },
    gotoPost(evt) {
      let vm = this;
      let charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode === 113 || charCode === 81) {
        vm.$nextTick(() => vm.$refs.post.focus());
        vm.bet.post = [];
        evt.preventDefault();
      }
    },
    validateTyping(evt) {
      let vm = this;
      let charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode === 113 || charCode === 81) {
        vm.$nextTick(() => vm.$refs.post.focus());
        vm.bet.post = [];
        evt.preventDefault();
      }

      if (!((charCode > 47 && charCode < 58) || charCode === 42 || charCode === 45 || charCode === 62)) {
        evt.preventDefault();
      }

    },
    validateTypingPost(evt) {
      let charCode = (evt.which) ? evt.which : evt.keyCode;
      if (!((charCode > 47 && charCode < 54) || (charCode < 101 && charCode > 96) || (charCode < 69 && charCode > 64) || [76, 108, 112, 80, 79, 111, 70, 102, 73, 105, 75, 107, 78, 110, 116, 84, 118, 86].indexOf(charCode) > -1)) {
        evt.preventDefault();
      }
    },
    validateTypingCurrency(evt) {
      let charCode = (evt.which) ? evt.which : evt.keyCode;
      if (!(charCode > 48 && charCode < 52)) {
        evt.preventDefault();
      }
    },

    handleUpdateBetList(row) {
      let vm = this;
      if (JSON.stringify(row.postTitle) !== JSON.stringify(row.post)) {
        row.postTitle = [];
      }
      vm.betList[row.betDetailId] = row;
      vm.getTotal();
    },
    fetchDataTable: _.debounce(function (val, skip, limit) {
      let vm = this;
      vm.loading = true;
      return new Promise((resolve, reject) => {
        Meteor.call("lt_fetchBet", {
          q: val,
          filter: this.filter,
          sort: {sortBy: vm.sortBy || "", sortDesc: vm.sortDesc || ""},
          options: {skip: skip || 0, limit: limit || 10},
          branchId: vm.$store.state.branchId,
          betDate: vm.betDate,
          agentId: vm.dataObj.agentId,
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
    handleSubmit() {
      let vm = this;

      if (vm.$refs.formData.validate()) {
        vm.loading = true;
        vm.dataObj.branchId = vm.$store.state.branchId;
        vm.dataObj.items = vm.betList;

        let betDateTemp = vm.dataObj.betDate;
        let timeTemp = vm.dataObj.time;
        if (vm.dataObj._id === "") {
          return new Promise((resolve, reject) => {
            Meteor.call("lt_insertBet", vm.dataObj, Constants.secret, (err, result) => {
              if (!err) {
                this.$message({
                  message: this.$t('successNotification'),
                  showClose: true,
                  type: 'success'
                });
                resolve(result);
                vm.$refs.formData.reset();
                vm.dataObj._id = "";
                vm.dataObj.betDate = "";
                vm.bet.currencyId = "";
                vm.oldPost = [];

                Meteor.setTimeout(function () {
                  vm.dataObj.time = timeTemp;
                  vm.dataObj.betDate = betDateTemp;
                  if (timeTemp === "T") {
                    vm.bet.post = ["T"];
                  } else if (timeTemp === "Vat") {
                    vm.bet.post = ["Vat"];
                  }

                  vm.bet.currencyId = "1:KHR";


                }, 300);
                vm.betList = [];


              } else {
                console.log(err.message);
                this.$message({
                  message: err.message,
                  showClose: true,
                  type: 'error'
                });
                reject(err.message);
              }
              if (timeTemp === "T") {
                vm.$nextTick(() => vm.$refs.betNumber.focus());
              } else if (timeTemp === "Vat") {
                vm.$nextTick(() => vm.$refs.betNumber.focus());
              } else {
                vm.$nextTick(() => vm.$refs.post.focus());
              }
              vm.loading = false;
            })
          });


        } else {
          return new Promise((resolve, reject) => {
            Meteor.call("lt_updateBet", vm.dataObj._id, vm.dataObj, Constants.secret, (err, result) => {
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
      vm.dialog = true;
      vm.titleClick = 'addBet';
      vm.isReadonly = false;
      vm.dataObj.betDate = moment().format("YYYY-MM-DD");
      vm.bet = {
        number: [],
        amount: "",
        currencyId: "1:KHR",
        post: "",
      };


    },
    handleUpdate(doc) {
      let vm = this;
      vm.overlay = true;

      Meteor.call("lt_findBetById", doc._id, Constants.secret, (err, result) => {
        if (result) {
          Meteor.call("lt_findEndPerDayByAgentId", result.agentId, result.time, result.betDate, result.branchId, Constants.secret, (e, r) => {
            if (!!r) {

              vm.$message({
                message: vm.$t("alreadyEndPerDay"),
                showClose: true,
                type: 'error'
              });
              vm.overlay = false;
              return false;
            } else {
              vm.dataObj = Object.assign({}, result);
              vm.dataObj.page = result.page;
              vm.dataObj.line = result.line;
              vm.betList = result.items;

              Meteor.setTimeout(function () {
                vm.overlay = false;
                vm.titleClick = "updateClient";
                vm.dialog = true;
                vm.isReadonly = false;
                vm.titleClick = "updateBet";

              }, 300);
            }
          })


        }

      })

    },
    handleRemove(row) {
      let vm = this;

      Meteor.call("lt_findEndPerDayByAgentId", row.agentId, row.time, row.betDate, row.branchId, Constants.secret, (e, r) => {
        if (!!r) {
          vm.$message({
            message: vm.$t("alreadyEndPerDay"),
            showClose: true,
            type: 'error'
          });
          return false;
        } else {
          vm.$confirm(this.$t('messageWarning'), this.$t('warning'), {
            confirmButtonText: this.$t('ok'),
            cancelButtonText: this.$t('cancel'),
            type: 'warning'
          }).then(() => {
            Meteor.call("lt_removeBet", row, Constants.secret, (err, result) => {

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
      })


    },
    numberFormat(val) {
      return GlobalFn.formatNumber(val);
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
    handleInsertBetList() {
      let vm = this;
      if (vm.bet.number.length === 0 || vm.bet.currencyId === "" || vm.bet.post.length === 0 || vm.bet.amount === "") {
        vm.$message({
          type: 'error',
          message: this.$t('fieldCanNotBlank')
        });
        return false;
      }
      vm.loadingOverlay = true;
      let i = 1;
      vm.bet.number.forEach((num) => {
        let len = vm.betList.length + 1;
        let newPost = [];
        vm.bet.post.forEach((d) => {
          if (Constants.postChange.indexOf(d) > -1) {
            newPost.push(...GlobalFn.getPostChange(d));
          } else {
            newPost.push(d);
          }
        })
        vm.betList.unshift({
          postTitle: (i === 1 && JSON.stringify(vm.oldPost) !== JSON.stringify(vm.bet.post)) ? newPost : [],
          number: num.value,
          amount: vm.bet.amount,
          currencyId: vm.bet.currencyId,
          post: ((newPost.indexOf("Ler") > -1 && (parseInt(num.value) + "").length === 3) || (newPost.indexOf("Tot") > -1 && num.value.length === 2)) ? ["T"] : newPost,
          betDetailId: vm.dataObj.agentId + moment().format("YYYYMMDDHHMMSS") + vm.dataObj.page + vm.dataObj.line + vm.dataObj.time + len,
        });
        i++;
      })
      vm.oldPost = vm.bet.post;
      vm.bet = {
        number: [],
        amount: "",
        currencyId: "1:KHR",
        post: vm.bet.post,
      };
      vm.$nextTick(() => vm.$refs.betNumber.focus());
      this.getTotal();
      vm.loadingOverlay = false;
      vm.$message({
        message: this.$t('successNotification'),
        showClose: true,
        type: 'success'
      });

    },
    handleRemoveBetList(betDetailId) {
      let vm = this;
      vm.$confirm(this.$t('messageWarning'), this.$t('warning'), {
        confirmButtonText: this.$t('ok'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        vm.betList = vm.betList.filter(item => item.betDetailId !== betDetailId);

        vm.$message({
          message: this.$t('removeSuccess'),
          type: 'success'
        });
        vm.getTotal();


      }).catch(() => {
        vm.$message({
          type: 'info',
          message: this.$t('removeCancel')
        });
      });
    },

    getTotal() {
      let vm = this;
      let totalRiel2D = 0;
      let totalRiel3D = 0;
      let totalRielLer = 0;
      let totalRielTot = 0;
      let totalDollar2D = 0;
      let totalDollar3D = 0;
      let totalDollarLer = 0;
      let totalDollarTot = 0;
      let totalBaht2D = 0;
      let totalBaht3D = 0;
      let totalBahtLer = 0;
      let totalBahtTot = 0;
      vm.betList.forEach((o) => {

        // Bet Length
        let isTwoDR = false;
        let betLen = 1;
        if (/-/.test(o.number)) {
          let num = o.number.split("-");
          let dataReang;
          if (parseInt(num[1]) - parseInt(num[0]) >= 10 && num[0].substr(num[0].length - 1, 1) === num[1].substr(num[1].length - 1, 1)) {
            dataReang = GlobalFn.ousKot(o.number);
          } else if (num[0].length === 2 && (parseInt(num[1]) % 11 === 0 && parseInt(num[0]) % 11 === 0) && parseInt(num[1]) >= 10) {
            dataReang = GlobalFn.ousPhe(o.number);
          } else if (num[0].length === 3 && (parseInt(num[1]) % 111 === 0 && parseInt(num[0]) % 111 === 0) && parseInt(num[1]) >= 111) {
            dataReang = GlobalFn.ousPhe(o.number);
          } else {
            dataReang = GlobalFn.reang(o.number);
          }
          if (Array.isArray(dataReang)) {
            betLen = dataReang.length;
          }

          if ((num[0]).length === 2) {
            isTwoDR = true;
          } else if ((num[0]).length === 3) {
            isTwoDR = false;
          }
        } else if (/0>/.test(o.number)) {
          let dataOuskbal = GlobalFn.ouskbal(o.number);
          if (Array.isArray(dataOuskbal)) {
            betLen = dataOuskbal.length;
          }
          isTwoDR = true;

        } else if (/>/.test(o.number) && o.number.search(/0>/) === -1) {
          let dataouskontoy = GlobalFn.ouskontoy(o.number);
          if (Array.isArray(dataouskontoy)) {
            betLen = dataouskontoy.length;
          }
          isTwoDR = true;

        } else if (o.number.substr(o.number.length - 1, o.number.length) === "*") {
          let dataTrolob = GlobalFn.trolob(o.number);
          if (Array.isArray(dataTrolob)) {
            betLen = dataTrolob.length;
          }
          if (o.number.length === 4) {
            isTwoDR = false;
          } else {
            isTwoDR = true;
          }
        } else {
          if (o.number.length === 2) {
            isTwoDR = true
          }
        }
        //=========Bet Length

        //Post Length

        let postLength = 0;
        let postLengthLer = 0;
        let postLengthTot = 0;
        if (vm.dataObj.time === "N") {
          if (Array.isArray(o.post)) {
            o.post.forEach(function (obj) {
              if (obj === "Ler") {
                postLengthLer += 1;
              } else if (obj === "Tot") {
                postLengthTot += 1;
              } else if (obj === "0A") {
                postLength = isTwoDR === true ? postLength + 4 : postLength + 3;
              } else if (obj === "4P") {
                postLength = isTwoDR === true ? postLength + 7 : postLength + 6;
              } else if (obj === "5Lo") {
                postLength = isTwoDR === true ? postLength + 32 : postLength + 25;
              } else {
                postLength = postLength + 1;
              }
            })
          } else {
            o.post.split(",").forEach(function (postFin) {
              if (postFin === "Ler") {
                postLengthLer += 1;
              } else if (postFin === "Tot") {
                postLengthTot += 1;
              } else if (postFin === "0A") {
                postLength += isTwoDR === true ? 4 : 3;
              } else if (postFin === "4P") {
                postLength += isTwoDR === true ? 7 : 6;
              } else if (postFin === "5Lo") {

                postLength = isTwoDR === true ? postLength + 32 : postLength + 25;


              } else {
                postLength += 1;
              }
            })
          }
        } else {
          if (Array.isArray(o.post)) {
            o.post.forEach(function (obj) {

              if (obj === "Ler") {
                postLengthLer += 1;
              } else if (obj === "Tot") {
                postLengthTot += 1;
              } else if (obj === "4P") {
                postLength = postLength + 4;
              } else if (obj === "5Lo") {
                if (vm.dataObj.time === "V13") {
                  postLength = isTwoDR === true ? postLength + 20 : postLength + 16;
                } else {
                  postLength = isTwoDR === true ? postLength + 23 : postLength + 19;
                }
              } else {
                postLength = postLength + 1;
              }
            })
          } else {
            o.post.split(",").forEach(function (postFin) {
              if (postFin === "Ler") {
                postLengthLer += 1;
              } else if (postFin === "Tot") {
                postLengthTot += 1;
              } else if (postFin === "4P") {
                postLength += 4;
              } else if (postFin === "5Lo") {
                if (vm.dataObj.time === "V13") {
                  postLength = isTwoDR === true ? postLength + 20 : postLength + 16;
                } else {
                  postLength = isTwoDR === true ? postLength + 23 : postLength + 19;
                }
              } else {
                postLength += 1;
              }
            })
          }
        }


        //======Post Length

        if (o.currencyId === "1:KHR") {
          totalRielLer = numeral(totalRielLer).value() + betLen * postLengthLer * o.amount;
          totalRielTot = numeral(totalRielTot).value() + betLen * postLengthTot * o.amount;
        } else if (o.currencyId === "2:USD") {
          totalDollarLer = numeral(totalDollarLer).value() + betLen * postLengthLer * o.amount;
          totalDollarTot = numeral(totalDollarTot).value() + betLen * postLengthTot * o.amount;
        } else if (o.currencyId === "3:THB") {
          totalBahtLer = numeral(totalBahtLer).value() + betLen * postLengthLer * o.amount;
          totalBahtTot = numeral(totalBahtTot).value() + betLen * postLengthTot * o.amount;
        }


        if (isTwoDR === true) {
          if (o.currencyId === "1:KHR") {
            totalRiel2D = numeral(totalRiel2D).value() + betLen * postLength * o.amount;
          } else if (o.currencyId === "2:USD") {
            totalDollar2D = numeral(totalDollar2D).value() + betLen * postLength * o.amount;
          } else if (o.currencyId === "3:THB") {
            totalBaht2D = numeral(totalBaht2D).value() + betLen * postLength * o.amount;
          }

        } else {
          if (o.currencyId === "1:KHR") {
            totalRiel3D = numeral(totalRiel3D).value() + betLen * postLength * o.amount;
          } else if (o.currencyId === "2:USD") {
            totalDollar3D = numeral(totalDollar3D).value() + betLen * postLength * o.amount;
          } else if (o.currencyId === "3:THB") {
            totalBaht3D = numeral(totalBaht3D).value() + betLen * postLength * o.amount;
          }
        }
      });
      vm.dataObj.totalRiel2D = totalRiel2D;
      vm.dataObj.totalRiel3D = totalRiel3D;
      vm.dataObj.totalRielLer = totalRielLer;
      vm.dataObj.totalRielTot = totalRielTot;
      vm.dataObj.totalDollar2D = totalDollar2D;
      vm.dataObj.totalDollar3D = totalDollar3D;
      vm.dataObj.totalDollarLer = totalDollarLer;
      vm.dataObj.totalDollarTot = totalDollarTot;
      vm.dataObj.totalBaht2D = totalBaht2D;
      vm.dataObj.totalBaht3D = totalBaht3D;
      vm.dataObj.totalBahtLer = totalBahtLer;
      vm.dataObj.totalBahtTot = totalBahtTot;
    }
  },
  watch: {
    dialog(val) {
      let vm = this;
      if (val === false) {
        this.$refs.formData.reset();
        vm.dataObj._id = "";
        vm.dataObj.betDate = "";
        vm.betList = [];

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
    "dataObj.betDate"(val) {
      let vm = this;
      this.dateFormatted = this.formatDate(val);
      if (vm.titleClick === "addBet") {
        vm.dataObj.page = 0;
        let selector = {};
        selector.time = vm.dataObj.time;
        selector.agentId = vm.dataObj.agentId;
        selector.betDate = val;
        selector.createdUser = Meteor.userId();
        Meteor.call("lt_getLastPage", selector, Constants.secret, this.$store.state.branchId, (err, result) => {
          vm.dataObj.page = result;
        })
      }
    },
    "dataObj.time"(val) {
      let vm = this;
      if (val === "T") {
        vm.$nextTick(() => vm.$refs.betNumber.focus());
        vm.postOptionList = Constants.postListT;
        vm.bet.post = ["T"];
      } else if (val === "Vat") {
        vm.postOptionList = Constants.postListVat;
        vm.bet.post = ["Vat"];
      } else {
        vm.postOptionList = Constants.postList;
        vm.$nextTick(() => vm.$refs.post.focus());
      }

      if (vm.titleClick === "addBet") {
        vm.dataObj.page = "";
        let selector = {};
        selector.time = vm.dataObj.time;
        selector.agentId = vm.dataObj.agentId;
        selector.betDate = val;
        selector.createdUser = Meteor.userId();
        Meteor.call("lt_getLastPage", selector, Constants.secret, this.$store.state.branchId, (err, result) => {
          vm.dataObj.page = result;
        })
      }
    },
    "dataObj.page"(val) {
      let vm = this;
      if (vm.titleClick === "addBet") {
        let selector = {};
        selector.time = vm.dataObj.time;
        selector.agentId = vm.dataObj.agentId;
        selector.betDate = vm.dataObj.betDate;
        selector.page = parseInt(val);
        Meteor.call("lt_getLastLine", selector, Constants.secret, this.$store.state.branchId, (err, result) => {
          vm.dataObj.line = result;
        })
      }
    },
    "bet.post"(val) {
      this.searchPost = "";
    },
    betDate(val) {
      let vm = this;
      vm.betDateFormatted = vm.formatDate(val);
      vm.fetchDataTable(vm.search, vm.skip, vm.itemsPerPage + vm.skip);
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
    vm.dataObj.agentId = vm.$route.params.agentId;
    vm.betDate = moment().format("YYYY-MM-DD");
    //vm.fetchDataTable();
    Meteor.subscribe('lt_betReact');

    Meteor.call("lt_findAgentById", vm.dataObj.agentId, Constants.secret, (err, result) => {
      if (result) {
        vm.agentDoc = result;
      }
    })

  }
}
</script>
