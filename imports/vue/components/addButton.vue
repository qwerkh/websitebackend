<template>
    <v-fab-transition>
        <v-hover
                v-slot:default="{ hover }"
                close-delay="200"
        >
            <v-btn rounded color="primary" dark @click="$emit('add')" class="fontTitle" :elevation="hover ? 16 :2"
            >{{$t("add")}}
                <v-icon dark right>mdi-clipboard-plus</v-icon>
            </v-btn>
        </v-hover>
    </v-fab-transition>
</template>

<script>
    export default {
        name: "AddButton",
    }
</script>
