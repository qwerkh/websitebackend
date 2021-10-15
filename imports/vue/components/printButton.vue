<template>
    <v-fab-transition>
        <v-hover
                v-slot:default="{ hover }"
                close-delay="200"
        >
            <v-btn rounded color="success" dark @click="$emit('run')" class="fontTitle" :elevation="hover ? 16 :2"
                   :loading="loading"
            >{{$t("print")}}
                <v-icon dark right>print</v-icon>
            </v-btn>
        </v-hover>
    </v-fab-transition>
</template>
<script>
    export default {
        name: "PrintButton",
        props: ["loading"]
    }
</script>
