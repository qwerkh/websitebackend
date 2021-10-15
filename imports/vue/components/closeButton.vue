<template>
    <v-hover
            v-slot:default="{ hover }"
            close-delay="200"
    >
        <v-btn class="mr-4" @click="$emit('closeForm')"
               :color="color ? color: $vuetify.breakpoint.xsOnly?'warning':'red'"
               :disabled="!valid"
               :large="$vuetify.breakpoint.xsOnly"
               :icon="$vuetify.breakpoint.xsOnly"
               dark
               rounded
               text
               :elevation="hover ? 16 :0"

        >
            <v-icon :left="!$vuetify.breakpoint.xsOnly">mdi-arrow-left</v-icon>
            <!--<span v-show="!$vuetify.breakpoint.xsOnly" class="font-weight-bold">{{$t('close')}}</span>-->
        </v-btn>
    </v-hover>
</template>
<script>
    export default {
        name: "CloseButton",
        props: ["valid", "color"],
    }
</script>
