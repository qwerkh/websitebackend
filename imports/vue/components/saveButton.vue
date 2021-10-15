<template>
    <v-hover
            v-slot:default="{ hover }"
            close-delay="200"
    >
        <v-btn class="mr-4" @click="$emit('saveForm')"
               :color="color ? color: $vuetify.breakpoint.xsOnly?'success':'success'"
               :disabled="!valid"
               :large="$vuetify.breakpoint.xsOnly"
               :icon="$vuetify.breakpoint.xsOnly"
               rounded
               :elevation="hover ? 16 :0"
        >
            <span v-show="!$vuetify.breakpoint.xsOnly" class="font-weight-bold">&nbsp;&nbsp;{{$t('save')}}</span>
            <v-icon :left="!$vuetify.breakpoint.xsOnly">mdi-checkbox-marked-circle</v-icon>
        </v-btn>
    </v-hover>
</template>
<script>
    export default {
        name: "SaveButton",
        props: ["valid", "color"],
    }
</script>
