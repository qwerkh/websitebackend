<template>
  <v-hover
      v-slot:default="{ hover }"
      close-delay="200"
  >
    <v-btn class="mr-4" @click="$emit('removeImg')"
           :color="color ? color: $vuetify.breakpoint.mobile?'danger':'warning'"
           :disabled="!valid"
           :large="$vuetify.breakpoint.mobile"
           :icon="$vuetify.breakpoint.mobile"
           rounded
           :elevation="hover ? 16 :0"

    >
      <span v-show="!$vuetify.breakpoint.mobile" class="font-weight-bold">&nbsp;&nbsp;{{$t('remove')}}&nbsp;</span>
      <v-icon :left="!$vuetify.breakpoint.mobile">delete</v-icon>
    </v-btn>
  </v-hover>
</template>
<script>
export default {
  name: "RemoveButton",
  props: ["valid", "color"],
}
</script>
