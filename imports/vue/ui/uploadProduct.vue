<template>
  <div>

    <v-col style="text-align: center;color: blue">
      <v-file-input
          v-model="filesImport.files"
          color="deep-purple accent-4"
          counter
          label="File input"
          placeholder="Select your files"
          prepend-icon="mdi-paperclip"
          outlined
          multiple
          :show-size="1000"
          @change="onFilePicked"
      >
        <template v-slot:selection="{ index, text }">
          <v-chip
              v-if="index < 2"
              color="deep-purple accent-4"
              dark
              label
              small
          >
            {{ text }}
          </v-chip>
        </template>
      </v-file-input>
      <v-btn color="success" outlined @click="addToProduct">Upload</v-btn>
      <v-progress-circular indeterminate v-if="isLoading"
                           color="green"
                           :value="50"></v-progress-circular>
    </v-col>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Id</th>
          <th class="text-left">Code</th>
          <th class="text-left">EnglishName</th>
          <th class="text-left">KhmerName</th>
          <th class="text-left">MinPrice</th>
          <th class="text-left">MaxPrice</th>
          <th class="text-left">Currency</th>
          <th class="text-left">PlantType</th>
          <th class="text-left">PlantLifeStyle</th>
          <th class="text-left">PlantRoom</th>
          <th class="text-left">PlantGift</th>
          <th class="text-left">Size</th>
          <th class="text-left">Light</th>
          <th class="text-left">Care</th>
          <th class="text-left">Description</th>
          <th class="text-left">Url</th>
          <th class="text-left">UrlList</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(item,i) in dataList"
            :key="i"
        >
          <td>{{ i + 1 }}</td>
          <td>{{ item.Code }}</td>
          <td>{{ item.EnglishName }}</td>
          <td>{{ item.KhmerName }}</td>
          <td>{{ item.MinPrice }}</td>
          <td>{{ item.MaxPrice }}</td>
          <td>{{ item.Currency }}</td>
          <td>{{ item.PlantType }}</td>
          <td>{{ item.PlantLifeStyle }}</td>
          <td>{{ item.PlantRoom }}</td>
          <td>{{ item.PlantGift }}</td>
          <td>{{ item.Size }}</td>
          <td>{{ item.Light }}</td>
          <td>{{ item.Care }}</td>
          <td>{{ item.Description }}</td>
          <td>{{ item.Url }}</td>
          <td>{{ item.UrlList }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>

  </div>
</template>

<script>
import XLSX from "xlsx";
import {Meteor} from "meteor/meteor";
import {Constants} from "../../libs/constant";

export default {
  name: "UploadProduct",
  data() {
    return {
      filesImport: {
        fileName: '',
        file: "",
        files: []
      },
      isLoading:false,
      dataList: []
    }
  }, methods: {
    addToProduct() {
      let vm=this;
      vm.isLoading=true;
      return new Promise((resolve, reject) => {
        Meteor.call("web_uploadProduct", vm.dataList,vm.$store.state.branchId, Constants.secret, (err, result) => {
          if (!err) {
            vm.$message({
              message: this.$t('successNotification'),
              showClose: true,
              type: 'success'
            });
            vm.dataList=[];
            vm.isLoading=false;

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
      });
    },
    onFilePicked(files) {
      let vm = this;
      if (files[0] !== undefined) {
        const matchExtension = files[0].name.match(/xlsx/g);
        if (!matchExtension) {
          vm.$message({
            message: this.$t('fileTypeMustBeXlsx'),
            type: 'error'
          });
          vm.filesImport.file = [];
          vm.filesImport.files = [];
          vm.filesImport.fileName = '';
        } else {
          vm.filesImport.fileName = files[0].name;
          vm.filesImport.file = files[0];
          vm.importfxx();
        }
      } else {
        vm.filesImport.fileName = '';
        vm.filesImport.file = [];
      }
    },
    importfxx(row) {
      let vm = this;
      vm.overlay = true;
      vm.filesImportLoading = true;
      const {file} = this.filesImport;
      setTimeout(() => {
        this.readDataFromFile({
          file,
          onFileRead: (docs) => this.uploadData({
            docs,
            error: () => {
              vm.filesImportLoading = false;
              vm.filesImport.fileName = '';
              vm.filesImport.file = null;
            },
            success: () => {
              vm.filesImportLoading = false;
              vm.filesImport.fileName = '';
              vm.filesImport.file = null;

              vm.dialogFileUpload = false;
            }
          })
        })
      }, 500);
    },
    uploadData({docs, error, success}) {
      let vm = this;
      vm.dataList = docs;
      vm.filesImportLoading = false;
      vm.overlay = false;
    },
    fixdata(data) {
      let o = "",
          l = 0,
          w = 10240;
      for (l; l < data.byteLength / w; ++l)
        o += String.fromCharCode.apply(
            null,
            new Uint8Array(data.slice(l * w, l * w + w))
        );
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    },
    readDataFromFile({file, onFileRead}) {
      let reader = new FileReader();
      reader.onload = (val) => {
        let results,
            data = val.target.result,
            fixedData = this.fixdata(data),
            workbook = XLSX.read(btoa(fixedData), {type: "base64"}),
            firstSheetName = workbook.SheetNames[0],
            worksheet = workbook.Sheets[firstSheetName];
        results = XLSX.utils.sheet_to_json(worksheet);
        onFileRead(results);
      };
      reader.readAsArrayBuffer(file);
    },

  },
}
</script>

<style scoped>

</style>