<template>
  <div>
    <v-container
        fluid
        class="fill-height d-flex flex-column align-center justify-center text-center bg-light-blue-lighten-5"
    >

      <h1 class="text-h4 font-weight-bold mb-2">
        {{ $t("welcomeTitle") }}
      </h1>

      <p class="text-subtitle-1 text-grey-darken-1 mb-6">
        {{ $t("welcomeSubtitle") }}
      </p>


    </v-container>
  </div>
</template>

<script>
import SaveButton from "../components/saveButton";
import {Constants} from "../../libs/constant";
import {VueEditor} from "vue2-editor";
export default{
  name: "Welcome",
  data() {
    return {

    }
  },
}
</script>


<style scoped>

</style>