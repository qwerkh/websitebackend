<template>
  <v-row justify="center">
    <v-flex
        md12
    >
      <v-card>

        <v-card-title icon="mdi-index">
          <v-toolbar-title v-show="!$vuetify.breakpoint.xsOnly">
            <v-icon style="font-size: 70px !important;" large color="green darken-2">select_all</v-icon>
            {{ $t("result") }}
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
          <template v-slot:header.resultDate="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.time="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>

          <template v-slot:header.postA="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.postT="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>

          <template v-slot:header.postVat="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>


          <template v-slot:header.postB="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.postC="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.postD="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.postF="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.postI="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.postK="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.postL="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.postN="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.postO="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.postLo="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>

          <template v-slot:header.action="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          //Body
          <template v-slot:item.postA="{ item }">
            {{ $t('d2') }} :
            <v-chip v-for="it in item.postA.result2D" color="green" dark>{{ it }}</v-chip>
            <br>
            {{ $t('d3') }} :
            <v-chip v-for="it in item.postA.result3D" color="purple" dark>{{ it }}</v-chip>
          </template>
          <template v-slot:item.postT="{ item }">
            {{ $t('d2') }} :
            <v-chip color="green" dark>{{ item.postT.result2D }}</v-chip>
            <br>
            {{ $t('d3') }} :
            <v-chip color="purple" dark>{{ item.postT.result3D }}</v-chip>
          </template>
          <template v-slot:item.postVat="{ item }">
            {{ $t('d2') }} :
            <v-chip color="green" dark>{{ item.postVat && item.postVat.result2D || "" }}</v-chip>
            <br>
            {{ $t('d3') }} :
            <v-chip color="purple" dark>{{ item.postVat && item.postVat.result3D || ""}}</v-chip>
          </template>
          <template v-slot:item.postB="{ item }">
            {{ $t('d2') }} :
            <v-chip color="green" dark>{{ item.postB.result2D }}</v-chip>
            <br>
            {{ $t('d3') }} :
            <v-chip color="purple" dark>{{ item.postB.result3D }}</v-chip>
          </template>
          <template v-slot:item.postC="{ item }">
            {{ $t('d2') }} :
            <v-chip color="green" dark>{{ item.postC.result2D }}</v-chip>
            <br>
            {{ $t('d3') }} :
            <v-chip color="purple" dark>{{ item.postC.result3D }}</v-chip>
          </template>
          <template v-slot:item.postD="{ item }">
            {{ $t('d2') }} :
            <v-chip color="green" dark>{{ item.postD.result2D }}</v-chip>
            <br>
            {{ $t('d3') }} :
            <v-chip color="purple" dark>{{ item.postD.result3D }}</v-chip>
          </template>
          <template v-slot:item.postF="{ item }">
            {{ $t('d2') }} :
            <v-chip color="green" dark>{{ item.postF.result2D }}</v-chip>
            <br>
            {{ $t('d3') }} :
            <v-chip color="purple" dark>{{ item.postF.result3D }}</v-chip>
          </template>
          <template v-slot:item.postI="{ item }">
            {{ $t('d2') }} :
            <v-chip color="green" dark>{{ item.postI.result2D }}</v-chip>
            <br>
            {{ $t('d3') }} :
            <v-chip color="purple" dark>{{ item.postI.result3D }}</v-chip>
          </template>
          <template v-slot:item.postK="{ item }">
            {{ $t('d2') }} :
            <v-chip color="green" dark>{{ item.postK.result2D }}</v-chip>
            <br>
            {{ $t('d3') }} :
            <v-chip color="purple" dark>{{ item.postK.result3D }}</v-chip>
          </template>
          <template v-slot:item.postL="{ item }">
            {{ $t('d2') }} :
            <v-chip color="green" dark>{{ item.postL.result2D }}</v-chip>
            <br>
            {{ $t('d3') }} :
            <v-chip color="purple" dark>{{ item.postL.result3D }}</v-chip>
          </template>
          <template v-slot:item.postN="{ item }">
            {{ $t('d2') }} :
            <v-chip color="green" dark>{{ item.postN.result2D }}</v-chip>
            <br>
            {{ $t('d3') }} :
            <v-chip color="purple" dark>{{ item.postN.result3D }}</v-chip>
          </template>
          <template v-slot:item.postO="{ item }">
            {{ $t('d2') }} :
            <v-chip color="green" dark>{{ item.postO.result2D }}</v-chip>
            <br>
            {{ $t('d3') }} :
            <v-chip color="purple" dark>{{ item.postO.result3D }}</v-chip>
          </template>

          <template v-slot:item.postLo="{ item }">
            {{ $t('d2') }} :
            <v-chip v-for="it in item.postLo.result2D" color="green" dark>{{ it }}</v-chip>
            <br>
            {{ $t('d3') }} :
            <v-chip v-for="it in item.postLo.result3D" color="purple" dark>{{ it }}</v-chip>
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

    <v-dialog v-model="dialog" persistent max-width="800px" :fullscreen="$vuetify.breakpoint.xsOnly">
      <v-form
          :model="valid" ref="formData"
          lazy-validation
      >
        <v-card>
          <v-card-title>

            <v-icon v-if="titleClick==='addResult'" large color="green darken-2"
                    style="font-size: 50px !important;">library_add
            </v-icon>
            <v-icon v-if="titleClick==='updateResult'" large color="green darken-2"
                    style="font-size: 50px !important;">autorenew
            </v-icon>
            <span class="headline">{{ $t(titleClick) }}</span>
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
                          v-model="dateFormatted"
                          hint="DD/MM/YYYY"
                          :label="$t('resultDate')"
                          prepend-icon="event"
                          @blur="dataObj.resultDate = parseDate(dateFormatted)"
                          readonly
                          :dense="dense"
                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dataObj.resultDate" :readonly="isReadonly"

                                   @input="menuDate = false"></v-date-picker>
                  </v-menu>

                </v-col>
                <v-col cols="12" sm="12" md="12">
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
                <v-col cols="12" sm="6" md="6"  v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">
                  <v-combobox
                      :value="dataObj.postA.result2D"
                      hide-selected
                      multiple
                      persistent-hint
                      small-chips
                      :label="$t('postA2')"
                      :dense="dense"
                      autofocus
                      :disabled="dataObj.time==='T'"
                      required
                      @input="addArgumentResultA2D"
                      item-text="value"
                      item-value="index"
                      @keypress="validateTyping"
                      counter
                      attach
                  >
                  </v-combobox>
                </v-col>
                <v-col cols="12" sm="6" md="6"  v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">
                  <v-combobox
                      :value="dataObj.postA.result3D"
                      hide-selected
                      multiple
                      persistent-hint
                      small-chips
                      :label="$t('postA3')"
                      :dense="dense"
                      :disabled="dataObj.time==='T'"

                      required
                      @input="addArgumentResultA3D"
                      item-text="value"
                      item-value="index"
                      @keypress="validateTyping"
                      counter
                      attach
                  >
                  </v-combobox>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="dataObj.time==='N'">
                  <v-text-field
                      v-model="dataObj.postA1.result2D"
                      :label="$t('postA12')"
                      persistent-hint
                      :disabled="dataObj.time==='T'"


                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="dataObj.time==='N'">
                  <v-text-field
                      v-model="dataObj.postA1.result3D"
                      :label="$t('postA13')"
                      persistent-hint
                      :disabled="dataObj.time==='T'"
                      v-if="dataObj.time==='N'"

                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="dataObj.time==='N'">
                  <v-text-field
                      v-model="dataObj.postA2.result2D"
                      :label="$t('postA22')"
                      persistent-hint
                      :disabled="dataObj.time==='T'"
                      v-if="dataObj.time==='N'"

                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="dataObj.time==='N'">
                  <v-text-field
                      v-model="dataObj.postA2.result3D"
                      :label="$t('postA23')"
                      persistent-hint
                      :disabled="dataObj.time==='T'"
                      v-if="dataObj.time==='N'"

                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="dataObj.time==='N'">
                  <v-text-field
                      v-model="dataObj.postA3.result2D"
                      :label="$t('postA32')"
                      persistent-hint
                      :disabled="dataObj.time==='T'"
                      v-if="dataObj.time==='N'"

                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="dataObj.time==='N'">
                  <v-text-field
                      v-model="dataObj.postA3.result3D"
                      :label="$t('postA33')"
                      persistent-hint
                      :disabled="dataObj.time==='T'"
                      v-if="dataObj.time==='N'"

                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" v-if="dataObj.time==='N'">
                  <v-text-field
                      v-model="dataObj.postA4.result2D"
                      :label="$t('postA42')"
                      persistent-hint
                      :disabled="dataObj.time==='T'"
                      v-if="dataObj.time==='N'"

                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6" v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">
                  <v-text-field
                      v-model="dataObj.postB.result2D"
                      :label="$t('postB2')"
                      persistent-hint
                      :disabled="dataObj.time==='T'"
                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">
                  <v-text-field
                      v-model="dataObj.postB.result3D"
                      :label="$t('postB3')"
                      persistent-hint
                      :disabled="dataObj.time==='T'"
                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6" v-if="dataObj.time==='T'">
                  <v-text-field
                      v-model="dataObj.postT.result2D"
                      :label="$t('postT2')"
                      persistent-hint
                      :rules="requireRules"
                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="dataObj.time==='T'">
                  <v-text-field
                      v-model="dataObj.postT.result3D"
                      :label="$t('postT3')"
                      persistent-hint
                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="dataObj.time==='Vat'">
                  <v-text-field
                      v-model="dataObj.postVat.result2D"
                      :label="$t('postVat2')"
                      persistent-hint
                      :rules="requireRules"
                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="dataObj.time==='Vat'">
                  <v-text-field
                      v-model="dataObj.postVat.result3D"
                      :label="$t('postVat3')"
                      persistent-hint
                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">
                  <v-text-field
                      v-model="dataObj.postC.result2D"
                      :label="$t('postC2')"
                      persistent-hint
                      :disabled="dataObj.time==='T'"

                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">
                  <v-text-field
                      v-model="dataObj.postC.result3D"
                      :label="$t('postC3')"
                      persistent-hint
                      :disabled="dataObj.time==='T'"

                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">
                  <v-text-field
                      v-model="dataObj.postD.result2D"
                      :label="$t('postD2')"
                      persistent-hint
                      :disabled="dataObj.time==='T'"

                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">
                  <v-text-field
                      v-model="dataObj.postD.result3D"
                      :label="$t('postD3')"
                      persistent-hint
                      :disabled="dataObj.time==='T'"

                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6" v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">
                  <v-text-field
                      v-model="dataObj.postF.result2D"
                      :label="$t('postF2')"
                      persistent-hint
                      :disabled="dataObj.time==='T'"

                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">
                  <v-text-field
                      v-model="dataObj.postF.result3D"
                      :label="$t('postF3')"
                      persistent-hint
                      :disabled="dataObj.time==='T'"

                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6" v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">
                  <v-text-field
                      v-model="dataObj.postI.result2D"
                      :label="$t('postI2')"
                      persistent-hint
                      :dense="dense"
                      :disabled="dataObj.time==='T'"

                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">
                  <v-text-field
                      v-model="dataObj.postI.result3D"
                      :label="$t('postI3')"
                      persistent-hint
                      :disabled="dataObj.time==='T'"

                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6" v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">
                  <v-text-field
                      v-model="dataObj.postK.result2D"
                      :label="$t('postK2')"
                      persistent-hint
                      :dense="dense"
                      :disabled="dataObj.time==='T'"

                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">
                  <v-text-field
                      v-model="dataObj.postK.result3D"
                      :label="$t('postK3')"
                      persistent-hint
                      :dense="dense"
                      :disabled="dataObj.time==='T'"

                      required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6" v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">
                  <v-text-field
                      v-model="dataObj.postL.result2D"
                      :label="$t('postL2')"
                      persistent-hint
                      :dense="dense"
                      :disabled="dataObj.time==='T'"

                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">
                  <v-text-field
                      v-model="dataObj.postL.result3D"
                      :label="$t('postL3')"
                      persistent-hint
                      :dense="dense"
                      :disabled="dataObj.time==='T'"

                      required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6" v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">
                  <v-text-field
                      v-model="dataObj.postN.result2D"
                      :label="$t('postN2')"
                      persistent-hint
                      :dense="dense"
                      :disabled="dataObj.time==='T'"

                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">
                  <v-text-field
                      v-model="dataObj.postN.result3D"
                      :label="$t('postN3')"
                      persistent-hint
                      :dense="dense"
                      :disabled="dataObj.time==='T'"

                      required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6" v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">
                  <v-text-field
                      v-model="dataObj.postO.result2D"
                      :label="$t('postO2')"
                      persistent-hint
                      :disabled="dataObj.time==='T'"

                      :dense="dense"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">
                  <v-text-field
                      v-model="dataObj.postO.result3D"
                      :label="$t('postO3')"
                      persistent-hint
                      :dense="dense"
                      :disabled="dataObj.time==='T'"

                      required
                  ></v-text-field>
                </v-col>


                <v-col cols="12" sm="6" md="6" v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">

                  <v-combobox
                      :value="dataObj.postLo.result2D"
                      hide-selected
                      multiple
                      persistent-hint
                      small-chips
                      :label="$t('postLo2')"
                      :disabled="dataObj.time==='T'"

                      :dense="dense"
                      required
                      cache-items
                      @input="addArgumentResultLo2D"
                      item-text="value"
                      item-value="index"
                      @keypress="validateTyping"
                      counter
                      attach
                  >
                  </v-combobox>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="!(dataObj.time==='T' || dataObj.time==='Vat')">

                  <v-combobox
                      :value="dataObj.postLo.result3D"
                      hide-selected
                      multiple
                      persistent-hint
                      small-chips
                      :disabled="dataObj.time==='T'"

                      :label="$t('postLo3')"
                      :dense="dense"
                      required
                      cache-items
                      @input="addArgumentResultLo3D"
                      item-text="value"
                      item-value="index"
                      @keypress="validateTyping"
                      counter
                      attach
                  >
                  </v-combobox>
                </v-col>

              </v-row>
            </v-container>
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
import {LT_ResultReact} from "../../../imports/collections/lt_result"
import numeral from "numeral";
import {Meteor} from 'meteor/meteor';

