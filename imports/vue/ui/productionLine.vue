<template>
  <v-row justify="center">
    <v-flex
        md12
    >
      <v-card>

        <v-card-title icon="mdi-index">
          <v-toolbar-title v-show="!$vuetify.breakpoint.mobile">
            <v-icon style="font-size: 70px !important;" large color="green darken-2">people</v-icon>
            {{ $t("productionLine") }}
          </v-toolbar-title>
          <v-spacer v-show="!$vuetify.breakpoint.mobile"></v-spacer>
          <v-text-field
              v-model="search"
              append-icon="search"
              :label="$t('search')"
              single-line
              hide-details
          ></v-text-field>
          <v-spacer v-show="!$vuetify.breakpoint.mobile"></v-spacer>
          <add-button @add="dialog=true,titleClick='addProductionLine'" v-if="checkRole('Create')"
                      v-shortkey="['+']"
                      @shortkey.native="dialog=true,titleClick='addProductionLine'"
                      v-show="!$vuetify.breakpoint.mobile"></add-button>
          <raise-button @add="dialog=true,titleClick='addProductionLine'" v-if="checkRole('Create')"
                        v-show="$vuetify.breakpoint.mobile"></raise-button>

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


          <template v-slot:header.body="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>


          <template v-slot:header.order="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>

          <template v-slot:header.action="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          //Body

          <template v-slot:item.body="{ item }">
            {{ JSON.stringify(item.body) }}
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

    <v-dialog v-model="dialog" persistent :fullscreen="$vuetify.breakpoint.mobile">
      <v-form
          :model="valid" ref="formData"
          lazy-validation
      >
        <v-card>
          <v-overlay :value="isLoading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-overlay>
          <v-card-title>

            <v-icon v-if="titleClick==='addProductionLine'" large color="green darken-2"
                    style="font-size: 50px !important;">library_add
            </v-icon>
            <v-icon v-if="titleClick==='updateProductionLine'" large color="green darken-2"
                    style="font-size: 50px !important;">autorenew
            </v-icon>
            <span class="headline">{{ $t(titleClick) }}</span>
            <v-spacer></v-spacer>
            <close-button @closeForm="dialog=false" valid="false" v-shortkey="['esc']"
                          @shortkey.native="dialog=false"></close-button>

          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                    type="number"
                    v-model="dataObj.order"
                    :label="$t('order')"
                    persistent-hint
                    :dense="dense"
                    outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" sm="12">

                {{ $t('body') }} (English , Khmer ,Chinese)
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <vue-editor
                    v-model="dataObj.body.en"

                >
                </vue-editor>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <vue-editor
                    v-model="dataObj.body.km"

                >
                </vue-editor>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <vue-editor
                    v-model="dataObj.body.cn"
                >
                </vue-editor>
              </v-col>


              <v-col cols="12" sm="12" md="12">
                <v-text-field
                    v-model="newUrlList"
                    @click="$refs.fileInput.click()"
                    :label="$t('uploadPhoto')"
                    outlined
                    rounded
                    :suffix="dataObj.url && dataObj.url.length+' ' + $t('photo')"
                    hide-details
                >

                </v-text-field>

                <input style="display: none !important;" type="file"
                       @change="onFileSelectedList($event)"
                       multiple
                       ref="fileInput"/>

              </v-col>
              <v-col cols="12" sm="12" md="12" style="padding-top: 0px !important;padding-bottom: 0px !important;">
                <v-row>
                  <v-col
                      v-for="(imgUrl,i) in dataObj.url"
                      :key="imgUrl"
                      class="d-flex child-flex"
                      cols="3"
                  >
                    <v-img
                        :src="imgUrl"
                        lazy-src="/images/no-image-icon.png"
                        aspect-ratio="1"
                        class="grey lighten-2"
                    >
                      <remove-button @removeImg="removeImg(dataObj,imgUrl)" valid="false"
                                     style="float: right;z-index: 9999"></remove-button>

                      <template v-slot:placeholder>
                        <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                        >
                          <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>

                    </v-img>

                  </v-col>
                </v-row>
              </v-col>

            </v-row>
          </v-card-text>
          <v-card-actions>

            <v-spacer></v-spacer>
            <reset-button @resetForm="resetForm" valid="false"></reset-button>
            <save-button @saveForm="handleSubmit" :valid="valid"></save-button>

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
import RemoveButton from "../components/removeButton"
import {Constants} from "../../libs/constant"
import GlobalFn from "../../libs/globalFn"
import _ from 'lodash'
import {Web_ProductionLineReact} from "../../collections/productionLine"
import numeral from "numeral";
import {Meteor} from 'meteor/meteor';
import "/imports/firebase/config";
import firebase from "firebase/compat";

const Compress = require('compress.js').default
import {VueEditor} from "vue2-editor";

