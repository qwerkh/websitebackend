<template>
    <v-fab-transition>
        <v-hover
                v-slot:default="{ hover }"
                close-delay="200"
        >
            <v-btn rounded color="primary" dark @click="$emit('run')" class="fontTitle" :elevation="hover ? 16 :2"
                   :loading="loading"
            >{{$t("run")}}
                <v-icon dark right>play_arrow</v-icon>
            </v-btn>
        </v-hover>
    </v-fab-transition>
</template>
<script>
    export default {
        name: "RunButton",
        props: ["loading"]
    }
</script>
