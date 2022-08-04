<template>
  <v-card>
    <v-toolbar
        color="cyan"
        dark
        flat
    >
      <template v-slot:extension>
        <v-toolbar-title style="width: 50% !important;">
            <h2 v-html="getTranslate(majorDoc.title)"></h2>
        </v-toolbar-title>
        <v-tabs
            v-model="tab"
            align-with-title
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
              key="overview"
          >
            {{ $t('overview') }}
          </v-tab>
          <v-tab
              key="trainingProgram"
          >
            {{ $t('trainingProgram') }}
          </v-tab>
          <v-tab
              key="cost"
          >
            {{ $t('cost') }}
          </v-tab>
          <v-tab
              key="structure"
          >
            {{ $t('structure') }}
          </v-tab>
          <v-tab
              key="info"
          >
            {{ $t('info') }}
          </v-tab>
        </v-tabs>

      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item
          key="overview"
      >
        <v-card flat>
          <overview :majorDoc="majorDoc"/>
        </v-card>
      </v-tab-item>
      <v-tab-item
          key="trainingProgram"
      >
        <v-card flat>
          <training-program :majorDoc="majorDoc"/>
        </v-card>
      </v-tab-item>
      <v-tab-item
          key="cost"
      >
        <v-card flat>
          <cost :majorDoc="majorDoc"/>
        </v-card>
      </v-tab-item>
      <v-tab-item
          key="structure"
      >
        <v-card flat>
          <structure :majorDoc="majorDoc"/>
        </v-card>
      </v-tab-item>
      <v-tab-item
          key="info"
      >
        <v-card flat>
          <info :majorDoc="majorDoc"/>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import Overview from "../ui/overview"
import TrainingProgram from "../ui/trainingProgram"
import Cost from "../ui/cost"
import Structure from "../ui/structure"
import Info from "../ui/info"
import GlobalFn from "../../libs/globalFn";


export default {

  mounted() {
    this.$jQuery('body').off();
  },
  name: "Program",
  components: {Overview, TrainingProgram, Cost, Structure, Info},
  data() {
    return {
      tab: "",
      majorDoc: {}
    }
  },
  methods: {
    getTranslate(data) {
      if (data) {
        if (this.$i18n.locale === 'en') {
          return data.en;
        } else if (this.$i18n.locale === 'km') {
          return data.km || data.en;
        } else {
          return data.cn || data.en;
        }
      } else {
        return "";
      }
    }
  },
  watch: {},
  computed: {},
  created() {
    this.majorDoc = this.$route.params.majorDoc;

  }
}
</script>