export default {
  meteor: {
    reactData() {
      let vm = this;
      if (Meteor.userId()) {
        Web_ProductionLineReact.find({}).fetch();
        vm.fetchDataTable(vm.search, vm.skip, vm.itemsPerPage + vm.skip);
      }
    }
  },
  mounted() {
    this.$jQuery('body').off();
  },
  name: "ProductionLine",
  components: {AddButton, RaiseButton, SaveButton, ResetButton, CloseButton, VueEditor, RemoveButton},
  data() {
    return {
      dense: this.$store.state.isDense,
      isLoading: false,
      isLoading1: false,
      isLoading2: false,
      isLoading3: false,
      isLoading4: false,
      isLoading5: false,
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
      fileName: "",
      newUrlList: [],
      dataObj: {
        _id: "",
        branchId: "",
        order: 1,
        body: {
          en: "",
          km: "",
          cn: "",
        },
        url: [],
      },

      nameRules: [
        v => !!v || 'ProductionLine Name is required',
      ],
      phoneNumber: [
        v => !!v || 'Phone Number is required',
      ],
      dob: [
        v => !!v || 'Date Of Birth is required',
      ],
      requireInput: [
        v => !!v || 'Please Input Data',
      ], selectRules: [
        v => !!v || 'Please Choose one',
      ],
      headers: [
        {
          text: 'order',
          align: 'left',
          sortable: true,
          value: 'order',
        },
        {
          text: 'body',
          align: 'left',
          sortable: true,
          value: 'body',
        },

        {text: 'actions', value: 'action', sortable: false, width: "120px"},
      ],
      dataLists: [],


      selectedFile: null,
      uploadValue: 0,
      newUrl: "",
      loanConfig: {},
      rawFileImageList: []

    }
  },
  methods: {
    resetForm() {
      this.$refs.formData.reset();
    },

    onFileSelectedList(e) {
      let vm = this;
      vm.isLoadingImg = true;
      vm.isLoading = true;
      vm.fileName = e.target.files[0] && e.target.files[0].name || "";
      if (vm.fileName !== "") {
        const files = [...e.target.files];
        vm.rawFileImageList = files;
        const compress = new Compress();
        compress.compress(files, {
          size: 4, // the max size in MB, defaults to 2MB
          quality: 0.6, // the quality of the image, max is 1,
          maxWidth: 1920, // the max width of the output image, defaults to 1920px
          maxHeight: 1920, // the max height of the output image, defaults to 1920px
          resize: true // defaults to true, set false if you do not want to resize the image width and height
        }).then((data) => {
          vm.newUrlList = [];
          data.forEach((obj) => {
            let img1 = obj;
            let base64str = img1.data;
            let imgExt = img1.ext;
            vm.onUploadList(Compress.convertBase64ToFile(base64str, imgExt), obj.alt.split(".")[0]);
          })
        })
      }
    },
    onUploadList(selectedFile, fileName) {
      let vm = this;
      const storageRef = firebase.storage().ref("productionLine/" + moment().format("YYYYMMDDHHmmss") + fileName).put(selectedFile);
      storageRef.on(`state_changed`, snapshot => {
            this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          }, error => {
            console.log(error.message)
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              if (url) {
                vm.dataObj.url = vm.dataObj.url || [];
                vm.dataObj.url.unshift(url);
                vm.newUrlList = [];

                vm.isLoading = false;
                vm.isLoadingImg = false;

              }
            });
          }
      );
    },
    removeImg(row, url) {
      let vm = this;
      vm.$confirm(this.$t('messageWarning'), this.$t('warning'), {
        confirmButtonText: this.$t('ok'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        vm.dataObj.url = vm.dataObj.url.filter(v => v !== url);
        vm.newUrlList = vm.newUrlList.filter(v => v !== url);

      }).catch(() => {
        vm.$message({
          type: 'info',
          message: this.$t('removeCancel')
        });
      });
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
        Meteor.call("web_fetchProductionLine", {
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
    handleSubmit() {
      let vm = this;

      if (vm.$refs.formData.validate()) {
        vm.loading = true;
        vm.dataObj.branchId = vm.$store.state.branchId;
        if (vm.dataObj._id === "") {
          return new Promise((resolve, reject) => {
            console.log(vm.dataObj);
            Meteor.call("web_insertProductionLine", vm.dataObj, Constants.secret, (err, result) => {
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
            Meteor.call("web_updateProductionLine", vm.dataObj._id, vm.dataObj, Constants.secret, (err, result) => {
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

      vm.dataObj = Object.assign({}, doc);
      vm.titleClick = "updateProductionLine";
      vm.dialog = true;
      Meteor.setTimeout(function () {
        vm.dataObj.address = doc.address || "";
        vm.newUrl = doc.url || "";
      }, 300);
    },
    handleRemove(row) {
      let vm = this;

      vm.$confirm(this.$t('messageWarning'), this.$t('warning'), {
        confirmButtonText: this.$t('ok'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        Meteor.call("web_removeProductionLine", row, Constants.secret, (err, result) => {
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
    },

  },
  watch: {
    dialog(val) {
      let vm = this;
      if (val === false) {
        this.$refs.formData.reset();

        vm.dataObj = {
          _id: "",
          branchId: "",
          order: 1,
          body: {
            en: "",
            km: "",
            cn: "",
          },
          url: [],
        };
        vm.dataObj._id = "";
        vm.newUrl = "";
        vm.dataObj.url = "";


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
    vm.fetchDataTable();
    Meteor.subscribe('web_productionLineReact');

  }
}
</script>