export default {
  meteor: {
    reactData() {
      let vm = this;
      if (Meteor.userId()) {
        LT_ResultReact.find({}).fetch();
        vm.fetchDataTable(vm.search, vm.skip, vm.itemsPerPage + vm.skip);
      }
    }
  },
  mounted() {
    this.$jQuery('body').off();
  },
  name: "Result",
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
        resultDate: "",
        time: "E",
        postA: {
          result2D: [],
          result3D: []
        },
        postA1: {
          result2D: "",
          result3D: ""
        }, postA2: {
          result2D: "",
          result3D: ""
        }, postA3: {
          result2D: "",
          result3D: ""
        }, postA4: {
          result2D: "",
        },
        postB: {
          result2D: "",
          result3D: ""
        },
        postC: {
          result2D: "",
          result3D: ""
        },
        postD: {
          result2D: "",
          result3D: ""
        },
        postF: {
          result2D: "",
          result3D: ""
        },
        postI: {
          result2D: "",
          result3D: ""
        },
        postK: {
          result2D: "",
          result3D: ""
        },
        postL: {
          result2D: "",
          result3D: ""
        },
        postN: {
          result2D: "",
          result3D: ""
        },
        postO: {
          result2D: "",
          result3D: ""
        },
        postT: {
          result2D: "",
          result3D: ""
        },
        postVat: {
          result2D: "",
          result3D: ""
        },
        postLo: {
          result2D: [],
          result3D: []
        }
      },

      nameRules: [
        v => !!v || 'Result Name is required',
      ],
      codeRules: [
        v => !!v || 'Result Code is required',
      ],
      requireRules: [
        v => !!v || 'is required',
      ],
      selectRules: [
        v => !!v || 'Please Choose one',
      ],
      headers: [
        {
          text: 'resultDate',
          align: 'left',
          sortable: true,
          value: 'resultDate',
        }, {
          text: 'time',
          align: 'left',
          sortable: true,
          value: 'time',
        }, {
          text: 'postA',
          align: 'left',
          sortable: true,
          value: 'postA',
        },
        {
          text: 'postT',
          align: 'left',
          sortable: true,
          value: 'postT',
        },
        {
          text: 'postVat',
          align: 'left',
          sortable: true,
          value: 'postVat',
        },
        {
          text: 'postB',
          align: 'left',
          sortable: true,
          value: 'postB',
        },
        {
          text: 'postC',
          align: 'left',
          sortable: true,
          value: 'postC',
        }, {
          text: 'postD',
          align: 'left',
          sortable: true,
          value: 'postD',
        }, {
          text: 'postF',
          align: 'left',
          sortable: true,
          value: 'postF',
        }, {
          text: 'postI',
          align: 'left',
          sortable: true,
          value: 'postI',
        }, {
          text: 'postK',
          align: 'left',
          sortable: true,
          value: 'postK',
        }, {
          text: 'postL',
          align: 'left',
          sortable: true,
          value: 'postL',
        }, {
          text: 'postN',
          align: 'left',
          sortable: true,
          value: 'postN',
        }, {
          text: 'postO',
          align: 'left',
          sortable: true,
          value: 'postO',
        },
        {
          text: 'postLo',
          align: 'left',
          sortable: true,
          value: 'postLo',
        },

        {text: 'actions', value: 'action', sortable: false, width: "120px"},
      ],
      dataLists: [],
      genderOptionList: Constants.gender,
      timeOptionList: Constants.timeList,
      dateFormatted: "",
      menuDate: false,
      argsIndexA2: 0,
      argsIndexA3: 0,
      argsIndexLo2: 0,
      argsIndexLo3: 0


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
    addArgumentResultA2D(args) {
      if (args.length > this.dataObj.postA.result2D.length) {
        this.argsIndexA2++;
        args[args.length - 1] = {
          index: this.argsIndexA2,
          value: args[args.length - 1]
        };
      }
      this.dataObj.postA.result2D = args;
    },
    addArgumentResultA3D(args) {
      if (args.length > this.dataObj.postA.result3D.length) {
        this.argsIndexA3++;
        args[args.length - 1] = {
          index: this.argsIndexA3,
          value: args[args.length - 1]
        };
      }
      this.dataObj.postA.result3D = args;
    },
    addArgumentResultLo2D(args) {
      if (args.length > this.dataObj.postLo.result2D.length) {
        this.argsIndexLo2++;
        args[args.length - 1] = {
          index: this.argsIndexLo2,
          value: args[args.length - 1]
        };
      }
      this.dataObj.postLo.result2D = args;
    },
    addArgumentResultLo3D(args) {
      if (args.length > this.dataObj.postLo.result3D.length) {
        this.argsIndexLo3++;
        args[args.length - 1] = {
          index: this.argsIndexLo3,
          value: args[args.length - 1]
        };
      }
      this.dataObj.postLo.result3D = args;
    },
    validateTyping(evt) {
      let charCode = (evt.which) ? evt.which : evt.keyCode;
      if (!(charCode > 47 && charCode < 58)) {
        evt.preventDefault();
      }

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
    fetchDataTable: _.debounce(function (val, skip, limit) {
      let vm = this;
      vm.loading = true;
      return new Promise((resolve, reject) => {
        Meteor.call("lt_fetchResult", {
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

    queryLocationOption() {
      let vm = this;
      return new Promise((resolve, reject) => {
        Meteor.call("lt_fetchLocationOption", Constants.secret, vm.$store.state.branchId, (err, result) => {
          if (result) {
            vm.locationOptionList = result;
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
        vm.dataObj.postA.result2D = vm.dataObj.postA.result2D.map((d) => d.value);
        vm.dataObj.postA.result3D = vm.dataObj.postA.result3D.map((d) => d.value);

        vm.dataObj.postLo.result2D = vm.dataObj.postLo.result2D.map((d) => d.value);
        vm.dataObj.postLo.result3D = vm.dataObj.postLo.result3D.map((d) => d.value);
        if (vm.dataObj._id === "") {
          return new Promise((resolve, reject) => {
            Meteor.call("lt_insertResult", vm.dataObj, Constants.secret, (err, result) => {
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
            Meteor.call("lt_updateResult", vm.dataObj._id, vm.dataObj, Constants.secret, (err, result) => {
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
      vm.titleClick = 'addResult';
      vm.dataObj.resultDate = moment().format("YYYY-MM-DD");

    },
    handleUpdate(doc) {
      let vm = this;
      vm.dataObj.resultDate = "";

      vm.titleClick = "updateResult";
      Meteor.call("lt_findResultById", doc._id, Constants.secret, (err, result) => {
        if (result) {


          Meteor.call("lt_findEndPerDayByDate", result.time, result.resultDate, result.branchId, Constants.secret, (e, r) => {
            if (!!r) {
              vm.$message({
                message: vm.$t("alreadyEndPerDay"),
                showClose: true,
                type: 'error'
              });
              return false;
            } else {
              vm.dataObj = Object.assign({}, result);
              vm.dataObj.resultDate = result.resultDate;

              let indA2 = 0;
              vm.argsIndexA2 = 0;
              vm.argsIndexA3 = 0;
              vm.argsIndexLo2 = 0;
              vm.argsIndexLo3 = 0;

              vm.dataObj.postA.result2D = result.postA.result2D.map((d) => {
                let od = {};
                od.index = indA2;
                od.value = d;
                indA2++;
                vm.argsIndexA2++;
                return od;
              });
              let indA3 = 0;

              vm.dataObj.postA.result3D = result.postA.result3D.map((d) => {
                let od = {};
                od.index = indA3;
                od.value = d;
                indA3++;
                vm.argsIndexA3++;
                return od;
              });
              let indLo2 = 0;
              vm.dataObj.postLo.result2D = result.postLo.result2D.map((d) => {
                let od = {};
                od.index = indLo2;
                od.value = d;
                indLo2++;
                vm.argsIndexLo2++;
                return od;
              });

              let indLo3 = 0;
              vm.dataObj.postLo.result3D = result.postLo.result3D.map((d) => {
                let od = {};
                od.index = indLo3;
                od.value = d;
                indLo3++;
                vm.argsIndexLo3++;
                return od;
              });

              vm.dialog = true;
              vm.titleClick = "updateResult";
            }
          })

        }

      })


    },
    handleRemove(row) {
      let vm = this;

      Meteor.call("lt_findEndPerDayByDate", row.time, row.resultDate, row.branchId, Constants.secret, (e, r) => {
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
            Meteor.call("lt_removeResult", row, Constants.secret, (err, result) => {
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

    }
  },
  watch: {
    dialog(val) {
      let vm = this;
      if (val === false) {
        this.$refs.formData.reset();
        vm.dataObj._id = "";
        vm.dataObj.resultDate = "";

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
    "dataObj.resultDate"(val) {
      let vm = this;
      vm.dateFormatted = vm.formatDate(val);
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
    vm.queryLocationOption();
    vm.dataObj.resultDate = moment().format("YYYY-MM-DD");
    Meteor.subscribe('lt_resultReact');

  }
}
</script>
